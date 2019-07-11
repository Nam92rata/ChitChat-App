import React from 'react';
import { Smile, Frown, Meh } from 'react-feather';
import Paper from '@material-ui/core/Paper';
const ChatRoom=(props)=>{

    var personalMessages=[];
    var generalMessages=[];


    if(props.messages){
        personalMessages = props.messages.filter(el => {
            if (el.username2 === props.username2 || (el.username===props.username2 && el.username2=== localStorage.getItem('username'))) {
                return el;
            }
        })
        console.log("personalMessages", personalMessages);

        generalMessages = props.messages.filter(el => {
            if (el.username2 === undefined) {
                return el
            }
        })
        console.log('generalMessages', generalMessages);
    }

    if(props.personalChatRoom && personalMessages[0]!==undefined){
        return (
            <div >
                {personalMessages.map(el=>{
                    return <Paper  style={{padding : '3px',margin : 3,
                        'backgroundColor':'pink',textAlign:el.username===localStorage.getItem('username')?'left':'right'}}>
                        {el.username} : {el.message} : {el.status==="positive"?<Smile/>:el.status==="negative"?<Frown/>:<Meh/>}</Paper>                    
                })}
            </div>
        )
    }
    else if (!props.personalChatRoom && generalMessages[0] !== undefined){
        return (
            <div >
                {generalMessages.map(el => {
                    return <Paper  style={{padding : '3px',margin : 3,
                    'backgroundColor':'pink',textAlign:el.username===localStorage.getItem('username')?'left':'right'}}>
                        {el.username} : {el.message} : {el.status==="positive"?<Smile/>:el.status==="negative"?<Frown/>:<Meh/>}</Paper>
                })}
            </div>
        )

    }
    else{
        return (
            <div>
                your chats go over here.............
            </div>
        )
    }
}

export default ChatRoom;