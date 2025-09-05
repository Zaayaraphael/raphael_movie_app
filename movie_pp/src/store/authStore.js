import { create } from 'zustand';
import { persist } from 'zustand/middleware';   
import SignUp from '../pages/SignUp';
import axios from "axios";
import { useFetcher } from 'react-router';
import { LogOut } from 'lucide-react';
// import { toast } from "react-hot-toast"



axios.defaults.withCredentials = true; // to include cookies in requests

const API_URL = "https://raphael-movie-app.onrender.com/api"

export const useAuthStore = create((set) => ({
    // initial states
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: false,

    // functions to update states
    SignUp: async (firstName, lastName, email, username, password) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { 
                firstName, 
                lastName, 
                email, 
                username, 
                password 
            });
            set({ user: response.data.user, message: 'Sign up successful!', isLoading: false });
        }
        catch (error) {
            set({ error: error?.response?.data?.message || 'Sign up failed', isLoading: false });
            throw error;
        }
    },
    
    // SignIn function
    Login: async (username, password) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { 
                username, password });

                const { user, message } = response.data;

                set({
                    user,
                    message, isLoading: false,
                });
                return{user, message };

            //set({ user: response.data.user, message: 'Sign in successful!', isLoading: false });
        }
        catch (error) {
            set({ error: error?.response?.data?.message || 'Sign in failed', isLoading: false });
            throw error;
        }
            },
            
    /* SignOut function
    SignOut: () => set({ user: null, message: 'Signed out successfully!' }),
*/

fetchUser: async () => {
    set({fetchingUser: true, error: null});

    try {
        const response = await axios.get(`${API_URL}/fetch-user`);
        set({user: response.data.user, fetchingUser: false});
    } catch (error) {
        set({error: error?.response?.data?.message || 'Failed to fetch user', fetchingUser: false});
        throw error;
    }
},

LogoutUser: async () => {
    set({ isLoading: true, error: null, message: null });

    try {
        const response = await axios.post(`${API_URL}/logout`);

        const { message } = response.data;
        //toast.success(message);

       set({ 
        message,
        isLoading: false,
        user: null,
        error: null 
         
         });

         return {message};
    } catch (error) {
        set({ error: error?.response?.data?.message || 'Sign out failed', isLoading: false });
        throw error;
    }
},
    
}));



export default useAuthStore;