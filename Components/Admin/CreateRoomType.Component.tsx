import {type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction, useState} from 'react';
import { X, UploadCloud } from 'lucide-react'; // Added UploadCloud & Trash2
import styles from './style/createRoomType.module.css';
import Cookies from "js-cookie";
import axios from "axios";
import {useAdmin} from "../../context/AdminContext.tsx";

const CreateRoomTypeModal = ({ isOpen, onClose}:{isOpen:Boolean,onClose:()=>void }) => {
    const {setReload, reload} = useAdmin()
    // Form State
    const [name, setName] = useState('');
    const [price, setPrice] = useState('0.00');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState<number>(0);

    // Photo State
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // Tag States
    const [spaTags, setSpaTags] = useState(['Sauna', 'Jacuzzi']);
    const [spaInput, setSpaInput] = useState('');

    const [foodTags, setFoodTags] = useState(['Breakfast']);
    const [foodInput, setFoodInput] = useState('');

    const [viewTags, setViewTags] = useState(['Sea view']);
    const [viewInput, setViewInput] = useState('');

    if (!isOpen) return null;

    // --- File Upload Handlers ---
    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Add to file state
        setSelectedFiles(prev => [...prev, ...files]);

        // Generate preview URLs
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index:number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    // --- Tag Input Handlers ---
    const handleTagKeyDown = (e:React.KeyboardEvent<HTMLInputElement>, currentInput:string, setInput:Dispatch<SetStateAction<string>>, tags:string[], setTags:Dispatch<SetStateAction<string[]>>) => {
        if (e.key === 'Enter' && currentInput.trim() !== '') {
            e.preventDefault();
            setTags([...tags, currentInput.trim()]);
            setInput('');
        } else if (e.key === 'Backspace' && currentInput === '' && tags.length > 0) {
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (indexToRemove:number, tags:string[], setTags:Dispatch<SetStateAction<string[]>>) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", name)
        formData.append("pricePerNight", price)
        formData.append("description", description)
        formData.append("capacity", String(capacity))
        selectedFiles.forEach(file=>{
            formData.append("photos", file)
        })
        foodTags.forEach(item=> {
            formData.append("norishment", item)
        })
        spaTags.forEach(item=> {
            formData.append("spa", item)
        })
        viewTags.forEach(item=> {
            formData.append("view", item)
        })
        try{
            const token = Cookies.get("token")
            const response = await axios.post(import.meta.env.VITE_API_URL + "/RoomType", formData, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status==200){
                setReload(reload+1)
                onClose()
            }
        }
        catch (error){
            console.error("Error occurred "+error)
        }
        
        

        
        
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className={styles.header}>
                    <h3 className={styles.title}>Create Room Type</h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={16} />
                    </button>
                </div>

                {/* Body Form */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.body}>

                        {/* Name */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Deluxe Suite"
                            />
                        </div>

                        {/* --- NEW PHOTO UPLOAD SECTION --- */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Room Photos</label>

                            <label className={styles.uploadBox}>
                                <UploadCloud size={32} className={styles.uploadIcon} />
                                <span className={styles.uploadText}>Click to upload images</span>
                                <span className={styles.uploadSubText}>SVG, PNG, JPG or GIF (max. 3MB)</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className={styles.hiddenInput}
                                    onChange={handleFileChange}
                                />
                            </label>

                            {/* Image Previews */}
                            {previewUrls.length > 0 && (
                                <div className={styles.previewGrid}>
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className={styles.previewWrapper}>
                                            <img src={url} alt="Preview" className={styles.previewImg} />
                                            <button
                                                type="button"
                                                className={styles.removeImgBtn}
                                                onClick={() => removeImage(index)}
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Price Per Night</label>
                            <div className={styles.priceWrapper}>
                                <span className={styles.currencySymbol}>$</span>
                                <input
                                    type="number"
                                    className={`${styles.input} ${styles.priceInput}`}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    step="0.01"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Description</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Enter a description for the room type..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Capacity */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Capacity</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={capacity}
                                onChange={(e) => setCapacity(Number(e.target.value))}
                            />
                        </div>

                        {/* --- Tag Inputs Grid --- */}
                        <div className={styles.gridRow}>

                            {/* Spa Tags */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Spa</label>
                                <div className={styles.tagContainer}>
                                    {spaTags.map((tag, index) => (
                                        <span key={index} className={styles.tag}>
                      {tag}
                                            <button type="button" className={styles.removeTagBtn} onClick={() => removeTag(index, spaTags, setSpaTags)}>×</button>
                    </span>
                                    ))}
                                    <input
                                        type="text"
                                        className={styles.tagInput}
                                        value={spaInput}
                                        onChange={(e) => setSpaInput(e.target.value)}
                                        onKeyDown={(e) => handleTagKeyDown(e, spaInput, setSpaInput, spaTags, setSpaTags)}
                                    />
                                </div>
                            </div>

                            {/* Nourishment Tags */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Nourishment</label>
                                <div className={styles.tagContainer}>
                                    {foodTags.map((tag, index) => (
                                        <span key={index} className={styles.tag}>
                      {tag}
                                            <button type="button" className={styles.removeTagBtn} onClick={() => removeTag(index, foodTags, setFoodTags)}>×</button>
                    </span>
                                    ))}
                                    <input
                                        type="text"
                                        className={styles.tagInput}
                                        value={foodInput}
                                        onChange={(e) => setFoodInput(e.target.value)}
                                        onKeyDown={(e) => handleTagKeyDown(e, foodInput, setFoodInput, foodTags, setFoodTags)}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* View Tags */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>View</label>
                            <div className={styles.tagContainer}>
                                {viewTags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>
                    {tag}
                                        <button type="button" className={styles.removeTagBtn} onClick={() => removeTag(index, viewTags, setViewTags)}>×</button>
                  </span>
                                ))}
                                <input
                                    type="text"
                                    className={styles.tagInput}
                                    value={viewInput}
                                    onChange={(e) => setViewInput(e.target.value)}
                                    onKeyDown={(e) => handleTagKeyDown(e, viewInput, setViewInput, viewTags, setViewTags)}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className={styles.footer}>
                        <button
                            type="button"
                            className={`${styles.btn} ${styles.cancelBtn}`}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles.createBtn}`}
                        >
                            Create
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateRoomTypeModal;