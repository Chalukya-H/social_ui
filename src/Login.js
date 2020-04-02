import React from 'react'
import axios from 'axios'
// import UserPost from './UserPost'
import { Redirect} from 'react-router-dom'

class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            users  : [],
            email : ''
        }
    }

    componentDidMount =()=>{
        axios.get('http://jsonplaceholder.typicode.com/users')
         .then ( respose =>{
             this.setState({users:respose.data})
         })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const email = document.getElementById('login').value
        this.setState( {email})
     }


    render(){
        return (
            <div className = 'login-div' >
                <h2>Social Dashboard</h2>
                <form className ='login-form' onBlur = {this.handleSubmit}>
                    <h3 htmlFor = 'login'> Login : </h3>
                    <input type ='text' id = 'login' style ={{width: '270px'}} placeholder ='Enter Email here'/>
                    <h1></h1>
                    <ValidateUser email = {this.state.email} users = {this.state.users}/>
                </form>
            </div>
        )
    }
}

function ValidateUser(props){
    let found = false
    
    if( props.email !== ''){
        const res =  props.users.filter(function(ele){
            return ele.email === props.email
        })
 
          if(res.length > 0) {
              found = true 
              localStorage.setItem('userId',res[0].id)              
              return <Redirect to ={`/users`} />  
          }
 
     } else {
        localStorage.setItem('userId',false)   
         return ''
     }
 
     if(found === false){
        localStorage.setItem('userId',false)   
         return <h3 className ='login-error'> Not a valid Email.<br/> try again!!</h3>
     }
}


export default Login