import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldErrors, RegisterOptions } from "react-hook-form";
import { InputErrorMessage } from "./InputErrorMessage";
import { upFirstLetter } from "./utils";

export type BasicControllerWrapperProps = {
    control?: Control<any>,
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>,
    errors?: FieldErrors,
    required?: boolean
}

export interface TextFieldControllerWrapperProps extends BasicControllerWrapperProps {
    name: string,
    textFieldProps?: TextFieldProps
}

export function TextFieldControllerWrapper({ name, control, rules, errors, textFieldProps, required }: TextFieldControllerWrapperProps) {
    const errorFieldExists: boolean = Object.keys(errors ?? {}).includes(name);
    return <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <><TextField
            {...textFieldProps ?? {}}
            {...field ?? {}}
            error={errorFieldExists ? !!(errors![name]) : false}
            required={required ?? false}
            fullWidth
            name={name}
            label={upFirstLetter(name)}
            type={name}
            id={name}
            autoComplete={name} />
            <InputErrorMessage name={name} errors={errors} />
        </>} />;
}