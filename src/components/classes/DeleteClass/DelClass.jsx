import { useEffect, useState } from "react";

import { useError } from "../../../contexts/ErrorContext";

import { clssService } from "../../../services/clssService";

import styles from "./DelClass.module.css";

export default function ShowDeleteClass({ classId, onDelete, onClose }) {
    const { setError } = useError();
    const [clss, setClss] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!classId) {
            return;
        }

        setError(null);
        const fetchClss = async () => {
            try {
                const clssResult = await clssService.getById(classId, signal);
                setClss(clssResult);
            } catch (error) {
                if (!signal.aborted) {
                    setError(
                        "Error fetching class: ",
                        error.message || "Unknown error"
                    );
                    onClose();
                }
            }
        };
        fetchClss();

        return () => {
            abortController.abort();
        };
    }, [classId, setError]);

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modall">
                <div className={`${styles.del_container} confirm-container`}>
                    <header className="headers">
                        <h2>
                            {`Are you sure you want to delete ${clss.title} class?`}
                        </h2>
                    </header>
                    <div className="actions">
                        <div id="form-actions">
                            <button
                                id="action-save"
                                className="btn"
                                type="submit"
                                onClick={onDelete}
                            >
                                Delete
                            </button>
                            <button
                                id="action-cancel"
                                className="btn"
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
