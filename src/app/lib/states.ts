import { atom,atomFamily } from 'recoil';
import { Account } from 'thirdweb/wallets';

const smartWalletAddressAtom = atom<string>({
  key: 'smartWalletAddressAtom',
  default: '',
});

const activeAccountAtom = atom<Account|null>({
  key: 'activeAccountAtom',
  default: null,
});

const tokenBalanceAtomFamily = atomFamily<string | null, string>({
  key: 'tokenBalanceAtomFamily',
  default: null,
});

export { smartWalletAddressAtom, activeAccountAtom, tokenBalanceAtomFamily };
