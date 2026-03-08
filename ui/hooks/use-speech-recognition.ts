"use client";

import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";

type SpeechRecognitionErrorCode =
  | "aborted"
  | "audio-capture"
  | "language-not-supported"
  | "network"
  | "no-speech"
  | "not-allowed"
  | "phrases-not-supported"
  | "service-not-allowed"
  | string;

interface SpeechRecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultLike extends ArrayLike<SpeechRecognitionAlternativeLike> {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionResultListLike extends ArrayLike<SpeechRecognitionResultLike> {
  [index: number]: SpeechRecognitionResultLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorEventLike {
  error: SpeechRecognitionErrorCode;
  message?: string;
}

interface BrowserSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onstart: (() => void) | null;
  abort: () => void;
  start: () => void;
  stop: () => void;
}

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: BrowserSpeechRecognitionConstructor;
    webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
  }
}

function getSpeechRecognitionConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

function getSpeechRecognitionErrorMessage(error: SpeechRecognitionErrorCode) {
  switch (error) {
    case "audio-capture":
      return "No microphone was detected. Check your device input and try again.";
    case "language-not-supported":
    case "phrases-not-supported":
      return "Voice input is unavailable for the current language setting.";
    case "network":
      return "Speech recognition is unavailable right now. Try again in a moment.";
    case "no-speech":
      return "No speech was detected. Try speaking a little closer to the microphone.";
    case "not-allowed":
    case "service-not-allowed":
      return "Microphone access was blocked. Enable microphone permissions and try again.";
    default:
      return "Voice input could not start. Please try again.";
  }
}

export function useSpeechRecognition({
  lang = "en-US",
  onTranscript,
}: {
  lang?: string;
  onTranscript?: (transcript: string) => void;
} = {}) {
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const emitTranscript = useEffectEvent((transcript: string) => {
    onTranscript?.(transcript);
  });

  const [error, setError] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported] = useState(() => Boolean(getSpeechRecognitionConstructor()));

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognitionConstructor();

    if (!SpeechRecognition) {
      recognitionRef.current = null;
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onresult = (event) => {
      let finalTranscript = "";
      let nextInterimTranscript = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result[0]?.transcript?.trim();

        if (!transcript) {
          continue;
        }

        if (result.isFinal) {
          finalTranscript += `${transcript} `;
          continue;
        }

        nextInterimTranscript += `${transcript} `;
      }

      setInterimTranscript(nextInterimTranscript.trim());

      if (finalTranscript.trim()) {
        emitTranscript(finalTranscript.trim());
      }
    };
    recognition.onerror = (event) => {
      if (event.error === "aborted") {
        return;
      }

      setError(getSpeechRecognitionErrorMessage(event.error));
    };
    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onend = null;
      recognition.onerror = null;
      recognition.onresult = null;
      recognition.onstart = null;
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [lang]);

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      setError("Voice input is unavailable in this browser.");
      return;
    }

    setError("");
    setInterimTranscript("");

    try {
      recognition.start();
    } catch (error) {
      setIsListening(false);
      setError(
        error instanceof Error
          ? error.message
          : "Voice input could not start. Please try again.",
      );
    }
  }, []);

  const stopListening = useCallback(() => {
    setInterimTranscript("");
    recognitionRef.current?.stop();
  }, []);

  return {
    error,
    interimTranscript,
    isListening,
    isSupported,
    startListening,
    stopListening,
  };
}
