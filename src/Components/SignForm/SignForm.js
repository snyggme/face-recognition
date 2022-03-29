import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//onRouteChange
class SignForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }
  
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('https://guarded-crag-64592.herokuapp.com/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        const user = await response.json();

        if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
        }
    };

    render() {
        const { onRouteChange } = this.props;
        return (
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 5, 
                        borderRadius: 2, 
                        boxShadow: 2
                    }}
                    bgcolor="white"
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1, }}   >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        sx={{ "& .MuiInputBase-root": {
                        height: 50,
                        } }}
                        onChange={this.onEmailChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{ "& .MuiInputBase-root": {
                        height: 50
                        } }}
                        onChange={this.onPasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, pt: 1.2, pb: 1.2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => onRouteChange('register')}>
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
            </Container>
        );
  }
  
}

export default SignForm;