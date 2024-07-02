import * as anchor from "@coral-xyz/anchor";
import _chunk from "lodash.chunk";
import bs58 from "bs58";
import { STAKE_DEPOSIT_RECEIPT_DISCRIMINATOR } from "./constants";
import { SplTokenStaking } from "./idl";
import { StakeDepositReceiptData } from "./types";

/**
 * Request all of a wallet's StakeDepositReceipts.
 *
 * This can be an expensive request if the wallet has staked many times.
 * @param program
 * @param owner
 * @param stakePoolKey
 * @returns
 */
export const batchRequestStakeReceipts = async (
	program: anchor.Program<SplTokenStaking>,
	owner: anchor.web3.PublicKey,
	stakePoolKey: anchor.web3.PublicKey,
	pageSize = 50
) => {
	const maxIndex = 4_294_967_295; // U32 MAX
	const maxPage = Math.ceil(maxIndex / pageSize);
	let decodedAccountBuffer: StakeDepositReceiptData[] = [];
	for (let page = 0; page <= maxPage; page++) {
		const startIndex = page * pageSize;
		const stakeReceiptKeys: anchor.web3.PublicKey[] = [];
		// derive keys for batch
		for (let i = startIndex; i < startIndex + pageSize; i++) {
			const [stakeReceiptKey] = anchor.web3.PublicKey.findProgramAddressSync(
				[owner.toBuffer(), stakePoolKey.toBuffer(), new anchor.BN(i).toArrayLike(Buffer, "le", 4), Buffer.from("stakeDepositReceipt", "utf-8")],
				program.programId
			);
			stakeReceiptKeys.push(stakeReceiptKey);
		}
		// fetch page of AccountInfo for stake receipts
		const accountInfos = await program.provider.connection.getMultipleAccountsInfo(stakeReceiptKeys);
		const validAccounts = accountInfos
			.map((a, index) =>
				a
					? {
							address: stakeReceiptKeys[index],
							...a,
					  }
					: null
			)
			.filter((a) => !!a) as (anchor.web3.AccountInfo<Buffer> & {
			address: anchor.web3.PublicKey;
		})[];
		const decodedAccounts = validAccounts.map((a) => ({
			address: a.address,
			...program.coder.accounts.decode("stakeDepositReceipt", a.data),
		}));
		decodedAccountBuffer = [...decodedAccountBuffer, ...decodedAccounts];
		if (validAccounts.length === 0) {
			// if there is a full page of empty accounts, we can assume we've reached the last page of StakeDepositReceipts.
			return decodedAccountBuffer;
		}
	}
	return decodedAccountBuffer;
};

/**
 * Batch request AccountInfo for StakeDepositReceipts
 */
export const getNextUnusedStakeReceiptNonce = async (
	connection: anchor.web3.Connection,
	programId: anchor.web3.PublicKey,
	owner: anchor.web3.PublicKey,
	stakePoolKey: anchor.web3.PublicKey
) => {
	const pageSize = 10;
	const maxIndex = 4_294_967_295;
	const maxPage = Math.ceil(maxIndex / pageSize);
	for (let page = 0; page <= maxPage; page++) {
		const startIndex = page * pageSize;
		const stakeReceiptKeys: anchor.web3.PublicKey[] = [];
		// derive keys for batch
		for (let i = startIndex; i < startIndex + pageSize; i++) {
			const [stakeReceiptKey] = anchor.web3.PublicKey.findProgramAddressSync(
				[owner.toBuffer(), stakePoolKey.toBuffer(), new anchor.BN(i).toArrayLike(Buffer, "le", 4), Buffer.from("stakeDepositReceipt", "utf-8")],
				programId
			);
			stakeReceiptKeys.push(stakeReceiptKey);
		}
		// fetch page of AccountInfo for stake receipts
		const accounts = await connection.getMultipleAccountsInfo(stakeReceiptKeys);
		const indexWithinPage = accounts.findIndex((a) => !a);
		if (indexWithinPage > -1) {
			return startIndex + indexWithinPage;
		}
	}
	throw new Error("No more nonces available");
};

export const fetchChunkedListOfStakeReceiptKeysWithinTimeFrame = async (
	program: anchor.Program<SplTokenStaking>,
	stakePool: anchor.Address,
	startTime: number | string = 0,
	endTime: number | string = Number.MAX_SAFE_INTEGER,
	pageCount = 50
) => {
	const startTimeBN = new anchor.BN(startTime);
	const endTimeBN = new anchor.BN(endTime);
	const discriminatorFilter = {
		// ensure it's `StakeDepositReceipt`
		memcmp: {
			offset: 0,
			bytes: bs58.encode(STAKE_DEPOSIT_RECEIPT_DISCRIMINATOR),
		},
	};
	const stakePoolFilter = {
		// filter by `StakePool` address
		memcmp: {
			offset: 8 + 32 + 32,
			bytes: new anchor.web3.PublicKey(stakePool).toBase58(),
		},
	};
	// pre-fetch addresses without data, so we can paginate
	const accountInfos = await program.provider.connection.getProgramAccounts(program.programId, {
		// only fetch the `deposit_timestamp` value, so we can further filter
		dataSlice: { offset: 8 + 32 + 32 + 32 + 8, length: 8 },
		filters: [discriminatorFilter, stakePoolFilter],
	});
	// Filter fetched accounts by the `deposit_timestamp`
	const accountInfosWithinTimeframe = accountInfos.filter((a) => {
		const timeInSeconds = new anchor.BN(a.account.data, "le");
		return timeInSeconds.gte(startTimeBN) && timeInSeconds.lte(endTimeBN);
	});
	const keyList = accountInfosWithinTimeframe.map((a) => a.pubkey);

	// allow 50 per fetchMultiple
	return _chunk(keyList, pageCount);
};

/**
 * Fetch an chunked array of StakeReceipts by StakePool and optionally
 * filtered by `deposit_timestamp` using an inclusive start and end time.
 * @param program
 * @param stakePool
 * @param startTime - (in seconds) inclusive startTime to filter `deposit_timestamp`
 * @param endTime - (in seconds) inclusive endTime to filter `deposit_timestamp`
 * @returns
 */
export const fetchStakeReceiptsOfStakersWithinTimeFrame = async (
	program: anchor.Program<SplTokenStaking>,
	stakePool: anchor.Address,
	startTime: number | string = 0,
	endTime: number | string = Number.MAX_SAFE_INTEGER
) => {
	// allow 50 per fetchMultiple
	const chunkedKeys = await fetchChunkedListOfStakeReceiptKeysWithinTimeFrame(program, stakePool, startTime, endTime);
	const chunkedStakeReceipts = await Promise.all(chunkedKeys.map((keys) => program.account.stakeDepositReceipt.fetchMultiple(keys)));

	return chunkedStakeReceipts;
};
