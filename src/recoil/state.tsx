import { atom } from 'recoil';
export enum MintingState {
  minting,
  minted,
  start,
}
export const Minting = atom({
  key: 'Minting', // unique ID (with respect to other atoms/selectors)
  default: MintingState.start, // default value (aka initial value)
});
export const Clicked = atom({
  key: 'Clicked', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const TokenIndex = atom({
  key: 'TokenIndex', // unique ID (with respect to other atoms/selectors)
  default: '-1',
});

export const TokenName = atom({
  key: 'TokenName', // unique ID (with respect to other atoms/selectors)
  default: '',
});
