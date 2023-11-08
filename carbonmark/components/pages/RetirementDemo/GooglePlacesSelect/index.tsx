import { Loader } from "@googlemaps/js-api-loader";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ChipTypeMap } from "@mui/material";
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { isNil } from "lodash";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (isNil(GOOGLE_MAPS_API_KEY)) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env var")
}

const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: "weekly",
});

type Props = { label: string } & Omit<AutocompleteProps<google.maps.places.AutocompletePrediction, false, false, false, ChipTypeMap['defaultComponent']>, "options" | "renderInput">

function GooglePlacesSelect(props: Props) {

    const [value, setValue] = useState<google.maps.places.AutocompletePrediction>();
    const [inputValue, setInputValue] = useState<string>();
    const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const autocomplete = useRef<google.maps.places.AutocompleteService>();

    //Load the places api on mount
    useEffect(() => {
        loader.importLibrary('places').then(async (lib: google.maps.PlacesLibrary) => {
            autocomplete.current = new lib.AutocompleteService()
        });
    }, [])

    useEffect(() => {
        autocomplete.current?.getPlacePredictions({ input: inputValue ?? "" }, (predictions) => setOptions(predictions ?? []))
    }, [inputValue])

    // const [options, setOptions] = useState([]);

    return <Autocomplete

        sx={{ width: 300 }}
        size="small"
        getOptionLabel={(option: google.maps.places.AutocompletePrediction) => option.structured_formatting.main_text}
        filterOptions={(x) => x}
        autoComplete
        options={options}
        // includeInputInList
        // filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        onChange={(event: SyntheticEvent<Element, Event>, newValue: google.maps.places.AutocompletePrediction | null, ...rest) => {
            newValue && setValue(newValue);
            props.onChange?.(event, newValue, ...rest)
        }}
        onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
        }}
        renderInput={(params) => (
            <TextField {...params} label={props.label} fullWidth />
        )}
        renderOption={(props, option) => {
            return (
                <li {...props}>
                    <Grid container alignItems="center">
                        <Grid item sx={{ display: 'flex', width: 44 }}>
                            <LocationOnIcon sx={{ color: 'text.secondary' }} />
                        </Grid>
                        <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                            <Box component="span">
                                {option.structured_formatting.main_text}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                </li>
            );
        }}
        {...props}
    />
}

export default GooglePlacesSelect;