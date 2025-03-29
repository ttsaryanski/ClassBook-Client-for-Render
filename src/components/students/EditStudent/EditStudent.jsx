import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

import { studentService } from "../../../services/studentService";
import { clssService } from "../../../services/clssService";

import styles from "./EditStudent.module.css";

export default function EditStudent() {
    const navigate = useNavigate();
    const { setError } = useError();
    const { studentId, clssId } = useParams();

    const [pending, setPending] = useState(false);
    const [student, setStudent] = useState({});
    const [teacher, setTeacher] = useState({});
    const [grade, setGrade] = useState("");
    const [comment, setComment] = useState("");

    const [errors, setErrors] = useState({
        grade: "",
        comment: "",
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!studentId) {
            return;
        }

        setError(null);
        const fetchStudent = async () => {
            try {
                const result = await studentService.getById(studentId, signal);
                setStudent(result);
            } catch (error) {
                if (!signal.aborted) {
                    setError((prev) => [
                        ...(prev || []),
                        `Error fetching student: ,
                        ${error.message || "Unknown error"}`,
                    ]);
                }
            }
        };

        const fetchClss = async () => {
            try {
                const clssResult = await clssService.getByIdPopulate(
                    clssId,
                    signal
                );
                setTeacher(clssResult.teacher);
            } catch (error) {
                if (!signal.aborted) {
                    setError((prev) => [
                        ...(prev || []),
                        `Error fetching class: ,
                                ${error.message || "Unknown error"}`,
                    ]);
                }
            }
        };

        fetchStudent();
        fetchClss();

        return () => {
            abortController.abort();
        };
    }, [studentId, clssId, setError]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const gradeData = {
            teacher: teacher._id,
            class: clssId,
            value: Number(grade),
            comment,
        };

        setPending(true);
        setError(null);

        try {
            const updatedStudent = {
                ...student,
                grades: [...(student.grades || []), gradeData],
            };

            await studentService.editById(studentId, updatedStudent);
            navigate(`/class/${clssId}`);
        } catch (error) {
            setError("Add grade failed.", error.message);
        } finally {
            setPending(false);
        }
    };

    const validateGrade = (value) => {
        const numValue = Number(value);
        if (isNaN(numValue)) {
            return "Grade must be a number";
        }
        if (!Number.isInteger(numValue)) {
            return "Grade must be an integer";
        }
        if (numValue < 2 || numValue > 6) {
            return "Grade must be between 2 and 6";
        }
        return "";
    };

    const validateComment = (value) => {
        if (value.length < 3) {
            return "Comment must be at least 3 characters long.";
        }
        return "";
    };

    const gradeChangeHandler = (e) => {
        const value = e.target.value;
        setGrade(value);
        setErrors((prev) => ({ ...prev, grade: validateGrade(value) }));
    };

    const commentChangeHandler = (e) => {
        const value = e.target.value;
        setComment(value);
        setErrors((prev) => ({ ...prev, comment: validateComment(value) }));
    };

    const isFormValid = !errors.grade && !errors.comment && grade;

    return (
        <div className={styles.edit}>
            <div className={`${styles.modall_edit} modall`}>
                <div className={`${styles.edit_class} user-container`}>
                    <header className="headers">
                        <h2 className={styles.h2}>
                            {`Add ${student.firstName} ${student.lastName} grade`}
                        </h2>
                    </header>
                    <form onSubmit={submitHandler} className={styles.form}>
                        <div className="form-row">
                            <div className="form-group">
                                <label
                                    htmlFor="grade"
                                    className={styles.required}
                                >
                                    Grade
                                </label>
                                <div className="input-wrapper">
                                    <div className="mt-2">
                                        <div className="flex">
                                            <span>
                                                <i
                                                    className={`${styles.icon} fa-solid fa-chart-line`}
                                                ></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="grade"
                                                name="grade"
                                                value={grade}
                                                placeholder="6"
                                                onChange={gradeChangeHandler}
                                                min="2"
                                                max="6"
                                            />
                                        </div>
                                        {errors.grade && (
                                            <p className="text-danger midlle mt-1">
                                                {errors.grade}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label
                                    htmlFor="comment"
                                    className={styles.required}
                                >
                                    Comment
                                </label>
                                <div className="input-wrapper">
                                    <div className="mt-2">
                                        <div className="flex">
                                            <span>
                                                <i
                                                    className={`${styles.icon} fa-solid fa-chart-line`}
                                                ></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="comment"
                                                name="comment"
                                                value={comment}
                                                placeholder="Excellent"
                                                onChange={commentChangeHandler}
                                            />
                                        </div>
                                        {errors.comment && (
                                            <p className="text-danger midlle mt-1">
                                                {errors.comment}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="form-actions">
                            <button
                                id="action-save"
                                type="submit"
                                className={`${styles.edit_btn} btn ${
                                    !isFormValid || pending
                                        ? "disabled opacity-50"
                                        : ""
                                }`}
                                disabled={!isFormValid || pending}
                                style={{
                                    cursor:
                                        !isFormValid || pending
                                            ? "not-allowed"
                                            : "pointer",
                                }}
                            >
                                Add
                            </button>
                            <Link
                                id="action-cancel"
                                className={`${styles.cancel_btn} btn`}
                                to={`/class/${clssId}`}
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                    <p className={styles.form}>
                        {" "}
                        All fields marked with
                        <span className={styles.required}></span> are required!
                    </p>
                </div>
            </div>
        </div>
    );
}
