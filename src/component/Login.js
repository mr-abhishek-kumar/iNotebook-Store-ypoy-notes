import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({email:'',password:''})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
        });

        const json = await response.json();
        if(json.success===true){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            navigate('/')
        }
        else{
            alert("Invalid Credentials..!")
        }

        console.log(json);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input autoComplete='' onChange={onChange} value={credentials.email} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input autoComplete='' onChange={onChange} value={credentials.password} type="password" className="form-control" id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login