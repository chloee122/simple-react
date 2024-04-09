import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./image-slider.css";

interface ImageSliderProps {
  url: string;
  page: number;
  limit: number;
}

interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  download_url: string;
}

export default function ImageSlider({ url, page, limit }: ImageSliderProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchImages = async (url: string) => {
    try {
      setIsLoading(true);
      const images = await fetch(`${url}?page=${page}&limit=${limit}`).then(
        (res) => res.json()
      );

      if (images) {
        setImages(images);
        setIsLoading(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      }
    }
  };

  useEffect(() => {
    fetchImages(url);
  }, [url]);

  const handleClickNext = () => {
    if (currentSlide === images.length - 1) setCurrentSlide(0);
    else setCurrentSlide(currentSlide + 1);
  };

  const handleClickPrev = () => {
    if (currentSlide === 0) setCurrentSlide(images.length - 1);
    else setCurrentSlide(currentSlide - 1);
  };

  if (isLoading) return <div>Loading data! Please wait!</div>;
  if (errorMsg) return <div>Error occured! </div>;
  return (
    <div className="slider-container">
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={handleClickPrev}
      />
      {images && images.length
        ? images.map((imageItem, index) => {
            return (
              <img
                key={imageItem.id}
                src={imageItem.download_url}
                className={
                  currentSlide === index
                    ? "current-image"
                    : "current-image hide-current-image"
                }
              ></img>
            );
          })
        : null}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={handleClickNext}
      />
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => {
              return (
                <button
                  key={index}
                  className={
                    currentSlide === index
                      ? "current-indicator"
                      : "current-indicator inactive-indicator"
                  }
                ></button>
              );
            })
          : null}
      </span>
    </div>
  );
}
