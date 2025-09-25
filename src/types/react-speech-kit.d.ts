declare module 'react-speech-kit' {
  export interface SpeechSynthesisHookOptions {
    onEnd?: () => void;
    onStart?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onBoundary?: (event: SpeechSynthesisEvent) => void;
    onError?: (event: SpeechSynthesisErrorEvent) => void;
  }

  export interface SpeechSynthesisHook {
    speak: (text: string) => void;
    cancel: () => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
  }

  export interface SpeechRecognitionHookOptions {
    onResult?: (result: string) => void;
    onEnd?: () => void;
    onError?: (event: Event) => void;
    continuous?: boolean;
    interimResults?: boolean;
    lang?: string;
  }

  export interface SpeechRecognitionHook {
    listen: (options?: { lang?: string; interimResults?: boolean; continuous?: boolean }) => void;
    stop: () => void;
    listening: boolean;
    supported: boolean;
  }

  export function useSpeechSynthesis(options?: SpeechSynthesisHookOptions): SpeechSynthesisHook;
  export function useSpeechRecognition(options?: SpeechRecognitionHookOptions): SpeechRecognitionHook;
}