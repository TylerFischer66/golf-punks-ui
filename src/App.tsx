import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { GolfPunks } from '../../typechain-types/GolfPunks';
import abi from './GolfPunks.json';
const golfPunksContractAddress = '0xDDb06a374dc8168D90cD55453993ccA10F739Ac8';
const provider = ethers.getDefaultProvider();
console.log(abi);
const golfPunkMetaData = () => {
  // ethers.
  // const contract = new ethers.Contract(
  //   golfPunksContractAddress,
  //   abi as any,
  //   provider
  // ) as GolfPunksInterface;
  // console.log(contract);
  // contract.getName
};
const App = () => {
  return <div className="App">Golf punks</div>;
};

export default App;
