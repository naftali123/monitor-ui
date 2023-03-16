import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm, Controller } from "react-hook-form";
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography/Typography";
import YupPassword from 'yup-password'

import { AllowExtraEmails } from "../components/Form/AllowExtraEmails";
import { Submit } from "../components/Form/Submit";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectStatus, signUp } from './state/userSlice';
// import { useNavigate } from 'react-router-dom';
import PublicLayoutTheme from "../components/Theme/Layout/Public";
import { SignUpRequest } from "./types/SignUpRequest";
import { FirstName, LastName, Email, Password } from "../components/Form/CommonFields";


export type TitleH1Props = { text: string }

export function TitleH1({ text }: TitleH1Props ) {
    return <Typography component="h1" variant="h5">
        { text }
    </Typography>;
}

YupPassword(yup) // extend yup

const schema = yup.object({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().password().required()
}).required();

export default function SignUp() {
  
  const { 
    control, 
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  // const navigate = useNavigate();

  const status: string = useAppSelector(selectStatus);

  // useEffect(()=>{
  //   if(status === 'connected') navigate('/');
  // },[status])

  const dispatch = useAppDispatch();
  
  const onSubmit = (data: FieldValues
    // event: React.FormEvent<HTMLFormElement>
  ) => {
    if(!isValid) return;
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    console.log(data);

    const user: SignUpRequest = {
      email: data.email,
      phone: '',
      fname: data.firstName,
      lname: data.lastName,
      password: data.password,
    };
    // console.log({...user});
    // setFormSubmited(true);
    dispatch(signUp(user));
  };

  return (
    <PublicLayoutTheme>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <TitleH1 text="Sign up" />
        { status }
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>

          <Grid container spacing={2}>
            
            <Grid item xs={6} sm={6}>
              <FirstName control={control} errors={errors} required />
            </Grid>
            
            <Grid item xs={6} sm={6}>
              <LastName control={control} errors={errors} required />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Email control={control} errors={errors} required />
            </Grid>
            
            
            <Grid item xs={12} sm={12}>
              <Password control={control} errors={errors} required/>
            </Grid>
      
            <AllowExtraEmails />

          </Grid>

          <Submit text="Sign Up"/>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PublicLayoutTheme>
  );
}