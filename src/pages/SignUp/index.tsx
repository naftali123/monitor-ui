import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm, Controller } from "react-hook-form";
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography/Typography";

import { FirstName } from "../components/Form/FirstName";
// import { LastName } from "../components/Form/LastName";
import { Email } from "../components/Form/Email";
import { Password } from "../components/Form/Password";
import { AllowExtraEmails } from "../components/Form/AllowExtraEmails";
import { Submit } from "../components/Form/Submit";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectStatus, signUp } from './state/userSlice';
// import { useNavigate } from 'react-router-dom';
import PublicLayoutTheme from "../components/Theme/Layout/Public";
import { SignUpRequest } from "./types/SignUpRequest";
import { TextFieldControllerWrapper } from "../components/Form/TextFieldControllerWrapper";


export type TitleH1Props = { text: string }

export function TitleH1({ text }: TitleH1Props ) {
    return <Typography component="h1" variant="h5">
        { text }
    </Typography>;
}

const schema = yup.object({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
}).required();

export default function SignUp() {
  const { 
    control,
    register, 
    handleSubmit, 
    // watch, 
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

  // console.log(watch('email'));
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
            <Controller 
              name={"firstName"}
              control={control}
              rules={{ required: true, minLength: 2 }}
              render={({ field }) =>
                <FirstName textFieldWrapperProps={{
                  ...field,
                  error: !!(errors.firstName)
                  // ...register("firstName", { required: true, minLength: 2 }),
                  // error: true,
                  // onChange: (e)=> setIsValidForm(e.target.value.length > 2),
                }}/>}
            />
            <Grid item xs={6} sm={6}>
              <TextFieldControllerWrapper name={"lastName"} control={control} errors={errors}/>
            </Grid>
            {/* <LastName textFieldWrapperProps={{
              ...register("lastName", { required: true, minLength: 2 }),
              // onChange: (e)=> setIsValidForm(e.target.value.length > 2)
            }}/> */}
            {/* <Grid item xs={12} sm={12}>
              {(errors.firstName || errors.lastName) && 
                <Alert variant="outlined" severity="error">
                  {errors.firstName!.message?.toString() ?? errors.lastName!.message?.toString() ?? 'Too short'}
                </Alert>
              }
            </Grid> */}
            

            <Email textFieldWrapperProps={{
              ...register("email", { required: true, minLength: 4 }),
            }}/>
            {errors.email && <span>{errors.email!.message?.toString() ?? 'Invalid email'}</span>}
            
            <Grid item xs={12} sm={12}>
              <Password control={control} rules={{ required: true, minLength: 6 }}/>
              {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}
            </Grid>
      

            <AllowExtraEmails />

          </Grid>

          <Submit 
            // buttonProps={{disabled:!isValid}} 
            text="Sign Up" 
          />

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