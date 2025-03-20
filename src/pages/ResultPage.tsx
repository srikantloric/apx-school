import { Button, TextField } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../Firebase";
import { resultType } from "../types/results";
import ResultTable from "../components/results/ResultTable";
import { StudentDetailsType } from "../types/student";
type MergedResultType = resultType & { studentInfo: StudentDetailsType };

const ResultPage = () => {
  const [studentId, setStudentId] = useState<string>("");
  const [studentResult, setStudentResult] = useState<MergedResultType[]>();


  const fetchPublishedResults = async () => {
    setStudentResult([]);
    try {
      // Step 1: Fetch the document where studentId = 'APX20545'
      const studentsRef = collection(db, "STUDENTS");
      const q = query(studentsRef, where("admission_no", "==", studentId));
      const studentSnapshot = await getDocs(q);

      if (studentSnapshot.empty) {
        console.log("No matching student found.");
        return;
      }

      // Assuming only one student document matches
      const studentDoc = studentSnapshot.docs[0];
      const studentData = { id: studentDoc.id, ...studentDoc.data() };
      // Step 2: Fetch all documents from the subcollection 'PUBLISHED_RESULTS'
      const publishedResultsRef = collection(db, "STUDENTS", studentDoc.id, "PUBLISHED_RESULTS");
      const resultsSnapshot = await getDocs(publishedResultsRef);

      const results = resultsSnapshot.docs.map(doc => ({
        ...doc.data(),  // Only the result data (no doc ID)
        ...studentData  // Adding complete student data
      }));

      console.log(results);
      setStudentResult(results as any[]);

    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };


  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="px-5 py-10 flex flex-col items-center">
          <p className="text-xl font-semibold py-5 px-1">View Result</p>
          <div className="flex flex-row gap-4">
            <TextField
              id="filled-multiline-flexible"
              label="Student Id"
              variant="filled"
              size="small"
              onChange={(e) => {
                setStudentResult([]);
                setStudentId(e.target.value.toUpperCase())
              }
              }
              value={studentId}
            />
            <Button variant="contained" size="small" onClick={fetchPublishedResults}>
              Submit
            </Button>
          </div>
          <br />
          {studentResult && studentResult?.length > 0 ?
            <p className="text-green-600">{studentResult.length + " result found for student " + studentId}</p>
            : null}
          <br />
          {
            studentResult &&
            <ResultTable results={studentResult} />
          }
        </div>
      </div>
    </>
  );
};

export default ResultPage;
