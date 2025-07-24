import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AxiosInterceptorSetup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.data?.message?.toLowerCase().includes('jwt expired')) {
          localStorage.removeItem('auth');
          navigate('/');
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

  return null;
};
export default AxiosInterceptorSetup;
