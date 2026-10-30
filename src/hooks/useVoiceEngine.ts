import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface UseVoiceEngineProps {
  onSpeechRecognized: (transcript: string) => void;
  language?: 'auto' | 'ur-PK' | 'en-US';
}

export function useVoiceEngine({ onSpeechRecognized, language = 'auto' }: UseVoiceEngineProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [continuousMode, setContinuousMode] = useState(true);
  
  // Audio Mute State (default to UNMUTED so user always hears speech)
  const [speechMuted, setSpeechMuted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('neuromind_speech_muted');
      return saved === 'true'; // only mute if user explicitly muted
    } catch {
      return false;
    }
  });

  const [transcriptLive, setTranscriptLive] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const isManuallyStopped = useRef(false);
  const voicesList = useRef<SpeechSynthesisVoice[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const restartTimerRef = useRef<any>(null);
  const serverTtsCooldownRef = useRef<number>((() => {
    try {
      const saved = localStorage.getItem('neuromind_tts_cooldown_until');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  })());
  const keepAliveIntervalRef = useRef<any>(null);

  // Play a crisp, gentle neural chime via Web Audio API to unlock audio pipeline & guarantee audible feedback
  const playNeuralChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.28);
      setAudioUnlocked(true);
    } catch (e) {
      console.warn('Audio unlock chime error:', e);
    }
  }, []);

  // Explicit audio activator that can be called on user tap or button click
  const unlockAudioExplicitly = useCallback(() => {
    setAudioUnlocked(true);
    playNeuralChime();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    setSpeechMuted(false);
    try {
      localStorage.setItem('neuromind_speech_muted', 'false');
    } catch {}
  }, [playNeuralChime]);

  // Initialize Speech Synthesis and pre-load voices
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            voicesList.current = voices;
          }
        } catch (e) {
          console.warn('Voice loading warning:', e);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Audio unlock listener on first user interaction anywhere on page
    const unlockHandler = () => {
      unlockAudioExplicitly();
    };

    window.addEventListener('click', unlockHandler, { once: true });
    window.addEventListener('touchstart', unlockHandler, { once: true });
    window.addEventListener('keydown', unlockHandler, { once: true });

    return () => {
      window.removeEventListener('click', unlockHandler);
      window.removeEventListener('touchstart', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
    };
  }, [unlockAudioExplicitly]);

  // Clean text of markdown, codeblocks, emojis, and symbols for crystal clear pronunciation
  const cleanSpeechText = useCallback((text: string): string => {
    return text
      .replace(/```[\s\S]*?```/g, ' [Code generated] ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[*#_~>|]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .replace(/[^\w\s\u0600-\u06FF.,!?'"-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }, []);

  // Bulletproof Browser Speech Synthesis Engine
  const speakWithBrowserSynthesis = useCallback((rawText: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      setIsSpeaking(false);
      return;
    }

    const cleanText = cleanSpeechText(rawText);
    if (!cleanText) {
      setIsSpeaking(false);
      return;
    }

    const synth = window.speechSynthesis;

    try {
      // Clear any hung utterances
      synth.cancel();
      if (synth.paused) {
        synth.resume();
      }

      // CRITICAL CHROMIUM FIX:
      // Calling synth.cancel() and synth.speak() synchronously cancels the newly queued utterance!
      // A small setTimeout(..., 45) allows the cancel event loop tick to finish before queuing speech.
      setTimeout(() => {
        try {
          synth.resume();
          const utterance = new SpeechSynthesisUtterance(cleanText);

          // Voice and Language Selection Logic:
          // Perso-Arabic Urdu Script: [\u0600-\u06FF] -> use 'ur-PK'
          // Roman Urdu / Latin text: DO NOT use 'ur-PK'! Google Speech Services on Android produces ZERO sound on Latin text.
          // Instead, use 'hi-IN' (Hindi) or 'en-IN' (Indian English), which phonetically pronounces Roman Urdu with 100% accuracy!
          const hasArabicScript = /[\u0600-\u06FF]/.test(cleanText);

          const availableVoices = voicesList.current.length > 0 ? voicesList.current : synth.getVoices();

          if (hasArabicScript) {
            utterance.lang = 'ur-PK';
            const urduVoice = availableVoices.find(
              (v) => v.lang.toLowerCase().includes('ur') || v.lang.toLowerCase().includes('ar')
            );
            if (urduVoice) utterance.voice = urduVoice;
          } else {
            // Roman Urdu or English: Search for Hindi or Indian English voice
            const subcontinentVoice =
              availableVoices.find((v) => v.lang.toLowerCase().includes('hi-in') || v.lang.toLowerCase().startsWith('hi')) ||
              availableVoices.find((v) => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('en-pk')) ||
              availableVoices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
              availableVoices[0];

            if (subcontinentVoice) {
              utterance.voice = subcontinentVoice;
              utterance.lang = subcontinentVoice.lang;
            } else {
              utterance.lang = 'hi-IN';
            }
          }

          utterance.volume = 1.0;
          utterance.rate = 1.0;
          utterance.pitch = 1.0;

          // Prevent Chrome speech synthesis auto-pause bug on utterances > 15s
          if (keepAliveIntervalRef.current) {
            clearInterval(keepAliveIntervalRef.current);
          }
          keepAliveIntervalRef.current = setInterval(() => {
            if (synth.speaking) {
              synth.pause();
              synth.resume();
            } else {
              clearInterval(keepAliveIntervalRef.current);
            }
          }, 4500);

          utterance.onstart = () => {
            setIsSpeaking(true);
          };

          utterance.onend = () => {
            setIsSpeaking(false);
            if (keepAliveIntervalRef.current) {
              clearInterval(keepAliveIntervalRef.current);
            }
          };

          utterance.onerror = (e) => {
            console.warn('Utterance speech error:', e);
            setIsSpeaking(false);
            if (keepAliveIntervalRef.current) {
              clearInterval(keepAliveIntervalRef.current);
            }
          };

          synth.speak(utterance);
        } catch (innerErr) {
          console.error('Inner speak error:', innerErr);
          setIsSpeaking(false);
        }
      }, 50);
    } catch (err) {
      console.error('Browser speech error:', err);
      setIsSpeaking(false);
    }
  }, [cleanSpeechText]);

  // Master Speak function: Plays audible chime first, then synthesizes voice instantly
  const speak = useCallback(
    async (text: string, forceUnmute: boolean = false) => {
      if (!text || !text.trim()) return;

      if (forceUnmute && speechMuted) {
        setSpeechMuted(false);
        try {
          localStorage.setItem('neuromind_speech_muted', 'false');
        } catch {}
      } else if (speechMuted && !forceUnmute) {
        return;
      }

      // Always play audio chime for immediate user confirmation and audio pipeline wake-up
      playNeuralChime();

      // Stop any existing audio or speech
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.cancel();
        synthRef.current.resume();
      }

      setIsSpeaking(true);

      // Check if server TTS is in cooldown
      const isServerTtsCooldown = Date.now() < serverTtsCooldownRef.current;

      if (!isServerTtsCooldown) {
        try {
          // Quick fetch with 3.5s timeout abort controller
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);

          const ttsRes = await fetch('/api/voice/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, voiceName: 'Kore' }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (ttsRes.ok) {
            const ttsData = await ttsRes.json();
            if (ttsData.success && ttsData.audioDataUrl) {
              const audio = new Audio(ttsData.audioDataUrl);
              audioPlayerRef.current = audio;

              audio.onplay = () => setIsSpeaking(true);
              audio.onended = () => {
                setIsSpeaking(false);
                audioPlayerRef.current = null;
              };
              audio.onerror = () => {
                speakWithBrowserSynthesis(text);
              };

              await audio.play();
              return;
            } else if (ttsData.cooldownActive || ttsData.fallbackToBrowser) {
              const cooldownMs = ttsData.quotaExceeded ? 24 * 60 * 60 * 1000 : 180000;
              const cooldownTimestamp = Date.now() + cooldownMs;
              serverTtsCooldownRef.current = cooldownTimestamp;
              try {
                localStorage.setItem('neuromind_tts_cooldown_until', String(cooldownTimestamp));
              } catch {}
            }
          } else {
            const cooldownTimestamp = Date.now() + 180000;
            serverTtsCooldownRef.current = cooldownTimestamp;
            try {
              localStorage.setItem('neuromind_tts_cooldown_until', String(cooldownTimestamp));
            } catch {}
          }
        } catch {
          // Network timeout or abort: enter short cooldown
          const cooldownTimestamp = Date.now() + 180000;
          serverTtsCooldownRef.current = cooldownTimestamp;
          try {
            localStorage.setItem('neuromind_tts_cooldown_until', String(cooldownTimestamp));
          } catch {}
        }
      }

      // Immediate fallback to browser synthesis without waiting
      speakWithBrowserSynthesis(text);
    },
    [speechMuted, playNeuralChime, speakWithBrowserSynthesis]
  );

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
    }
    setIsSpeaking(false);
  }, []);

  // Force Unmute and Turn Voice ON
  const unmuteVoice = useCallback(() => {
    setSpeechMuted(false);
    try {
      localStorage.setItem('neuromind_speech_muted', 'false');
    } catch {}
    unlockAudioExplicitly();
  }, [unlockAudioExplicitly]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    setSpeechMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('neuromind_speech_muted', String(next));
      } catch {}
      if (next) {
        stopSpeaking();
      } else {
        unlockAudioExplicitly();
        // Give audible confirmation that voice is on
        setTimeout(() => {
          speakWithBrowserSynthesis('Awaaz chalu ho chuki hai.');
        }, 100);
      }
      return next;
    });
  }, [stopSpeaking, unlockAudioExplicitly, speakWithBrowserSynthesis]);

  // Test voice speaking out loud immediately
  const testVoice = useCallback((customText?: string) => {
    unmuteVoice();
    const testPhrase =
      customText ||
      'Assalam-o-Alaikum! NeuroMind AGI ki aawaz bilkul active hai. Main aapki har baat sun raha hoon aur bol kar foran jawab de raha hoon.';
    speak(testPhrase, true);
  }, [unmuteVoice, speak]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'ur-PK' ? 'ur-PK' : language === 'en-US' ? 'en-US' : 'ur-PK';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim) {
          setTranscriptLive(interim);
        }

        if (final.trim()) {
          setTranscriptLive(final);
          onSpeechRecognized(final.trim());
          setTimeout(() => {
            setTranscriptLive('');
          }, 2000);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setIsListening(false);
          setMicPermissionDenied(true);
        } else if (event.error === 'no-speech') {
          // Standard pause in speech, will auto-restart via onend
        } else {
          console.log('[Voice Engine] Speech event notice:', event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (continuousMode && !isManuallyStopped.current) {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            if (!isManuallyStopped.current && recognitionRef.current) {
              try {
                recognitionRef.current.start();
                setIsListening(true);
              } catch {
                // Secondary retry if browser was busy
                restartTimerRef.current = setTimeout(() => {
                  try {
                    recognitionRef.current.start();
                    setIsListening(true);
                  } catch {}
                }, 400);
              }
            }
          }, 150);
        }
      };

      recognitionRef.current = recognition;

      // Auto start recognition initially if allowed
      try {
        recognition.start();
      } catch {}
    } catch (e) {
      console.warn('Speech recognition init notice:', e);
      setSpeechSupported(false);
    }

    return () => {
      isManuallyStopped.current = true;
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current);
      }
    };
  }, [language, continuousMode, onSpeechRecognized]);

  const startListening = useCallback(() => {
    isManuallyStopped.current = false;
    unlockAudioExplicitly();
    setSpeechMuted(false);
    try {
      localStorage.setItem('neuromind_speech_muted', 'false');
    } catch {}

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      setTimeout(() => {
        try {
          recognitionRef.current.start();
          setIsListening(true);
          setMicPermissionDenied(false);
        } catch (err) {
          // Already active
          setIsListening(true);
        }
      }, 50);
    }
  }, [unlockAudioExplicitly]);

  const stopListening = useCallback(() => {
    isManuallyStopped.current = true;
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (err) {
        setIsListening(false);
      }
    }
  }, []);

  const restartMic = useCallback(() => {
    isManuallyStopped.current = false;
    setMicPermissionDenied(false);
    unlockAudioExplicitly();
    startListening();
  }, [unlockAudioExplicitly, startListening]);

  // Audio waveform animation
  useEffect(() => {
    let animId: number;
    if (isListening || isSpeaking) {
      const updateWave = () => {
        const val = Math.sin(Date.now() / 120) * 0.35 + 0.5 + Math.random() * 0.25;
        setAudioLevel(Math.min(1, Math.max(0.15, val)));
        animId = requestAnimationFrame(updateWave);
      };
      animId = requestAnimationFrame(updateWave);
    } else {
      setAudioLevel(0.05);
    }
    return () => cancelAnimationFrame(animId);
  }, [isListening, isSpeaking]);

  // Auto-activate voice on first user gesture anywhere
  useEffect(() => {
    const handleGestureStart = () => {
      unlockAudioExplicitly();
      if (!isListening && !isManuallyStopped.current) {
        startListening();
      }
    };
    window.addEventListener('click', handleGestureStart, { once: true });
    window.addEventListener('touchstart', handleGestureStart, { once: true });
    window.addEventListener('keydown', handleGestureStart, { once: true });
    return () => {
      window.removeEventListener('click', handleGestureStart);
      window.removeEventListener('touchstart', handleGestureStart);
      window.removeEventListener('keydown', handleGestureStart);
    };
  }, [unlockAudioExplicitly, startListening, isListening]);

  const toggleContinuousMode = useCallback(() => {
    setContinuousMode((prev) => !prev);
  }, []);

  return {
    isListening,
    isSpeaking,
    speechSupported,
    continuousMode,
    speechMuted,
    transcriptLive,
    audioLevel,
    audioUnlocked,
    micPermissionDenied,
    startListening,
    stopListening,
    restartMic,
    speak,
    stopSpeaking,
    toggleContinuousMode,
    toggleMute,
    unmuteVoice,
    testVoice,
    playNeuralChime,
    unlockAudioExplicitly,
  };
}
