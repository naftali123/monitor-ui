import { BasicControllerWrapperProps, TextFieldControllerWrapper } from "./TextFieldControllerWrapper";


export function Password({ control, rules }: BasicControllerWrapperProps) {
    return <TextFieldControllerWrapper name={"password"} control={control} rules={rules} />;
}
