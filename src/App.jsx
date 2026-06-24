import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import UploadSection from "./components/UploadSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <UploadSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
