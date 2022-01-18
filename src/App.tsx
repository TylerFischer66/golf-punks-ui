import React, { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import axios from 'axios';
import { ImageSlider } from './components/image-slider';
import { Mint } from './components/mint';
import { AppBar } from '@mui/material';

const golfPunksContractAddress = '0xDDb06a374dc8168D90cD55453993ccA10F739Ac8';
const baseUriForPunkData = 'https://golf-punks-2022.herokuapp.com/api/token/';
const provider = ethers.getDefaultProvider();
let images: string[] = [];
const golfPunkMetaData = () => {};

const App = () => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    getImagesForDisplay().then((response) => {
      setImages(response);
    });
  }, []);

  const getImage = async (): Promise<string> => {
    const index = Math.floor(Math.random() * 100);
    const response = await axios.get(`${baseUriForPunkData}${index}`);
    console.log(response);
    return response.data.image as string;
  };

  const getImagesForDisplay = async (): Promise<string[]> => {
    return await Promise.all(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async () => {
        const response = await getImage();
        return response;
      })
    );
  };

  return (
    <div className="min-h-screen">
      <h1 className="font-semibold text-white text-4xl  mt-5 text-center ">
        Introducing <span className="italic text-3xl ">Golf Punks!</span>
      </h1>
      <div className="flex my-5">
        <div className="flex-col justify-between container mx-auto align-middle items-stretch pb-20">
          <div className="flex-1">
            <ImageSlider images={images}></ImageSlider>
          </div>
          <div className="flex-1 flex items-center justify-center mt-5">
            <Mint />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
