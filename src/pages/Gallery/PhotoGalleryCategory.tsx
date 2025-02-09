import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { PhotoGalleryCategory } from "../../types/GalleryCategory";
import { db } from "../../Firebase"; // added import for db

const PhotoGalleryCategoryBlock = () => {
  const location = useLocation();
  const { eventId } = location.state;
  const [allImages, setAllImages] = useState<string[]>([]);
  const [event, setEvent] = useState<PhotoGalleryCategory>();

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const dataRef = doc(db, "WEBSITE_CONFIG", "photoGallary");
      const docSnap = await getDoc(dataRef);

      if (docSnap.exists()) {
        const data = docSnap.data().events as PhotoGalleryCategory[];
        const event = data.find((event) => event.eventId === eventId);
        if (event) {
          setEvent(event);
          setAllImages(event.images.map((image) => image.imageUrl));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 flex flex-col">
      <div className="py-5 w-full my-10">
        <p className="py-1 mb-7 text-xl md:text-2xl text-center font-extrabold bg-[#cdefff] text-[#1d3989] border-[1px] border-[#1d3989]">
          {event?.eventTitle} Gallery
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allImages.map((image: string, index: number) => (
            <div key={index} className="p-1">
              <img
                src={image}
                alt={`Gallery ${eventId}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryCategoryBlock;
