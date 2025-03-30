import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

import { studentService } from "../../../services/studentService";

import styles from "./CreateStudent.module.css";

export default function CreateStudents() {
    const navigate = useNavigate();
    const { setError } = useError();

    const [pending, setPending] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        identifier: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        try {
            await studentService.createNew({ firstName, lastName, identifier });
            navigate("/students");
        } catch (error) {
            setError(`Create student failed: ${error.message}`);
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

    const validateIdentifier = (value) => {
        const identifierRegex = /^\d{10}$/;
        return identifierRegex.test(value)
            ? ""
            : "Identifier must be exactly 10 digits.";
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

    const identifierChangeHandler = (e) => {
        const value = e.target.value;
        setIdentifier(value);
        setErrors((prev) => ({
            ...prev,
            identifier: validateIdentifier(value),
        }));
    };

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setIdentifier("");
    };

    const isFormValid =
        !errors.firstName &&
        !errors.lastName &&
        !errors.identifier &&
        firstName &&
        lastName &&
        identifier;

    return (
        <div className={styles.create}>
            <div className={`${styles.modall_create} modall`}>
                <div className={`${styles.create_class} user-container`}>
                    <header className="headers">
                        <h2 className={styles.h2}>Add Student</h2>
                    </header>
                    <form onSubmit={submitHandler} className={styles.form}>
                        <div className="form-row">
                            <div className="form-group">
                                <label
                                    htmlFor="firstName"
                                    className={styles.required}
                                >
                                    First name
                                </label>
                                <div className="input-wrapper">
                                    <div className="mt-2">
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
                                                placeholder="John"
                                                onChange={
                                                    firstNameChangeHandler
                                                }
                                            />
                                        </div>
                                        {errors.firstName && (
                                            <p className="text-danger midlle mt-1">
                                                {errors.firstName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label
                                    htmlFor="lastName"
                                    className={styles.required}
                                >
                                    Last name
                                </label>
                                <div className="input-wrapper">
                                    <div className="mt-2">
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
                                                placeholder="Doe"
                                                onChange={lastNameChangeHandler}
                                            />
                                        </div>
                                        {errors.lastName && (
                                            <p className="text-danger midlle mt-1">
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label
                                    htmlFor="identifier"
                                    className={styles.required}
                                >
                                    Identifier
                                </label>
                                <div className="input-wrapper">
                                    <div className="mt-2">
                                        <div className="flex">
                                            <span>
                                                <i
                                                    className={`${styles.icon} fa-solid fa-shield`}
                                                ></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="identifier"
                                                name="identifier"
                                                value={identifier}
                                                placeholder="9901011001"
                                                onChange={
                                                    identifierChangeHandler
                                                }
                                            />
                                        </div>
                                        {errors.identifier && (
                                            <p className="text-danger midlle mt-1">
                                                {errors.identifier}
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
                                to={"/students"}
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
