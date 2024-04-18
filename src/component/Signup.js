import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';



function Signup() {

  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({name:'',email:'',password:'',conpassword:''})

  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
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
    <div className='container'>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="name" className='form-label'>Name</label>
          <input autoComplete='' type="text" className='form-control' id='name' name='name' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className='form-label'>Email Address</label>
          <input autoComplete='' type="email" className='form-control' id='email' name='email'  aria-describedby='emailHelp' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="passsword" className='form-label'>Password</label>
          <input autoComplete='' type="password" className='form-control' id='password' name='password' onChange={onChange}  />
        </div>
        <div className="mb-3">
          <label htmlFor="Conpasssword" className='form-label'> Confirm Password</label>
          <input autoComplete='' type="password" className='form-control' id='Conpassword' name='Conpassword' onChange={onChange} />
        </div>
        <button type='submit' className='btn btn-primary'> Submit</button>

      </form>
    </div>
  )
}

export default Signup