import { t } from "@lingui/macro";
import { PureComponent } from 'react';
import { ChartContainer } from "./ChartContainer";

export class DigitalCarbonPricingChart extends PureComponent {

    render() {
        return (
            <ChartContainer title={t`Digital Carbon Pricing`}>
            </ChartContainer >
        );
    }
}
