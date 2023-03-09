import { Grid, TextField } from "@mui/material";
import { TextFieldWrapperProps } from "./TextFieldWrapperProps";


export function FirstName({ textFieldWrapperProps }: TextFieldWrapperProps) {
    return <Grid item xs={12} sm={6}>
        <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            {...textFieldWrapperProps} />
    </Grid>;
}
