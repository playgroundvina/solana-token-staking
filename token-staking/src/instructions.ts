import * as anchor from "@coral-xyz/anchor";
import { SPL_TOKEN_PROGRAM_ID } from "@coral-xyz/spl-token";
import { SplTokenStaking } from "./idl";

/**
 * Initialize the StakePool and set configuration parameters.
 * @param program
 * @param mint
 * @param nonce
 * @param baseWeight
 * @param maxWeight
 * @param minDuration
 * @param maxDuration
 * @param authority - defaults to `program.provider.publicKey`
 */
export const initStakePool = async (
	program: anchor.Program<SplTokenStaking>,
	mint: anchor.Address,
	nonce = 0,
	lockupDuration = new anchor.BN(0),
	profitRate = new anchor.BN(5),
	authority?: anchor.Address
) => {
	const _authority = authority ? new anchor.web3.PublicKey(authority) : program.provider.publicKey;
	const [stakePoolKey] = anchor.web3.PublicKey.findProgramAddressSync(
		[
			new anchor.BN(nonce).toArrayLike(Buffer, "le", 1),
			new anchor.web3.PublicKey(mint).toBuffer(),
			_authority.toBuffer(),
			Buffer.from("stakePool", "utf-8"),
		],
		program.programId
	);
	const [stakeMintKey] = anchor.web3.PublicKey.findProgramAddressSync([stakePoolKey.toBuffer(), Buffer.from("stakeMint", "utf-8")], program.programId);
	const [vaultKey] = anchor.web3.PublicKey.findProgramAddressSync([stakePoolKey.toBuffer(), Buffer.from("vault", "utf-8")], program.programId);
	await program.methods
		.initializeStakePool(nonce, lockupDuration, profitRate)
		.accounts({
			payer: program.provider.publicKey,
			authority: _authority,
			stakePool: stakePoolKey,
			stakeMint: stakeMintKey,
			mint,
			vault: vaultKey,
			tokenProgram: SPL_TOKEN_PROGRAM_ID,
			rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			systemProgram: anchor.web3.SystemProgram.programId,
		})
		.rpc();
};

/**
 * addRewardPool and set configuration parameters.
 * @param program
 * @param mint
 * @param nonce
 * @param authority - defaults to `program.provider.publicKey`
 */
export const addRewardPool = async (program: anchor.Program<SplTokenStaking>, mint: anchor.Address, nonce = 0, authority?: anchor.Address) => {
	const _authority = authority ? new anchor.web3.PublicKey(authority) : program.provider.publicKey;
	const [stakePoolKey] = anchor.web3.PublicKey.findProgramAddressSync(
		[
			new anchor.BN(nonce).toArrayLike(Buffer, "le", 1),
			new anchor.web3.PublicKey(mint).toBuffer(),
			_authority.toBuffer(),
			Buffer.from("stakePool", "utf-8"),
		],
		program.programId
	);
	const [rewardVaultKey] = anchor.web3.PublicKey.findProgramAddressSync([stakePoolKey.toBuffer(), Buffer.from("rewardVault", "utf-8")], program.programId);
	await program.methods
		.addRewardPool(nonce)
		.accounts({
			payer: program.provider.publicKey,
			authority: _authority,
			stakePool: stakePoolKey,
			mint,
			rewardVault: rewardVaultKey,
			tokenProgram: SPL_TOKEN_PROGRAM_ID,
			rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			systemProgram: anchor.web3.SystemProgram.programId,
		})
		.rpc();
};

/**
 * addRewardPool and set configuration parameters.
 * @param program
 * @param mint
 * @param nonce
 * @param destination
 * @param amount
 * @param authority - defaults to `program.provider.publicKey`
 */
export const withdrawRewardPool = async (
	program: anchor.Program<SplTokenStaking>,
	mint: anchor.Address,
	nonce = 0,
	destination: anchor.Address,
	amount: anchor.BN,
	authority?: anchor.Address
) => {
	const _authority = authority ? new anchor.web3.PublicKey(authority) : program.provider.publicKey;

	const [stakePoolKey] = anchor.web3.PublicKey.findProgramAddressSync(
		[
			new anchor.BN(nonce).toArrayLike(Buffer, "le", 1),
			new anchor.web3.PublicKey(mint).toBuffer(),
			_authority.toBuffer(),
			Buffer.from("stakePool", "utf-8"),
		],
		program.programId
	);

	const [rewardVaultKey] = anchor.web3.PublicKey.findProgramAddressSync([stakePoolKey.toBuffer(), Buffer.from("rewardVault", "utf-8")], program.programId);

	await program.methods
		.withdrawRewardPool(amount)
		.accounts({
			payer: program.provider.publicKey,
			authority: _authority,
			stakePool: stakePoolKey,
			rewardVault: rewardVaultKey,
			tokenProgram: SPL_TOKEN_PROGRAM_ID,
			destination: destination,
		})
		.rpc();
};

