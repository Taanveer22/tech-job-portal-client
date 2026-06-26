import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Request Interceptor — no token needed, cookies sent automatically
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // console.log('request config', config);
        return config;
      },
      (error) => {
        // console.log('request error', error);
        return Promise.reject(error);
      }
    );

    // ✅ Response Interceptor — handle auth errors globally
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        // console.log('response data', res);
        return res;
      },
      async (error) => {
        // console.log('response error', error);
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          await signOutUser();
          navigate('/', { replace: true });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, signOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
