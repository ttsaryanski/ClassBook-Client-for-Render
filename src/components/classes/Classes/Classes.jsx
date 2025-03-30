import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";
import { useClass } from "../../../contexts/ClassContext";

import { clssService } from "../../../services/clssService";
import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";

import OneClass from "../OneClass/OneClass";
import ShowDeleteClass from "../DeleteClass/DelClass";
import NothingYet from "../../shared/NothingYet/NothingYet";
import Spinner from "../../shared/Spinner/Spinner";

import styles from "./Classes.module.css";

export default function Classes() {
    const { isDirector } = useAuth();
    const { setError } = useError();
    const { refreshClasses } = useClass();

    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pending, setPending] = useState(false);
    const [showDelClassById, setShowDelClassById] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchClasses = async () => {
            try {
                const result = await clssService.getAll(signal);
                setClasses(result);
                setIsLoading(false);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error.message);
                }
            }
        };
        fetchClasses();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    const deleteClass = async () => {
        if (pending) {
            return;
        }

        setPending(true);
        setError(null);
        try {
            const classToDelete = classes.find(
                (clss) => clss._id === showDelClassById
            );

            if (!classToDelete) {
                throw new Error("Class not found in local state");
            }

            await clssService.delById(showDelClassById);

            if (classToDelete.teacher) {
                const teacherId = classToDelete.teacher;

                await teacherService.editById(teacherId, {
                    clssToRemove: showDelClassById,
                });
            }

            if (classToDelete.students?.length > 0) {
                const studentUpdates = classToDelete.students.map(
                    async (id) => {
                        try {
                            await studentService.editById(id, {
                                clssToRemove: showDelClassById,
                            });
                        } catch (error) {
                            throw new Error(
                                `Failed to remove class from student ${id}: ${error.message}`
                            );
                        }
                    }
                );
                await Promise.all(studentUpdates);
            }

            setClasses((state) =>
                state.filter((clss) => clss._id !== showDelClassById)
            );

            refreshClasses();
            setShowDelClassById(null);
        } catch (error) {
            setError((prev) => [
                ...(prev || []),
                `Failded delete this klass: ${error.message}`,
            ]);
        } finally {
            setPending(false);
        }
    };

    const showDeleteClass = (clssId) => {
        setShowDelClassById(clssId);
    };

    const closeDeleteClass = () => {
        setShowDelClassById(null);
    };

    return (
        <>
            <h1 className={styles.h1}>Classes</h1>
            <section
                className={`${styles.card_container} card users-container`}
            >
                {showDelClassById && (
                    <ShowDeleteClass
                        classId={showDelClassById}
                        onDelete={deleteClass}
                        onClose={closeDeleteClass}
                    />
                )}

                <div className="table-wrapper">
                    {isLoading && <Spinner />}

                    {!isLoading && classes.length === 0 && <NothingYet />}

                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>Image</th> */}
                                <th>Class Title</th>
                                <th>Class Teacher</th>
                                <th>Students counts</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes
                                .slice()
                                .sort((a, b) => a.title.localeCompare(b.title))
                                .map((clss) => (
                                    <OneClass
                                        key={clss._id}
                                        onDel={showDeleteClass}
                                        isDirector={isDirector}
                                        pending={pending}
                                        {...clss}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>

                {isDirector && (
                    <Link
                        className={`${styles.add_btn} btn-add btn`}
                        to={"/classes/create"}
                    >
                        Add new class
                    </Link>
                )}
            </section>
        </>
    );
}
