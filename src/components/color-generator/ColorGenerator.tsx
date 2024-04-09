import { useState, useEffect } from "react";
export default function ColorGenerator() {
  const [typeOfColor, setTypeOfColor] = useState<string>("HEX");

  const [color, setColor] = useState<string>("#000000");

  const handleCreateRandomHexColor = () => {
    // const n = (Math.random() * 0xfffff * 1000000).toString(16);
    // const colorCode: string = "#" + n.slice(0, 6);
    // return colorCode.toUpperCase();

    //prettier-ignore
    const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hex: string = "#";
    for (let i = 0; i < 6; i++) {
      hex += hexValues[randomColorUtility(hexValues.length)].toString();
    }
    setColor(hex);
  };

  const randomColorUtility = (length: number) => {
    return Math.floor(Math.random() * length);
  };

  const handleCreateRandomRgbColor = () => {
    const rgb: string = `rgb(${randomColorUtility(256)},${randomColorUtility(
      256
    )},${randomColorUtility(256)})`;
    setColor(rgb);
  };

  useEffect(() => {
    if (typeOfColor === "HEX") handleCreateRandomHexColor();
    else handleCreateRandomRgbColor();
  }, [typeOfColor]);

  const content = (
    <div
      style={{ background: color }}
      className="h-screen w-screen text-center"
    >
      <button
        className="border p-1 text-sm bg-white mt-2 mx-1"
        onClick={() => setTypeOfColor("HEX")}
      >
        Create HEX Code
      </button>
      <button
        className="border p-1 text-sm bg-white mt-2 mx-1"
        onClick={() => setTypeOfColor("RGB")}
      >
        Create RGB Code
      </button>
      <button
        className="border p-1 text-sm bg-white mt-2 mx-1"
        onClick={() => {
          typeOfColor === "HEX"
            ? handleCreateRandomHexColor()
            : handleCreateRandomRgbColor();
        }}
      >
        Generate Random Color
      </button>
      <div className="flex flex-col mt-12 gap-6 items-center justify-center h-full">
        <h3 className="text-white text-5xl font-bold">
          {typeOfColor === "HEX" ? "HEX" : "RGB"}
        </h3>
        <h1 className="text-7xl font-bold text-white h-4/6">{color}</h1>
      </div>
    </div>
  );
  return content;
}
