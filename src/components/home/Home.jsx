import styles from "./Home.module.css";

export default function Home() {
    return (
        <section className="client_section layout_padding">
            <div className="container">
                <div className={styles.row}>
                    <div className="col-lg-9 col-md-10 mx-auto">
                        <div className="heading_container">
                            <h2 className={styles.h2}>Home</h2>
                        </div>
                        <div
                            id="carouselExampleControls"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div
                                        className={`${styles.detail_box} detail-box`}
                                    >
                                        <p className={styles.p}>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Vel
                                            inventore dolores reprehenderit
                                            facere dolor sint nostrum asperiores
                                            possimus sequi fugit accusantium
                                            dolorem magnam maiores officiis
                                            similique, praesentium temporibus,
                                            ducimus ullam?
                                        </p>

                                        <div className={styles.detail_img}>
                                            <img
                                                className={styles.img}
                                                src="AG1.jpg"
                                                alt="AG1"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div
                                        className={`${styles.detail_box} detail-box`}
                                    >
                                        <p className={styles.p}>
                                            Lorem ipsum dolor, sit amet
                                            consectetur adipisicing elit. Omnis
                                            quos, voluptatibus deserunt atque,
                                            repudiandae tempora architecto
                                            libero quas a numquam non. Adipisci
                                            at nemo, praesentium voluptatem a
                                            quis? Quis, perspiciatis.
                                        </p>
                                        <div className={styles.detail_img}>
                                            <img
                                                className={styles.img}
                                                src="AG2.jpg"
                                                alt="AG2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div
                                        className={`${styles.detail_box} detail-box`}
                                    >
                                        <p className={styles.p}>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Error
                                            harum recusandae, nulla adipisci
                                            autem enim ipsa quo necessitatibus
                                            dicta dolore reiciendis quos
                                            molestiae optio, vero corporis
                                            excepturi consectetur sit odio.
                                        </p>
                                        <div className={styles.detail_img}>
                                            <img
                                                className={styles.img}
                                                src="AG3.jpg"
                                                alt="AG3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a
                                className={`${styles.link} carousel-control-prev`}
                                href="#carouselExampleControls"
                                role="button"
                                data-slide="prev"
                            >
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className={`${styles.link} carousel-control-next`}
                                href="#carouselExampleControls"
                                role="button"
                                data-slide="next"
                            >
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
