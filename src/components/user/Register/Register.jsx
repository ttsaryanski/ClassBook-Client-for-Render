import { useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { authService } from "../../../services/authService";

import styles from "./Register.module.css";

export default function Register() {
    const { login } = useAuth();
    const { setError } = useError();

    const [pending, setPending] = useState(false);
    const [isStudent, setIsStudent] = useState(true);
    const [isTeacher, setIsTeacher] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        secretKey: "",
        identifier: "",
        password: "",
        rePassword: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        try {
            await authService.register({
                firstName,
                lastName,
                email,
                identifier: identifier.trim() || null,
                secretKey: secretKey.trim() || null,
                password,
            });

            await login(email, password);
            clearForm();
        } catch (error) {
            setError("Registration failed.", error.message);
            setPassword("");
            setRePassword("");
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

    const validateEmail = (value) => {
        const emailRegex =
            /^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value) ? "" : "Invalid email format.";
    };

    const validateSecretKey = (value) => {
        const validKeys = ["director_secret_key", "teacher_secret_key"];
        if (isTeacher && !value.trim()) {
            return "Secret key is required for teachers.";
        }
        if (value.trim() && !validKeys.includes(value)) {
            return "Invalid secret key.";
        }
        return "";
    };

    const validateIdentifier = (value) => {
        const identifierRegex = /^\d{10}$/;
        if (isStudent && !value.trim()) {
            return "Identifier is required for students.";
        }
        if (value.trim() && !identifierRegex.test(value)) {
            return "Identifier must be exactly 10 digits.";
        }
        return "";
    };

    const validatePassword = (value) => {
        if (value.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const validateRePassword = (value, password) => {
        if (value !== password) {
            return "Password missmatch!";
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

    const emailChangeHandler = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    };

    const secretKeyChangeHandler = (e) => {
        const value = e.target.value;
        setSecretKey(value);
        setErrors((prev) => ({ ...prev, secretKey: validateSecretKey(value) }));
    };

    const identifierChangeHandler = (e) => {
        const value = e.target.value;
        setIdentifier(value);
        setErrors((prev) => ({
            ...prev,
            identifier: validateIdentifier(value),
        }));
    };

    const passwordChangeHandler = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    };

    const rePasswordChangeHandler = (e) => {
        const value = e.target.value;
        setRePassword(value);
        setErrors((prev) => ({
            ...prev,
            rePassword: validateRePassword(value, password),
        }));
    };

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setSecretKey("");
        setIdentifier("");
        setPassword("");
        setRePassword("");
    };

    const isFormValid =
        !errors.firstName &&
        !errors.lastName &&
        !errors.email &&
        !errors.password &&
        !errors.rePassword &&
        !errors.secretKey &&
        !errors.identifier &&
        firstName &&
        lastName &&
        email &&
        password &&
        rePassword &&
        ((isStudent && identifier) || (isTeacher && secretKey));

    return (
        <div className={styles.register}>
            <div
                className={`${styles.register_flex} flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className={styles.media}>
                        <img
                            alt="Your Company"
                            src="/footer_logo_white_cropped-min.png"
                            className={`${styles.img} mx-auto h-10 w-auto`}
                        />
                    </div>
                    <h2
                        className={`${styles.h2} mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900`}
                    >
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={submitHandler}
                        className={`${styles.form} space-y-6}`}
                    >
                        <div className={styles.form_row}>
                            <label
                                htmlFor="firstName"
                                className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                            >
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    placeholder="John"
                                    onChange={firstNameChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-base mt-1">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <label
                                htmlFor="lastName"
                                className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                            >
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    placeholder="Doe"
                                    onChange={lastNameChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-base mt-1">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <label
                                htmlFor="email"
                                className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder="john_doe@gmail.com"
                                    required
                                    onChange={emailChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-base mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <label
                                className={`${styles.label} flex items-center gap-2 cursor-pointer`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isTeacher}
                                    onChange={() => {
                                        setIsTeacher(!isTeacher);
                                        setIsStudent(!isStudent);
                                    }}
                                    className="w-4 h-4"
                                />
                                Register as a teacher
                            </label>
                        </div>

                        {isTeacher ? (
                            <div className={styles.form_row}>
                                <label
                                    htmlFor="sicret"
                                    className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                                >
                                    Sicret key
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        id="sicret"
                                        name="sicret"
                                        value={secretKey}
                                        placeholder="secretKey"
                                        onChange={secretKeyChangeHandler}
                                        className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                    />
                                    {errors.secretKey && (
                                        <p className="text-red-500 text-base mt-1">
                                            {errors.secretKey}
                                        </p>
                                    )}
                                </div>
                                <span className={`${styles.span}`}>
                                    If you are a teacher please enter your key!
                                </span>
                            </div>
                        ) : (
                            <div className={styles.form_row}>
                                <label
                                    htmlFor="identifier"
                                    className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                                >
                                    Identifier (ЕГН)
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="identifier"
                                        name="identifier"
                                        value={identifier}
                                        placeholder="identifier"
                                        onChange={identifierChangeHandler}
                                        className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                    />
                                    {errors.identifier && (
                                        <p className="text-red-500 text-base mt-1">
                                            {errors.identifier}
                                        </p>
                                    )}
                                </div>
                                <span className={`${styles.span}`}>
                                    If you are a student please enter your
                                    identifier!
                                </span>
                            </div>
                        )}

                        <div className={styles.form_row}>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="password"
                                    required
                                    onChange={passwordChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-base mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="rePassword"
                                    className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                                >
                                    Repeat Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    id="rePassword"
                                    name="rePassword"
                                    value={rePassword}
                                    placeholder="Repeat password"
                                    required
                                    onChange={rePasswordChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.rePassword && (
                                    <p className="text-red-500 text-base mt-1">
                                        {errors.rePassword}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={!isFormValid || pending}
                                className={`${
                                    styles.button
                                } flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                ${
                                    !isFormValid || pending
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-blue-700"
                                }`}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p
                        className={`${styles.gow_to} mt-10 text-center text-sm/6 text-gray-500`}
                    >
                        You are already registered, please{" "}
                        <Link
                            className={`${styles.link} font-semibold text-indigo-600 hover:text-indigo-500`}
                            to="/auth/login"
                        >
                            Login
                        </Link>
                        .
                    </p>
                </div>
            </div>
            <p className={`${styles.form} ${styles.p}`}>
                {" "}
                All fields marked with
                <span className={styles.required}></span> are required!
            </p>
        </div>
    );
}
