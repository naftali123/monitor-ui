
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { BasicControllerWrapperProps, TextFieldControllerWrapper } from "./TextFieldControllerWrapper";

export interface CommonFieldsProps extends BasicControllerWrapperProps {
    textFieldProps?: TextFieldProps;
}

export function FirstName(props: CommonFieldsProps) {
    return <TextFieldControllerWrapper {...props} name={"firstName"}/>;
}

export function LastName(props: CommonFieldsProps) {
    return <TextFieldControllerWrapper {...props} name={"lastName"}/>;
}

export function Email(props: CommonFieldsProps) {
    return <TextFieldControllerWrapper {...props} name={"email"}/>;
}

export function Password(props: CommonFieldsProps) {
    return <TextFieldControllerWrapper {...props} name={"password"}/>;
}
