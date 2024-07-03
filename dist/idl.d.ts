type Mutable<T> = {
    -readonly [K in keyof T]: Mutable<T[K]>;
};
export declare const _SplTokenStakingIDL: {
    readonly version: "1.1.2";
    readonly name: "ssgt_token_staking";
    readonly instructions: readonly [{
        readonly name: "initializeStakePool";
        readonly accounts: readonly [{
            readonly name: "payer";
            readonly isMut: true;
            readonly isSigner: true;
        }, {
            readonly name: "authority";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "mint";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "stakePool";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "stakeMint";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "vault";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "tokenProgram";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "rent";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "systemProgram";
            readonly isMut: false;
            readonly isSigner: false;
        }];
        readonly args: readonly [{
            readonly name: "nonce";
            readonly type: "u8";
        }, {
            readonly name: "lockupDuration";
            readonly type: "u64";
        }, {
            readonly name: "profitRate";
            readonly type: "u64";
        }, {
            readonly name: "minAmount";
            readonly type: "u64";
        }, {
            readonly name: "maxAmount";
            readonly type: "u64";
        }];
    }, {
        readonly name: "addRewardPool";
        readonly accounts: readonly [{
            readonly name: "payer";
            readonly isMut: true;
            readonly isSigner: true;
        }, {
            readonly name: "authority";
            readonly isMut: false;
            readonly isSigner: true;
            readonly docs: readonly ["Authority of the StakePool"];
        }, {
            readonly name: "mint";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "stakePool";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "rewardVault";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "tokenProgram";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "rent";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "systemProgram";
            readonly isMut: false;
            readonly isSigner: false;
        }];
        readonly args: readonly [{
            readonly name: "nonce";
            readonly type: "u8";
        }];
    }, {
        readonly name: "withdrawRewardPool";
        readonly accounts: readonly [{
            readonly name: "payer";
            readonly isMut: true;
            readonly isSigner: true;
        }, {
            readonly name: "authority";
            readonly isMut: false;
            readonly isSigner: true;
            readonly docs: readonly ["Authority of the StakePool"];
        }, {
            readonly name: "rewardVault";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "stakePool";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "destination";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "tokenProgram";
            readonly isMut: false;
            readonly isSigner: false;
        }];
        readonly args: readonly [{
            readonly name: "amount";
            readonly type: "u64";
        }];
    }, {
        readonly name: "transferAuthority";
        readonly accounts: readonly [{
            readonly name: "authority";
            readonly isMut: true;
            readonly isSigner: true;
            readonly docs: readonly ["Current authority of the StakePool"];
        }, {
            readonly name: "newAuthority";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "stakePool";
            readonly isMut: true;
            readonly isSigner: false;
            readonly docs: readonly ["StakePool that will have it's authority updated"];
        }];
        readonly args: readonly [];
    }, {
        readonly name: "deposit";
        readonly accounts: readonly [{
            readonly name: "payer";
            readonly isMut: true;
            readonly isSigner: true;
        }, {
            readonly name: "owner";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "from";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "vault";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "stakeMint";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "destination";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "stakePool";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "stakeDepositReceipt";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "tokenProgram";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "rent";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "systemProgram";
            readonly isMut: false;
            readonly isSigner: false;
        }];
        readonly args: readonly [{
            readonly name: "nonce";
            readonly type: "u32";
        }, {
            readonly name: "amount";
            readonly type: "u64";
        }];
    }, {
        readonly name: "withdraw";
        readonly accounts: readonly [{
            readonly name: "claimBase";
            readonly accounts: readonly [{
                readonly name: "owner";
                readonly isMut: true;
                readonly isSigner: true;
                readonly docs: readonly ["Owner of the StakeDepositReceipt"];
            }, {
                readonly name: "stakePool";
                readonly isMut: true;
                readonly isSigner: false;
            }, {
                readonly name: "stakeDepositReceipt";
                readonly isMut: true;
                readonly isSigner: false;
                readonly docs: readonly ["StakeDepositReceipt of the owner that will be used to claim respective rewards"];
            }, {
                readonly name: "tokenProgram";
                readonly isMut: false;
                readonly isSigner: false;
            }];
        }, {
            readonly name: "vault";
            readonly isMut: true;
            readonly isSigner: false;
            readonly docs: readonly ["Vault of the StakePool token will be transferred from"];
        }, {
            readonly name: "stakeMint";
            readonly isMut: true;
            readonly isSigner: false;
            readonly docs: readonly ["stake_mint of StakePool that will be burned"];
        }, {
            readonly name: "from";
            readonly isMut: true;
            readonly isSigner: false;
            readonly docs: readonly ["Token Account holding weighted stake representation token to burn"];
        }, {
            readonly name: "destination";
            readonly isMut: true;
            readonly isSigner: false;
            readonly docs: readonly ["Token account to transfer the previously staked token to"];
        }];
        readonly args: readonly [];
    }, {
        readonly name: "cancelStakeToken";
        readonly accounts: readonly [{
            readonly name: "claimBase";
            readonly accounts: readonly [{
                readonly name: "owner";
                readonly isMut: true;
                readonly isSigner: true;
                readonly docs: readonly ["Owner of the StakeDepositReceipt"];
            }, {
                readonly name: "stakePool";
                readonly isMut: true;
                readonly isSigner: false;
            }, {
                readonly name: "stakeDepositReceipt";
                readonly isMut: true;
                readonly isSigner: false;
                readonly docs: readonly ["StakeDepositReceipt of the owner that will be used to claim respective rewards"];
            }, {
                readonly name: "tokenProgram";
                readonly isMut: false;
                readonly isSigner: false;
            }];
        }, {
            readonly name: "vault";
            readonly isMut: true;
            readonly isSigner: false;
            readonly docs: readonly ["Vault of the StakePool token will be transferred from"];
        }, {
            readonly name: "stakeMint";
            readonly isMut: true;
            readonly isSigner: false;
            readonly docs: readonly ["stake_mint of StakePool that will be burned"];
        }, {
            readonly name: "from";
            readonly isMut: true;
            readonly isSigner: false;
            readonly docs: readonly ["Token Account holding weighted stake representation token to burn"];
        }, {
            readonly name: "destination";
            readonly isMut: true;
            readonly isSigner: false;
            readonly docs: readonly ["Token account to transfer the previously staked token to"];
        }];
        readonly args: readonly [];
    }, {
        readonly name: "updateTokenMeta";
        readonly accounts: readonly [{
            readonly name: "authority";
            readonly isMut: false;
            readonly isSigner: true;
        }, {
            readonly name: "metadataAccount";
            readonly isMut: true;
            readonly isSigner: false;
        }, {
            readonly name: "stakePool";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "stakeMint";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "metadataProgram";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "rent";
            readonly isMut: false;
            readonly isSigner: false;
        }, {
            readonly name: "systemProgram";
            readonly isMut: false;
            readonly isSigner: false;
        }];
        readonly args: readonly [{
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly name: "symbol";
            readonly type: "string";
        }, {
            readonly name: "uri";
            readonly type: "string";
        }];
    }];
    readonly accounts: readonly [{
        readonly name: "stakePool";
        readonly type: {
            readonly kind: "struct";
            readonly fields: readonly [{
                readonly name: "creator";
                readonly type: "publicKey";
            }, {
                readonly name: "authority";
                readonly type: "publicKey";
            }, {
                readonly name: "vault";
                readonly type: "publicKey";
            }, {
                readonly name: "rewardVault";
                readonly type: "publicKey";
            }, {
                readonly name: "mint";
                readonly type: "publicKey";
            }, {
                readonly name: "stakeMint";
                readonly type: "publicKey";
            }, {
                readonly name: "totalStake";
                readonly type: "u128";
            }, {
                readonly name: "totalReward";
                readonly type: "u128";
            }, {
                readonly name: "lockupDuration";
                readonly type: "u64";
            }, {
                readonly name: "profitRate";
                readonly type: "u64";
            }, {
                readonly name: "minAmount";
                readonly type: "u64";
            }, {
                readonly name: "maxAmount";
                readonly type: "u64";
            }, {
                readonly name: "nonce";
                readonly type: "u8";
            }, {
                readonly name: "bumpSeed";
                readonly type: "u8";
            }, {
                readonly name: "padding0";
                readonly type: {
                    readonly array: readonly ["u8", 6];
                };
            }];
        };
    }, {
        readonly name: "stakeDepositReceipt";
        readonly type: {
            readonly kind: "struct";
            readonly fields: readonly [{
                readonly name: "owner";
                readonly type: "publicKey";
            }, {
                readonly name: "payer";
                readonly type: "publicKey";
            }, {
                readonly name: "stakePool";
                readonly type: "publicKey";
            }, {
                readonly name: "lockupDuration";
                readonly type: "u64";
            }, {
                readonly name: "depositTimestamp";
                readonly type: "i64";
            }, {
                readonly name: "depositAmount";
                readonly type: "u64";
            }, {
                readonly name: "profit";
                readonly type: "u64";
            }];
        };
    }];
    readonly errors: readonly [{
        readonly code: 6000;
        readonly name: "InvalidAuthority";
        readonly msg: "Invalid StakePool authority";
    }, {
        readonly code: 6001;
        readonly name: "InvalidStakePoolVault";
        readonly msg: "StakePool vault is invalid";
    }, {
        readonly code: 6002;
        readonly name: "InvalidRewardPoolVault";
        readonly msg: "RewardPool vault is invalid";
    }, {
        readonly code: 6003;
        readonly name: "InvalidOwner";
        readonly msg: "Invalid StakeDepositReceiptOwner";
    }, {
        readonly code: 6004;
        readonly name: "InvalidStakePool";
        readonly msg: "Invalid StakePool";
    }, {
        readonly code: 6005;
        readonly name: "InvalidStakeMint";
        readonly msg: "Invalid stake mint";
    }, {
        readonly code: 6006;
        readonly name: "StakeStillLocked";
        readonly msg: "Stake is still locked";
    }, {
        readonly code: 6007;
        readonly name: "AmountMustGreater";
        readonly msg: "Amount must be greater than minimum";
    }, {
        readonly code: 6008;
        readonly name: "AmountMustLess";
        readonly msg: "Amount must be less than maximum";
    }];
};
export declare const SplTokenStakingIDL: Mutable<typeof _SplTokenStakingIDL>;
export type SplTokenStaking = typeof SplTokenStakingIDL;
export {};
//# sourceMappingURL=idl.d.ts.map