/**
 * Returns the Anchor method builder for the Stake (aka Deposit) instruction.
 * @param program
 * @param payer
 * @param owner
 * @param stakePoolKey
 * @param from
 * @param stakeMintAccount
 * @param amount
 * @param duration
 * @param receiptNonce
 * @param rewardVaults
 * @returns
 */
export const createStakeBuilder = (
	program: anchor.Program<SplTokenStaking>,
	payer: anchor.web3.PublicKey,
	owner: anchor.web3.PublicKey,
	stakePoolKey: anchor.Address,
	from: anchor.Address,
	stakeMintAccount: anchor.Address,
	amount: anchor.BN,
	receiptNonce: number,
	rewardVaultKey: anchor.web3.PublicKey
) => {
	const _stakePoolKey = typeof stakePoolKey === "string" ? new anchor.web3.PublicKey(stakePoolKey) : stakePoolKey;
	const [vaultKey] = anchor.web3.PublicKey.findProgramAddressSync([_stakePoolKey.toBuffer(), Buffer.from("vault", "utf-8")], program.programId);
	const [stakeMint] = anchor.web3.PublicKey.findProgramAddressSync([_stakePoolKey.toBuffer(), Buffer.from("stakeMint", "utf-8")], program.programId);
	const [stakeReceiptKey] = anchor.web3.PublicKey.findProgramAddressSync(
		[owner.toBuffer(), _stakePoolKey.toBuffer(), new anchor.BN(receiptNonce).toArrayLike(Buffer, "le", 4), Buffer.from("stakeDepositReceipt", "utf-8")],
		program.programId
	);

	return program.methods
		.deposit(receiptNonce, amount)
		.accounts({
			payer,
			owner,
			from,
			stakePool: stakePoolKey,
			vault: vaultKey,
			stakeMint,
			destination: stakeMintAccount,
			stakeDepositReceipt: stakeReceiptKey,
			tokenProgram: SPL_TOKEN_PROGRAM_ID,
			rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			systemProgram: anchor.web3.SystemProgram.programId,
		})
		.remainingAccounts([
			{
				pubkey: rewardVaultKey,
				isWritable: false,
				isSigner: false,
			},
		]);
};
/**
 * Generate the instruction to Deposit (aka Stake).
 * @param program
 * @param payer
 * @param owner
 * @param stakePoolKey
 * @param from
 * @param stakeMintAccount
 * @param amount
 * @param duration
 * @param receiptNonce
 * @param rewardVaults
 * @returns
 */
export const createStakeInstruction = async (
	program: anchor.Program<SplTokenStaking>,
	payer: anchor.web3.PublicKey,
	owner: anchor.web3.PublicKey,
	stakePoolkey: anchor.Address,
	from: anchor.Address,
	stakeMintAccount: anchor.Address,
	amount: anchor.BN,
	receiptNonce: number,
	rewardVaultKey: anchor.web3.PublicKey
) => {
	return createStakeBuilder(program, payer, owner, stakePoolkey, from, stakeMintAccount, amount, receiptNonce, rewardVaultKey).instruction();
};

/**
 * Stake with an existing StakePool.
 * @param program
 * @param payer
 * @param owner
 * @param stakePoolKey
 * @param from
 * @param stakeMintAccount
 * @param amount
 * @param duration
 * @param receiptNonce
 * @param rewardVaults
 * @param options
 */
export const deposit = async (
	program: anchor.Program<SplTokenStaking>,
	payer: anchor.web3.PublicKey,
	owner: anchor.web3.PublicKey,
	stakePoolKey: anchor.Address,
	from: anchor.Address,
	stakeMintAccount: anchor.Address,
	amount: anchor.BN,
	receiptNonce: number,
	rewardVaultKey: anchor.web3.PublicKey,
	options: {
		preInstructions?: anchor.web3.TransactionInstruction[];
		postInstructions?: anchor.web3.TransactionInstruction[];
	} = {
		preInstructions: [],
		postInstructions: [],
	}
) => {
	return createStakeBuilder(program, payer, owner, stakePoolKey, from, stakeMintAccount, amount, receiptNonce, rewardVaultKey)
		.preInstructions(options.preInstructions)
		.postInstructions(options.postInstructions)
		.rpc({ skipPreflight: true });
};
