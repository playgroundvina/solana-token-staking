import * as anchor from "@coral-xyz/anchor";
import { SPL_TOKEN_PROGRAM_ID } from "@coral-xyz/spl-token";

export const STAKE_DEPOSIT_RECEIPT_DISCRIMINATOR = [210, 98, 254, 196, 151, 68, 235, 0];

export const SPL_TOKEN_STAKING_ID = "AA9TGQNQuJks86HSJjXVWDAotvK8XKatRE9t2PXkLoGg";
export const STAKE_POOL_OWNER = "AL145KtKMxnRDfcruv61Kt4WL7FKtVYuqPA3nM8adWk";

export const TOKEN_PROGRAM_ID = SPL_TOKEN_PROGRAM_ID;
export const RENT_PROGRAM_ID = anchor.web3.SYSVAR_RENT_PUBKEY;
export const SYSTEM_PROGRAM_ID = anchor.web3.SystemProgram.programId;
