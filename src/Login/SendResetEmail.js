import React, {Component} from 'react';
import logo from './../images/HC.svg';
import './../css/login/SendResetEmail.css';

export default class SendResetEmail extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        document.getElementById("warning").textContent = "One Second!!";
        event.preventDefault();
        var data = {
            email: document.getElementById("reset_email").value
        }
        var url = window.location.href.split('/');
        var token = url[url.length-1];
        console.log(token);
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/forget_psw_email/forget_psw_email", options).then( result =>{
            if(result.status === 200){
                return result.json();
            }else{
                result.json().then(nr =>{
                    document.getElementById("warning").textContent = nr.message;
                })
                return null;
            }
        }).then( result => {
            if(result === null){

            }else{
                document.getElementById("warning").textContent = "A Reset Password Email has been send!!";
            }
        });
    }

    render() {
        return(
            <div id="SendResetEmail" >
                <form onSubmit={this.handleSubmit}>  
                    <img src={logo} alt="" />
                    <h1>Hoosier Connection</h1>
                    <hr />
                    <h2>Reset Password</h2>
                    <p id="reset_email_msg"></p>
                    <div className="label"><label>Email:</label></div>   
                    <input type="text" placeholder="Ex. you@gmail.com" onChange={this.handleChange} id="reset_email" required></input><br />
                    <p className="warning_msg" id="warning"></p> <br/>
                    <div className="text-right"><button type="submit">Send Link</button></div>
                </form>
            </div>
        );   
    }
}
