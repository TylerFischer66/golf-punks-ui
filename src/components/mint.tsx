import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ConnectWallet } from './connect-wallet';
import { ethers } from 'ethers';
import { useRecoilState } from 'recoil';
import { Minting } from '../recoil/state';
export const Mint = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  useEffect(() => {
    provider.listAccounts().then((accounts) => {
      setIsConnected(accounts.length > 0);
    });
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-3">
        <ConnectWallet />
      </div>
      <p className="text-center mb-3 mx-[15%] xl:mx-[25%]">
        Golf Punks is a collection of 400 Golfer NFTs-unique digital colectibles
        on the Ethereum blockchain. Golf Punks is built for the golf community
        and aims to organize golf tournmanents and outings.
      </p>
    </div>
  );
};
