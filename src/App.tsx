import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { GolfPunks } from '../../typechain-types/GolfPunks';
import abi from './GolfPunks.json';
const golfPunksContractAddress = '0xDDb06a374dc8168D90cD55453993ccA10F739Ac8';
const provider = ethers.getDefaultProvider();
console.log(abi);
fetch('http:locahost:5000/api/token/0').then((data) => console.log(data));
const golfPunkMetaData = () => {};
const App = () => {
  return <div className="App">Golf punks</div>;
};

export default App;
