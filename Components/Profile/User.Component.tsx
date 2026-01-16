import  {type ChangeEvent,  useState} from 'react';
import styles from './styles/profile.module.css';
import {useAuth} from "../../context/AuthContext.tsx";
import ChangePasswordModal from "./ChangePassword.Component.tsx";

const UserProfile = () => {
    const {user} = useAuth();
    // Initial state based on the image provided
    const [formData, setFormData] = useState({
        fullName: user?.name,
        email: user?.email,

    });
    const [openChangePassword,setOpenChangePassword] = useState<boolean>(false);

    // State for the profile image preview
    const [avatarPreview, setAvatarPreview] = useState(
        user?.avatarUser.avatarPath
    );

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files==null){
            return
        }
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarPreview(imageUrl);
        }
    };

    const handleSave = (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Saving profile:', formData);

        // Add API call logic here

    };


    return (
        <>
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>My Profile</h2>

            <form onSubmit={handleSave} className={styles.contentWrapper}>

                {/* Left Column: Avatar */}
                <div className={styles.avatarSection}>
                    <div className={styles.avatarWrapper}>
                        <img
                            src={avatarPreview}
                            alt="Profile"
                            className={styles.avatarImage}
                        />
                    </div>

                    <label htmlFor="avatar-upload" className={styles.changePhotoBtn}>
                        Change Photo
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className={styles.fileInput}
                        onChange={handleImageChange}
                    />

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenChangePassword(true);
                        }}
                        className={styles.changePhotoBtn}
                        >
                        Change Password
                    </button>
                </div>

                {/* Right Column: Form Fields */}
                <div className={styles.formSection}>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>





                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveBtn}>
                            Save Changes
                        </button>
                        <button type="button" className={styles.cancelBtn}>
                            Cancel
                        </button>
                    </div>

                </div>
            </form>

        </div>
            {openChangePassword && <ChangePasswordModal onClose={setOpenChangePassword}/>}
        </>
    );
};

export default UserProfile;