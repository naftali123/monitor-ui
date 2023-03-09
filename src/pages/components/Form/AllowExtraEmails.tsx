import { Grid, FormControlLabel, Checkbox } from "@mui/material";


export function AllowExtraEmails() {
    return <Grid item xs={12}>
        <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email." />
    </Grid>;
}
