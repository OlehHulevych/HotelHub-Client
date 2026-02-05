
import styles from './style/staff.module.css';
import {useAdmin} from "../../context/AdminContext.tsx";
import SetPositionModal from "./Position.Component.tsx";
import {useState} from "react";

const StaffList = () => {
    // Mock Data matching the screenshot
    const {staff, maxPageStaff, pageStaff, setPageStaff} = useAdmin();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [idForPosition, setIdForPosition] = useState<string>("")
    // Function to determine how to render the "Role" column
    // Sometimes it is a text title (like Row 1), sometimes a status badge
    const renderRoleColumn = (value:boolean) => {
        switch (value) {
            case true:
                return <span className={`${styles.badge} ${styles.onDuty}`}>On Duty</span>;
            case false:
                return <span className={`${styles.badge} ${styles.offDuty}`}>Off Duty</span>;
            default:
                return <span className={styles.plainText}>{value}</span>;
        }
    };

    const SetPositionHandler = (id:string) => {
        setIdForPosition(id)
        setIsOpen(true)
    }

    return (
        <>
        <div className={styles.container}>

            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>Staff List</h2>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {staff.map((worker) => (
                        <tr key={worker.id}>
                            <td>
                                <img src={worker.photo} alt={worker.name} className={styles.photo} />
                            </td>
                            <td>
                                <div className={styles.userInfo}>
                                    <span className={styles.userName}>{worker.name}</span>
                                    <span className={styles.userJob}>{worker.position}</span>
                                </div>
                            </td>
                            <td>
                                {renderRoleColumn(worker.onDuty)}
                            </td>
                            <td className={styles.email}>{worker.email}</td>
                            <td>
                                <div className={styles.actionGroup}>
                                    <button onClick={()=>SetPositionHandler(worker.id)} className={`${styles.btn} ${styles.promoteBtn}`}>Promote</button>
                                    <button className={`${styles.btn} ${styles.banBtn}`}>Ban</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
                <button disabled={pageStaff==1} onClick={()=>setPageStaff(pageStaff-1)} className={`${styles.pageBtn} ${styles.navBtn}`}>Previous</button>
                {Array.from({length:maxPageStaff},(_,i=1)=>i+1).map((page)=>(
                    <button onClick={()=>setPageStaff(page)} className={`${styles.pageBtn} ${pageStaff==page? styles.activePage:''}`}>{page}</button>
                ))}
                <button disabled={pageStaff == maxPageStaff} onClick={()=>setPageStaff(pageStaff+1)} className={`${styles.pageBtn} ${styles.navBtn}`}>Next</button>
            </div>
        </div>
            <SetPositionModal isOpen={isOpen} onClose={()=>setIsOpen(false)} userId={idForPosition}/>
        </>
    );
};

export default StaffList;