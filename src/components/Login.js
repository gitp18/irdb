import React from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
  
    const clickLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <button onClick={clickLogin}>Login</button>

        </>
    )
}
export default Login;
