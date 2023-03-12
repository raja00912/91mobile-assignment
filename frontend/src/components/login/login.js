import react, { useContext, useEffect, useRef, useState } from 'react'
import '../form-style/form.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import mycontext from '../../context/context';
import { Link } from 'react-router-dom';

function Login() {
    let emailReference = useRef(null);
    let passwordReference = useRef(null);
    let navigate = useNavigate();
    let [user, setUser] = useContext(mycontext);

    const LoginUser = async () => {
        let user = {
            "email": emailReference.current.value,
            "password": passwordReference.current.value
        }

        try {
            let res = await axios.post('http://localhost:5000/login', {
                user
            })
            setUser(res.data.user);
            localStorage.setItem("token", res.data.token)
            navigate('/profile');
        } catch (error) {
            alert(error.response.data.error)
        }

    }

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/profile")
        }

    }, [])


    return (
        <div id='form_parent_div'>
            <h2>Login</h2>
            <input ref={emailReference} type="email" placeholder='Enter your email' /><br />
            <input ref={passwordReference} type="password" placeholder='Enter your password' /><br />
            <button onClick={LoginUser}>Login</button>
            <p>Don't have an account. <Link to="/register">SignUp</Link></p>
        </div>
    )
}

export default Login;