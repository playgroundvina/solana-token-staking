import * as anchor from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID as SPL_PROGRAM } from "@solana/spl-token";

export const STAKE_DEPOSIT_RECEIPT_DISCRIMINATOR = [
  210, 98, 254, 196, 151, 68, 235, 0,
];

export const SPL_TOKEN_STAKING_ID =
  "STAKEGztX7S1MUHxcQHieZhELCntb9Ys9BgUbeEtMu1";

export const STAKE_POOL_OWNER = "AL145KtKMxnRDfcruv61Kt4WL7FKtVYuqPA3nM8adWk"

export const TOKEN_PROGRAM_ID = SPL_PROGRAM
export const RENT_PROGRAM_ID = anchor.web3.SYSVAR_RENT_PUBKEY
export const SYSTEM_PROGRAM_ID = anchor.web3.SystemProgram.programId