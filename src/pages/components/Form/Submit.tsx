import { Button } from "@mui/material";

type SubmitProps = {
    text: string;
    onClick?: Function;
    buttonProps?: any;
};

export function Submit({ text, onClick, buttonProps }: SubmitProps) {
    return <Button
        {...buttonProps}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => onClick ? onClick : null}
    >
        {text}
    </Button>;
}
