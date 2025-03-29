import { Link } from "react-router";

import Map from "../../components/shared/Map";

import styles from "./Contacts.module.css";

export default function Contacts() {
    return (
        <section
            className={`${styles.contact_section} ${styles.layout_padding}`}
        >
            <div className={styles.container}>
                <div className={styles.heading_container}>
                    <h2 className={styles.h2}>Contact Us</h2>
                </div>
                <div className={styles.row}>
                    <div
                        className={`${styles.col_md_6} col-sm-12 col-md-12 col-lg-4`}
                    >
                        <div
                            className={`${styles.contact_info} contact-info white`}
                        >
                            <div className="contact-item media">
                                {" "}
                                <i
                                    className={`${styles.icon} fa fa-map-marker-alt media-left media-right-margin`}
                                ></i>
                                <div
                                    className={`${styles.media_body} media-body`}
                                >
                                    <p className="text-uppercase">Address</p>
                                    <p className="text-uppercase">
                                        City, Country
                                    </p>
                                </div>
                            </div>
                            <div className="contact-item media">
                                {" "}
                                <i
                                    className={`${styles.icon} fa fa-mobile media-left media-right-margin`}
                                ></i>
                                <div
                                    className={`${styles.media_body} media-body`}
                                >
                                    <p className="text-uppercase">Phone</p>
                                    <p className="text-uppercase">
                                        (359) 000 00 00 00
                                    </p>
                                </div>
                            </div>
                            <div className="contact-item media">
                                {" "}
                                <i
                                    className={`${styles.icon} fa fa-envelope media-left media-right-margin`}
                                ></i>
                                <div
                                    className={`${styles.media_body} media-body`}
                                >
                                    <p className="text-uppercase">E-mail</p>
                                    <p className="text-uppercase">
                                        email@gmail.com
                                    </p>
                                </div>
                            </div>
                            <div className="contact-item media">
                                {" "}
                                <i
                                    className={`${styles.icon} fa fa-clock media-left media-right-margin`}
                                ></i>
                                <div
                                    className={`${styles.media_body} media-body`}
                                >
                                    <p className="text-uppercase">
                                        Working Hours
                                    </p>
                                    <p className="text-uppercase">
                                        Mon-Fri 9.00H to 17.00H.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col_md_6}>
                        <div className={styles.map_container}>
                            <div className={styles.map}>
                                <div
                                    id="googleMap"
                                    style={{ width: "100%", height: "100%" }}
                                >
                                    <Map />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.col_md_6} ${styles.contacts_form}`}>
                    <form className={styles.form}>
                        <div className={styles.input_container}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Name"
                            />
                        </div>
                        <div className={styles.input_container}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Phone Number"
                            />
                        </div>
                        <div className={styles.input_container}>
                            <input
                                className={styles.input}
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className={styles.input_container}>
                            <input
                                className={`${styles.input} ${styles.message_box}`}
                                type="text"
                                placeholder="Message"
                            />
                        </div>

                        <Link
                            to={"/underconstruction"}
                            className={`${styles.button} ${styles.link}`}
                        >
                            SEND
                        </Link>
                    </form>
                </div>
            </div>
        </section>
    );
}
