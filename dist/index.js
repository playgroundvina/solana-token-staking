'use strict';

var anchor = require('@coral-xyz/anchor');
var splToken = require('@coral-xyz/spl-token');
var _chunk = require('lodash.chunk');
var bs58 = require('bs58');

function _interopNamespaceDefault(e) {
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return Object.freeze(n);
}

var anchor__namespace = /*#__PURE__*/_interopNamespaceDefault(anchor);

const STAKE_DEPOSIT_RECEIPT_DISCRIMINATOR = [210, 98, 254, 196, 151, 68, 235, 0];
const SPL_TOKEN_STAKING_ID = "Fx31Ua2enQpVqrjf3TbUCuSinHUr98xGwW36eAREUX1R";
const STAKE_POOL_OWNER = "AL145KtKMxnRDfcruv61Kt4WL7FKtVYuqPA3nM8adWk";
const BUSAI_TOKEN_ID = "35h3ZFJRNk4AKygynKB9bnEuS72gPY4gfH95LvbM3GkU";
const SSGT_TOKEN_ID = "5xFnVJeBJBevAorV5KtGDme71HwHJkrkDTLmW1sQFVX4";
const TOKEN_PROGRAM_ID = new anchor__namespace.web3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const RENT_PROGRAM_ID = anchor__namespace.web3.SYSVAR_RENT_PUBKEY;
const SYSTEM_PROGRAM_ID = anchor__namespace.web3.SystemProgram.programId;

