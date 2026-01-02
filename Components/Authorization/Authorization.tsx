import React, {useState, useEffect, type ChangeEvent} from 'react';
// Added 'Camera' to imports
import { User, Mail, Lock, Check, Camera } from 'lucide-react';

import styles from './auth.module.css';

// Reusable Input Field Component (Unchanged)
const InputField = ({ label, type, icon, value, onChange, isValid }:{label:string, type:string, icon:React.ReactNode, value:string, onChange:React.ChangeEventHandler<HTMLElement>, isValid?:boolean }) => (
    <div className={styles.inputGroup}>
        <label className={styles.label}>
            {icon}
            {label}
        </label>
        <div className={styles.inputWrapper}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={styles.input}
            />
            {isValid && <Check size={20} className={styles.validIcon} />}
        </div>
    </div>
);


const Authorization = () => {
    const [formData, setFormData] = useState({
        name: 'Aaron Iliya Dikko',
        email: 'iaarondikko@gmail.com',
        password: 'password123',
        confirmPassword:'password123'
    });

    // New state for avatar
    const [avatarFile, setAvatarFile] = useState<File|null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string|null>(null);



    // New handler for file input
    const handleAvatarChange:React.ChangeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const file:File|undefined = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            // Create a temporary URL for previewing the image
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    // Clean up memory when component unmounts or avatar changes
    useEffect(() => {
        return () => {
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

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
                    <form>
                        {/* --- New Avatar Upload Section --- */}
                        <div className={styles.avatarUploadContainer}>
                            <input
                                type="file"
                                id="avatarInput"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className={styles.hiddenInput}
                            />
                            <label htmlFor="avatarInput" className={styles.avatarLabel}>
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar preview" className={styles.avatarImage} />
                                ) : (
                                    <div className={styles.avatarPlaceholder}>
                                        <Camera size={32} />
                                        <span>Upload Photo</span>
                                    </div>
                                )}
                            </label>
                        </div>
                        {/* --------------------------------- */}

                        <InputField
                            label="Name"
                            type="text"
                            icon={<User size={16} className={styles.labelIcon} />}
                            value={formData.name}
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>setFormData({
                                ...formData,
                                name: e.target.value
                            })}
                        />
                        <InputField
                            label="Email"
                            type="email"
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
                            icon={<Lock size={16} className={styles.labelIcon} />}
                            value={formData.password}
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>setFormData({
                                ...formData,
                                password: e.target.value
                            })}
                        />
                        <InputField
                            label="Confirm Password"
                            type="confirmPassword"
                            icon={<Lock size={16} className={styles.labelIcon} />}
                            value={formData.confirmPassword}
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>setFormData({
                                ...formData,
                                confirmPassword: e.target.value
                            })}
                        />

                        <button type="submit" className={styles.signUpBtn}>
                            Sign up
                        </button>

                        <a href="#" className={styles.signInLink}>Sign in</a>
                    </form>




                </div>
            </div>
        </div>
    );
};

export default Authorization;