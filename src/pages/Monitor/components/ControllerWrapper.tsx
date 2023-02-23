import { TextField } from "@mui/material";
import { Control, Controller, FieldErrors, RegisterOptions } from "react-hook-form";

export const upFirstLetter = (text: string) => text.split("").map((e, i)=>i===0 ? e.toUpperCase() : e).join("");

type BasicControllerWrapperProps = {
    control?: Control<any>,
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>,
    errors?: FieldErrors
}

export interface ControllerWrapperProps extends BasicControllerWrapperProps {
    name: string,
}

export function ControllerWrapper({ name, control, rules, errors }: ControllerWrapperProps) {
    const errorFieldExists: boolean = Object.keys(errors ?? {}).includes(name);
    let errorMsg: string = errors && errorFieldExists
        ? errors[name]?.message as string : '';
    return <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <><TextField
            {...field}
            error={errorFieldExists ? !!(errors![name]) : false}
            required
            fullWidth
            name={name}
            label={upFirstLetter(name)}
            type={name}
            id={name}
            autoComplete={name} />
            {errorMsg !== '' && <span style={{ color: 'red' }}>{errorMsg}</span>}
        </>} />;
}
