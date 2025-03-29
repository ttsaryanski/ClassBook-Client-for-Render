import { Link } from "react-router";

import styles from "./Boundary.module.css";

export default function Boundary() {
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
                        Whoops, there's a bug in the code &#40;:
                    </h1>
                    <p
                        className={`${styles.p} mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8`}
                    >
                        The author will do everything possible to fix the
                        problem. Press button "Go back home" and reload page!
                    </p>
                    <div
                        className={`${styles.button} mt-10 flex items-center justify-center gap-x-6`}
                    >
                        <a
                            href="/"
                            className={`${styles.link} text-sm font-semibold text-gray-900`}
                        >
                            Go back home
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
