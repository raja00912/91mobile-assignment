import react, { useEffect, useRef } from 'react'
import '../form-style/form.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    let nameReference = useRef(null);
    let emailReference = useRef(null);
    let passwordReference = useRef(null);
    let navigate = useNavigate()

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    const RegisterUser = async () => {
        const user = {
            "name": nameReference.current.value,
            "email": emailReference.current.value,
            "password": passwordReference.current.value
        }
        if (validateEmail(emailReference.current.value)) {
            if (passwordReference.current.value.length < 8) {
                alert("Enter a password of atleast 8 characters");
            }
            else if (nameReference.current.value.length < 2) {
                alert("Enter a valid name")
            }
            else {
                try {
                    let res = await axios.post('http://localhost:5000/register', {
                        user
                    })

                    alert("Account created successfully. Redirecting to login page")
                    navigate('/')
                } catch (error) {
                    alert(error.response.data.error)
                }
            }
        }
        else {
            alert("Enter a valid email address")
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
            <h2>Create An Account</h2>
            <input ref={nameReference} placeholder='Enter your name' />
            <input ref={emailReference} type="email" placeholder='Enter your email' /><br />
            <input ref={passwordReference} type="password" placeholder='Enter your password' /><br />
            <button onClick={RegisterUser}>Signup</button>
            <p>Already have an account. <Link to="/">LogIn</Link></p>
        </div>
    )
}

export default Register