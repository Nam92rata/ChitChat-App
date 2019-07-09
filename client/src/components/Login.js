import React, {Component} from 'react';
import SignupPage from './SignupPage'
import { Typography, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Redirect} from "react-router-dom";
import HomePage from './HomePage';
class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state={
          signup: false,
          email:'',
          password:'',
          error: ''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    onChange=(evt)=>{
        this.setState({error:''})
        this.setState({
            [evt.target.name]:evt.target.value 
        })
    }

    handleSubmit= (evt)=>{
        evt.preventDefault();
        const email= this.state.email;
        const password= this.state.password;        
        this.validateUser(email,password);       
        
    }
    
    handleClickShowPassword = () =>{
        this.setState(state=>({showPassword : !state.showPassword}));
    }

    validateUser = (email,password) => {
        console.log(email,password)
        const user = {
            uid: email,
            password:password
          };
        if(email && password){
          axios.post(`http://localhost:4000/signIn`,  user )
            .then(res => {
              console.log(res);
              console.log(res.data);
              localStorage.setItem("username",res.data.token.username);
              localStorage.setItem("uid",res.data.token.uid);
              localStorage.setItem("name",res.data.token.name);
              console.log("Validating",localStorage.getItem('username'));
            //   this.props.changeLoginStateHandler();            
              this.setState({error:''})
              
            })
            .catch(error=>{
                this.setState({error:'Invalid credentials'})
                console.log(error)
            }                
            )
        }
        else{
            this.setState({error:'Fields cannot be empty'})
            console.log("Empty not allowed")
        }
    }
    
    handleSignup = () =>{
        this.setState({signup:true})
    }
    changeStateHandler =()=>{
        this.setState({error:''})
        this.setState({signup:false})
    }
    render() {  
        console.log("login page")
        if(localStorage.getItem('username')){
            return(
                <div>
                    <Redirect to = "/"/>
                </div>
            )
        }
        else if(!this.state.signup){        
            return( 
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div style={{marginTop: 50}} >
                        
                        <h2 className="font">
                        Let's ChitChat
                        </h2>
                        {this.state.error && <div style={{color:'red',textAlign:'center'}}>{this.state.error}</div>} 
                        <form onSubmit={(evt)=>this.handleSubmit(evt)} >
                        <TextField
                            id="input-with-icon-adornment" type="text"
                            variant="outlined"
                            name="email"
                            label="Email"
                            fullWidth
                            required
                            autoFocus
                            margin="normal"  
                            onBlur={e=>{this.onChange(e)}}                            
                        />
                        <TextField
                            id="filled-adornment-password" 
                            name="password"
                            label="Password"
                            fullWidth
                            required
                            margin="normal"
                            type={this.state.showPassword ? 'text':'password'}
                            variant="outlined"
                            onBlur={e=>{this.onChange(e)}}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment  position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                                >
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            LogIn
                        </Button>
                        <br/>
                        <br/>
                        <Grid container justify="flex-end">
                            <div >
                            <Grid item >
                            <Link href="#" variant="body2" onClick = {this.handleSignup}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid> 
                            </div>                          
                        </Grid>
                        </form>
                    </div>                    
                    </Container>                    
            )
        }        
        else{
            return(
                <SignupPage changeStateHandler={this.changeStateHandler}/>
            )
        }   
}
}


export default LoginPage