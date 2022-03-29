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

class SignForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            isLoading: false
        }
    }

    onInputChange = (key) => (event) => {
        this.setState({ [key]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, name } = this.state;
        const { route } = this.props;

        this.setState({ isLoading: true });
        
        const response = await fetch(`https://guarded-crag-64592.herokuapp.com/${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                name
            })
        })
        const user = await response.json();
        
        if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
        }
    };

    render() {
        const { route, onRouteChange } = this.props;
        const title = route === 'register' ? 'Register' : 'Sign In';

        if (this.state.isLoading)
            return <div className='loading'></div>

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
                    {title}
                    </Typography>
                    <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1, }} >
                        {
                            route === 'register' 
                            ?                         
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                sx={{ "& .MuiInputBase-root": {
                                height: 50,
                                } }}
                                onChange={this.onInputChange('name')}
                            />
                            : ''
                        }
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
                            onChange={this.onInputChange('email')}
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
                            onChange={this.onInputChange('password')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, pt: 1.2, pb: 1.2}}
                        >
                            {title}
                        </Button>
                        {
                             route === 'register' 
                             ?                         
                             <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => onRouteChange('signin')}>
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>
                             : 
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
                        }
                    </Box>
                </Box>
            </Container>
        );
    }
}

export default SignForm;