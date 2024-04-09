import Accordion from "./components/accordion/Accordion";
import ColorGenerator from "./components/colorGenerator/ColorGenerator";
import StarRating from "./components/starRating/StarRating";

function App() {
  return (
    <>
      <Accordion />
      <ColorGenerator />
      <StarRating numOfStar={10} />
    </>
  );
}

export default App;
