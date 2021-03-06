import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmRegistration } from "../../../store/userStore/actions";
import { useInput } from "../../../CustomHooks/useInput";
import styles from './Registration.module.css';
import loginStyles from '../Login/Login.module.css';


const Registration = () =>{

    const [labelColor, setLabelColor] = useState('white');

    const userList = useSelector(state => state.userData.userList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const name = useInput('');
    const surname = useInput('');
    const email = useInput('');
    const password = useInput('');

    const submitChange = (e) =>{
        e.preventDefault();
        const newUser = {
            id: userList.length + 1,
            name: name.value,
            surname: surname.value,
            email: email.value,
            password: password.value,
        }
        dispatch(confirmRegistration(newUser));
        setLabelColor('red');
    }

    const navigateAuth = () =>{
        navigate('/auth');
    }

    return (
        <>
        <div className={loginStyles.modal} onClick={navigateAuth}></div>

        <div className={styles.registerMain}>

            <div className={loginStyles.navigateDiv}>
                <button className={loginStyles.navigateBtn} onClick={navigateAuth}>X</button>
            </div>

            <form className={styles.form} onSubmit={submitChange}>
                <p className={loginStyles.title}>Sign up</p>

                <div>
                    <label className={loginStyles.label} htmlFor="name">
                        First Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        placeholder='Enter your first name'
                        name='name'
                        className={loginStyles.input}
                        {...name.bind}
                        required
                    />
                </div>

                <div>
                    <label className={loginStyles.label} htmlFor="name">
                        Last Name
                    </label>
                    <input
                        type='text'
                        id='surname'
                        placeholder='Enter your last name'
                        name='surname'
                        className={loginStyles.input}
                        {...surname.bind}
                        required
                    />
                </div>

                <div>
                    <label className={loginStyles.label} htmlFor="email" style={{color: labelColor}}>
                        E-Mail Address
                    </label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Enter your email'
                        name='email'
                        className={loginStyles.input}
                        {...email.bind}
                        required
                    />
                </div>

                <div>
                    <label className={loginStyles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        name="password"
                        className={loginStyles.input}
                        {...password.bind}
                        required
                    />
                    </div>

                    <div>
                        <button className={loginStyles.btn} type='submit'> 
                            Sign up
                        </button>
                    </div>
                    
                </form>
           </div>
           </>
    )
}

export default Registration;