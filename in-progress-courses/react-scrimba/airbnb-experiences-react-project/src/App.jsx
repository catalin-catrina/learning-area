import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import data from "./data";
import "./App.css";
import katieZaferesImg from "./assets/katie-zaferes.png";
import weddingPhotographyImg from "./assets/wedding-photography.png";
import mountainBikeImg from "./assets/mountain-bike.png";

function App() {
  const getCardImage = (coverImg) => {
    switch (coverImg) {
      case "katie-zaferes.png":
        return katieZaferesImg;
      case "wedding-photography.png":
        return weddingPhotographyImg;
      case "mountain-bike.png":
        return mountainBikeImg;
      default:
        return null;
    }
  };
  const cards = data.map((item) => {
    const img = getCardImage(item.coverImg);

    return <Card key={item.id} item={item} img={img} />;
  });
  return (
    <div>
      <Navbar />
      <Hero />
      <section className="cards-list">{cards}</section>
    </div>
  );
}

export default App;
