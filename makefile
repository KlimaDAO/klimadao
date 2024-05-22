.PHONY: local-fork

PURO_TOKEN_HOLDER = 0x89DCA1d490aa6e4e7404dC7a55408519858895FE

OTHER_HOLDER=0xE32bb999851587b53d170C0A130cCE7f542c754d

USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174

KRAKEN = 0x9c2bd617b77961ee2c5e3038dFb0c822cb75d82a

TEST_DIAMOND_OWNER = 0x5c32e964751be3643d2ab50acc5593834861401a

RA=0x8cE54d9625371fb2a068986d32C85De8E6e995f8

DIAMOND_OWNER = 0xDdfF75A29EB4BFEcF65380de9a75ad08C140eA49

ANVIL_PUBLIC_WALLET = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

local-fork:
	$(eval POLYGON_URL := $(shell grep '^POLYGON_URL' .env | cut -d '=' -f2))
	anvil --fork-url $(POLYGON_URL) --host 0.0.0.0 --no-storage-caching

impersonate:
	$(eval RPC_URL := $(shell grep '^RPC_URL' .env | cut -d '=' -f2))
	cast rpc anvil_impersonateAccount ${PURO_TOKEN_HOLDER} --rpc-url ${RPC_URL}

	cast rpc anvil_impersonateAccount ${OTHER_HOLDER} --rpc-url ${RPC_URL}
	
	# impersonate kraken
	cast rpc anvil_impersonateAccount ${KRAKEN} --rpc-url ${RPC_URL}

	cast rpc anvil_impersonateAccount ${ANVIL_PUBLIC_WALLET} --rpc-url ${RPC_URL}

	cast rpc anvil_impersonateAccount ${DIAMOND_OWNER} --rpc-url ${RPC_URL}

	cast rpc anvil_impersonateAccount ${TEST_DIAMOND_OWNER} --rpc-url ${RPC_URL}

transfer:
	$(eval RPC_URL := $(shell grep '^RPC_URL' .env | cut -d '=' -f2))
	cast send 0x6960cE1d21f63C4971324B5b611c4De29aCF980C --unlocked --from ${PURO_TOKEN_HOLDER} "transfer(address,uint256)(bool)" ${ANVIL_PUBLIC_WALLET} 3000000000000000000 --rpc-url ${RPC_URL}

	cast send 0x6960cE1d21f63C4971324B5b611c4De29aCF980C --unlocked --from ${OTHER_HOLDER} "transfer(address,uint256)(bool)" ${ANVIL_PUBLIC_WALLET} 2000000000000000000 --rpc-url ${RPC_URL}

usdc_transfer:
	cast send ${USDC} --unlocked --from ${KRAKEN} "transfer(address,uint256)(bool)" ${ANVIL_PUBLIC_WALLET} 500000000000

balances:
	cast call 0x6960cE1d21f63C4971324B5b611c4De29aCF980C "balanceOf(address)(uint256)" ${ANVIL_PUBLIC_WALLET}



	
