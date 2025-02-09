import { Link } from "react-router-dom";
import { VideoGalleryCategory } from "../../types/GalleryCategory";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";

const VideoGallery = () => {
  const [videoGalleryData, setVideoGalleryData] = useState<
    VideoGalleryCategory[]
  >([]);

  useEffect(() => {
    getPhotoGalleryData();
  }, []);

  const getPhotoGalleryData = async () => {
    console.log("Get Photo Gallery Data");

    try {
      const dataRef = doc(db, "WEBSITE_CONFIG", "videoGallary");
      const docSnap = await getDoc(dataRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setVideoGalleryData(docSnap.data().events as VideoGalleryCategory[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-5 flex flex-col">
        <div className="py-5 w-full my-10">
          <p className="py-1 mb-7 text-xl md:text-2xl text-center font-extrabold bg-[#cdefff] text-[#1d3989] border-[1px] border-[#1d3989]">
            Video Gallery
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videoGalleryData.map((item) => (
              <div
                key={item.eventId}
                className="mt-0 mb-0 bg-gray-50 text-black hover:bg-[#cdefff] border-2 border-[#1d3989] px-3 py-3 shadow-md rounded-md hover:-mt-2 hover:mb-2 hover:shadow-2xl transition-all duration-300 ease-in-out"
              >
                <Link
                  to={`/videogallery/${item.eventId}`}
                  state={{ eventId: item.eventId }}
                >
                  <div className="w-full ">
                    <div className="text-center">
                      <div>
                        <img src={item.eventThumbnail} alt={item.eventTitle} />
                      </div>
                      <p className="text-center mt-2">{item.eventTitle}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoGallery;
