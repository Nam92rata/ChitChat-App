import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import { withStyles  } from '@material-ui/core/styles';
// import InputBox from './InputBox';
import {Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import socketIOClient from "socket.io-client";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root_input: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '400',
    position:'fixed',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  }
});

class ChatPage extends Component{
    constructor(props){
      super(props);
      this.state={
        mobileOpen:false,
        loggedin:true,
        response:[],
        message:'',
        messages:[],
        recepient:'',
        socket:null
      }
    }
    
    handleChange=(evt)=>{
      this.setState({
        message:evt.target.value 
    })
    }
    handleSend=()=>{
      console.log(this.state.message)
      this.state.socket.emit('message', {username:localStorage.getItem('username'),
                                          uid:localStorage.getItem('uid'),
                                           message:this.state.message});
      // this.setState({
      //   messages:[...this.state.messages,{sender: localStorage.getItem('username'), message:this.state.message}]
      // })
      console.log(this.state.messages)
    }
    componentDidMount(){      
      const endpoint = "http://localhost:4000/";
      const socket = socketIOClient(endpoint,{
      query:'username='+localStorage.getItem('username')+'&uid='+localStorage.getItem('uid')});
      console.log("socket",socket)
      socket.on("updateUsersList", users =>{
        console.log("data", users);
        this.setState({ response: users });
      }
      )
      socket.on('message', message=>{
        this.setState({
          messages:this.state.messages.concat(message)
        })}
      )
      console.log(this.state.messages)
      this.setState({socket})
    }
    handleDrawerToggle=() =>{
      this.setState({mobileOpen:!this.state.mobileOpen});
    }
    handleRecepient=(el)=>{
      console.log(el)
      this.setState({recepient:el })
    }
    changeLogoutStateHandler=()=>{
      localStorage.removeItem('username')
      localStorage.removeItem('uid')
      localStorage.removeItem('name')
      this.setState({loggedin:false})      
    }
    render(){
      const { classes,container } = this.props;
      const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {
              this.state.response.map(el=>{
                return(
                  <ListItem button key={el} value={el} onClick={this.handleRecepient.bind(this,el)}>
                    <ListItemIcon>
                      <Avatar>
                        <i className="material-icons" style={{color:'darkblue'}}>
                          person
                        </i>
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={el} />
                  </ListItem>
                )
              })
              }
          </List>
          <Divider />          
        </div>
      );
    if(this.state.loggedin){
      return(
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                CHITCHAT with {this.state.recepient}
              </Typography>
              <IconButton color="inherit" edge="end">  
                <Button color="inherit" onClick={this.changeLogoutStateHandler}>Logout</Button>
            </IconButton>
            </Toolbar>
            
          </AppBar>
          <nav className={classes.drawer} aria-label="Mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, 
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.messages.map(el=>{
            return(
              <div>{el.username} : {el.message}</div>
            )
          }

          )}
          {/* <InputBox position="fixed" socket={this.state.socket}/> */}
          <Paper className={classes.root_input}>
              <IconButton className={classes.iconButton} aria-label="Menu">
              <i className="material-icons">
                tag_faces
              </i>
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Type your message..."
                inputProps={{ 'aria-label': 'Type message' }}
                onChange={this.handleChange}
              />
              
              <Divider className={classes.divider} />
              <IconButton color="primary" className={classes.iconButton} aria-label="Directions" onClick={this.handleSend}>
                <SendIcon />
              </IconButton>
          </Paper>
        </main>

        </div>
      )
    }
    else{
      return(
        <div>
            <Redirect to = "/login"/>
        </div>
    )
    }
    }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object
};

export default withStyles(styles)(ChatPage);
