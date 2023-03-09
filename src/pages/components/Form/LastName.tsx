import { Grid, TextField } from "@mui/material";
import { TextFieldWrapperProps } from "./TextFieldWrapperProps";


export function LastName({ textFieldWrapperProps }: TextFieldWrapperProps) {
    return <Grid item xs={12} sm={6}>
        <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            {...textFieldWrapperProps} />
    </Grid>;
}
