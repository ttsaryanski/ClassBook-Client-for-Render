import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { teacherService } from "../../../services/teacherService";

import { fromIsoToString } from "../../../utils/setDateString";

import styles from "./Profile.module.css";

export default function Profile() {
    const { user } = useAuth();
    const { setError } = useError();

    const [picture, setPicture] = useState({});
    const [isTeacher, setIsTeacher] = useState(false);
    const [speciality, setSpeciality] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!user) {
            setIsLoading(true);
            return;
        }

        if (user.profilePicture?.fileUrl) {
            setPicture(user.profilePicture);
        } else {
            setPicture(null);
        }

        if (user?.role === "teacher") {
            setIsTeacher(true);
            setIsLoading(true);

            setError(null);
            const fetchTeacher = async () => {
                try {
                    const result = await teacherService.searchTeacher(
                        user.email,
                        signal
                    );
                    const [teacher] = result;
                    setSpeciality(teacher.speciality);
                } catch (error) {
                    if (!signal.aborted) {
                        setError(
                            `Failed to load teacher data: ${error.message}`
                        );
                    }
                }
            };
            fetchTeacher();
        }

        setIsLoading(false);
        return () => {
            abortController.abort();
        };
    }, [user, setError]);

    return (
        <div className={styles.profile}>
            <div className={`${styles.details} detail-container`}>
                <header className={`${styles.headers} headers`}>
                    <h2>User Detail</h2>
                </header>
                <div className={`${styles.content} content`}>
                    <div className="image-container">
                        {picture ? (
                            <img
                                src={picture.fileUrl}
                                alt={`${user?.firstName} ${user?.lastName}`}
                                className="image"
                            />
                        ) : (
                            <img src="/profile.png" alt="Default profile" />
                        )}
                    </div>
                    <div className="user-details">
                        <p>
                            Full Name:{" "}
                            <strong>
                                {user?.firstName} {user?.lastName}
                            </strong>
                        </p>
                        <p>
                            Email: <strong>{user?.email}</strong>
                        </p>
                        <p>
                            Status: <strong>{user?.role}</strong>
                        </p>

                        {isTeacher && (
                            <p>
                                Speciality:{" "}
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <strong>{speciality}</strong>
                                )}
                            </p>
                        )}

                        <p>
                            Created on:{" "}
                            <strong>
                                {fromIsoToString(user?.dateCreated)}
                            </strong>
                        </p>
                        <p>
                            Modified on:{" "}
                            <strong>{fromIsoToString(user?.dateUpdate)}</strong>
                        </p>
                    </div>
                </div>

                <Link
                    to={`/auth/profile/${user?._id}`}
                    className={styles.btn_edit}
                    title="edit"
                >
                    Edit
                </Link>
            </div>
        </div>
    );
}
