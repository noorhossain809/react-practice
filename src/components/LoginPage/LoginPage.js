
import React, { useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth"
import {
    getAuth,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    FacebookAuthProvider
} from "firebase/auth";
import firebaseConfig from '../firebase.config';
import { initializeApp } from 'firebase/app';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';




const app = initializeApp(firebaseConfig)


const LoginPage = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isLogedInUser: false,
        name: '',
        email: '',
        password: '',
        photoURL: ''
    })

    const handleBlur = (event) => {
        let isFieldValied = true;
        if (event.target.name === "email") {
            isFieldValied = /\S+@\S+\.\S+/.test(event.target.value);
            console.log(isFieldValied)
        }
        if (event.target.name === "password") {
            isFieldValied = event.target.value.length > 4 && /\d{1}/.test(event.target.value)
            console.log(isFieldValied)
        }
        if (isFieldValied) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            console.log('submitting')
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    updateUserProfile(user.name)
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo)

                });
        }
        if (!newUser && user.email && user.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    console.log('sign in user info', res.user)
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo)
                });

        }

        e.preventDefault();

    }

    const updateUserProfile = name => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: name,
        }).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        });
    }

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const provider = new GoogleAuthProvider();

    const handleSignIn = () => {
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then(res => {
                const { displayName, email, photoURL } = res.user
                const signInUser = {
                    isLogedInUser: true,
                    name: displayName,
                    email: email,
                    photoURL: photoURL
                }
                setUser(signInUser);
            })
        console.log('signed in clicked');
    }
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(res => {

                const signOutUser = {
                    isLogedInUser: false,
                    name: '',
                    email: '',
                    photoURL: '',
                    password: '',
                    error: '',
                    success: false
                }
                setUser(signOutUser)
            }).catch((error) => {
                // An error happened.
            });
    }

    const handleSignWithFacebook = () => {
        const fbProvider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, fbProvider)
            .then((result) => {
        
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                console.log('fb login',user)
                
            })
            .catch((error) => {
                
                const errorCode = error.code;
                const errorMessage = error.message;
                
                const email = error.email;
               
                const credential = FacebookAuthProvider.credentialFromError(error);
              console.log(errorCode,errorMessage,email,credential)
            });
    }
    return (
        <div className="m-5 ">
            <h2>This is login page</h2>

            <div>
                {
                    user.isLogedInUser && <div>
                        <p>Name: {user.displayName}</p>
                        <p>Email: {user.email}</p>
                        <img src={user.photoURL} alt="" />
                    </div>
                }
            </div>
            <div className="container col-md-4 py-3 " style={{ backgroundColor: '#ddd', borderRadius: '8px' }}>
                <Checkbox onChange={() => setNewUser(!newUser)} color="secondary" name="switchForm" label="Label" />
                <label htmlFor="switchForm"> Returning User</label>
                <Form onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="contained">
                        {newUser && <TextField
                            onBlur={handleBlur}
                            name="name"
                            helperText="Please enter your name"
                            id="demo-helper-text-aligned"
                            label="Name"
                            required

                        />}
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="contained">
                        <TextField
                            onBlur={handleBlur}
                            name="email"
                            helperText="Please enter your email"
                            id="demo-helper-text-aligned"
                            label="Email"
                            required

                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '41ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            onBlur={handleBlur}
                            name="password"
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <Button sx={{ m: 1, width: '48ch' }} variant="contained" color="primary" type="submit" >
                        {newUser ? 'Sign up' : 'Sign in'}
                    </Button>
                    {user.isLogedInUser ? <Button
                        sx={{ m: 1, width: '48ch' }}
                        onClick={handleSignOut}

                        variant="contained"
                        color="secondary"
                    >
                        Sign out
                    </Button> :
                        <Button
                            sx={{ m: 1, width: '48ch' }}
                            onClick={handleSignIn}

                            variant="contained"
                            color="secondary"
                        >
                            <GoogleIcon className="m-2" />SignIn with Google
                        </Button>
                    }
                    <Button
                        sx={{ m: 1, width: '48ch' }}
                        onClick={handleSignWithFacebook}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        <FacebookIcon className="m-2" />   Sign in with facebook
                    </Button>

                </Form>
                {
                    user.error && <p style={{ color: 'red' }}>This email is already used</p>
                }
                {
                    user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Login'} successfully</p>
                }

            </div>

        </div>
    );
};

export default LoginPage;