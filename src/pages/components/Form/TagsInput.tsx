import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { TextFieldControllerWrapperProps, TextFieldControllerWrapper } from './TextFieldControllerWrapper';
import { upFirstLetter } from "../utils";
import Grid from '@mui/material/Grid/Grid';
import { useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { InputErrorMessage } from './InputErrorMessage';

interface TagData {
    key: number;
    label: string;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function TagsArray({ name, control, rules, errors, required }: TextFieldControllerWrapperProps) {

    const {
        control: c, handleSubmit, reset,
        setError,
        formState: { isValid }
    } = useForm({
        defaultValues: { [name]: '' },
    });

    const [tagData, setTagData] = useState<readonly TagData[]>([]);
    
    const onSubmit = ((data: FieldValues) => {
        if (!isValid) return;
        const tag = {
            key: tagData.length + 1,
            label: upFirstLetter(data[name]),
        };
        // add values as distinct values
        if (!tagData.some((e) => e.label === tag.label)) {
            setTagData((tags) => [...tags, tag]);
            reset();
        }
        else {
            setError(name, { type: "manual", message: "Tag already exists" });
        }
    });

    const handleDelete = (tagToDelete: TagData) => () => {
        setTagData((tags) => tags.filter((tag: TagData) => tag.key !== tagToDelete.key));
    };

    return (
        <Grid container spacing={2} maxWidth={"sm"}>
            <Grid item xs={12} sm={4}>
                <TextFieldControllerWrapper
                    required={required ?? false}
                    name={name}
                    control={c}
                    key={name}
                    textFieldProps={{
                        InputProps:{
                            endAdornment: <InputAdornment position="end">
                                <IconButton 
                                    onClick={handleSubmit(onSubmit)}
                                    type="submit"
                                    edge="end"
                                    color="primary"
                                >
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    }}
                />
                <InputErrorMessage name={name} errors={errors} />
            </Grid>
            <Grid item xs={12} sm={8}>
                <Paper
                    sx={{
                        minHeight: 56,
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                    }}
                    component="ul"
                >
                    {tagData.map((data) => {
                        return (<Controller
                            key={data.key}
                            name={name}
                            control={control}
                            rules={rules}
                            render={({ field }) =><><ListItem 
                                {...field ?? {}}
                                id={name}
                            >
                                <Chip
                                    label={data.label}
                                    onDelete={handleDelete(data)}
                                />
                            </ListItem></>
                            }
                        />);
                    })}
                </Paper>
            </Grid>
        </Grid>
    );
}