const _SplTokenStakingIDL = {
    version: "1.1.2",
    name: "spl_token_staking",
    instructions: [
        {
            name: "initializeStakePool",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "mint",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "stakePool",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "stakeMint",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "vault",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "nonce",
                    type: "u8",
                },
                {
                    name: "lockupDuration",
                    type: "u64",
                },
                {
                    name: "profitRate",
                    type: "u64",
                },
                {
                    name: "minAmount",
                    type: "u64",
                },
                {
                    name: "maxAmount",
                    type: "u64",
                },
            ],
        },
        {
            name: "addRewardPool",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: true,
                    docs: ["Authority of the StakePool"],
                },
                {
                    name: "mint",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "stakePool",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "rewardVault",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "nonce",
                    type: "u8",
                },
            ],
        },
        {
            name: "withdrawRewardPool",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: true,
                    docs: ["Authority of the StakePool"],
                },
                {
                    name: "rewardVault",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "stakePool",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "destination",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "amount",
                    type: "u64",
                },
            ],
        },
        {
            name: "transferAuthority",
            accounts: [
                {
                    name: "authority",
                    isMut: true,
                    isSigner: true,
                    docs: ["Current authority of the StakePool"],
                },
                {
                    name: "newAuthority",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "stakePool",
                    isMut: true,
                    isSigner: false,
                    docs: ["StakePool that will have it's authority updated"],
                },
            ],
            args: [],
        },
        {
            name: "deposit",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "owner",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "from",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "vault",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "stakeMint",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "destination",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "stakePool",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "stakeDepositReceipt",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "stakeDepositCounter",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "nonce",
                    type: "u32",
                },
                {
                    name: "amount",
                    type: "u64",
                },
            ],
        },
        {
            name: "withdraw",
            accounts: [
                {
                    name: "claimBase",
                    accounts: [
                        {
                            name: "owner",
                            isMut: true,
                            isSigner: true,
                            docs: ["Owner of the StakeDepositReceipt"],
                        },
                        {
                            name: "stakePool",
                            isMut: true,
                            isSigner: false,
                        },
                        {
                            name: "stakeDepositReceipt",
                            isMut: true,
                            isSigner: false,
                            docs: ["StakeDepositReceipt of the owner that will be used to claim respective rewards"],
                        },
                        {
                            name: "tokenProgram",
                            isMut: false,
                            isSigner: false,
                        },
                    ],
                },
                {
                    name: "vault",
                    isMut: true,
                    isSigner: false,
                    docs: ["Vault of the StakePool token will be transferred from"],
                },
                {
                    name: "stakeMint",
                    isMut: true,
                    isSigner: false,
                    docs: ["stake_mint of StakePool that will be burned"],
                },
                {
                    name: "from",
                    isMut: true,
                    isSigner: false,
                    docs: ["Token Account holding weighted stake representation token to burn"],
                },
                {
                    name: "destination",
                    isMut: true,
                    isSigner: false,
                    docs: ["Token account to transfer the previously staked token to"],
                },
            ],
            args: [],
        },
        {
            name: "cancelStakeToken",
            accounts: [
                {
                    name: "claimBase",
                    accounts: [
                        {
                            name: "owner",
                            isMut: true,
                            isSigner: true,
                            docs: ["Owner of the StakeDepositReceipt"],
                        },
                        {
                            name: "stakePool",
                            isMut: true,
                            isSigner: false,
                        },
                        {
                            name: "stakeDepositReceipt",
                            isMut: true,
                            isSigner: false,
                            docs: ["StakeDepositReceipt of the owner that will be used to claim respective rewards"],
                        },
                        {
                            name: "tokenProgram",
                            isMut: false,
                            isSigner: false,
                        },
                    ],
                },
                {
                    name: "vault",
                    isMut: true,
                    isSigner: false,
                    docs: ["Vault of the StakePool token will be transferred from"],
                },
                {
                    name: "stakeMint",
                    isMut: true,
                    isSigner: false,
                    docs: ["stake_mint of StakePool that will be burned"],
                },
                {
                    name: "from",
                    isMut: true,
                    isSigner: false,
                    docs: ["Token Account holding weighted stake representation token to burn"],
                },
                {
                    name: "destination",
                    isMut: true,
                    isSigner: false,
                    docs: ["Token account to transfer the previously staked token to"],
                },
            ],
            args: [],
        },
        {
            name: "updateTokenMeta",
            accounts: [
                {
                    name: "authority",
                    isMut: false,
                    isSigner: true,
                },
                {
                    name: "metadataAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "stakePool",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "stakeMint",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "metadataProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "name",
                    type: "string",
                },
                {
                    name: "symbol",
                    type: "string",
                },
                {
                    name: "uri",
                    type: "string",
                },
            ],
        },
    ],
    accounts: [
        {
            name: "stakePool",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "creator",
                        type: "publicKey",
                    },
                    {
                        name: "authority",
                        type: "publicKey",
                    },
                    {
                        name: "vault",
                        type: "publicKey",
                    },
                    {
                        name: "rewardVault",
                        type: "publicKey",
                    },
                    {
                        name: "mint",
                        type: "publicKey",
                    },
                    {
                        name: "stakeMint",
                        type: "publicKey",
                    },
                    {
                        name: "totalStake",
                        type: "u128",
                    },
                    {
                        name: "totalReward",
                        type: "u128",
                    },
                    {
                        name: "lockupDuration",
                        type: "u64",
                    },
                    {
                        name: "profitRate",
                        type: "u64",
                    },
                    {
                        name: "minAmount",
                        type: "u64",
                    },
                    {
                        name: "maxAmount",
                        type: "u64",
                    },
                    {
                        name: "nonce",
                        type: "u8",
                    },
                    {
                        name: "bumpSeed",
                        type: "u8",
                    },
                    {
                        name: "padding0",
                        type: {
                            array: ["u8", 6],
                        },
                    },
                ],
            },
        },
        {
            name: "stakeDepositReceipt",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "owner",
                        type: "publicKey",
                    },
                    {
                        name: "payer",
                        type: "publicKey",
                    },
                    {
                        name: "stakePool",
                        type: "publicKey",
                    },
                    {
                        name: "lockupDuration",
                        type: "u64",
                    },
                    {
                        name: "depositTimestamp",
                        type: "i64",
                    },
                    {
                        name: "depositAmount",
                        type: "u64",
                    },
                    {
                        name: "profit",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "stakeDepositCounter",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "owner",
                        type: "publicKey",
                    },
                    {
                        name: "payer",
                        type: "publicKey",
                    },
                    {
                        name: "stakePool",
                        type: "publicKey",
                    },
                    {
                        name: "stakedAmount",
                        type: "u64",
                    },
                ],
            },
        },
    ],
    errors: [
        {
            code: 6000,
            name: "InvalidAuthority",
            msg: "Invalid StakePool authority",
        },
        {
            code: 6001,
            name: "InvalidStakePoolVault",
            msg: "StakePool vault is invalid",
        },
        {
            code: 6002,
            name: "InvalidRewardPoolVault",
            msg: "RewardPool vault is invalid",
        },
        {
            code: 6003,
            name: "InvalidOwner",
            msg: "Invalid StakeDepositReceiptOwner",
        },
        {
            code: 6004,
            name: "InvalidStakePool",
            msg: "Invalid StakePool",
        },
        {
            code: 6005,
            name: "InvalidStakeMint",
            msg: "Invalid stake mint",
        },
        {
            code: 6006,
            name: "StakeStillLocked",
            msg: "Stake is still locked",
        },
        {
            code: 6007,
            name: "AmountMustGreater",
            msg: "Amount must be greater than minimum",
        },
        {
            code: 6008,
            name: "AmountMustLess",
            msg: "Total stake amount must be less than maximum",
        },
    ],
};
const SplTokenStakingIDL = _SplTokenStakingIDL;

