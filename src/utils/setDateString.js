export const fromIsoToString = (isoDate) => {
    const date = new Date(isoDate);

    const dateToString = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return dateToString;
};
