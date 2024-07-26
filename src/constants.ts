import * as anchor from "@coral-xyz/anchor";

export const STAKE_DEPOSIT_RECEIPT_DISCRIMINATOR = [210, 98, 254, 196, 151, 68, 235, 0];

// DEVNET CONSTANTS
export const SPL_TOKEN_STAKING_ID = "F7ansLaZ1fcLLzXjSEyCtGPqVN4zhtGtfUEaHwAk7Ts6";
export const STAKE_POOL_OWNER = "AL145KtKMxnRDfcruv61Kt4WL7FKtVYuqPA3nM8adWk";
export const BUSAI_TOKEN_ID = "35h3ZFJRNk4AKygynKB9bnEuS72gPY4gfH95LvbM3GkU";
export const SSGT_TOKEN_ID = "5xFnVJeBJBevAorV5KtGDme71HwHJkrkDTLmW1sQFVX4";

// MAINNET CONSTANTS
export const SPL_TOKEN_STAKING_ID_MAINNET = "";
export const STAKE_POOL_OWNER_MAINNET = "";
export const BUSAI_TOKEN_ID_MAINNET = "";
export const SSGT_TOKEN_ID_MAINNET = "";

export const TOKEN_PROGRAM_ID = new anchor.web3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
export const RENT_PROGRAM_ID = anchor.web3.SYSVAR_RENT_PUBKEY;
export const SYSTEM_PROGRAM_ID = anchor.web3.SystemProgram.programId;
