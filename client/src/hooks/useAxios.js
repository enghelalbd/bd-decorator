import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default function useAxiosSecure() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const reqId = instance.interceptors.request.use((config) => {
            const token = localStorage.getItem('sd_token');
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
        const resId = instance.interceptors.response.use(
            (r) => r,
            async (err) => {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    await logout();
                    navigate('/login');
                }
                return Promise.reject(err);
            }
        );
        return () => {
            instance.interceptors.request.eject(reqId);
            instance.interceptors.response.eject(resId);
        };
    }, [logout, navigate]);

    return instance;
}

export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
