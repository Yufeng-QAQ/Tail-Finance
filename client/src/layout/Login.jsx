import './Styles/Login.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { fetchLogin } from '../store/modules/userStore';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setLoginForm({...loginForm, [name]: value})
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        const loginResult = await dispatch(fetchLogin(loginForm));
        if (!loginResult.auth) {
            setMessage(loginResult.message);
        } else {
            setMessage('');
            navigate('/')
        }
        console.log(loginResult);

    }

    const handleRegister = () => {

    }

    return (
        <div className="Login">
            <div className='login-container'>
                <h2 className='login-title'>{isRegistering ? "Register" : "Login"}</h2>

                <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                    <div className='form-group'>
                        <input
                            className='user-input'
                            type="text"
                            name="username"
                            value={loginForm.username}
                            onChange={handleInputChange}
                            placeholder='Enter Username'
                            required />
                    </div>
                    <div className='form-group'>
                        <input
                            className='user-input'
                            type="password"
                            name="password"
                            value={loginForm.password}
                            onChange={handleInputChange}
                            placeholder='Enter Password'
                            required />
                    </div>
                    {message && <p className='error-msg'>{message}</p>}
                    {isRegistering && (
                        <div>
                            <div className='form-group'>
                                <input
                                    className='user-input'
                                    type="password"
                                    name="Confirm-Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder='Confirm Password'
                                    required />
                            </div>
                            <div className='user-operate-btn'>
                                <button className='register'>Register</button>
                                <button className='cancel' onClick={() => { setIsRegistering(!isRegistering) }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {!isRegistering && (
                        <div className='user-operate-btn'>
                            <button className='sign-up' onClick={() => { setIsRegistering(!isRegistering) }}>
                                Sign-Up
                            </button>
                            <button className='login'>Login</button>
                        </div>
                    )}



                </form>
            </div>

        </div>
    );
};

export default Login;
