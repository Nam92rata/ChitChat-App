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
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import {Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import socketIOClient from "socket.io-client";
import ChatRoom from './ChatRoom';
import Grid from '@material-ui/core/Grid';
const drawerWidth = 240;


const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      backgroundColor: 'aliceblue'
    },
  },
  appBar: {
    flexGrow:1,
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
    flexGrow: 1,
    padding: '2px 4px',
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    bottom: '10px',  
    right:'2px',
    [theme.breakpoints.up('sm')]: {
      left: `${drawerWidth+2}px`,
    },
       
  },
  root_input_inner: {
    flexGrow: 1,
    padding: '2px 2px',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '25px' ,
    width:'auto',
    margin:'20px'
  },
  root_input_emoji:{
    flexGrow: 1,
    position: 'fixed',
    top: '500px',
    background:'black' ,
    backgroundColor:'black',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth+2}px)`,
    }
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    width:'80%'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  chatroom:{
    paddingBottom:'100px'
  },
  chatroom_new:{
    paddingBottom:'300px'
  },
  emojiPicker:{
      width: '100%'
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
        socket:null,
        username2:'',
        personalChatRoom: false,
        showEmojiPicker:false
      }
    }
    
    handleChange=(evt)=>{
      this.setState({
        message:evt.target.value 
    })
    }
    handleSend=(evt)=>{
      evt.preventDefault();
      if(this.state.personalChatRoom){
        this.state.socket.emit('personalMessage', {
          username2: this.state.username2,
          username: localStorage.getItem('username'),
          uid: localStorage.getItem('uid'),
          message: this.state.message
        });

      }else{
        this.state.socket.emit('message', {
          username: localStorage.getItem('username'),
          uid: localStorage.getItem('uid'),
          message: this.state.message
        });
      }
      this.setState({message:''})
      if(this.state.showEmojiPicker){
        this.setState({showEmojiPicker:!this.state.showEmojiPicker});
      }
    }
    componentDidMount(){ 
      const endpoint = "https://blooming-dusk-33325.herokuapp.com/";
      const socket = socketIOClient(endpoint,{
      query:'username='+localStorage.getItem('username')+'&uid='+localStorage.getItem('uid')});
      console.log("socket",socket)
      socket.on("updateUsersList", users =>{
        // console.log("data", users);
        this.setState({ response: users });
      }
      )
      socket.on('message', message=>{
        this.setState({
          messages:this.state.messages.concat(message)
        })}
      )
      socket.on('personalMessage', message => {
        this.setState({
          messages: this.state.messages.concat(message)
        })
      }
      )
        this.setState({socket})
      }
      
    componentDidUpdate(){
      window.scrollTo(0,document.body.scrollHeight);
    }
    handleDrawerToggle=() =>{
      this.setState({mobileOpen:!this.state.mobileOpen});
    }
    changeLogoutStateHandler=()=>{
      localStorage.removeItem('username')
      localStorage.removeItem('uid')
      localStorage.removeItem('name')
      this.state.socket.emit("disconnect")
      this.state.socket.disconnect()
      this.setState({loggedin:false})        
    }

    onClickHandler=(username)=>{
        this.setState({ username2: username, personalChatRoom: true });
        if(this.state.mobileOpen){
          this.setState({mobileOpen:!this.state.mobileOpen});
        }
    }

    addEmoji = (e) => {
      let emoji=e.native;      
      this.setState({message : this.state.message + emoji}) 
     
    }
    handleMart=()=>{      
      this.setState({showEmojiPicker:!this.state.showEmojiPicker})
    }

    render(){
      const { classes,container } = this.props;
      const drawer = (
        <div>
          <div className={classes.toolbar} />
          <div style={{fontFamily: 'Josefin Sans', color: 'navy', fontWeight: 'bold', fontSize:'20px'}}>
            Hello {localStorage.getItem('username')}</div>
          <Divider />
          <List >
            <ListItem button selected={this.state.username2===''?true:false} 
                onClick={() => {this.setState({personalChatRoom: false, username2:''})
                          if(this.state.mobileOpen){
                            this.setState({mobileOpen:!this.state.mobileOpen});
                          }}}>
              <ListItemIcon>
                <Avatar>
                  <i className="material-icons" style={{ color: 'darkblue' }}>
                    group
                        </i>
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="ChatRoom"/>
            </ListItem>
            {
              this.state.response.map(el=>{
                if(el!==localStorage.getItem('username')){
                return(
                  <ListItem button selected={this.state.username2===el?true:false} key={el} value={el} 
                    onClick={()=>this.onClickHandler(el)}>
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
                }
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
          <AppBar position="fixed" className={classes.appBar} color="secondary">
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
              <Typography variant="h6" noWrap style={{flexGrow:1,fontFamily:'Josefin Sans',fontSize:'24px',fontWeight:'bold'}}>
                {this.state.username2?this.state.username2:"Group"}
              </Typography>
                <Button color="inherit" onClick={this.changeLogoutStateHandler}>Logout</Button>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="Mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
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
          <div className={this.state.showEmojiPicker?classes.chatroom_new:classes.chatroom}> 
            <ChatRoom personalChatRoom={this.state.personalChatRoom}
            username2={this.state.username2}
            messages={this.state.messages} />
            <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
            <div className={classes.root_input}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <form onSubmit={this.handleSend}>
                  <Paper className={classes.root_input_inner}>
                  <IconButton className={classes.iconButton} aria-label="Menu">
                  <i className="material-icons" onClick={this.handleMart}>
                    tag_faces
                  </i>                  
                  </IconButton>
                  <InputBase
                    className={classes.input}                    
                    placeholder="Type your message..."
                    inputProps={{ 'aria-label': 'Type message' }}
                    onChange={this.handleChange}
                    value={this.state.message}
                  />
                  <Divider className={classes.divider} />
                  <IconButton color="primary" className={classes.iconButton} aria-label="Directions" onClick={this.handleSend}>
                    <SendIcon />
                  </IconButton>  
                  </Paper>              
                  </form>
                </Grid>
                <Grid item xs={12} sm={12}>  
                {this.state.showEmojiPicker ? (
                  <Picker set="emojione" search={false} onSelect={this.addEmoji} 
                    className={classes.root_input_emoji} style={{width:'100%',height: '250px', overflow: 'hidden'}} />
                    ) : null}
                </Grid>
              </Grid>              
            </div>
        </main>
        </div>
      )
    }
    else{
      return(
        <div>
            <Redirect to = "/login"/>
        </div>
    )}
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object
};

export default withStyles(styles)(ChatPage);
