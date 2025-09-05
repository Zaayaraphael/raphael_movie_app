import React from 'react'
import { Search, Settings, HelpCircle, LogOut } from 'lucide-react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore';
import { useState } from 'react';
import { toast } from "react-hot-toast"



const Navbar = () => {

  const { user, LogoutUser } = useAuthStore();

  

  const [showMenu, setShowMenu] = useState(false);


  const avatarUrl = user 
  ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent}
)}&background=random` : "";

const handleLogOut = async () => { 
  const confirm = window.confirm("Are you sure you want to log out?");
  if (confirm) {
    const {message} = await LogoutUser();
    toast.success(message);
  }
  setShowMenu(false);
}


  return (
    <div>
      <nav className='bg-black text-gray-200 flex justify-between 
      items-center p-4 h-20 text-sm md:text-[15px] 
      font-medium text-nowrap' >
        <img src={Logo}alt="Logo" className='w-24  cursor-pointer brightness-125' />

        <ul className='hidden xl:flex space-x-6'>
            <li className='cursor-pointer hover:text-[#e50914]'>Home</li>
            <li className='cursor-pointer hover:text-[#e50914]'>TV Shows</li>
             <li className='cursor-pointer hover:text-[#e50914]'>Movies</li>
            <li className='cursor-pointer hover:text-[#e50914]'>Anime</li>
            <li className='cursor-pointer hover:text-[#e50914]'>Games</li>
            <li className='cursor-pointer hover:text-[#e50914]'>New & Popular</li>
            <li className='cursor-pointer hover:text-[#e50914]'>Upcoming</li>
           
            
        </ul>

        <div className='flex items-center space-x-4 relative'>
        <div className='relative hidden md:inline-flex '>
            <input type="text" className='bg-[#333333] px-4 py-2 rounded-full 
            min-w-72 pr-10 outline-none' placeholder='Search...'/>
            <Search  className='absolute top-2 right-4 w-5 h-5'/>
        </div>

        <Link to={user ? "ai-recommendations" : "signin"}>
        <button className='bg-[#e50914] px-5 py-2 text-white
        cursor-pointer'>Get AI Movie Picks</button>
        </Link>

        {!user ? <Link to="/signin">
        <button className='border border-[#333333] py-2 px-4 cursor-pointer'>
          Sign In</button>

        </Link> : <div className='border border-[#333333]  text-white '>
          <img src={avatarUrl} alt="" className='w-10 h-10 rounded-full 
          border-2 border-[#e50915] cursor-pointer' 
          
          onClick={() => setShowMenu(!showMenu)} />

        {showMenu && (
          <div className='absolute top-12 right-0 bg-black border border-gray-800 
          rounded shadow-lg w-48 py-2 flex flex-col space-y-2 z-50'>
            <div className='px-4 py-2 border-b border-gray-800 flex flex-col items-center mb-2'>
              


              <span className='font-semibold text-white text-base'>{user.username}</span>
                <span className='text-xs text-gray-400'>{user.email}</span>
            </div>

            <button className='px-4 py-3 hover:bg-gray-800 flex items-center 
            space-x-2 w-full text-left cursor-pointer rounded-lg text-white 
            bg-[#181818] gap-3'>
              <HelpCircle className='w-5 h-5' />
              Help Center
            </button>

            <button className='px-4 py-3 hover:bg-gray-800 flex items-center 
            space-x-2 w-full text-left cursor-pointer rounded-lg text-white 
            bg-[#181818] gap-3'>
              <Settings className='w-5 h-5'  />
              Settings
            </button>

            <button 
            onClick={handleLogOut}
            className='px-4 py-3 hover:bg-gray-800 flex items-center 
            space-x-2 w-full text-left cursor-pointer rounded-lg text-white 
            bg-[#181818] gap-3'>
              <LogOut 
              
              className='w-5 h-5'  />
              Sign Out
            </button>
          </div>
        )}
        </div>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
