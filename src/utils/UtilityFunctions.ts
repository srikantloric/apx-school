import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { rankType } from "../types/results";

export const GetGradeFromMark = (obtainedMark: string | number): string => {
  if (typeof obtainedMark === "string") {
    const validGrades = ["A+", "A", "B+", "B", "C+", "C", "D"];
    if (validGrades.includes(obtainedMark)) {
      return obtainedMark; // Return the grade if it's already valid
    }
  }

  const mark = Number(obtainedMark);
  if (isNaN(mark) || mark < 0 || mark > 100) {
    throw new Error("Invalid mark. Must be a number between 0 and 100.");
  }

  if (mark >= 90) return "A+";
  if (mark >= 80) return "A";
  if (mark >= 70) return "B+";
  if (mark >= 60) return "B";
  if (mark >= 50) return "C+";
  if (mark >= 40) return "C";
  if (mark >= 33) return "D";

  return "F"; // Failing grade if below 33
};

type rankDoctype = {
  class: string;
  lastUpdated: Date;
  studentRanks: rankType[];
};


export const GetStudentRank = async (studentId: string, studentClass: number): Promise<string | number | null> => {

  try {
    const rankRef = doc(collection(db, "RESULTS"), ""+studentClass);
    const rankSnap = await getDoc(rankRef);

    if (!rankSnap.exists()) {
      return "N/A";
    }

    const studentRanks = rankSnap.data() as rankDoctype;

    // Find student rank by studentId
    const studentData = studentRanks.studentRanks.find((s) => s.studentId === studentId);

    return studentData ? studentData.rankObtained : null;

  } catch (error) {
    console.error("Error fetching student rank:", error);
    return null;
  }
};