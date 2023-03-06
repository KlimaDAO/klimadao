import { Trans } from "@lingui/macro";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Card } from "components/Card";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  isLoading: boolean;
  onLogin: () => void;
}

export const LoginCard: FC<Props> = (props) => {
  return (
    <Card>
      <div className={styles.login}>
        <Text t="h4" className={styles.title}>
          <LoginOutlinedIcon fontSize="large" />
          <Trans>Please Log In</Trans>
        </Text>
        <Text t="body1">
          <Trans id="user.login.description">
            This feature is available only to users who are logged in. You can
            log in or create an account via the button below.
          </Trans>
        </Text>
        {props.isLoading && <SpinnerWithLabel />}
        {!props.isLoading && (
          <ButtonPrimary
            label={<Trans>Login</Trans>}
            onClick={props.onLogin}
            className={styles.loginButton}
          />
        )}
      </div>
    </Card>
  );
};
