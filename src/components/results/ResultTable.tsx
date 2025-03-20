import Table from '@mui/joy/Table';
import { resultType } from '../../types/results';
import { GetGradeFromMark, GetStudentRank } from '../../utils/UtilityFunctions';



interface ResultTableProps {
    results: resultType[];
}

function ResultTable({ results }: ResultTableProps) {

    if (results.length === 0) {
        return <p>No results available</p>;
    }

    const subjects = results[0].result;

    // Calculate total obtained marks and total possible marks
    const totalMarksObtained = subjects.reduce((sum, item) => {
        const total = item.paperId === "DRAWING" ? 0 : Number(item.paperMarkPractical) + Number(item.paperMarkTheory);
        return sum + total;
    }, 0);

    const totalPossibleMarks = subjects.reduce((sum, item) => {
        const maxMarks = item.paperId === "DRAWING" ? 0 : 100;
        return sum + maxMarks;
    }, 0);

    const percentage = totalPossibleMarks > 0 ? ((totalMarksObtained / totalPossibleMarks) * 100).toFixed(1) : "0.00";

    return (
        <Table aria-label="result table" borderAxis="both">
            <thead>
                <tr>
                    <th colSpan={5} style={{ textAlign: "center" }}><strong>Annual Exam (Term-4)</strong></th>
                </tr>
                <tr>
                    <th style={{ width: '40%' }}>Subject</th>
                    <th>Theory</th>
                    <th>Pract.</th>
                    <th>Total Obtained</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {subjects.map((item, index) => {
                    const totalObtained = item.paperId === "DRAWING" ? item.paperMarkPractical : Number(item.paperMarkPractical) + Number(item.paperMarkTheory);
                    return (
                        <tr key={index}>
                            <td>{item.paperTitle}</td>
                            <td>{item.paperMarkTheory}</td>
                            <td>{item.paperMarkPractical}</td>
                            <td>{totalObtained}</td>
                            <td>{GetGradeFromMark(totalObtained)}</td>
                        </tr>
                    );
                })}
                <tr>
                    <td><strong>Percentage (%)</strong></td>
                    <td colSpan={4}><strong>{percentage}%</strong></td>
                </tr>

            </tbody>
        </Table>
    );
}

export default ResultTable;
