import react, { useRef } from 'react'
import '../form-style/form.css'

function Register() {
    let nameReference = useRef(null);
    let emailReference = useRef(null);
    let passwordReference = useRef(null);

    const RegisterUser = async () => {
        // try {
        //     let res = await fetch('')
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <div id='form_parent_div'>
            <h2>Signup</h2>
            <input ref={nameReference} placeholder='Enter your name' />
            <input ref={emailReference} placeholder='Enter your email' /><br />
            <input ref={passwordReference} placeholder='Enter your password' /><br />
            <button onClick={RegisterUser}>Signup</button>
        </div>
    )
}

export default Register