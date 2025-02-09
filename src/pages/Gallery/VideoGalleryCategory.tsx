import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../Firebase";
import { VideoGalleryCategory } from "../../types/GalleryCategory";

const VideoGalleryCategoryBlock = () => {
  const location = useLocation();
  const { eventId } = location.state;
  const [allvideos, setAllvideos] = useState<string[]>([]);
  const [event, setEvent] = useState<VideoGalleryCategory>();

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const dataRef = doc(db, "WEBSITE_CONFIG", "videoGallary");
      const docSnap = await getDoc(dataRef);

      if (docSnap.exists()) {
        const data = docSnap.data().events as VideoGalleryCategory[];
        const event = data.find((event) => event.eventId === eventId);
        if (event) {
          setEvent(event);
          setAllvideos(event.videos.map((video) => video.videoUrl));
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log("allvideos: ", allvideos);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 flex flex-col">
      <div className="py-5 w-full my-10">
        <p className="py-1 mb-7 text-xl md:text-2xl text-center font-extrabold bg-[#cdefff] text-[#1d3989] border-[1px] border-[#1d3989]">
          {event?.eventTitle} Gallery
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allvideos.map((video: string, index: number) => (
            <div key={index} className="p-1">
              <video controls className="w-full h-auto">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGalleryCategoryBlock;
