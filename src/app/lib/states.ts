import { atom,atomFamily } from 'recoil';
import { Account } from 'thirdweb/wallets';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const smartWalletAddressAtom = atom<string>({
  key: 'smartWalletAddressAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const activeAccountAtom = atom<Account|null>({
  key: 'activeAccountAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const tokenBalanceAtomFamily = atomFamily<string | null, string>({
  key: 'tokenBalanceAtomFamily',
  default: null,
});

export { smartWalletAddressAtom, activeAccountAtom, tokenBalanceAtomFamily };
