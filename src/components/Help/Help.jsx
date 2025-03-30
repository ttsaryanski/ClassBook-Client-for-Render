import styles from "./Help.module.css";

export default function Help() {
    return (
        <div className={styles.pageHelp}>
            <main
                className={`${styles.pageHelp_main} grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8`}
            >
                <div className="text-center">
                    <p
                        className={`${styles.logoHelp} text-base font-semibold text-indigo-600`}
                    >
                        Help & Instructions
                    </p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                        How to Use the School Diary App
                    </h1>
                    <p
                        className={`${styles.p} mt-6 text-lg font-medium text-gray-500 sm:text-xl/8`}
                    >
                        Learn how to navigate and use the application based on
                        your user role.
                    </p>

                    <div className="mt-10 text-left max-w-3xl">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Guest Users
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Guests can view general school information,
                            available classes, student count per class, and a
                            full list of students.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-6">
                            Students
                        </h2>
                        <p className="text-gray-600 mt-2">
                            During registration, students must enter their
                            10-digit ID &#40;ЕГН&#41; to link their account to
                            an existing student record. They can then access
                            their personal gradebook.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-6">
                            Teachers
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Teachers register using a "{" "}
                            <span style={{ color: "red" }}>
                                teacher_secret_key
                            </span>{" "}
                            " . After registration, they should update their
                            profile with their subject specialty. They can view
                            their assigned classes and manage student grades
                            with comments.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-6">
                            Director
                        </h2>
                        <p className="text-gray-600 mt-2">
                            The director registers using a "{" "}
                            <span style={{ color: "red" }}>
                                director_secret_key
                            </span>{" "}
                            ". They can add students, create and manage classes,
                            assign teachers, and modify student enrollment.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
