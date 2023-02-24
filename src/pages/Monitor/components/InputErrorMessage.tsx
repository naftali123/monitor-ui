import { FieldErrors } from "react-hook-form";



export function InputErrorMessage({ name, errors }: { name: string; errors?: FieldErrors; }) {
    const errorFieldExists: boolean = Object.keys(errors ?? {}).includes(name);
    let errorMsg: string = errors && errorFieldExists
        ? errors[name]?.message as string : '';
    return <>{errorMsg !== '' && <span style={{ color: 'red' }}>{errorMsg}</span>}</>;
}
