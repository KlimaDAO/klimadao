import { FC } from "react";
import Image from "next/image";
import { Trans } from "@lingui/macro";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Item {
  name: string;
  icon: StaticImageData;
  balance?: string;
  disabled?: boolean;
}

interface Props {
  modalTitle: string;
  label: string;
  currentItem: Item;
  items: Item[];
  isModalOpen: boolean;
  onItemSelect: (itemName: string) => void;
  onToggleModal: () => void;
}

export const DropdownWithModal: FC<Props> = (props) => {
  const { currentItem } = props;
  return (
    <div className={styles.container}>
      <Text t="caption" color="lightest" className="label">
        {props.label}
      </Text>
      <button onClick={props.onToggleModal}>
        <div className="start_content">
          <Image
            alt={currentItem.name}
            src={currentItem.icon}
            width={48}
            height={48}
          />
          <Text t="body2">{currentItem.name}</Text>
        </div>
        <div className="end_content">
          {currentItem.balance && (
            <Text t="caption" color="lightest">
              <Trans id="shared.balance">Balance:</Trans>{" "}
              {props.currentItem.balance} {props.currentItem.name}
            </Text>
          )}
          <KeyboardArrowDown />
        </div>
      </button>
      {props.isModalOpen && (
        <Modal
          title={props.modalTitle}
          currentItem={props.currentItem}
          items={props.items}
          onToggleModal={props.onToggleModal}
          onItemSelect={props.onItemSelect}
        />
      )}
    </div>
  );
};

interface ModalProps {
  title: string;
  currentItem: Item;
  items: Item[];
  onItemSelect: (itemName: string) => void;
  onToggleModal: () => void;
}

const Modal = (props: ModalProps) => {
  return (
    <div className={styles.modalBackground} onClick={props.onToggleModal}>
      <div className="modal_container">
        <div className="title">
          <Text>{props.title}</Text>
          <button>x</button>
        </div>
        {props.items.map((item) => (
          <button
            onClick={() => props.onItemSelect(item.name)}
            key={item.name}
            className="select_button"
            data-active={item.name === props.currentItem.name}
            disabled={item.disabled}
          >
            <div className="start_content">
              <Image alt={item.name} src={item.icon} width={48} height={48} />
              <Text t="body2">{item.name}</Text>
            </div>
            {item.disabled && (
              <Text t="caption" color="lightest">
                <Trans id="shared.coming_soon">Coming soon</Trans>
              </Text>
            )}
            {item.balance && !item.disabled && (
              <Text t="caption" color="lightest">
                {item.balance} {item.name}
              </Text>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
