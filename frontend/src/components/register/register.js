import react, { useRef } from 'react'
import '../form-style/form.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    let nameReference = useRef(null);
    let emailReference = useRef(null);
    let passwordReference = useRef(null);
    let navigate = useNavigate()

    const RegisterUser = async () => {
        const user = {
            "name": nameReference.current.value,
            "email": emailReference.current.value,
            "password": passwordReference.current.value
        }
        try {
            let res = await axios.post('http://localhost:5000/register', {
                user
            })

            alert("Account created successfully")
            navigate('/')
        } catch (error) {
            alert(error.response.data.error)
        }
    }

    return (
        <div id='form_parent_div'>
            <h2>Create An Account</h2>
            <input ref={nameReference} placeholder='Enter your name' />
            <input ref={emailReference} type="email" placeholder='Enter your email' /><br />
            <input ref={passwordReference} type="password" placeholder='Enter your password' /><br />
            <button onClick={RegisterUser}>Signup</button>
        </div>
    )
}

export default Register