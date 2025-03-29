import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { authService } from "../../../services/authService";
import { teacherService } from "../../../services/teacherService";

import Spinner from "../../shared/Spinner/Spinner";

import styles from "./EditProfile.module.css";

export default function EditProfile() {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const { setError } = useError();

    const [isTeacher, setIsTeacher] = useState(false);
    const [teacherId, setTeacherId] = useState("");

    const [pending, setPending] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        speciality: "",
        file: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!user) {
            setIsLoading(true);
            return;
        }

        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");

        if (user?.role === "teacher") {
            setIsTeacher(true);

            setError(null);
            const fetchTeacher = async () => {
                try {
                    const result = await teacherService.searchTeacher(
                        user.email,
                        signal
                    );
                    const [teacher] = result;

                    setTeacherId(teacher._id);
                    setSpeciality(teacher.speciality || "");
                } catch (error) {
                    if (!signal.aborted) {
                        setError(
                            "Failed to load teacher data: ",
                            error.message
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

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        if (file) {
            formData.append("profilePicture", file[0]);
        }

        setPending(true);
        setError(null);
        try {
            const editedUser = await authService.editUser(user._id, formData);
            if (isTeacher) {
                try {
                    await teacherService.editById(teacherId, {
                        firstName,
                        lastName,
                        speciality,
                    });
                } catch (error) {
                    setError((prev) => [
                        ...(prev || []),
                        `Error editing teacher data.,
                            ${error.message || "Unknown error"}`,
                    ]);
                }
            }
            updateUser(editedUser);
            navigate("/auth/profile");
            clearForm();
        } catch (error) {
            setError((prev) => [
                ...(prev || []),
                `Error editing data.,
                    ${error.message || "Unknown error"}`,
            ]);
        } finally {
            setPending(false);
        }
    };

    const validateFirstName = (value) => {
        if (value.length < 3) {
            return "First name must be at least 3 characters long.";
        }
        return "";
    };

    const validateLastName = (value) => {
        if (value.length < 3) {
            return "Last name must be at least 3 characters long.";
        }
        return "";
    };

    const validateSpeciality = (value) => {
        if (value.length < 3) {
            return "Speciality must be at least 3 characters long.";
        }
        return "";
    };

    const validateFile = (file) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            return "Only jpg, jpeg, and png formats are allowed.";
        }
        return "";
    };

    const firstNameChangeHandler = (e) => {
        const value = e.target.value;
        setFirstName(value);
        setErrors((prev) => ({ ...prev, firstName: validateFirstName(value) }));
    };

    const lastNameChangeHandler = (e) => {
        const value = e.target.value;
        setLastName(value);
        setErrors((prev) => ({ ...prev, lastName: validateLastName(value) }));
    };

    const specialityChangeHandler = (e) => {
        const value = e.target.value;
        setSpeciality(value);
        setErrors((prev) => ({
            ...prev,
            speciality: validateSpeciality(value),
        }));
    };

    const fileChangeHandler = (e) => {
        const files = e.target.files;
        const fileName = files[0]?.name || "Choose file";
        document.querySelector(".custom-file-label").textContent = fileName;
        setFile(files && files.length > 0 ? files : null);
        setErrors((prev) => ({
            ...prev,
            file: files && files.length > 0 ? validateFile(files[0]) : "",
        }));
    };

    const isFormValid =
        !errors.firstName &&
        !errors.lastName &&
        !errors.speciality &&
        !errors.file &&
        firstName &&
        lastName;

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setSpeciality("");
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.edit}>
            <div className={`${styles.modall_edit} modall`}>
                <div className={`${styles.edit_user} user-container`}>
                    <header className={`${styles.headers} headers`}>
                        <h2>Edit User</h2>
                    </header>
                    <form onSubmit={submitHandler} className={styles.form}>
                        <div className={`${styles.form_group} form-group`}>
                            <label
                                htmlFor="firstName"
                                className={styles.required}
                            >
                                First name
                            </label>
                            <div className="input-wrapper">
                                <div className={`${styles.form_group} mt-2`}>
                                    <div className="flex">
                                        <span>
                                            <i
                                                className={`${styles.icon} fa-solid fa-user`}
                                            ></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={firstName}
                                            onChange={firstNameChangeHandler}
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <p className="text-danger mt-1">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.form_group} form-group`}>
                            <label
                                htmlFor="lastName"
                                className={styles.required}
                            >
                                Last name
                            </label>
                            <div className="input-wrapper">
                                <div className={`${styles.form_group} mt-2`}>
                                    <div className="flex">
                                        <span>
                                            <i
                                                className={`${styles.icon} fa-solid fa-user`}
                                            ></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={lastName}
                                            onChange={lastNameChangeHandler}
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <p className="text-danger mt-1">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.form_group} form-group`}>
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <span>
                                    <i
                                        className={`${styles.icon} fa-solid fa-envelope`}
                                    ></i>
                                </span>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    readOnly
                                    defaultValue={user?.email}
                                />
                            </div>
                        </div>

                        {isTeacher && (
                            <div className={`${styles.form_group} form-group`}>
                                <label htmlFor="speciality">Speciality</label>
                                <div className="input-wrapper">
                                    <div
                                        className={`${styles.form_group} mt-2`}
                                    >
                                        <div className="flex">
                                            <span>
                                                <i
                                                    className={`${styles.icon} fa-solid fa-graduation-cap`}
                                                ></i>
                                            </span>

                                            <input
                                                type="text"
                                                id="speciality"
                                                name="speciality"
                                                value={speciality}
                                                onChange={
                                                    specialityChangeHandler
                                                }
                                            />
                                        </div>
                                        {errors.speciality && (
                                            <p className="text-danger mt-1">
                                                {errors.speciality}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={`${styles.form_group} form-group`}>
                            <label htmlFor="file">
                                Peacture - Only jpg, jpeg and png!
                            </label>
                            <div className="input-wrapper">
                                <div
                                    className={`${styles.form_group} ${styles.file} mt-2`}
                                >
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i
                                                    className={`${styles.icon} fa-solid fa-camera`}
                                                ></i>
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.custom_file} custom-file`}
                                        >
                                            <label
                                                className={`${styles.custom_file_label} custom-file-label`}
                                                htmlFor="file"
                                            >
                                                Choose file
                                            </label>
                                            <input
                                                type="file"
                                                id="file"
                                                name="file"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={fileChangeHandler}
                                                className="custom-file-input"
                                            />
                                        </div>
                                    </div>
                                    {errors.file && (
                                        <p className="text-danger mt-1">
                                            {errors.file}
                                        </p>
                                    )}
                                </div>
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
                                Edit
                            </button>

                            <Link
                                id="action-cancel"
                                className="btn"
                                to={"/auth/profile"}
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
