import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { WarningOutlined, DownOutlined, UpOutlined, LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { shorten, trimWithPlaceholder, secondsUntilBlock, prettifySeconds, prettyVestingPeriod } from "../../helpers";
import {
  changeApproval,
  calcBondDetails,
  calculateUserBondDetails,
  bondAsset,
  redeemBond,
} from "../../actions/Bond.actions";
import { BONDS } from "../../constants";
import styles from "./Bond.module.css";
import t from "../../styles/typography.module.css";
import AdvancedSettings from "./AdvancedSettings";
import { useBond } from "../../hooks/useBond";
import { useDebounce } from "../../hooks/useDebounce";

function Bond({ provider, address, bond, isConnected }) {
  const bondInfo = useBond(bond);
  const [showAdvanced, setShowAdvanced] = useState();
  const dispatch = useDispatch();

  const NETWORK_ID = 137;

  const [slippage, setSlippage] = useState(2);
  const [recipientAddress, setRecipientAddress] = useState(address);

  const [view, setView] = useState("bond");
  const [quantity, setQuantity] = useState("");
  const debouncedQuantity = useDebounce(quantity, 500);

  const currentBlock = useSelector(state => {
    return state.app.currentBlock;
  });
  const bondMaturationBlock = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondMaturationBlock;
  });

  const vestingTerm = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].vestingTerm;
  });
  const marketPrice = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].marketPrice;
  });
  const bondPrice = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondPrice;
  });
  const bondDiscount = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondDiscount;
  });
  const maxBondPrice = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].maxBondPrice;
  });
  const interestDue = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].interestDue;
  });
  const pendingPayout = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].pendingPayout;
  });
  const debtRatio = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].debtRatio;
  });
  const bondQuote = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondQuote;
  });
  const balance = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].balance;
  });
  const allowance = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].allowance;
  });
  const isLoading = typeof allowance === 'undefined' || quantity !== debouncedQuantity;
  const onRecipientAddressChange = e => {
    return setRecipientAddress(e.target.value);
  };

  const onSlippageChange = e => {
    return setSlippage(e.target.value);
  };

  const vestingPeriod = () => {
    const vestingBlock = parseInt(currentBlock) + parseInt(vestingTerm);
    const seconds = secondsUntilBlock(currentBlock, vestingBlock);
    return prettifySeconds(seconds, "day");
  };

  const vestingTime = () => {
    return prettyVestingPeriod(currentBlock, bondMaturationBlock);
  };

  async function onRedeem({ autostake }) {
    await dispatch(redeemBond({ address, bond, networkID: NETWORK_ID, provider, autostake }));
  }

  async function onBond() {
    console.log("slippage = ", slippage);
    console.log("recipientAddress = ", recipientAddress);

    if (quantity === "") {
      alert("Please enter a value!");
    } else if (isNaN(quantity)) {
      alert("Please enter a valid value!");
    } else if (interestDue > 0 || pendingPayout > 0) {
      const shouldProceed = window.confirm(
        "You have an existing bond. Bonding will reset your vesting period and forfeit rewards. We recommend claiming rewards first or using a fresh wallet. Do you still want to proceed?",
      );
      if (shouldProceed) {
        await dispatch(
          bondAsset({
            value: quantity,
            slippage,
            bond,
            networkID: NETWORK_ID,
            provider,
            address: recipientAddress || address,
          }),
        );
      }
    } else {
      await dispatch(
        bondAsset({
          value: quantity,
          slippage,
          bond,
          networkID: NETWORK_ID,
          provider,
          address: recipientAddress || address,
        }),
      );
    }
  }

  const setMax = () => {
    if (view === "bond") {
      setQuantity(balance)
    } else {
      setQuantity(pendingPayout)
    }
  };

  const balanceUnits = () => {
    if (bond.indexOf("_lp") >= 0) return "SLP";
    if (bond === BONDS.dai) return "BCT";
  };


  useEffect(() => {
    async function loadBondDetails() {
      if (provider) await dispatch(calcBondDetails({ bond, value: debouncedQuantity, provider, networkID: NETWORK_ID }));
      if (provider && address) {
        await dispatch(calculateUserBondDetails({ address, bond, provider, networkID: NETWORK_ID }));
        setRecipientAddress(address);
      }
    }
    loadBondDetails();
  }, [provider, debouncedQuantity, address, bond, dispatch]);

  const onSeekApproval = async () => {
    await dispatch(changeApproval({ address, bond, provider, networkID: NETWORK_ID }));
  };

  const hasAllowance = useCallback(() => {
    return allowance && allowance.gt(0);
  }, [allowance]);

  const bondDiscountPercent = bondDiscount * 100;
  const isBondDiscountNegative = bondDiscountPercent < 0;

  return (
    <div className={styles.stakeCard}>
      <div className={styles.bondHeader}>
        <Link to="/bonds" className={classNames(t.button, styles.bondHeader_backButton)}>
          <LeftOutlined />
          BACK
        </Link>
        <h3 className={t.h5}>Bond {bondInfo.name}</h3>
        <p className={t.caption}>{bondInfo.description}</p>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.stakeSwitch}>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setView("bond");
            }}
            data-active={view === "bond"}
          >
            Bond
          </button>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setView("redeem");
            }}
            data-active={view === "redeem"}
          >
            Redeem
          </button>
        </div>
        <div className={styles.stakeInput}>
          <input
            className={styles.stakeInput_input}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            type="number"
            placeholder={`Amount to ${{ bond: "bond", redeem: "redeem" }[view]}`}
            min="0"
          />
          <button className={styles.stakeInput_button} type="button" onClick={setMax}>
            Max
          </button>
        </div>
        <button
          className={classNames(t.button, styles.showAdvancedButton)}
          type="button"
          onClick={() => setShowAdvanced(s => !s)}
        >
          {showAdvanced ? <UpOutlined /> : <DownOutlined />}
          {showAdvanced ? "HIDE ADVANCED" : "SHOW ADVANCED"}
        </button>
        {showAdvanced && (
          <AdvancedSettings
            slippage={slippage}
            recipientAddress={recipientAddress}
            onRecipientAddressChange={onRecipientAddressChange}
            onSlippageChange={onSlippageChange}
          />
        )}
      </div>

      {view === "bond" && (
        <div className={styles.data_container}>
          {address && (
            <p className={styles.data_container_address}>
              {address.slice(0, 5)}..{address.slice(address.length - 3)}
            </p>
          )}
          <div className="stake-price-data-row">
            <p className="price-label">Balance</p>
            <p className="price-data">
              <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
                <span>{trimWithPlaceholder(balance, 4)}</span> {balanceUnits()}
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Bond Price</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(bondPrice, 2)}</span> BCT
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Market Price</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(marketPrice, 2)}</span> BCT
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">You Will Get</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(bondQuote, 4)}</span> KLIMA
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">Max You Can Buy</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(maxBondPrice, 4)}</span> KLIMA
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">Debt Ratio</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(debtRatio / 10000000, 2)}</span>%
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">Vesting Term</p>
            <p className="price-data">
              <span>{vestingPeriod()}</span>
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">ROI (bond discount)</p>
            <p className="price-data">
              <span data-warning={isBondDiscountNegative}>{trimWithPlaceholder(bondDiscount * 100, 2)}</span>%
            </p>
          </div>
        </div>
      )}

      {view === "redeem" && (
        <div className={styles.data_container}>
          <div className="stake-price-data-row">
            <p className="price-label">Pending Rewards</p>
            <p id="bond-market-price-id" className="price-data">
              <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
                <span>{trimWithPlaceholder(interestDue, 4)}</span> KLIMA
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Claimable Rewards</p>
            <p id="bond-market-price-id" className="price-data">
              <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
                <span>{trimWithPlaceholder(pendingPayout, 4)}</span> KLIMA
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Time until fully vested</p>
            <p id="bond-market-price-id" className="price-data">
              <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
                {vestingTime()}
              </WithPlaceholder>
            </p>
          </div>
        </div>
      )}

      {view === "bond" && recipientAddress && recipientAddress !== address && (
        <p className={classNames(t.body2, styles.recipientNote)}>
          <WarningOutlined style={{ color: "yellow" }} /> External recipient: {shorten(recipientAddress)}
        </p>
      )}

      {isBondDiscountNegative && <p style={{ textAlign: "center" }}>⚠️ Warning: this bond price is inflated because the current discount rate is negative.</p>}

      {isConnected && isLoading && (
        <button type="button" style={{ opacity: 0.5 }} className={styles.submitButton}>
          Loading...
        </button>
      )}
      {!isLoading && view === "redeem" && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onRedeem({ autostake: false });
          }}
        >
          Claim
        </button>
      )}

      {false && !isLoading && view === "redeem" && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onRedeem({ autostake: false });
          }}
        >
          Claim and Autostake
        </button>
      )}

      {!isLoading && hasAllowance() && view === "bond" && (
        <button disabled={!quantity} type="button" className={styles.submitButton} onClick={onBond}>
          Bond
        </button>
      )}

      {!isLoading && isConnected && !hasAllowance() && view === "bond" && (
        <button
          disabled={!quantity}
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onSeekApproval();
          }}
        >
          Approve
        </button>
      )}
    </div>
  );
}

export default Bond;

const WithPlaceholder = props => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return props.children;
};
