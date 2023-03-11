import react, { useRef } from 'react'
import '../form-style/form.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

function Login() {
    let emailReference = useRef(null);
    let passwordReference = useRef(null);
    let navigate = useNavigate();

    const LoginUser = async () => {
        let user = {
            "email": emailReference.current.value,
            "password": passwordReference.current.value
        }

        try {
            let res = await axios.post('https://91mobile-assignment-ng7j.vercel.app/login', {
                user
            })
            localStorage.setItem("token", res.data.token)
            navigate('/');
        } catch (error) {
            alert(error.response.data.error)
        }

    }

    return (
        <div id='form_parent_div'>
            <h2>Login</h2>
            <input ref={emailReference} type="email" placeholder='Enter your email' /><br />
            <input ref={passwordReference} type="password" placeholder='Enter your password' /><br />
            <button onClick={LoginUser}>Login</button>
        </div>
    )
}

export default Login;