import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { GolfPunks } from '../../../typechain-types/GolfPunks';
import React, { ReactElement, useEffect, useState } from 'react';
export interface ImageSliderProps {
  images: string[];
}

export const ImageSlider = (props: ImageSliderProps) => {
  const [imagesToDisplay, setImages] = useState<ReactElement<any, any>[]>([]);
  useEffect(() => {
    setImages(getImageElements());
  }, [props.images]);

  const getImageElements = (): ReactElement<any, any>[] => {
    let carouselData: ReactElement<any, any>[] = [];
    if (props.images && props.images.length > 0) {
      carouselData = props.images.map((image, index) => {
        return (
          <div key={index}>
            <img
              src={image}
              alt="could not render"
              className="max-h-[350px] max-w-[350px] rounded-lg"
            />
          </div>
        );
      });
    }
    return carouselData;
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="w-4/5 mx-auto">
          {imagesToDisplay.length > 0 && (
            <Carousel
              dynamicHeight={false}
              showArrows={false}
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              autoPlay={true}
              infiniteLoop={true}
              animationHandler={'fade'}
              transitionTime={2000}
            >
              {imagesToDisplay}
            </Carousel>
          )}
        </div>
      </div>
    </>
  );
};
