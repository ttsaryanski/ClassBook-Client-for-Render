import styles from "./Grade.module.css";

export default function Grade({ value, date, comment }) {
    return (
        <div className={styles.grade}>
            <table className={`${styles.grade_table} table`}>
                <thead>
                    <tr>
                        <th>Grade</th>
                        <th>Date</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    <tr>
                        <td>{value}</td>
                        <td>{date}</td>
                        <td>{comment}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
