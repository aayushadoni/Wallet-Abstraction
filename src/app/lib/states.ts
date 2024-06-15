import { atom } from 'recoil';
import { Account } from 'thirdweb/wallets';

const smartWalletAddressAtom = atom<string>({
  key: 'smartWalletAddressAtom',
  default: '',
});

const activeAccountAtom = atom<Account|null>({
  key: 'activeAccountAtom',
  default: null,
});

const ethBalanceAtom = atom<{displayValue:string,value:string}|null>({
  key: 'ethBalance',
  default: null,
})

export { smartWalletAddressAtom, activeAccountAtom, ethBalanceAtom };
