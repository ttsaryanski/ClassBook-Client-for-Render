import { Link } from "react-router";

import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <div className={styles.contacts}>
                    <h4 className={styles.h4}>Contact Us</h4>
                    <ul className={styles.ul}>
                        <li className={styles.list}>
                            <a
                                className={styles.link}
                                href="https://www.facebook.com/tsvetan.tsaryanski/"
                                target="_blank"
                            >
                                <i className="fa-brands fa-square-facebook"></i>
                            </a>
                        </li>
                        <li className={styles.list}>
                            <a
                                className={styles.link}
                                href="https://github.com/ttsaryanski"
                                target="_blank"
                            >
                                <i className="fa-brands fa-square-github"></i>
                            </a>
                        </li>
                        <li className={styles.list}>
                            <a
                                className={styles.link}
                                href="https://linkedin.com/in/tsvetan-tsaryanski-765775327"
                                target="_blank"
                            >
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </li>
                        <li className={styles.list}>
                            <a
                                className={styles.link}
                                href="mailto:ttsaryanski@gmail.com"
                            >
                                <i className="fa-solid fa-square-envelope"></i>
                            </a>
                        </li>
                    </ul>

                    <p className={styles.par}>Fictional Address</p>
                    <p className={styles.par}>City, Postcode</p>
                    <p className={styles.par}>(359) 000 00 00 00</p>
                </div>

                <div className={styles.media}>
                    <Link to="/">
                        <img
                            className={styles.img}
                            src="/footer_logo_white_cropped-min.png"
                            alt="Logo"
                        />
                    </Link>
                </div>
            </div>

            <p className={styles.par}>
                This application is an exam project for the React course at{" "}
                <a
                    className={styles.link}
                    href="https://softuni.bg"
                    target="_blank"
                >
                    SoftUni
                </a>{" "}
                . Author: Tsvetan Tsaryanski.
            </p>
        </footer>
    );
}
