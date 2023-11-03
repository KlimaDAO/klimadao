'use client'

import { Autocomplete, Button, TextField } from "@mui/material";
import { range } from "lodash";
import { random } from "lodash/fp";
import { useEffect, useState } from "react";


const cities = [
    { id: 1, label: "New York" },
    { id: 2, label: "Los Angeles" },
    { id: 3, label: "Chicago" }
];


export default function Form() {
    const [estimate, setEstimate] = useState(0)
    const [distance, setDistance] = useState(0)
    const [assets, setAssets] = useState<any[]>([])
    const [asset, setAsset] = useState<any>()

    useEffect(() => {
        fetch("https://api.carbonmark.com/projects")
            .then(res => res.json())
            .then(projects => setAssets(range(3).map(random(projects.length)).map(n => projects[n])))
    }, [])

    return <div className="flex flex-col gap-2 relative top-1/3 justify-center items-center">
        <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={cities}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="From" />}
        />
        <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={cities}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="To" />}
        />

        <div className="grid p-3">
            <span className="text-center">Distance: {distance} km</span>
            <span className="text-center">Carbon Estimate: {estimate} tonnes</span>
            <span className="text-center">Offset Cost: ${estimate} USD</span>
        </div>
        <div className="grid grid-cols-3 gap-3" >

            {assets.map((thisAsset, index) => (
                <Button
                    sx={{
                        width: "150px",
                        height: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        background: asset === thisAsset ? "blue" : "transparent"
                    }}
                    variant="outlined"
                    onClick={() => setAsset(thisAsset)}
                    key={index}
                >
                    {thisAsset?.name}
                </Button>
            ))}
        </div>

        <Button size="large">Retire</Button>
    </div>
} 