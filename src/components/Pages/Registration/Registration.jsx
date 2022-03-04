import React from "react";
import { useInput } from "../CustomHooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import styles from './Registration.module.css';
import loginStyles from '../Login/Login.module.css';
import { confirmedEmail } from "../../../store/actions";
import { useNavigate } from "react-router-dom";


const Registration = () =>{

    const userList = useSelector(state => state.userList);
    const disaptch = useDispatch();
    const navigate = useNavigate();
    console.log(userList.currentUser, 'reg');

    const name = useInput('');
    const surname = useInput('');
    const email = useInput('');
    const password = useInput('');

    const submitChange = e =>{
        e.preventDefault();
        const newUser = {
            id: userList.userList.length + 1,
            name: name.value,
            surname: surname.value,
            email: email.value,
            password: password.value,
        }
        disaptch(confirmedEmail(newUser));
        setTimeout(() =>{
            navigate('/home');
        }, 200);
    }

    return (
        <div className={loginStyles.mainDiv}>
           <div className={loginStyles.container}>

               <div className={styles.registerMain}>

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
                                <label className={loginStyles.label} htmlFor="email">
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

           </div>
        </div>
    )
}

export default Registration;