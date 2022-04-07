import React, { FC } from "react";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { useMoralis } from "react-moralis";

import { Input } from "components/Input";
import { Textarea } from "components/Textarea";

import * as styles from "./styles";

// const InputField: FC = (props) => (
//   <>
//     <label>{props.label}</label>
//     <props.Component id={props.name} name={props.name} />
//     {props.errorMessage && errorMessage}
//   </>
// );

export const PledgeForm: FC = () => {
  const { setUserData, user } = useMoralis();

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <label htmlFor="name">
          <Text t="caption">Name</Text>
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Name or company name"
        />
      </div>

      <div className={styles.input}>
        <label htmlFor="pledge">
          <Text t="caption">Pledge</Text>
        </label>
        <Textarea
          id="pledge"
          name="pledge"
          type="text"
          rows={4}
          placeholder="What is your pledge?"
        />
      </div>

      <div className={styles.input}>
        <label htmlFor="methodology">
          <Text t="caption">Methodology</Text>
        </label>
        <Textarea
          id="methodology"
          name="methodology"
          type="text"
          height="auto"
          rows={6}
          placeholder="How will you meet your pledge?"
        />
      </div>

      <div className={styles.input}>
        <label htmlFor="footprint">
          <Text t="caption">Footprint (carbon tonnes)</Text>
        </label>
        <Input
          id="footprint"
          name="footprint"
          type="number"
          placeholder="Quantity in carbon tonnes"
        />
      </div>

      <ButtonPrimary label="Save pledge" onClick={() => console.log(user)} />
    </div>
  );
};
