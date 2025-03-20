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


export function getOrdinal(number: number): string {
  if (typeof number !== 'number' || isNaN(number) || number <= 0) {
    return 'Invalid input';
  }

  const suffix = (n: number): string => {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return 'th';
    }
    
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return number + suffix(number);
}


export function getClassNameByValue(classNumber: number) {
  switch (classNumber) {
    case 1:
      return "Nursery";
    case 2:
      return "LKG";
    case 3:
      return "UKG";
    case 4:
      return "STD-1";
    case 5:
      return "STD-2";
    case 6:
      return "STD-3";
    case 7:
      return "STD-4";
    case 8:
      return "STD-5";
    case 9:
      return "STD-6";
    case 10:
      return "STD-7";
    case 11:
      return "STD-8";
    case 12:
      return "STD-9";
    case 13:
      return "STD-10";
    case 14:
      return "Pre-Nursery";
    default:
      break;
  }
}