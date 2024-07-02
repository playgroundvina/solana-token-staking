import * as anchor from "@coral-xyz/anchor";
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
export declare const batchRequestStakeReceipts: (program: anchor.Program<SplTokenStaking>, owner: anchor.web3.PublicKey, stakePoolKey: anchor.web3.PublicKey, pageSize?: number) => Promise<StakeDepositReceiptData[]>;
/**
 * Batch request AccountInfo for StakeDepositReceipts
 */
export declare const getNextUnusedStakeReceiptNonce: (connection: anchor.web3.Connection, programId: anchor.web3.PublicKey, owner: anchor.web3.PublicKey, stakePoolKey: anchor.web3.PublicKey) => Promise<number>;
export declare const fetchChunkedListOfStakeReceiptKeysWithinTimeFrame: (program: anchor.Program<SplTokenStaking>, stakePool: anchor.Address, startTime?: number | string, endTime?: number | string, pageCount?: number) => Promise<anchor.web3.PublicKey[][]>;
/**
 * Fetch an chunked array of StakeReceipts by StakePool and optionally
 * filtered by `deposit_timestamp` using an inclusive start and end time.
 * @param program
 * @param stakePool
 * @param startTime - (in seconds) inclusive startTime to filter `deposit_timestamp`
 * @param endTime - (in seconds) inclusive endTime to filter `deposit_timestamp`
 * @returns
 */
export declare const fetchStakeReceiptsOfStakersWithinTimeFrame: (program: anchor.Program<SplTokenStaking>, stakePool: anchor.Address, startTime?: number | string, endTime?: number | string) => Promise<{
    owner: anchor.web3.PublicKey;
    payer: anchor.web3.PublicKey;
    stakePool: anchor.web3.PublicKey;
    lockupDuration: BN;
    depositTimestamp: BN;
    depositAmount: BN;
    profit: BN;
}[][]>;
//# sourceMappingURL=utils.d.ts.map