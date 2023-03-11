import react from 'react'
import '../form-style/form.css'

function Login() {

    return (
        <div id='form_parent_div'>
            <h2>Login</h2>
            <input placeholder='Enter your email' /><br />
            <input placeholder='Enter your password' /><br />
            <button>Login</button>
        </div>
    )
}

export default Login;