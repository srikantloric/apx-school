import Table from '@mui/joy/Table';
import { resultType } from '../../types/results';
import { getClassNameByValue, GetGradeFromMark, GetStudentRank } from '../../utils/UtilityFunctions';
import { useEffect, useState } from 'react';
import { StudentDetailsType } from '../../types/student';

type MergedResultType = resultType & StudentDetailsType;

interface ResultTableProps {
    results: MergedResultType[];
}

function ResultTable({ results }: ResultTableProps) {
    const [studentClassRank, setStudentClassRank] = useState<string | number>("N/A");
    
    useEffect(() => {
        const fetchStudentRank = async () => {
            const rank = await GetStudentRank(results[0].id, results[0].class!);
            setStudentClassRank(rank || "N/A");
        };
        fetchStudentRank();
    }, [results]);

    if (results.length === 0) {
        return <p>No results available</p>;
    }

    const subjects = results[0].result;
    const totalMarksObtained = subjects.reduce((sum, item) => {
        const total = item.paperId === "DRAWING" ? 0 : Number(item.paperMarkPractical) + Number(item.paperMarkTheory);
        return sum + total;
    }, 0);

    const totalPossibleMarks = subjects.reduce((sum, item) => {
        const maxMarks = item.paperId === "DRAWING" ? 0 : 100;
        return sum + maxMarks;
    }, 0);

    const percentage = totalPossibleMarks > 0 ? ((totalMarksObtained / totalPossibleMarks) * 100).toFixed(1) : "0.00";
    
    const handlePrint = () => {
        const printContent = document.getElementById("printable-table");
        if (printContent) {
            const printWindow = window.open("", "", "width=800,height=600");
            printWindow?.document.write(`
                <html>
                <head>
                    <title>Print Result</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        @media print {
                            body * { visibility: hidden; }
                            #printable-table, #printable-table * { visibility: visible; }
                            #printable-table { position: absolute; left: 0; top: 0; width: 100%; }
                        }
                    </style>
                </head>
                <body>
                    ${printContent.outerHTML}
                </body>
                <script>
                    window.onload = function() { window.print(); window.close(); };
                </script>
                </html>
            `);
        }
    };

    return (
        <div>
            <button onClick={handlePrint} style={{ 
                marginBottom: '10px', 
                padding: '10px 20px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer', 
                fontSize: '16px',
                fontWeight: 'bold' 
            }}>🖨️ Print</button>

            <div id="printable-table">
                <Table aria-label="result table" borderAxis="both">
                    <thead>
                        <tr>
                            <th colSpan={5} className="center">Annual Exam (Term-4)</th>
                        </tr>
                        <tr>
                            <th colSpan={3}>NAME: {results[0].student_name}</th>
                            <th colSpan={2}>CLASS: {getClassNameByValue(results[0].class!)}</th>
                        </tr>
                        <tr>
                            <th colSpan={3}>FATHER NAME: {results[0].father_name}</th>
                            <th colSpan={2}>Roll No. : {results[0].class_roll}</th>
                        </tr>
                        <tr>
                            <th colSpan={3}>MOTHER NAME: {results[0].mother_name}</th>
                            <th colSpan={2}>DOB : {results[0].dob}</th>
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
            </div>
        </div>
    );
}

export default ResultTable;
