import React, {useState, type ChangeEvent} from 'react';
// Added 'Camera' to imports
import { Mail, Lock, Check } from 'lucide-react';

import styles from './auth.module.css';
import {Link} from "react-router";
import {useAuth} from "../../context/AuthContext.tsx";


// Reusable Input Field Component (Unchanged)
const InputField = ({ label, type, name, icon, value, onChange, isValid }:{label:string, type:string, name:string, icon:React.ReactNode, value:string, onChange:React.ChangeEventHandler<HTMLElement>, isValid?:boolean }) => (
    <div className={styles.inputGroup}>
        <label className={styles.label}>
            {icon}
            {label}
        </label>
        <div className={styles.inputWrapper}>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={styles.input}
            />
            {isValid && <Check size={20} className={styles.validIcon} />}
        </div>
    </div>
);


const Login = () => {
    const [formData, setFormData] = useState({
        email: 'iaarondikko@gmail.com',
        password: 'password123',

    });

    const {login} = useAuth()
    const [error, setError] = useState<string|null>(null);

    const formHandler = async (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const result = await login(formData);
        if(typeof result == 'string'){
            setError(result);
        }
    }


    return (
        <div className={styles.container}>
            {/* Left Panel (Unchanged) */}
            <div className={styles.leftPanel}>
                <div className={styles.logoContainer}>
                    <img  className={styles.pvLogo} src="../../public/big_logo.jpg" alt=""/>
                </div>
                <h1 className={styles.welcomeTitle}>Welcome Back</h1>
                <p className={styles.welcomeSubtitle}>Sign in to continue</p>
            </div>

            {/* Right Panel - Form */}
            <div className={styles.rightPanel}>
                <div className={styles.formContainer}>
                    <form onSubmit={formHandler} method="post" encType="multipart/form-data">
                        <div className={styles.error}>
                            {error!=null? error : ""}
                        </div>
                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            icon={<Mail size={16} className={styles.labelIcon} />}
                            value={formData.email}
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>setFormData({
                                ...formData,
                                email: e.target.value
                            })}
                            isValid={true}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            icon={<Lock size={16} className={styles.labelIcon} />}
                            value={formData.password}
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>setFormData({
                                ...formData,
                                password: e.target.value
                            })}
                        />


                        <button type="submit" className={styles.signUpBtn}>
                            Log in
                        </button>

                        <Link to="/authorize?type=registration" className={styles.signInLink}>Sign up</Link>
                    </form>




                </div>
            </div>
        </div>
    );
};

export default Login;