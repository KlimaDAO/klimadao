import { Col, TwoColLayout } from "components/TwoColLayout";
import { FC } from "react";
import { RetirementsList } from "./List";
import { RetireOverview } from "./Overview";

export const RetireActivity: FC = () => {
  return (
    <TwoColLayout>
      <Col>
        <RetirementsList />
      </Col>

      <Col>
        <RetireOverview />
      </Col>
    </TwoColLayout>
  );
};
