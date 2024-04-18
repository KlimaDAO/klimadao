import { cx } from "@emotion/css";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Image, { StaticImageData } from "next/image";
import { FC, ReactNode } from "react";
import { Modal } from "../Modal";
import { Text } from "../Text";
import * as styles from "./styles";

interface Item {
  key: string;
  label: string;
  description?: ReactNode;
  icon: StaticImageData;
  disabled?: boolean;
}

interface Props {
  modalTitle: string;
  label: ReactNode;
  currentItem: string;
  items: Item[];
  warn?: boolean;
  isModalOpen: boolean;
  onItemSelect: (key: string) => void;
  onToggleModal: () => void;
}

export const DropdownWithModal: FC<Props> = (props) => {
  const currentItem =
    props.items.find(({ key }) => props.currentItem === key) ?? props.items[0];
  return (
    <div className={styles.container}>
      <label>{props.label}</label>
      <button
        className={cx(styles.listItem, {
          [styles.warn]: !!props.warn,
        })}
        onClick={props.onToggleModal}
      >
        <div className="start_content">
          <Image
            alt={currentItem.label}
            src={currentItem.icon}
            width={42}
            height={42}
          />
          <Text>{currentItem.label}</Text>
        </div>
        <div className="end_content">
          {currentItem.description && <Text>{currentItem.description}</Text>}
          <KeyboardArrowDown />
        </div>
      </button>

      {props.isModalOpen && (
        <DropdownModal
          title={props.modalTitle}
          currentItem={currentItem}
          items={props.items}
          onToggleModal={props.onToggleModal}
          onItemSelect={props.onItemSelect}
        />
      )}
    </div>
  );
};

interface DropdownModalProps {
  title: string;
  currentItem: Item;
  items: Item[];
  onItemSelect: (key: string) => void;
  onToggleModal: () => void;
}

const DropdownModal = (props: DropdownModalProps) => {
  return (
    <Modal title={props.title} onToggleModal={props.onToggleModal}>
      {props.items.map((item) => (
        <button
          onClick={() => {
            props.onItemSelect(item.key);
            props.onToggleModal();
          }}
          key={item.label}
          className={styles.select_button}
          data-active={item.label === props.currentItem.label && !item.disabled}
          disabled={item.disabled}
        >
          <div className="start_content">
            <Image alt={item.label} src={item.icon} width={48} height={48} />
            <Text>{item.label}</Text>
          </div>
          {item.description && <Text>{item.description}</Text>}
        </button>
      ))}
    </Modal>
  );
};
