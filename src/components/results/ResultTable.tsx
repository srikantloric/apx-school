import Table from '@mui/joy/Table';
import { resultType } from '../../types/results';
import { GetGradeFromMark, GetStudentRank } from '../../utils/UtilityFunctions';
import { useEffect, useState } from 'react';
import { StudentDetailsType } from '../../types/student';

type MergedResultType = resultType & StudentDetailsType;

interface ResultTableProps {
    results: MergedResultType[];
}

function ResultTable({ results }: ResultTableProps) {
    const [studentClassRank, setStudentClassRank] = useState<string | number>("");

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


    useEffect(() => {
        const fetchStudentRank = async () => {
            const rank = await GetStudentRank(results[0].id, results[0].class!)
            console.log(rank)
            if (rank) {
                setStudentClassRank(rank)

            } else {
                setStudentClassRank("N/A")
            }
        }
        fetchStudentRank()
    }, [])

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
                <tr>
                    <td><strong>Class Rank</strong></td>
                    <td colSpan={4}><strong>{studentClassRank}</strong></td>
                </tr>

            </tbody>
        </Table>
    );
}

export default ResultTable;
