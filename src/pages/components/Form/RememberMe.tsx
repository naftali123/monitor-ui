import { FormControlLabel, Checkbox } from "@mui/material";


export function RememberMe() {
    return <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me" />;
}
