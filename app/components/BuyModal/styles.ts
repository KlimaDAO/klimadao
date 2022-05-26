import { css } from "@emotion/css";

export const bg = css`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: not-allowed;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const card = css`
  cursor: default;
  align-self: center;
  width: 54rem;
  min-height: 24rem;
  background-color: #f2f2f2;
  border-radius: 1rem;
  padding: 2rem 1.8rem 3rem;
  margin: 2.5rem;
`;

export const card_header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.2rem;
  
  p {
    font-size: 2rem;
    font-weight: 600;
    color: #313131;
  }
`;

export const card_connected = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  p {
    font-size: 1.6rem;
    color: #313131;
    margin-right: 1.2rem;
  }
`;

export const closeButton = css`
  composes: textButton;
  min-height: 0;
  padding: 0.6rem;
  border: none;
  color: #313131;
  background-color: #FAFAFA;
  border-radius: .4rem;
`;

export const copyAddress = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #E7E7E7;
  color: #313131;
  padding: 1rem 1.6rem 1rem 2rem;
  font-size: 1.6rem;
  border-radius: .4rem;
  flex-shrink: 0;
  
  span {
    margin-right: 1.2rem;
  }
`;

export const card_iframe_container = css`
  width: 42.4rem;
  margin-top: 2.4rem;
  margin-left: auto;
  margin-right: auto;
`;

export const buyCard_iframeStack = css`
  display: grid;
  gap: 1.6rem;
`;

export const buyCard_iframeContainer = css`
  display: flex;
  flex-direction: column;
  position: relative;
  .spinner_container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 0;
    padding: 2.4rem;
  }
`;

export const buyCard_iframe = css`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 1.2rem;
  border: none;
  width: 100%;
  height: 73rem;
  z-index: 2;
  overflow-y: auto;
`;

export const spinner_container = css`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   margin-top: 1.2rem;
`;
