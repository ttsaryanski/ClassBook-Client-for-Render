import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

import { studentService } from "../../../services/studentService";

import Grade from "../Grade/Grade";
import Spinner from "../../shared/Spinner/Spinner";
import NothingYet from "../../shared/NothingYet/NothingYet";

import styles from "./StudentGrades.module.css";

export default function StudentGrades() {
    const { studentId } = useParams();
    const { setError } = useError();

    const [isLoading, setIsLoading] = useState(true);
    const [student, setStudent] = useState({});
    const [groupedGrades, setGroupedGrades] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchStudent = async () => {
            try {
                const studentData = await studentService.getByIdPopulate(
                    studentId,
                    signal
                );
                setStudent(studentData);

                const gradesByClass = studentData.grades.reduce(
                    (acc, grade) => {
                        const classTitle = grade.class.title;
                        if (!acc[classTitle]) {
                            acc[classTitle] = [];
                        }
                        acc[classTitle].push(grade);
                        return acc;
                    },
                    {}
                );

                Object.keys(gradesByClass).forEach((classTitle) => {
                    gradesByClass[classTitle].sort(
                        (a, b) => new Date(b.date) - new Date(a.date) // Най-новите първи
                    );
                });

                setGroupedGrades(gradesByClass);
                setIsLoading(false);
            } catch (error) {
                if (!signal.aborted) {
                    setError("Error fetching student.", error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudent();

        return () => {
            abortController.abort();
        };
    }, [studentId, setError]);

    const hasGrades = Object.keys(groupedGrades).length > 0;

    return (
        <>
            {isLoading && <Spinner />}
            <h1 className={styles.h1}>
                {student.firstName} {student.lastName} grades:
            </h1>
            {!isLoading && !hasGrades === 0 && <NothingYet />}

            <div className={styles.gradesContainer}>
                {Object.entries(groupedGrades).map(([classTitle, grades]) => (
                    <div key={classTitle} className={styles.classSection}>
                        <h2 className={styles.h2}>Class: {classTitle}</h2>
                        <ul className={styles.gradeList}>
                            {grades.map((grade) => (
                                <Grade
                                    key={grade._id}
                                    value={grade.value}
                                    date={new Date(
                                        grade.date
                                    ).toLocaleDateString()}
                                    teacher={grade.teacher}
                                    comment={grade.comment}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
