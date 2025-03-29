import { Link } from "react-router";

import styles from "./UnderConstruction.module.css";

export default function UnderConstruction() {
    return (
        <div className={styles.under_construction}>
            <main
                className={`${styles.page404_main} grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8`}
            >
                <div className="text-center">
                    <p
                        className={`${styles.logo404} text-base font-semibold text-indigo-600`}
                    >
                        <i className="fa-solid fa-laptop-code"></i>
                    </p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        Under Construction
                    </h1>
                    <p
                        className={`${styles.p} mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8`}
                    >
                        Coming soon. This functionality is still under
                        development.
                    </p>
                    <div
                        className={`${styles.button} mt-10 flex items-center justify-center gap-x-6`}
                    >
                        <Link
                            to="/"
                            className={`${styles.link} rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            Go back home
                        </Link>
                        {/* <a
                            href="#"
                            className="text-sm font-semibold text-gray-900"
                        >
                            Contact support{" "}
                            <span aria-hidden="true">&rarr;</span>
                        </a> */}
                    </div>
                </div>
            </main>
        </div>
    );
}
