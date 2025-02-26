import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { specialityData, doctors as doctorsData } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '৳';

    const [doctors, setDoctors] = useState(doctorsData);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userData, setUserData] = useState(false);
    const [loading, setLoading] = useState(false);

    // getting user profile
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get('https://', { headers: { token } });

            if (data.success) {
                setUserData(data.userData);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
    }, [token])

    const value = {
        doctors,
        currencySymbol, token, setToken,
        userData, setUserData, loadUserProfileData, loading
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;