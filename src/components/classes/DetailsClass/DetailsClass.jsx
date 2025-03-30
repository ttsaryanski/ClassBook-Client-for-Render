import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

import { clssService } from "../../../services/clssService";
import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";

import { fromIsoToString } from "../../../utils/setDateString";

import styles from "./DetailsClass.module.css";

export default function DetailsClass() {
    const { setError } = useError();
    const { classId } = useParams();

    const [clss, setClss] = useState({});

    const [teacher, setTeacher] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchClss = async () => {
            try {
                const result = await clssService.getById(classId, signal);
                setClss(result);

                if (result.teacher) {
                    try {
                        const teacherData = await teacherService.getById(
                            result.teacher,
                            signal
                        );
                        setTeacher(teacherData);
                    } catch (error) {
                        if (!signal.aborted) {
                            setError((prev) => [
                                ...(prev || []),
                                `Error fetching teacher: ${error.message}`,
                            ]);
                        }
                    }
                } else {
                    setTeacher(null);
                }

                if (result.students && result.students.length > 0) {
                    try {
                        const studentsData = await Promise.all(
                            result.students.map((studentId) =>
                                studentService.getById(studentId, signal)
                            )
                        );
                        setStudents(studentsData);
                    } catch (error) {
                        if (!signal.aborted) {
                            setError((prev) => [
                                ...(prev || []),
                                `Error fetching students: ${error.message}`,
                            ]);
                        }
                    }
                } else {
                    setStudents([]);
                }
            } catch (error) {
                if (!signal.aborted) {
                    setError((prev) => [
                        ...(prev || []),
                        `Error fetching class: ${error.message}`,
                    ]);
                }
            }
        };
        fetchClss();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    return (
        <div className={styles.details}>
            <div className={`${styles.modall_details} modall`}>
                <div className={`${styles.details_class} detail-container`}>
                    <header className="headers">
                        <h2>{`Class ${clss.title} Detail`}</h2>
                    </header>
                    <div className="content">
                        <div className={`${styles.user_details} user-details`}>
                            <dir>
                                Class name: <strong>{clss.title}</strong>
                            </dir>
                            <dir>
                                Class teacher:{" "}
                                <strong>
                                    {teacher
                                        ? `${teacher.firstName} ${teacher.lastName}`
                                        : "Зареждане..."}
                                </strong>
                            </dir>
                            <dir className={styles.students}>
                                <span>Students: </span>
                                <strong>
                                    {students.length > 0 ? (
                                        <ul>
                                            {students
                                                .slice()
                                                .sort((a, b) =>
                                                    a.lastName.localeCompare(
                                                        b.lastName
                                                    )
                                                )
                                                .map((student) => (
                                                    <li key={student._id}>
                                                        {student.lastName}{" "}
                                                        {student.firstName}
                                                    </li>
                                                ))}
                                        </ul>
                                    ) : (
                                        <dir>В този клас няма ученици</dir>
                                    )}
                                </strong>
                            </dir>

                            <dir>
                                Created on:{" "}
                                <strong>
                                    {fromIsoToString(clss.createdAt)}
                                </strong>
                            </dir>

                            <dir>
                                Modified on:{" "}
                                <strong>
                                    {fromIsoToString(clss.updatedAt)}
                                </strong>
                            </dir>
                        </div>
                    </div>
                </div>

                <div id="form-actions">
                    <Link id="action-save" className="btn" to={"/classes"}>
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}
