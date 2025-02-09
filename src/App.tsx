import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ResultPage from "./pages/ResultPage";
import PhotoGallery from "./pages/Gallery/PhotoGallery";
import VideoGallery from "./pages/Gallery/VideoGallery";
import VideoGalleryCategoryBlock from "./pages/Gallery/VideoGalleryCategory";
import PhotoGalleryCategoryBlock from "./pages/Gallery/PhotoGalleryCategory";
import ContactUsPage from "./pages/ContactUsPage";

function App() {
  return (
    <>
      <Header />
      <div className="pt-[210px] md:pt-[200px] min-h-[90vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/photogallery" element={<PhotoGallery />} />
          <Route
            path="/photogallery/:eventId"
            element={<PhotoGalleryCategoryBlock />}
          />
          <Route path="/videogallery" element={<VideoGallery />} />
          <Route
            path="/videogallery/:eventId"
            element={<VideoGalleryCategoryBlock />}
          />

          <Route path="/contactus" element={<ContactUsPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
