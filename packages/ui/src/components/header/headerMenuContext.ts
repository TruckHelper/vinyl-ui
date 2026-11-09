import { createContext, useContext } from 'react';

type HeaderMenuContextValue = {
  close: () => void;
};

export const HeaderMenuContext = createContext<HeaderMenuContextValue>({
  close: () => {},
});

export function useHeaderMenu() {
  return useContext(HeaderMenuContext);
}
