interface Ethereumish {
  isMetaMask?: boolean;
  request: (...args: any[]) => Promise<any>;
}

interface Window {
  ethereum: Ethereumish;
}
