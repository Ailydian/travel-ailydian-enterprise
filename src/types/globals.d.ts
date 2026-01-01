declare global {
  interface Window {
    ethereum?: {
      request: (params: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (params: unknown) => void) => void;
      removeListener: (event: string, callback: (params: unknown) => void) => void;
      selectedAddress: string | null;
      isMetaMask?: boolean;
      isConnected: () => boolean;
      chainId: string;
    };
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }

  declare var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };

  declare var webkitSpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
}

export {};
