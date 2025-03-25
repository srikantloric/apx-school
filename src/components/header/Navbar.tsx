import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "../../types/header";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const NavItems: NavItem[][] = [
  [{ name: "Home", link: "/" }],
  [
    { name: "About Us", link: "/aboutus" },
    { name: "Messages", link: "/messages" },
    { name: "Rules", link: "/rules" },
    { name: "School Bell", link: "/schoolbell" },
  ],
  // [{ name: "Disclosure", link: "/disclosure" }],
  // [{ name: "School Information", link: "#" }],
  [
    { name: "Photo Gallery", link: "/photogallery" },
    { name: "Video Gallery", link: "/videogallery" },
  ],
  [{ name: "Result", link: "/result" }],
  // [
  //   { name: "Student/Parent Login", link: "/parentlogin" },
  //   { name: "TC", link: "/applytc" },
  // ],
  // [{ name: "Staff List", link: "/stafflist" }],
  // [{ name: "My School", link: "/myschool" }],
  [{ name: "Contact Us", link: "/contactus" }],
];

type NavbarLargeScreenProps = {
  isVisible: boolean;
  handleNavClose: () => void;
};

export const NavbarLargeScreen = ({
  isVisible,
  handleNavClose,
}: NavbarLargeScreenProps) => {
  const [dropdownStates, setDropdownStates] = useState<{
    [key: number]: boolean;
  }>({});
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    setCurrentLocation(location.pathname.toString());
  }, [location.pathname]);

  const toggleDropdown = (index: number) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefs.current.some(
          (ref: HTMLDivElement | null) =>
            ref && !ref.contains(event.target as Node)
        )
      ) {
        setDropdownStates({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`w-full bg-white hidden md:block max-w-[1500px]`}>
      <ul className="flex justify-center flex-wrap">
        {NavItems.map((group, index) => (
          <>
            {group.length > 1 ? (
              <li key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className={`px-1 md:px-2 py-2 ${
                    isVisible ? "md:py-3" : "md:py-1"
                  } hover:bg-secondary-light hover:text-primary flex items-center transition-all duration-1000 ease-in-out`}
                >
                  {group[0].name}
                  {group.length > 1 && (
                    <KeyboardArrowDownIcon className="ml-0" />
                  )}
                </button>
                {dropdownStates[index] && (
                  <div
                    ref={(el) => (dropdownRefs.current[index] = el)}
                    className="absolute left-0 w-48 bg-white border border-gray-200 shadow-lg"
                  >
                    {group.map((item, subIndex) => (
                      <Link
                        key={subIndex}
                        to={item.link}
                        className="block hover:bg-primary hover:text-white transition-colors duration-1000 ease-in-out"
                        onClick={handleNavClose}
                      >
                        <div className="px-1 md:px-4 py-1 w-full">
                          <li key={item.name} className="">
                            {item.name}
                          </li>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <>
                <Link to={group[0].link}>
                  <div
                    className={`px-1 md:px-2 py-1 ${
                      isVisible ? "md:py-3" : "md:py-1"
                    } ${
                      currentLocation == group[0].link
                        ? "bg-secondary-light text-primary border-b-2 border-primary"
                        : ""
                    } w-full hover:bg-secondary-light hover:text-primary `}
                  >
                    {group[0].name}
                  </div>
                </Link>
              </>
            )}
          </>
        ))}
      </ul>
    </nav>
  );
};

type NavbarSmallScreenProps = {
  handleNavClose: () => void;
};

export const NavbarSmallScreen = ({
  handleNavClose,
}: NavbarSmallScreenProps) => {
  const [dropdownStates, setDropdownStates] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDropdown = (index: number) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="grid grid-flow-col">
        <div>
          <ul className="flex flex-col w-full">
            {NavItems.map((group, index) => (
              <div
                className={
                  "px-1 md:px-4 py-2 md:py-4 w-full hover:bg-secondary-light hover:text-primary"
                }
              >
                <li key={index} className="relative">
                  {group.length > 1 ? (
                    <>
                      <button
                        onClick={() => {
                          toggleDropdown(index);
                        }}
                        className="flex items-center"
                      >
                        {group[0].name}
                        <KeyboardArrowDownIcon />
                      </button>
                      {dropdownStates[index] && (
                        <ul className="absolute bg-white flex flex-col p-2 mt-2 rounded-md shadow-md justify-center w-full z-10">
                          {group.map((item) => (
                            <Link
                              to={item.link}
                              className="block"
                              onClick={() => handleNavClose()}
                            >
                              <li
                                key={item.name}
                                className="p-2 hover:bg-secondary-light"
                              >
                                {item.name}
                              </li>
                            </Link>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={group[0].link}
                      className="hover:text-primary"
                      onClick={handleNavClose}
                    >
                      <div className="px-1 py-1 w-full hover:bg-secondary-light hover:text-primary ">
                        {group[0].name}
                      </div>
                    </Link>
                  )}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
