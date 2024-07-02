type Mutable<T> = {
	-readonly [K in keyof T]: Mutable<T[K]>;
};

export const _SplTokenStakingIDL = {
	version: "1.1.2",
	name: "ssgt_token_staking",
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
						name: "totalStake",
						type: "u64",
					},
					{
						name: "totalReward",
						type: "u64",
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
						name: "lockupDuration",
						type: "u64",
					},
					{
						name: "profitRate",
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
					{
						name: "reserved0",
						type: {
							array: ["u8", 256],
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
	],
} as const;

export const SplTokenStakingIDL = _SplTokenStakingIDL as Mutable<typeof _SplTokenStakingIDL>;

export type SplTokenStaking = typeof SplTokenStakingIDL;
