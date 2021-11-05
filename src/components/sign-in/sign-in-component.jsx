import React from 'react';
import {withRouter} from 'react-router-dom';

import './sign-in-component.scss';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            loggedusers:[],
            error:null
        }
    }

    handleChange = e => {
        const {name, value} = e.target;        
        //console.log(name + ':' + value);
        this.setState({[name]: value})
    }

    handleSubmit = async e => {
        e.preventDefault();
     
        let params =  {
            "email": this.state.email, 
            "password": this.state.password
        };
        //console.log(JSON.stringify(params));
        await fetch('https://g9v1e.mocklab.io/users',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(response => {
            this.setState({loggedusers: response});
            if(!this.state.loggedusers.length){
                localStorage.setItem('anzuser', JSON.stringify(this.state.loggedusers));  
                this.props.history.push('/anz-wholesale/account');   
            }else{   
                if(this.state.loggedusers.length > 1){
                    throw new Error('Invalid Email or Password');
                }else{
                    throw new Error('Something went wrong ...');
                }                
            }

        })
        .catch(error => this.setState({error}));
        //console.log(error.message)
                
    }

    render(){
        return(
            <div className="sign-form-component">  
                <form className="sign-form">
                    { this.state.error && <div className="error"> { this.state.error.message } </div> }  
                    <input type="text" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                    <button className="btn btn-success" onClick={this.handleSubmit}>Sign In</button>
                </form>
            </div>
        );
    }
}

export default withRouter(SignIn);

