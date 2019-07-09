import React from 'react';
import {  Typography, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

class SignupPage extends React.Component { 
   
    constructor(props){
        super(props)
        this.state={          
          newUser:{
            username:'',
            name:'',
            email:'',
            password:''
        },
        usernameAvailable:true,
        validEmail:false,
        error:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    onChange=(evt)=>{
        console.log(evt.target.name,evt.target.value)
        let value = evt.target.value;
        let name = evt.target.name; 
        this.setState({error:''})
        this.setState( prevState => {
            return { 
               newUser : {
                        ...prevState.newUser, [name]: value
                       }
            }
         }, () => console.log(this.state.newUser)
         )               
    }
    onChangeEmail=(evt)=>{
      console.log(evt.target.name,evt.target.value)
        let value = evt.target.value;
        let name = evt.target.name; 
        var re = /^\w+@\w+\.\w+$/;
        if(re.test(evt.target.value)){
          this.setState({error:'',
                      validEmail:true})
          this.setState( prevState => {
              return { 
                 newUser : {
                          ...prevState.newUser, [name]: value
                         }
              }
           }, () => console.log(this.state.newUser)
           )
        }
        else{
          this.setState({error:'Invalid email address'})
        }
            
    }
    onChangeUsername=(evt)=>{
        console.log(evt.target.name,evt.target.value)
        let value = evt.target.value;
        let name = evt.target.name; 
        this.setState({error:''})
        this.setState( prevState => {
            return { 
               newUser : {
                        ...prevState.newUser, [name]: value
                       }
            }
         }, () => console.log(this.state.newUser)
         )
         
        // axios.get(`http://localhost:4000/users`)
        // .then(res => {
        // // console.log(res);
        // console.log(res.data.usersList.users); 
        // var ans= res.data.usersList.users.some(function (el) { 
        //     if(el.username === value){
        //         return true
        //     }
        //   })

        // if(ans){
        //     this.setState({usernameAvailable:false})
        //     console.log("User name already taken")
        // }
        // else{
        //     this.setState({usernameAvailable:true})
        //     console.log("Available")
        // } 
        // })
        // .catch(error=>{
        //     console.log(error)                       
        // }) 
    }

    handleSubmit= (evt)=>{
        evt.preventDefault();
        const username= this.state.newUser.username;
        const name=this.state.newUser.name;
        const email=this.state.newUser.email;
        const password= this.state.newUser.password;
        
        const user = {
            username: username,
            name:name,
            uid:email,
            password:password,
          };
        console.log(username,name,email,password,this.state.usernameAvailable,this.state.validEmail)
        if(username && name && email && password ){
          if(this.state.usernameAvailable){
            axios.post(`http://localhost:4000/signUp`,  user )
            .then(res => {
            console.log(res);
            console.log(res.data);            
            this.props.changeStateHandler();
            this.setState({error:''})            
            })
            .catch(error=>{
                this.setState({error:'Invalid entries'})
                console.log(error)
            })
          }
          else{
            this.setState({error:'Username already taken'})             
          }
        }
        else{
            this.setState({error:'Fields cannot be empty'})
            console.log("Fields cannot be empty")
        }
       
    }
    handleLogin = () =>{
        this.props.changeStateHandler();
    }
    handleClickShowPassword = () =>{
        this.setState(state=>({showPassword : !state.showPassword}));
    }
    changeStateHandler =()=>{
        this.setState({signup:false})
    }

    render() {
        return (  
            <Container component="main" maxWidth="xs">
            <CssBaseline />
              <div style={{marginTop: 50}}>
              
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              {this.state.error && <div style={{color:'red',textAlign:'center'}}>{this.state.error}</div>}
              <form onSubmit={(evt)=>this.handleSubmit(evt)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                        id="input" type="text"
                        variant="outlined"
                        name="username"
                        label="Username"
                        fullWidth
                        required
                        autoFocus
                        margin="normal"                         
                        onChange={e=>{this.onChangeUsername(e)}}  
                        InputProps={{
                            endAdornment:(
                                <InputAdornment  position="end">
                                    <IconButton
                                        aria-label="Valid name"
                                            >
                                        {this.state.newUser.username?
                                          this.state.usernameAvailable ? 
                                            <i className="material-icons" style={{fontSize:'30px', marginTop:'auto',color: 'green'}}>
                                                check
                                            </i> : 
                                            <i className="material-icons" style={{fontSize:'30px', marginTop:'auto',color: 'red'}}>
                                                close
                                            </i>:<i></i>}
                                    </IconButton>
                                </InputAdornment>
                            )
                          }}                      
                    />
                  </Grid>                 
                  
                  <Grid item xs={12} sm={12}>
                    <TextField
                        id="input" type="text"
                        variant="outlined"
                        name="name"
                        label="Name"
                        fullWidth
                        required
                        margin="normal"                         
                        onChange={e=>{this.onChange(e)}}                                                                       
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                        id="input" type="email"
                        variant="outlined"
                        name="email"
                        label="Email"
                        fullWidth
                        required
                        margin="normal"                         
                        onBlur={e=>{this.onChangeEmail(e)}} 
                        InputProps={{
                          endAdornment:(
                              <InputAdornment  position="end">
                                  <IconButton
                                      aria-label="Valid email"                                      
                                          >
                                      {this.state.newUser.email?
                                        this.state.validEmail ? 
                                          <i className="material-icons" style={{fontSize:'30px', marginTop:'auto',color: 'green'}}>
                                              check
                                          </i> : 
                                          <i className="material-icons" style={{fontSize:'30px', marginTop:'auto',color: 'red'}}>
                                              close
                                          </i>:<i></i>}
                                  </IconButton>
                              </InputAdornment>
                          )
                        }}                               
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                  <TextField
                        id="filled-adornment-password" 
                        name="password"
                        label="Password"
                        fullWidth
                        required
                        margin="normal"
                        type={this.state.showPassword ? 'text':'password'}
                        variant="outlined"
                        onChange={e=>{this.onChange(e)}}
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
                    </Grid> 
                    
                                    
                </Grid>
                <br/>
                <br/>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"                  
                  onClick = {this.handleSubmit}
                >
                  Sign Up
                </Button>
                <br/>
                <br/>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2" onClick={this.handleLogin}>
                      Already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
    );
  }
}


export default SignupPage;