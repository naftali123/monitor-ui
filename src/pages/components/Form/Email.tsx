import { Grid, TextField } from "@mui/material";
import { TextFieldWrapperProps } from "./TextFieldWrapperProps";


export function Email({ textFieldWrapperProps }: TextFieldWrapperProps) {
    return <Grid item xs={12}>
        <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...textFieldWrapperProps} />
    </Grid>;
}
