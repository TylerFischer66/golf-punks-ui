import { Button } from '@mui/material';
import React from 'react';

export const Mint = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-3">
        <Button variant="contained">Mint Your Golf Punk!</Button>
      </div>
      <p className="text-center mb-3 mx-[15%]">
        Golf Punks is a collection of 400 Golfer NFTs-unique digital colectibles
        on the Ethereum blockchain. Golf Punks is built for the golf community
        and aims to organize golf tournmanents and outings.
      </p>
    </div>
  );
};
