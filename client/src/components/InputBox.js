import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import DirectionsIcon from '@material-ui/icons/Directions';
import { withStyles  } from '@material-ui/core/styles';
const styles = theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
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
    },
  });
class InputBox extends Component{
    
    render(){
        const { classes } = this.props;
        return(
            <div>
            <Paper className={classes.root}>
              <IconButton className={classes.iconButton} aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Type your message..."
                inputProps={{ 'aria-label': 'Type message' }}
              />
              
              <Divider className={classes.divider} />
              <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
                <SendIcon />
              </IconButton>
          </Paper>
          </div>
        )
    }
}
export default withStyles(styles)(InputBox);
