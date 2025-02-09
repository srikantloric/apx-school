import { useEffect, useState } from "react";
import { SchoolInfo } from "../types/schoolInfo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

const ContactUsPage = () => {
  const [schoolData, setSchoolData] = useState<SchoolInfo | null>(null);
  useEffect(() => {
    getSchoolInfo();
  }, []);

  const getSchoolInfo = async () => {
    try {
      console.log("Get School Info");

      const dataRef = doc(db, "WEBSITE_CONFIG", "websiteConfig");
      const docSnap = await getDoc(dataRef);
      if (docSnap.exists()) {
        setSchoolData(docSnap.data() as SchoolInfo);
        console.log("School Data:", docSnap.data());
      } else {
        console.log("No such document found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-[1200px] flex flex-col justify-center items-center px-5 py-7 mx-auto">
        <div className="flex justify-center items-center">
          <p className="text-2xl font-semibold mb-5">Our Contact Details</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <img
              src={schoolData?.contactUsThumbnail}
              alt="Contact us"
              className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="text-center px-2 py-5">
            <p className="text-3xl text-primary-dark font-semibold mb-5">
              {schoolData?.schoolName}
            </p>
            <p className="text-xs md:text-base">{schoolData?.schoolAddress}</p>
            <p className="text-xs md:text-base">
              {schoolData?.contactDetails.phoneNumbers.map((item) => (
                <>
                  {item}
                  {", "}
                </>
              ))}
            </p>
            <p className="text-xs md:text-base">{schoolData?.contactDetails.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
