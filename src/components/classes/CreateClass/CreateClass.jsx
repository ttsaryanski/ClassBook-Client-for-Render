import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

import { useError } from "../../../contexts/ErrorContext";
import { useClass } from "../../../contexts/ClassContext";

import { clssService } from "../../../services/clssService";
import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";

import styles from "./CreateClass.module.css";

export default function CreateClass() {
    const navigate = useNavigate();
    const { setError } = useError();
    const { refreshClasses } = useClass();

    const [pending, setPending] = useState(false);

    const [classTitle, setClassTitle] = useState("");
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedStudentsIds, setSelectedStudentsIds] = useState([]);

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [errors, setErrors] = useState({
        title: "",
        teacher: "",
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchTeachers = async () => {
            try {
                const dataTeachers = await teacherService.getAll(signal);
                setTeachers(dataTeachers);
            } catch (error) {
                if (!signal.aborted) {
                    setError((prev) => [
                        ...(prev || []),
                        `Error fetching teacher: ${error.message}`,
                    ]);
                }
            }
        };

        const fetchStudents = async () => {
            try {
                const dataSudents = await studentService.getAll(signal);
                setStudents(dataSudents);
            } catch (error) {
                if (!signal.aborted) {
                    setError((prev) => [
                        ...(prev || []),
                        `Error fetching students: ${error.message}`,
                    ]);
                }
            }
        };

        fetchTeachers();
        fetchStudents();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!selectedTeacherId) {
            setSelectedTeacher(null);
            return;
        }

        setError(null);
        const fetchTeacher = async () => {
            try {
                const dataTeacher = await teacherService.getById(
                    selectedTeacherId,
                    signal
                );
                setSelectedTeacher(dataTeacher);
            } catch (error) {
                if (!signal.aborted) {
                    setError(`Error fetching teacher: ${error.message}`);
                }
            }
        };
        fetchTeacher();

        return () => {
            abortController.abort();
        };
    }, [selectedTeacherId, setError]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!selectedStudentsIds || selectedStudentsIds.length === 0) {
            setSelectedStudents([]);
            return;
        }

        setError(null);
        const fetchStudents = async () => {
            try {
                const studentsData = await Promise.all(
                    selectedStudentsIds.map((id) =>
                        studentService.getById(id, signal)
                    )
                );
                setSelectedStudents(studentsData);
            } catch (error) {
                if (!signal.aborted) {
                    setError(`Error fetching students: ${error.message}`);
                }
            }
        };
        fetchStudents();

        return () => {
            abortController.abort();
        };
    }, [selectedStudentsIds, setError]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const classData = {
            title: classTitle,
            teacher: selectedTeacherId,
            students: selectedStudentsIds,
        };

        setPending(true);
        setError(null);
        try {
            const newClass = await clssService.createNew(classData);

            await teacherService.editById(selectedTeacherId, {
                clssToAdd: newClass._id,
            });

            if (selectedStudentsIds.length > 0) {
                const studentUpdates = selectedStudentsIds.map(async (id) => {
                    try {
                        await studentService.editById(id, {
                            clssToAdd: newClass._id,
                        });
                    } catch (error) {
                        throw new Error(
                            `Failed to add class to student ${id}: ${error.message}`
                        );
                    }
                });
                await Promise.all(studentUpdates);
            }

            refreshClasses();
            navigate("/classes");
        } catch (error) {
            setError((prev) => [
                ...(prev || []),
                `Create class failed: ${error.message}`,
            ]);
        } finally {
            setPending(false);
        }
    };

    const validateTitle = (value) => {
        if (value.length < 3) {
            return "Class title must be at least 3 characters long.";
        }
        return "";
    };

    const validateTeacher = (value) => {
        if (value === "") {
            return "You must choose a teacher.";
        }
        return "";
    };

    const titleChangeHandler = (e) => {
        const value = e.target.value;
        setClassTitle(value);
        setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
    };

    const teacherChangeHandler = (e) => {
        const value = e.target.value;
        setSelectedTeacherId(value);
        setErrors((prev) => ({ ...prev, teacher: validateTeacher(value) }));
    };

    const studentChangeHandler = (e) => {
        const selectedOptions = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedStudentsIds(selectedOptions);
    };

    const isFormValid =
        !errors.title && !errors.teacher && classTitle && selectedTeacherId;

    return (
        <div className={styles.create}>
            <div className={`${styles.modall_create} modall`}>
                <div className={`${styles.create_class} user-container`}>
                    <header className="headers">
                        <h2 className={styles.h2}>Add Class</h2>
                    </header>
                    <form onSubmit={submitHandler} className={styles.form}>
                        <div className="form-row">
                            <div className="form-group">
                                <label
                                    htmlFor="classTitle"
                                    className={styles.required}
                                >
                                    Class Title
                                </label>
                                <div className="input-wrapper">
                                    <div className="mt-2">
                                        <div className="flex">
                                            <span>
                                                <i
                                                    className={`${styles.icon} fa-solid fa-chalkboard`}
                                                ></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={classTitle || ""}
                                                placeholder="History"
                                                onChange={titleChangeHandler}
                                            />
                                        </div>
                                        {errors.title && (
                                            <p className="text-danger midlle mt-1">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label
                                    htmlFor="teacher"
                                    className={styles.required}
                                >
                                    Teachers
                                </label>
                                <div className="input-wrapper">
                                    <select
                                        id="teacher"
                                        name="teacher"
                                        value={selectedTeacherId}
                                        onChange={teacherChangeHandler}
                                    >
                                        <option value="" disabled>
                                            Select teacher
                                        </option>
                                        {teachers.map((teacher) => (
                                            <option
                                                key={teacher._id}
                                                value={teacher._id}
                                            >
                                                {teacher.firstName}{" "}
                                                {teacher.lastName} -{" "}
                                                {teacher.speciality}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.teacher && (
                                    <p className="text-danger midlle mt-1">
                                        {errors.teacher}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Selected Teachers</label>
                                <div className="input-wrapper">
                                    <div className="input-wrapper">
                                        <span>
                                            <i
                                                className={`${styles.icon} fa-solid fa-user`}
                                            ></i>
                                        </span>
                                        <input
                                            value={
                                                selectedTeacher
                                                    ? `${selectedTeacher.firstName} ${selectedTeacher.lastName} - ${selectedTeacher.speciality}`
                                                    : ""
                                            }
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="students">Students</label>
                                <div className="input-wrapper">
                                    <select
                                        id="students"
                                        name="students"
                                        multiple
                                        value={selectedStudentsIds}
                                        onChange={studentChangeHandler}
                                    >
                                        <option value="" disabled>
                                            Select students
                                        </option>
                                        {students.map((student) => (
                                            <option
                                                key={student._id}
                                                value={student._id}
                                            >
                                                {student.firstName}{" "}
                                                {student.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Selected students</label>
                                {selectedStudents.length > 0 ? (
                                    selectedStudents.map((student) => (
                                        <div
                                            key={student._id}
                                            className="input-wrapper"
                                        >
                                            <span>
                                                <i
                                                    className={`${styles.icon} fa-solid fa-user`}
                                                ></i>
                                            </span>
                                            <input
                                                value={`${student.firstName} ${student.lastName}`}
                                                readOnly
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="input-wrapper">
                                        <span>
                                            <i
                                                className={`${styles.icon} fa-solid fa-user`}
                                            ></i>
                                        </span>
                                        <input readOnly placeholder="" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div id="form-actions">
                            <button
                                id="action-save"
                                type="submit"
                                className={`btn btn-primary ${
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
                                Save
                            </button>
                            <Link
                                id="action-cancel"
                                className={`${styles.cancel_btn} btn`}
                                to={"/classes"}
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
