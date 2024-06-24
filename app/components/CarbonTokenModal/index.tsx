import { t } from "@lingui/macro";
import { Modal } from "components/Modal";
import * as styles from "./styles";

export const CarbonTokenModal = () => {
  // const [showModal, setShowModal] = useState(false);

  return (
    <Modal title={t`Select Token`}>
      <div className={styles.container}>
        <div className={styles.item} />
        <div className={styles.item} />
        <div className={styles.item} />
        <div className={styles.item} />
        <div className={styles.item} />
      </div>
    </Modal>
  );
};
