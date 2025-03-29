import styles from "./Spinner.module.css";

export default function Spinner() {
    return (
        <div className={`${styles.spinner} loading-shade`}>
            <div className={`${styles.spinner_container} loading-container`}>
                <div className={`${styles.loading} loading-spinner`}>
                    <span className="loading-spinner-text">Loading</span>
                </div>
                //
            </div>
        </div>
    );
}
