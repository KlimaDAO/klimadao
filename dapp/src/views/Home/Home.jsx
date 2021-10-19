/* eslint-disable jsx-a11y/accessible-emoji */

import { Select } from "antd";
import React, { useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

import KlimaLogo from "src/assets/KlimaDAO/KlimaLogo_Transparent.png";

import Social from "../../components/Social";

const useLocalStyles = makeStyles(theme => ({
  containerSection: {
    transform: "translateY(30%)",
    padding: "30px",
  },
  fullSVG: {
    width: "100%",
    height: "100%",
  },
  smallSection: {
    backgroundColor: "#cfb081",
  },
  investorSVG: {
    height: "96px",
  },
  register: {
    textAlign: "center",
  },
}));

export default function Home() {
  const localClasses = useLocalStyles();

  return (
    <div>
      <div className="">
        <Container maxWidth="xl" className={localClasses.containerSection}>
          <Grid container spacing={1} direction="column" justify="space-evenly" alignItems="flex-start">
            <Grid item xs={4}>
              <h1 style={{ padding: "30px" }}>Klima</h1>
              <p className="">
                A new community that’s resolute on solving climate change by creating a black hole for carbon to
                accelerate price pressure past the event horizon of traditional markets while collateralizing a carbon
                backed currency.
              </p>
            </Grid>
            <Grid item xs={4} className={localClasses.register}>
              <div className="">
                <img
                  src={KlimaLogo}
                  alt=""
                  className="social-icon-small"
                  style={{ height: "100px", width: "100px", filter: "none" }}
                />
              </div>
              <h4 style={{ textAlign: "center" }}>Sign up for updates</h4>
            </Grid>
            <Grid item xs={4}>
              <p className="">
                Klima is an Algorithmic Climate Protocol. Klima DAO utilizes Protocol Owned Value to enable carbon
                (CO2e) price consistency and scarcity within an infinite carbon supply system.
              </p>
            </Grid>
            <Grid item xs={4}>
              <Social />
            </Grid>
          </Grid>
          {/* <Grid container spacing={1} direction="column" className={localClasses.containerSection}>
          <Grid item xs={12}>
            <h1 className="centered-text">What is Olympus?</h1>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} direction="row" justify="center">
              <Grid item xs={12} md={4} justify="center">
                <FeatureBox
                  ImgSrc="/assets/Backedbyassets-banner.png"
                  ImgAlt=""
                  BoxTitle="Backed by Assets"
                  BoxDesc="Every OHM is backed by DAI and OHM-DAI LP in the treasury. This intrinsic value cannot be diluted, providing a fundamental check on inflation."
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureBox
                  ImgSrc="/assets/Algo--banner.png"
                  ImgAlt=""
                  BoxTitle="Algorithmically Managed"
                  BoxDesc="Olympus has an adjustable policy state, allowing the DAO to adjust parameters and algorithmically
                  optimize for stability or growth."
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureBox
                  ImgSrc="/assets/community-banner.png"
                  ImgAlt=""
                  BoxTitle="Community Governed"
                  BoxDesc="Olympus is a DAO first project actively working toward complete distribution of the system to the
                  community."
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} direction="column" className={localClasses.containerSection}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justify="center"
                className={localClasses.smallSection}
              >
                <Grid item xs={12} md={6}>
                  <h2>What makes Olympus unique?</h2>
                  <p>
                    Olympus is a floating algorithmic currency. This means that it has mechanisms to promote stability
                    and predictability without directly pegging to any asset. However, we take it one step further with
                    the introduction of adjustable policy; the DAO can move certain variables up and down to target
                    growth and profitability or stability and predictability.
                  </p>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img src="/assets/olympus1.svg" alt="Olympus" className={localClasses.fullSVG} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} direction="row" className={localClasses.containerSection}>
            <Grid item xs={12}>
              <h1 className="centered-text">How it Works</h1>
            </Grid>
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={4}>
              <h3>Reserves</h3>
              <p>
                OHM is always backed by one DAI or one OHM backed by one DAI. This creates a demand-based constraint on
                issuance of supply.
              </p>
            </Grid>
            <Grid item xs={12} md={4}>
              <h3>Market Operations</h3>
              <p>
                New OHM is created via direct sales into the market. These sales increase linearly with the market
                premium and produce profits for stakers.
              </p>
            </Grid>
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={4}>
              <h3>Governance</h3>
              <p>
                The DAO controls policy tools that allow us to loosen, increasing profitability and volatility, or
                tighten, increasing stability and predictability.
              </p>
            </Grid>
            <Grid item xs={12} md={4}>
              <h3>Bonding</h3>
              <p>
                New OHM is created via deferred sales for LP. Bonders lock their LP for a vesting term and receive a
                discount on OHM when the trade ultimately occurs.
              </p>
            </Grid>
            <Grid item xs={12} md={2} />
          </Grid>
          <Grid container spacing={1} direction="column" className={localClasses.containerSection}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justify="center"
                className={localClasses.smallSection}
              >
                <Grid item xs={12} md={6}>
                  <h2>A world of opportunity</h2>
                  <p>
                    The Olympus reserve system enables new implementations of a multitude of DeFi primitives. Interest
                    and liquidation-free leverage and borrowing, counterparty-free options and derivatives, trustless
                    undercollateralized lending and more are possible. The future is bright.
                  </p>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img src="/assets/olympus2.svg" alt="Olympus" className={localClasses.fullSVG} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="column" className={localClasses.containerSection}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center"
              justify="center"
              style={{ textAlign: "center" }}
            >
              <Grid item xs={12} md={4}>
                <img src="/assets/investors/defialliance.svg" className={localClasses.investorSVG} />
              </Grid>
              <Grid item xs={12} md={4}>
                <img src="/assets/investors/maven11.svg" className={localClasses.investorSVG} />
              </Grid>
              <Grid item xs={12} md={4}>
                <img src="/assets/investors/zeeprime.svg" className={localClasses.investorSVG} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "25px", paddingBottom: "25px" }}>
            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center"
              justify="center"
              style={{ textAlign: "center" }}
            >
              <Grid item xs={12} md={2} />
              <Grid item xs={12} md={4}>
                <img src="/assets/investors/nascent.svg" className={localClasses.investorSVG} />
              </Grid>
              <Grid item xs={12} md={4}>
                <img src="/assets/investors/d64.svg" className={localClasses.investorSVG} />
              </Grid>
              <Grid item xs={12} md={2} />
            </Grid>
          </Grid>
        </Grid>
        <Footer /> */}
        </Container>
      </div>
    </div>
  );
}
