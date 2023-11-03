'use client'

import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";

const assets = [
    { id: 1, name: "Asset 1" },
    { id: 2, name: "Asset 2" },
    { id: 3, name: "Asset 3" }
];

const cities = [
    { id: 1, label: "New York" },
    { id: 2, label: "Los Angeles" },
    { id: 3, label: "Chicago" }
];


export default function Form() {
    const [estimate, setEstimate] = useState(0)
    const [distance, setDistance] = useState(0)
    return <form className="grid gap-2 relative top-1/3">
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
        </div>
        <Button size="large">Retire</Button>
    </form>
}