import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { studentService } from "../../../services/studentService";

import SimpleStudent from "../Student/SimpleStudent";
import NothingYet from "../../shared/NothingYet/NothingYet";
import Spinner from "../../shared/Spinner/Spinner";

import styles from "./Students.module.css";

export default function Students() {
    const { isDirector } = useAuth();
    const { setError } = useError();

    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchStudents = async () => {
            try {
                const result = await studentService.getAll(signal);
                setStudents(result);
                setIsLoading(false);
            } catch (error) {
                if (!signal.aborted) {
                    setError("Error fetching classes.", error.message);
                }
            }
        };
        fetchStudents();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    return (
        <>
            <h1 className={styles.h1}>Students</h1>
            <section
                className={`${styles.card_container} card users-container`}
            >
                <div className="table-wrapper">
                    {isLoading && <Spinner />}

                    {!isLoading && students.length === 0 && <NothingYet />}

                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>Image</th> */}
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>Average grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students
                                .slice()
                                .sort((a, b) =>
                                    a.lastName.localeCompare(b.lastName)
                                )
                                .map((student) => (
                                    <SimpleStudent
                                        key={student._id}
                                        {...student}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
                {isDirector && (
                    <Link
                        className={`${styles.add_btn} btn-add btn`}
                        to={"/students/create"}
                    >
                        Add new student
                    </Link>
                )}
            </section>
        </>
    );
}
