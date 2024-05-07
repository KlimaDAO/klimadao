.PHONY: local-fork

PURO_TOKEN_HOLDER = 0x89DCA1d490aa6e4e7404dC7a55408519858895FE

USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174

KRAKEN = 0x9c2bd617b77961ee2c5e3038dFb0c822cb75d82a

local-fork:
	$(eval POLYGON_URL := $(shell grep '^POLYGON_URL' .env | cut -d '=' -f2))
	anvil --fork-url $(POLYGON_URL) --host 0.0.0.0

impersonate:
	cast rpc anvil_impersonateAccount ${PURO_TOKEN_HOLDER}
	# impersonate kraken
	cast rpc anvil_impersonateAccount ${KRAKEN}


transfer:
	$(eval RECIPIENT_ADDRESS := $(shell grep '^RECIPIENT_ADDRESS' .env | cut -d '=' -f2))
	cast send 0x6960cE1d21f63C4971324B5b611c4De29aCF980C --unlocked --from ${PURO_TOKEN_HOLDER} "transfer(address,uint256)(bool)" ${RECIPIENT_ADDRESS} 3000000000000000000

transfer_USDC:
	$(eval RECIPIENT_ADDRESS := $(shell grep '^RECIPIENT_ADDRESS' .env | cut -d '=' -f2))
	cast send ${USDC} --unlocked --from ${KRAKEN} "transfer(address,uint256)(bool)" ${RECIPIENT_ADDRESS} 500000000000
