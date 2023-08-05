import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link} from 'react-router-dom';
import axios from 'axios'
import { BASE_URL } from './Assets/helper';



const theme = createTheme({
});

function SignUp() {

    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    // validate
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mobileNoError, setMobileNoError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);



    const handleBlur = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "firstName":
                setFirstNameError(value.trim() === "" || value.trim().length <= 2);
                break;
            case "lastName":
                setLastNameError(value.trim() === "");
                break;
            case "email":
                setEmailError(value.trim() === "" || !/\S+@\S+\.\S+/.test(value));
                break;
            case "mobile":
                setMobileNoError(value.trim() === "" || value.trim().length !== 10);
                break;
            case "password":
                setPasswordError(value.trim() === "");
                break;
            case "confirmPassword":
                setConfirmPasswordError(value.trim() !== password);
                break;

            default:
                break;
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmpassword) {
            setMessage("Password Do Not Match");
        } else {
            setMessage(null);

            try {
                // Make the axios POST request to your server
                const response = await axios.post(`${BASE_URL}/signup`, {
                    firstName,
                    lastName,
                    email,
                    mobileno,
                    password,
                });
                if (response.status() === 200) {

                    console.log("Registration successful:", response.data);
                }
                // Assuming your server returns some response data after successful registration
            } catch (error) {
                // Handle any error that occurred during the registration process
                console.error("Error occurred during registration:", error.message);
            }
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{ mb: 5 }} >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onBlur={handleBlur}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    error={firstNameError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={lastName}
                                    onBlur={handleBlur}
                                    onChange={(e) => setLastName(e.target.value)}
                                    error={lastNameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onBlur={handleBlur}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="mobile"
                                    label="Mobile Number"
                                    name="mobile"
                                    autoComplete="mobileno"
                                    value={mobileno}
                                    onBlur={handleBlur}
                                    onChange={(e) => setMobileno(e.target.value)}
                                    error={mobileNoError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onBlur={handleBlur}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={passwordError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmpassword}
                                    onBlur={handleBlur}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={confirmPasswordError}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    )
}

export default SignUp
