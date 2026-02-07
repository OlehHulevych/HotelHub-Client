import React, { useState, useEffect,type ChangeEvent, type KeyboardEvent, type FormEvent } from 'react';
import { X, UploadCloud } from 'lucide-react';
import styles from './style/editRoomType.module.css';
import type {RoomType} from "../../types.ts";
import axios from "axios";
import Cookies from "js-cookie";
import {useAdmin} from "../../context/AdminContext.tsx";



export interface RoomTypeTags {
    spa: string[];
    nourishment: string[];
    view: string[];
}




interface EditRoomTypeModalProps {
    isOpen: boolean;
    id:string;
    onClose: () => void;
    initialData?: RoomType;
    
}

const EditRoomTypeModal: React.FC<EditRoomTypeModalProps> = ({ isOpen, onClose, initialData,id }) => {
    
    const [name, setName] = useState('');
    const {reload, setReload} = useAdmin()

   
    const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
    
    const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
   
    const [newFiles, setNewFiles] = useState<File[]>([]);
    
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

   
    const [spaTags, setSpaTags] = useState<string[]>([]);
    const [spaInput, setSpaInput] = useState('');

    const [foodTags, setFoodTags] = useState<string[]>([]);
    const [foodInput, setFoodInput] = useState('');

    const [viewTags, setViewTags] = useState<string[]>([]);
    const [viewInput, setViewInput] = useState('');

    // --- Initialize Data ---
    useEffect(() => {
        if (isOpen && initialData) {
            setName(initialData.name);
            setExistingPhotos(initialData.photos || []);
            setSpaTags(initialData.spa || []);
            setFoodTags(initialData.norishment || []);
            setViewTags(initialData.view || []);

            // Reset temporary states
            setPhotosToDelete([]);
            setNewFiles([]);
            setNewPreviews([]);
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    // --- Handlers: Photos ---

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const files = Array.from(e.target.files);

        setNewFiles(prev => [...prev, ...files]);

        // Create previews
        const urls = files.map(file => URL.createObjectURL(file));
        setNewPreviews(prev => [...prev, ...urls]);
    };

    const removeExistingPhoto = (photoUrl: string) => {
        // Add to deletion list
        setPhotosToDelete(prev => [...prev, photoUrl]);
        // Remove from UI list
        setExistingPhotos(prev => prev.filter(url => url !== photoUrl));
    };

    const removeNewPhoto = (index: number) => {
        // Revoke URL to prevent memory leak
        URL.revokeObjectURL(newPreviews[index]);

        setNewFiles(prev => prev.filter((_, i) => i !== index));
        setNewPreviews(prev => prev.filter((_, i) => i !== index));
    };

    // --- Handlers: Tags ---

    const handleTagKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        currentInput: string,
        setInput: React.Dispatch<React.SetStateAction<string>>,
        tags: string[],
        setTags: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        if (e.key === 'Enter' && currentInput.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(currentInput.trim())) {
                setTags([...tags, currentInput.trim()]);
            }
            setInput('');
        } else if (e.key === 'Backspace' && currentInput === '' && tags.length > 0) {
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string, tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>>) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    // --- Handlers: Submit ---

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name )
        photosToDelete.forEach(photo=>{
            formData.append("deletedPhotos", photo)
        })
        newFiles.forEach(photo=>{
            formData.append("newPhotos", photo)
        })
        spaTags.forEach(tag=>{
            formData.append("spa", tag)
        })
        viewTags.forEach(tag=>{
            formData.append("view", tag)
        })
        foodTags.forEach(tag=>{
            formData.append("norishment", tag)
        })

        try{
            const token = Cookies.get("token");
            const response = await axios.post(import.meta.env.VITE_API_URL + `/RoomType/update/${id}`, formData, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status==200){
                setReload(reload+1)
                onClose()
            }
        }
        catch(error){
            console.error("Error occurred "+error)
        }
        
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <div className={styles.header}>
                    <h3 className={styles.title}>Edit Room Type</h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.body}>

                        {/* Name Input */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Deluxe King"
                            />
                        </div>

                        {/* Photo Upload Area */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Room Photos</label>

                            {/* Drag & Drop Zone */}
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

                            {/* Photo Preview Grid */}
                            {(existingPhotos.length > 0 || newPreviews.length > 0) && (
                                <div className={styles.previewGrid}>

                                    {/* Render Existing Photos */}
                                    {existingPhotos.map((url, idx) => (
                                        <div key={`old-${idx}`} className={styles.previewWrapper}>
                                            <img src={url} alt="Old" className={styles.previewImg} />
                                            <div className={styles.existingLabel}>Existing</div>
                                            <button
                                                type="button"
                                                className={styles.removeImgBtn}
                                                onClick={() => removeExistingPhoto(url)}
                                            >
                                                <X size={12} strokeWidth={3} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Render New Photos */}
                                    {newPreviews.map((url, idx) => (
                                        <div key={`new-${idx}`} className={styles.previewWrapper}>
                                            <img src={url} alt="New" className={styles.previewImg} />
                                            <div className={styles.existingLabel} style={{background: '#66bb6a'}}>New</div>
                                            <button
                                                type="button"
                                                className={styles.removeImgBtn}
                                                onClick={() => removeNewPhoto(idx)}
                                            >
                                                <X size={12} strokeWidth={3} />
                                            </button>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div>

                        {/* Tags Grid Row 1 */}
                        <div className={styles.gridRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Spa</label>
                                <div className={styles.tagContainer}>
                                    {spaTags.map((tag, idx) => (
                                        <span key={idx} className={styles.tag}>
                      {tag}
                                            <button type="button" className={styles.removeTagBtn} onClick={() => removeTag(tag, spaTags, setSpaTags)}>×</button>
                    </span>
                                    ))}
                                    <input
                                        className={styles.tagInput}
                                        placeholder="Type and press Enter..."
                                        value={spaInput}
                                        onChange={(e) => setSpaInput(e.target.value)}
                                        onKeyDown={(e) => handleTagKeyDown(e, spaInput, setSpaInput, spaTags, setSpaTags)}
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Nourishment</label>
                                <div className={styles.tagContainer}>
                                    {foodTags.map((tag, idx) => (
                                        <span key={idx} className={styles.tag}>
                      {tag}
                                            <button type="button" className={styles.removeTagBtn} onClick={() => removeTag(tag, foodTags, setFoodTags)}>×</button>
                    </span>
                                    ))}
                                    <input
                                        className={styles.tagInput}
                                        placeholder="Type and press Enter..."
                                        value={foodInput}
                                        onChange={(e) => setFoodInput(e.target.value)}
                                        onKeyDown={(e) => handleTagKeyDown(e, foodInput, setFoodInput, foodTags, setFoodTags)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tags Grid Row 2 */}
                        <div className={styles.gridRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>View</label>
                                <div className={styles.tagContainer}>
                                    {viewTags.map((tag, idx) => (
                                        <span key={idx} className={styles.tag}>
                      {tag}
                                            <button type="button" className={styles.removeTagBtn} onClick={() => removeTag(tag, viewTags, setViewTags)}>×</button>
                    </span>
                                    ))}
                                    <input
                                        className={styles.tagInput}
                                        placeholder="Type and press Enter..."
                                        value={viewInput}
                                        onChange={(e) => setViewInput(e.target.value)}
                                        onKeyDown={(e) => handleTagKeyDown(e, viewInput, setViewInput, viewTags, setViewTags)}
                                    />
                                </div>
                            </div>

                            {/* Duplicate "View" column to match screenshot exactly, or leave empty if not needed. 
                  I will add a placeholder for symmetry based on the image provided. */}
                            
                        </div>

                    </div>

                    <div className={styles.footer}>
                        <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRoomTypeModal;