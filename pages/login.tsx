import React, { FormEvent, useState } from 'react';
import {
    Typography,
    Container,
    Button,
    Avatar,
    TextField,
    Checkbox,
    Grid,
    Box,
    CssBaseline,
    FormControlLabel
} from '@mui/material';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setDefaultResultOrder } from 'dns';

//@mui/material

type CopyProps = {
    site?: string;
}

function Copyright(props: CopyProps) {
    return (
        <Typography>
            {'Copyright ©️'}
            <Link color="inherit" href={`https://www.${props.site}.com.br`}>
                {props.site}
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme();

export default function LoginPage() {
    const [password, setPassword] = useState<string | undefined | null | FormDataEntryValue>('');
    const [error, setError] = useState<string | boolean>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
//aqui a mágica acontece
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //para tudo!!!
    event.preventDefault();
    //FormData é do JS não do React
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    setPassword(data.get('password'));
    if(password && password.length < 6){
        setError(true);
        setErrorMessage("Senha deve ter no mínimo 6 caracteres");
    }
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
}

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth='xs'>
                <CssBaseline />
                <Box sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                    }}>
                    <Typography component="h1" variant="h5">
                        Tela de Login
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{mt:1}}>
                        <TextField focused margin='normal' required fullWidth id="email" name="email" label="Digite o seu login" autoComplete='email'/>
                        <TextField margin='normal' required fullWidth id="password" name="password" label="Digite sua senha" type="password" autoComplete='current-password'/>

                        <FormControlLabel 
                        control={<Checkbox value="remember" color="primary"/>} 
                        label="Lembrar-me"/> 
                        
                        <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:2}}>
                            Login
                        </Button>
                        {error && <Typography color="error">{errorMessage}</Typography>}

                    </Box>

                </Box>

                <Copyright site="avanade" />
            </Container>
        </ThemeProvider>
    )
}

//página é a junção de vários componentes