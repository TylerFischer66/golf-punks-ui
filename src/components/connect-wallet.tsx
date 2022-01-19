import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button } from '@mui/material';
import json from '../GolfPunks.json';
import {
  GolfPunks,
  GolfPunksInterface,
} from '../../../typechain-types/GolfPunks';
import { useRecoilState } from 'recoil';
import {
  Minting,
  Clicked,
  MintingState,
  TokenIndex,
  TokenName,
} from '../recoil/state';
import axios from 'axios';
export const ConnectWallet = () => {
  const golfPunksContractAddress = '0xDDb06a374dc8168D90cD55453993ccA10F739Ac8';
  const [clicked, setClicked] = useRecoilState(Clicked);
  const [minting, setMinting] = useRecoilState(Minting);
  const [tokenIndex, setTokenIndex] = useRecoilState(TokenIndex);
  const [tokenName, setTokenName] = useRecoilState(TokenName);

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  let golfPunksContract = new ethers.Contract(
    golfPunksContractAddress,
    json.abi
  ) as GolfPunks;

  const signer = provider.getSigner();
  golfPunksContract = golfPunksContract.connect(signer);

  const mint = async () => {
    setMinting(MintingState.minting);
    const address = await signer.getAddress();
    const transaction = await golfPunksContract.mint(address).catch(() => {
      alert('something went wrong with minting');
      setMinting(MintingState.start);
    });
    if (transaction) {
      const transactionResponse = await transaction.wait();
      if (transactionResponse) {
        const nftCount = await golfPunksContract.balanceOf(address);
        const tokens = Array.from(Array(nftCount.toNumber()).keys()).map(
          async (index) => {
            return await golfPunksContract.tokenOfOwnerByIndex(address, index);
          }
        );
        const response = await (
          await Promise.all(tokens)
        ).map((token) => token.toString());
        const lastMintedIndex: string = response.pop() as string;
        const tokenUri = await golfPunksContract.tokenURI(lastMintedIndex);
        console.log(tokenUri);
        const tokenInfo = await axios.get(tokenUri);
        if (tokenInfo?.data?.name) {
          setTokenName(tokenInfo?.data?.name);
          setTokenIndex(lastMintedIndex);
          setMinting(MintingState.minted);
        }
      }
    }
  };
  useEffect(() => {
    console.log(signer);
  }, []);
  // const address = async () => {
  // }
  return (
    <div>
      <Button
        disabled={minting === MintingState.minting}
        variant="contained"
        onClick={async () => {
          if (clicked) {
            await provider
              .send('eth_requestAccounts', [])
              .then(() => {
                setClicked(true);
              })
              .catch(() => {
                setClicked(false);
              });
            mint();
            // now call mint() here
          } else {
            await provider
              .send('eth_requestAccounts', [])
              .then(() => {
                setClicked(true);
              })
              .catch(() => {
                setClicked(false);
              });
          }
        }}
      >
        {clicked ? 'Mint Your Golf Punk' : 'Connect Wallet'}
      </Button>
    </div>
  );
};
