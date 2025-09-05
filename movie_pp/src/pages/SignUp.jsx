import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore';

const SignUp = () => {
const navigate = useNavigate();

const [firstName, setFirstName] = useState("")
const [lastName, setLastNme] = useState("")
const [email, setEmail] = useState("")
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")


// extract values from states for debugging
const {SignUp, isLoading, error, message} = useAuthStore();

// console.log("FirstName: ", firstName, "\nLastName: ", lastName, "\nEmail: ", email, "\nUsername: ", username, "\nPassword: ", password);


// handle form submission
const handleSubmit = async (e) => {

  e.preventDefault();

  // console.log(firstName, lastName, email, username, password )
  // Perform form validation and submission logic here

 try {
  await  SignUp(firstName, lastName, email, username, password);

  // Navigate to another page upon successful sign-up 
  navigate("/");
}
catch (error) {
  console.log( error );
}

};


  return (
    <div className='min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5'
    style={{
        backgroundImage:
        "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/background_banner.jpg')",
    }}>
      

      <div className='max-w-[450px] w-full bg-black bg-opacity-75 rounded px-8 py-14 
      py-14 mx-auto mt-8'>
        <h1 className='text-3xl font-medium text-white mb-7'>Sign Up</h1>

        <form onSubmit={handleSubmit} className='flex flex-col space-y-4' >

            <input type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name' className='w-full h-[50px] bg-[[#3333] text-white
            rounded px-5 text-base' />

            <input type="text" 
            value={lastName}
            onChange={(e) => setLastNme(e.target.value)}
            placeholder='Last Name' className='w-full h-[50px] bg-[[#3333] text-white
            rounded px-5 text-base' />

            <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email' required='@.com' className='w-full h-[50px] bg-[[#3333] text-white
            rounded px-5 text-base' />

            <input type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username' className='w-full h-[50px] bg-[[#3333] text-white
            rounded px-5 text-base' />


            <input type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password' className='w-full h-[50px] bg-[[#3333] text-white
            rounded px-5 text-base' />

            // display error or success message

            // displaying error message 

            {error && <p className='text-red-500 text-sm'>{error}</p>}
            {message && <p className='text-green-500 text-sm'>{message}</p>}


            <button type='submit'
            disabled={isLoading} 
            className='bg-[#e50914] text-white py-3 rounded font-medium
            hover:bg-[#f40612] transition hover:opacity-90 cursor-pointer'>Sign Up</button>

        </form>

        <div className='mt-10 text-[#737373] text-sm'>
            <p>Already have an account? <span onClick={() => navigate("/signin")} className='text-white font-medium cursor-pointer ml-2 hover:underline'
            >Sign in Now</span></p>
        </div>
      </div>
    </div>
  )

};

export default SignUp
