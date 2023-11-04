import { Autocomplete, Button, TextField, ThemeProvider, createTheme } from "@mui/material";
import { CarbonmarkLogoFull } from "components/Logos/CarbonmarkLogoFull";
import { PageHead } from "components/PageHead";
import { SimpleProjectCard } from "components/SimpleProjectCard";
import { Project } from "lib/types/carbonmark.types";
import { NextPage } from "next";
import { useState } from "react";
import * as styles from './styles';

export type PageProps = {
    projects: Project[];
};


const cities = [
    { id: 1, label: "New York" },
    { id: 2, label: "Los Angeles" },
    { id: 3, label: "Chicago" }
];

const theme = createTheme({
    typography: {
        fontSize: 20, // replace with your desired font size
    },
});

export const RetirementDemo: NextPage<PageProps> = (props) => {
    const [estimate, setEstimate] = useState(0)
    const [distance, setDistance] = useState(0)
    const [selected, setSelected] = useState<Project>()
    return (
        <>
            <PageHead
                title={'Offset your travel'}
                mediaTitle={'Offset your travel'}
                metaDescription={'Enter your travel itinerary and offset the carbon you produced'}
            />
            <ThemeProvider theme={theme}>
                <div className={styles.layout}>
                    <div className={styles.logo}>
                        <CarbonmarkLogoFull />
                    </div>
                    <div className={styles.form}>
                        <div className={styles.fields}>
                            <Autocomplete
                                size="small"
                                id="from-city-select"
                                options={cities}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="From" />}
                            />
                            <Autocomplete
                                size="small"
                                id="to-city-select"
                                options={cities}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="To" />}
                            />
                        </div>
                        <div className={styles.stats}>
                            <div>Distance: {distance} km</div>
                            <div>Carbon Estimate: {estimate} tonnes</div>
                            <div>Offset Cost: ${estimate} USD</div>
                        </div>
                        <div className={styles.projectOptions}>
                            {props.projects.map((p) => (
                                <SimpleProjectCard
                                    key={p.key}
                                    project={p}
                                    className={p.key === selected?.key ? styles.selectedCard : ''}
                                    onClick={() => setSelected(p)}
                                />
                            ))}
                        </div>
                        <Button size="large">Retire</Button>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
};
