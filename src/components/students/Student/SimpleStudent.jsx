import { useMemo } from "react";

export default function SimpleStudent({
    _id,
    firstName,
    lastName,
    email,
    grades,
}) {
    const averageGrade = useMemo(() => {
        if (!grades || grades.length === 0) return "N/A";
        const sum = grades.reduce((acc, grade) => acc + grade.value, 0);
        return (sum / grades.length).toFixed(2);
    }, [grades]);

    return (
        <tr>
            <td>{lastName}</td>
            <td>{firstName}</td>
            <td>{email}</td>
            <td>{averageGrade}</td>
        </tr>
    );
}
