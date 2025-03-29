import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { clssService } from "../../../services/clssService";

import Student from "../../students/Student/Student";
import Spinner from "../../shared/Spinner/Spinner";
import NothingYet from "../../shared/NothingYet/NothingYet";

import styles from "./Clss.module.css";

export default function Clss() {
    const { clssId } = useParams();
    const { setError } = useError();
    const { user } = useAuth();

    const [clss, setClss] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [teacher, setTeacher] = useState({});
    const [students, setStudents] = useState([]);
    const [isEditor, setIsEditor] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchClass = async () => {
            try {
                const clss = await clssService.getByIdPopulate(clssId, signal);
                setClss(clss);
                setTeacher(clss.teacher);
                setStudents(clss.students);

                if (user && clss.teacher && clss.teacher._ownerId) {
                    setIsEditor(user._id === clss.teacher._ownerId.toString());
                } else {
                    setIsEditor(false);
                }

                setIsLoading(false);
            } catch (error) {
                if (!signal.aborted) {
                    setError("Error fetching classes.", error.message);
                }
            }
        };
        fetchClass();

        return () => {
            abortController.abort();
        };
    }, [clssId, setError, user]);

    return (
        <>
            {isLoading && <Spinner />}
            <h1 className={styles.h1}>Class {clss.title}</h1>
            <h3 className={styles.h1}>
                Teacher: {teacher.firstName} {teacher.lastName}
            </h3>
            <section
                className={`${styles.card_container} card users-container`}
            >
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>Image</th> */}
                                <th>Student first name</th>
                                <th>Student last name</th>
                                <th>Grades</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {!isLoading && students.length === 0 && (
                                <NothingYet />
                            )}

                            {students.map((student) => (
                                <Student
                                    key={student._id}
                                    clssId={clssId}
                                    isEditor={isEditor}
                                    student={student}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
