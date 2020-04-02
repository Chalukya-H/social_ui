import React from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

class UserPost extends React.Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            user: {}
        }
    }

    componentDidMount =()=>{
        const id = localStorage.getItem('userId')
        if(id != 'false' ) {
            axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then ( (respose) =>{
                this.setState( { posts: respose.data})
            })

            .catch(err=>{
                console.log(err)
            })

            axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)
            .then ( respose =>{
                this.setState({user:respose.data})
                
            })

            .catch(err=>{
                console.log(err)
            }) 
        }
    }

    handleLogout =(e)=>{
        localStorage.setItem('userId',false)
    }
    render(){
       
        return (
            <div className = 'user-posts' >
                <div className = 'log-out' >
                    <Link to ='/' > <button className ='logout-link' onClick = {this.handleLogout}>Logout</button></Link>   
                </div>

                <div className ='User-info'>
                    <div className  ='user-basic'>
                        <h2> {this.state.user.name}</h2>
                        <h4> {this.state.user.email}</h4>
                        <h4> {this.state.user.phone}</h4>
                    </div>                
                    <ShowCompanyInfo user = {this.state.user}/> 
                </div>

                <div className ='Posts-info'>
                    {
                        this.state.posts.map(function(post){
                            return(
                                <div key ={post.id} className = 'post-desc'>
                                    <h2><u>{post.title}</u></h2>
                                    <h4>{post.body} </h4>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
        
    }
    
}

function ShowCompanyInfo(props) {     
    if(Object.keys(props.user).length > 0 && localStorage.getItem('userId') != false){        
        return (
            <div className ='companyinfo'>
                <h2> {props.user.company.name} </h2>
                <h4>{props.user.company.catchPhrase}</h4>
            </div> 
        )
    }else if(localStorage.getItem('userId') == 'false' )
        {
            console.log(localStorage.getItem('userId'))
           return  <Redirect to = '/' />
        }        
    else {return ''}
    
}
  

export default UserPost