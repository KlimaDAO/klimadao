import { Loader } from "@googlemaps/js-api-loader";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ChipTypeMap, UseAutocompleteProps } from "@mui/material";
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { isNil, merge, omit } from "lodash";
import { useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (isNil(GOOGLE_MAPS_API_KEY)) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env var")
}

const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: "weekly",
});

type OnChangeProps = UseAutocompleteProps<Place, false, false, false>["onChange"]

export type Place = google.maps.places.AutocompletePrediction & Partial<Pick<google.maps.places.PlaceResult, "geometry">>

type Props = {
    //The label for the displayed Textfield
    label: string,
    //Request Options for the Autocomplete Service
    requestOpts?: Omit<google.maps.places.AutocompletionRequest, "input">
} & Omit<AutocompleteProps<Place, false, false, false, ChipTypeMap['defaultComponent']>, "options" | "renderInput">

function GooglePlacesSelect(props: Props) {
    const [input, setInput] = useState<string>();
    const [options, setOptions] = useState<Place[]>([]);
    const autocomplete = useRef<google.maps.places.AutocompleteService>();
    const places = useRef<google.maps.places.PlacesService>();

    /** Load the places api on mount */
    useEffect(() => {
        loader.importLibrary('places').then((lib: google.maps.PlacesLibrary) => {
            autocomplete.current = new lib.AutocompleteService()
            places.current = new lib.PlacesService(document.createElement('div'))
        });
    }, [])

    /** When the input changes populate the list of options */
    useEffect(() => {
        if (input)
            autocomplete.current?.getPlacePredictions(
                { ...props.requestOpts, input },
                (result) => setOptions(result ?? [])
            )
    }, [input])

    /** 
     * Fetch location data on selection of an option. 
     * This results in less requests to the API than for each suggested option
     */
    const onChange: OnChangeProps = (event, value: Place | null, ...rest) => {
        value && places.current?.getDetails(
            { placeId: value.place_id, fields: ["geometry"] },
            (result) => { props.onChange?.(event, merge(result, value), ...rest) }
        )
    }

    return <Autocomplete
        sx={{ width: 300 }}
        size="small"
        getOptionLabel={(option: google.maps.places.AutocompletePrediction) => option?.structured_formatting?.main_text}
        filterOptions={(x) => x}
        options={options}
        isOptionEqualToValue={(a, b) => a.id === b.id}
        // includeInputInList
        // filterSelectedOptions
        noOptionsText="No locations"
        onChange={onChange}
        onInputChange={(_, newInputValue) => {
            setInput(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label={props.label} fullWidth />}
        renderOption={(props, option) => {
            return (
                <li {...props} key={option.id + option.place_id}>
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
        {...omit(props, "onChange")}
    />
}

export default GooglePlacesSelect;