/**
 * Initialize the StakePool and set configuration parameters.
 * @param program
 * @param mint
 * @param nonce
 * @param lockupDuration
 * @param profitRate
 * @param minAmount
 * @param maxAmount
 * @param authority - defaults to `program.provider.publicKey`
 */
const initStakePool = async (program, mint, nonce = 0, lockupDuration = new anchor__namespace.BN(0), profitRate = new anchor__namespace.BN(5), minAmount = new anchor__namespace.BN(1_000_000_000), maxAmount = new anchor__namespace.BN(100_000_000_000_000), authority) => {
    const _authority = authority ? new anchor__namespace.web3.PublicKey(authority) : program.provider.publicKey;
    const [stakePoolKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([
        new anchor__namespace.BN(nonce).toArrayLike(Buffer, "le", 1),
        new anchor__namespace.web3.PublicKey(mint).toBuffer(),
        _authority.toBuffer(),
        Buffer.from("stakePool", "utf-8"),
    ], program.programId);
    const [stakeMintKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([stakePoolKey.toBuffer(), Buffer.from("stakeMint", "utf-8")], program.programId);
    const [vaultKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([stakePoolKey.toBuffer(), Buffer.from("vault", "utf-8")], program.programId);
    await program.methods
        .initializeStakePool(nonce, lockupDuration, profitRate, minAmount, maxAmount)
        .accounts({
        payer: program.provider.publicKey,
        authority: _authority,
        stakePool: stakePoolKey,
        stakeMint: stakeMintKey,
        mint,
        vault: vaultKey,
        tokenProgram: splToken.SPL_TOKEN_PROGRAM_ID,
        rent: anchor__namespace.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: anchor__namespace.web3.SystemProgram.programId,
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
const addRewardPool = async (program, mint, nonce = 0, authority) => {
    const _authority = authority ? new anchor__namespace.web3.PublicKey(authority) : program.provider.publicKey;
    const [stakePoolKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([
        new anchor__namespace.BN(nonce).toArrayLike(Buffer, "le", 1),
        new anchor__namespace.web3.PublicKey(mint).toBuffer(),
        _authority.toBuffer(),
        Buffer.from("stakePool", "utf-8"),
    ], program.programId);
    const [rewardVaultKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([stakePoolKey.toBuffer(), Buffer.from("rewardVault", "utf-8")], program.programId);
    await program.methods
        .addRewardPool(nonce)
        .accounts({
        payer: program.provider.publicKey,
        authority: _authority,
        stakePool: stakePoolKey,
        mint,
        rewardVault: rewardVaultKey,
        tokenProgram: splToken.SPL_TOKEN_PROGRAM_ID,
        rent: anchor__namespace.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: anchor__namespace.web3.SystemProgram.programId,
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
const withdrawRewardPool = async (program, mint, nonce = 0, destination, amount, authority) => {
    const _authority = authority ? new anchor__namespace.web3.PublicKey(authority) : program.provider.publicKey;
    const [stakePoolKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([
        new anchor__namespace.BN(nonce).toArrayLike(Buffer, "le", 1),
        new anchor__namespace.web3.PublicKey(mint).toBuffer(),
        _authority.toBuffer(),
        Buffer.from("stakePool", "utf-8"),
    ], program.programId);
    const [rewardVaultKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([stakePoolKey.toBuffer(), Buffer.from("rewardVault", "utf-8")], program.programId);
    await program.methods
        .withdrawRewardPool(amount)
        .accounts({
        payer: program.provider.publicKey,
        authority: _authority,
        stakePool: stakePoolKey,
        rewardVault: rewardVaultKey,
        tokenProgram: splToken.SPL_TOKEN_PROGRAM_ID,
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
const createStakeBuilder = (program, payer, owner, stakePoolKey, from, stakeMintAccount, amount, receiptNonce, rewardVaultKey) => {
    const _stakePoolKey = typeof stakePoolKey === "string" ? new anchor__namespace.web3.PublicKey(stakePoolKey) : stakePoolKey;
    const [vaultKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([_stakePoolKey.toBuffer(), Buffer.from("vault", "utf-8")], program.programId);
    const [stakeMint] = anchor__namespace.web3.PublicKey.findProgramAddressSync([_stakePoolKey.toBuffer(), Buffer.from("stakeMint", "utf-8")], program.programId);
    const [stakeReceiptKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([owner.toBuffer(), _stakePoolKey.toBuffer(), new anchor__namespace.BN(receiptNonce).toArrayLike(Buffer, "le", 4), Buffer.from("stakeDepositReceipt", "utf-8")], program.programId);
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
        tokenProgram: splToken.SPL_TOKEN_PROGRAM_ID,
        rent: anchor__namespace.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: anchor__namespace.web3.SystemProgram.programId,
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
const createStakeInstruction = async (program, payer, owner, stakePoolkey, from, stakeMintAccount, amount, receiptNonce, rewardVaultKey) => {
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
const deposit = async (program, payer, owner, stakePoolKey, from, stakeMintAccount, amount, receiptNonce, rewardVaultKey, options = {
    preInstructions: [],
    postInstructions: [],
}) => {
    return createStakeBuilder(program, payer, owner, stakePoolKey, from, stakeMintAccount, amount, receiptNonce, rewardVaultKey)
        .preInstructions(options.preInstructions)
        .postInstructions(options.postInstructions)
        .rpc({ skipPreflight: true });
};

/**
 * Request all of a wallet's StakeDepositReceipts.
 *
 * This can be an expensive request if the wallet has staked many times.
 * @param program
 * @param owner
 * @param stakePoolKey
 * @returns
 */
const batchRequestStakeReceipts = async (program, owner, stakePoolKey, pageSize = 50) => {
    const maxIndex = 4_294_967_295; // U32 MAX
    const maxPage = Math.ceil(maxIndex / pageSize);
    let decodedAccountBuffer = [];
    for (let page = 0; page <= maxPage; page++) {
        const startIndex = page * pageSize;
        const stakeReceiptKeys = [];
        // derive keys for batch
        for (let i = startIndex; i < startIndex + pageSize; i++) {
            const [stakeReceiptKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([owner.toBuffer(), stakePoolKey.toBuffer(), new anchor__namespace.BN(i).toArrayLike(Buffer, "le", 4), Buffer.from("stakeDepositReceipt", "utf-8")], program.programId);
            stakeReceiptKeys.push(stakeReceiptKey);
        }
        // fetch page of AccountInfo for stake receipts
        const accountInfos = await program.provider.connection.getMultipleAccountsInfo(stakeReceiptKeys);
        const validAccounts = accountInfos
            .map((a, index) => a
            ? {
                address: stakeReceiptKeys[index],
                ...a,
            }
            : null)
            .filter((a) => !!a);
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
const getNextUnusedStakeReceiptNonce = async (connection, programId, owner, stakePoolKey) => {
    const pageSize = 10;
    const maxIndex = 4_294_967_295;
    const maxPage = Math.ceil(maxIndex / pageSize);
    for (let page = 0; page <= maxPage; page++) {
        const startIndex = page * pageSize;
        const stakeReceiptKeys = [];
        // derive keys for batch
        for (let i = startIndex; i < startIndex + pageSize; i++) {
            const [stakeReceiptKey] = anchor__namespace.web3.PublicKey.findProgramAddressSync([owner.toBuffer(), stakePoolKey.toBuffer(), new anchor__namespace.BN(i).toArrayLike(Buffer, "le", 4), Buffer.from("stakeDepositReceipt", "utf-8")], programId);
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
const fetchChunkedListOfStakeReceiptKeysWithinTimeFrame = async (program, stakePool, startTime = 0, endTime = Number.MAX_SAFE_INTEGER, pageCount = 50) => {
    const startTimeBN = new anchor__namespace.BN(startTime);
    const endTimeBN = new anchor__namespace.BN(endTime);
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
            bytes: new anchor__namespace.web3.PublicKey(stakePool).toBase58(),
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
        const timeInSeconds = new anchor__namespace.BN(a.account.data, "le");
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
const fetchStakeReceiptsOfStakersWithinTimeFrame = async (program, stakePool, startTime = 0, endTime = Number.MAX_SAFE_INTEGER) => {
    // allow 50 per fetchMultiple
    const chunkedKeys = await fetchChunkedListOfStakeReceiptKeysWithinTimeFrame(program, stakePool, startTime, endTime);
    const chunkedStakeReceipts = await Promise.all(chunkedKeys.map((keys) => program.account.stakeDepositReceipt.fetchMultiple(keys)));
    return chunkedStakeReceipts;
};

exports.BUSAI_TOKEN_ID = BUSAI_TOKEN_ID;
exports.RENT_PROGRAM_ID = RENT_PROGRAM_ID;
exports.SPL_TOKEN_STAKING_ID = SPL_TOKEN_STAKING_ID;
exports.SSGT_TOKEN_ID = SSGT_TOKEN_ID;
exports.STAKE_DEPOSIT_RECEIPT_DISCRIMINATOR = STAKE_DEPOSIT_RECEIPT_DISCRIMINATOR;
exports.STAKE_POOL_OWNER = STAKE_POOL_OWNER;
exports.SYSTEM_PROGRAM_ID = SYSTEM_PROGRAM_ID;
exports.SplTokenStakingIDL = SplTokenStakingIDL;
exports.TOKEN_PROGRAM_ID = TOKEN_PROGRAM_ID;
exports._SplTokenStakingIDL = _SplTokenStakingIDL;
exports.addRewardPool = addRewardPool;
exports.batchRequestStakeReceipts = batchRequestStakeReceipts;
exports.createStakeBuilder = createStakeBuilder;
exports.createStakeInstruction = createStakeInstruction;
exports.deposit = deposit;
exports.fetchChunkedListOfStakeReceiptKeysWithinTimeFrame = fetchChunkedListOfStakeReceiptKeysWithinTimeFrame;
exports.fetchStakeReceiptsOfStakersWithinTimeFrame = fetchStakeReceiptsOfStakersWithinTimeFrame;
exports.getNextUnusedStakeReceiptNonce = getNextUnusedStakeReceiptNonce;
exports.initStakePool = initStakePool;
exports.withdrawRewardPool = withdrawRewardPool;
