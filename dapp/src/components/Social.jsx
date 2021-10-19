import React, { useState, useCallback, } from 'react';

import GitHubImg from '../assets/github.svg';
import MediumImg from '../assets/medium.svg';
import TwitterImg from '../assets/twitter.svg';
import DiscordImg from '../assets/discord.svg';




function Social() {
  // isBondPage and isDashboard arent DRY, this can be optimized
  const isBondPage = useCallback((match, location) => {
    if (!match) {
      return false;
    }

    return match.url.indexOf('bonds') >= 0 || match.url.indexOf('choose_bond') >= 0
  }, []);


  return (
    <div className="social-row">
      <a href="https://github.com/klimadao"
        ><img src={GitHubImg} alt="" className="social-icon-small" style={{ height: "25px", width: "25px", filter: "none", margin: '10px' }}
      /></a>
      <a href="https://klimadao.medium.com/"
        ><img src={MediumImg} alt="" className="social-icon-small" style={{ height: "25px", width: "25px", filter: "none", margin: '10px' }}
      /></a>
      <a href="https://twitter.com/KlimaDAO"
        ><img src={TwitterImg} alt="" className="social-icon-small" style={{ height: "25px", width: "25px", filter: "none", margin: '10px' }}
      /></a>
      <a href="https://discord.com/invite/rdZJxyUeMG"
        ><img src={DiscordImg} alt="" className="social-icon-small" style={{ height: "25px", width: "25px", filter: "none", margin: '10px' }}
      /></a>
    </div>
  );
}

export default Social;
