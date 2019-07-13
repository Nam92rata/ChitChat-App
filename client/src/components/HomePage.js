import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import ChatPage from './ChatPage';

class HomePage extends Component{
    render(){
        if(localStorage.getItem("username")){
            return(
                <div>
                    <ChatPage/>
                </div>
            )
        }else{
            return(
                <div>
                    <Redirect to = "/login"/>
                </div>
            )
        }
    }
}
export default HomePage;