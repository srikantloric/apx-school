import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import { useState } from "react";
import achiveImage from "../../images/achivement.jpg";

const AboutUsBlock = () => {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
    {}
  );

  const AboutContent = [
    {
      index: 1,
      heading: "Our Mission",
      content:
        "One of the most important decisions that a parent makes is the choice of education for his child. An equally important decision that a school can make is to further that choice. At we have taken that plunge. We have given ourselves a mandate to provide each child with a never ending thirst for knowledge. To carry out this mandate we have left no stone unturned to inculcate the `how and why` frame of mind in every student. The school has aimed to commit itself to the cause of holistic education which is focused on the intellectual, spiritual, emotional, physical and cognitive needs of its students.",
    },
    {
      index: 2,
      heading: "Our Vision",
      content:
        "Our vision is to build our students articulate, emotionally intelligent, caring, outward-looking and tolerant. By the end of this year, the school endeavors to ensure that Technology Enabled Learning becomes an integral part of every classroom. As a service towards community, we aim to achieve 100% literacy in the neighbouring village with our available resources. APEX INTERNATIONAL SCHOOL is also committedto plant 1000 trees in the neighbourhood in order to create environmental awareness and sensitivity.",
    },
    {
      index: 3,
      heading: "Our Commitment",
      content:
        "APEX INTERNATIONAL SCHOOL is profoundly committed to exacting high standards, focusing on value education, social sensitivity and spiritual evolution. Our aim is to inspire the love of learning and a genuine respect for all members of our multi-cultural, multi-faith community.",
    },
  ];

  const handleClick = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="py-5">
        <p className="text-3xl text-center py-3">-- ABOUT US --</p>
        <p className="text-sm md:text-base text-center ">
          APEX INTERNATIONAL SCHOOL, Golhaiya (Choura), Po - Siyatand, Jamua,
          Giridih
        </p>
      </div>
      <div className="w-1/2 py-5 grid grid-flow-row md:grid-flow-col">
        <div className="w-full flex">
          <div className="w-full my-10 ">
            <img
              src={achiveImage}
              alt="achiveImage"
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="py-3">
            <p className="text-lg text-center">
              WELCOME TO APEX INTERNATIONAL SCHOOL
            </p>
            <p className="text-sm text-center">
              We are focussed on the complete personality development of the
              students
            </p>
          </div>

          {/* DropDown Content */}
          <div className="p-1 w-full bg-white flex flex-col gap-2">
            {AboutContent.map((item) => {
              return (
                <div key={item.index}>
                  <div className="w-full bg-primary text-white hover:text-fade px-3 py-1 grid grid-flow-col grid-cols-2 items-center">
                    <div>
                      <p>{item.heading}</p>
                    </div>
                    <div className="text-right">
                      <IconButton onClick={() => handleClick(item.index)}>
                        {openSections[item.index] ? (
                          <KeyboardArrowUpIcon fontSize="small" />
                        ) : (
                          <KeyboardArrowDownIcon fontSize="small" />
                        )}
                      </IconButton>
                    </div>
                  </div>
                  <div
                    className={`relative py-2 px-1 overflow-hidden transition-all duration-1000 ease-in-out ${
                      openSections[item.index] ? "visible" : "hidden"
                    }`}
                  >
                    <p className="text-xs md:text-sm text-justify">
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dropsoen Content ends */}
        </div>
      </div>
    </div>
  );
};

export default AboutUsBlock;
