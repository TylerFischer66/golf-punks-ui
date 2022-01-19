import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import axios from 'axios';
import { ImageSlider } from './components/image-slider';
import { Mint } from './components/mint';
import { AppBar } from '@mui/material';
import { ConnectWallet } from './components/connect-wallet';
import { TailSpin } from 'react-loader-spinner';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Minting, MintingState, TokenIndex, TokenName } from './recoil/state';

export const MyDataContext = createContext({ minting: false });
const golfPunksContractAddress = '0xDDb06a374dc8168D90cD55453993ccA10F739Ac8';
const baseUriForPunkData = 'https://golf-punks-2022.herokuapp.com/api/token/';
const provider = ethers.getDefaultProvider();
let images: string[] = [];
const golfPunkMetaData = () => {};

const App = () => {
  const [minting, setMinting] = useRecoilState(Minting);
  const [tokenIndex, setTokenIndex] = useRecoilState(TokenIndex);
  const [tokenName, setTokenName] = useRecoilState(TokenName);
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    getImagesForDisplay().then((response) => {
      setImages(response);
    });
  }, [minting]);

  const getRandomImage = async (): Promise<string> => {
    const index = Math.floor(Math.random() * 100);
    const response = await axios.get(`${baseUriForPunkData}${index}`);
    return response.data.image as string;
  };

  const getImage = async (index: string): Promise<string> => {
    const response = await axios.get(`${baseUriForPunkData}${index}`);
    return response.data.image as string;
  };

  const getImagesForDisplay = async (): Promise<string[]> => {
    if (minting === MintingState.minted && tokenIndex !== null) {
      const response = await getImage(tokenIndex);
      return [response];
    } else {
      return await Promise.all(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async () => {
          const response = await getRandomImage();
          return response;
        })
      );
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="font-semibold text-white text-4xl text-center ">
        Introducing <span className="italic text-3xl ">Golf Punks!</span>
      </h1>
      {tokenName === '' ? (
        <div className="text-center mt-2">Mint Your Golf Punk</div>
      ) : (
        <div className="text-center mt-2">{tokenName}</div>
      )}
      <div className="flex-col justify-between container mx-auto align-middle items-stretch pb-10 my-2">
        <div className="flex-1">
          {minting === MintingState.minting ? (
            <div className=" flex flex-row mx-auto  w-4/5 justify-center">
              <TailSpin
                color="#00BFFF"
                height={350}
                width={250}
                wrapperClass="flex justify-center justify-self-center my-auto "
              />
            </div>
          ) : (
            <ImageSlider images={images}></ImageSlider>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center mt-5">
          <Mint />
        </div>
      </div>
    </div>
  );
};

export default App;
