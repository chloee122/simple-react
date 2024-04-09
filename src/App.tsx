import Accordion from "./components/accordion/Accordion";
import ColorGenerator from "./components/color-generator/ColorGenerator";
import StarRating from "./components/star-rating/StarRating";
import ImageSlider from "./components/image-slider/ImageSlider";
// import "./App.css";

function App() {
  return (
    <>
      <Accordion />
      <ColorGenerator />
      <StarRating numOfStar={10} />
      <ImageSlider url={"https://picsum.photos/v2/list"} page={1} limit={10} />
    </>
  );
}

export default App;
