import { useEffect, useRef, useState } from 'react';

interface RomanticMusicProps {
  isPlaying: boolean;
  volume?: number;
}

const RomanticMusic = ({ isPlaying, volume = 0.3 }: RomanticMusicProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Happy Birthday melody notes (in Hz)
  const melody = [
    // "Happy Birthday to You"
    { note: 261.63, duration: 0.5 }, // C4 - Happy
    { note: 261.63, duration: 0.5 }, // C4 - Birth
    { note: 293.66, duration: 1.0 }, // D4 - day
    { note: 261.63, duration: 1.0 }, // C4 - to
    { note: 349.23, duration: 1.0 }, // F4 - You
    { note: 329.63, duration: 2.0 }, // E4 - (hold)
    
    // "Happy Birthday to You"
    { note: 261.63, duration: 0.5 }, // C4 - Happy
    { note: 261.63, duration: 0.5 }, // C4 - Birth
    { note: 293.66, duration: 1.0 }, // D4 - day
    { note: 261.63, duration: 1.0 }, // C4 - to
    { note: 392.00, duration: 1.0 }, // G4 - You
    { note: 349.23, duration: 2.0 }, // F4 - (hold)
    
    // "Happy Birthday dear [Name]"
    { note: 261.63, duration: 0.5 }, // C4 - Happy
    { note: 261.63, duration: 0.5 }, // C4 - Birth
    { note: 523.25, duration: 1.0 }, // C5 - day
    { note: 440.00, duration: 1.0 }, // A4 - dear
    { note: 349.23, duration: 1.0 }, // F4 - Man
    { note: 329.63, duration: 1.0 }, // E4 - si
    { note: 293.66, duration: 2.0 }, // D4 - (hold)
    
    // "Happy Birthday to You"
    { note: 466.16, duration: 0.5 }, // Bb4 - Happy
    { note: 466.16, duration: 0.5 }, // Bb4 - Birth
    { note: 440.00, duration: 1.0 }, // A4 - day
    { note: 349.23, duration: 1.0 }, // F4 - to
    { note: 392.00, duration: 1.0 }, // G4 - You
    { note: 349.23, duration: 3.0 }, // F4 - (hold)
  ];

  const createFluteTone = (frequency: number, startTime: number, duration: number) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    // Create multiple oscillators for a richer flute-like sound
    const fundamental = audioContextRef.current.createOscillator();
    const harmonic1 = audioContextRef.current.createOscillator();
    const harmonic2 = audioContextRef.current.createOscillator();
    
    // Create individual gain nodes for each oscillator
    const fundGain = audioContextRef.current.createGain();
    const harm1Gain = audioContextRef.current.createGain();
    const harm2Gain = audioContextRef.current.createGain();
    
    // Set up frequencies (flute has strong fundamental and weak harmonics)
    fundamental.frequency.setValueAtTime(frequency, startTime);
    harmonic1.frequency.setValueAtTime(frequency * 2, startTime);
    harmonic2.frequency.setValueAtTime(frequency * 3, startTime);
    
    // Use sine waves for smooth flute-like sound
    fundamental.type = 'sine';
    harmonic1.type = 'sine';
    harmonic2.type = 'sine';
    
    // Set gain levels (fundamental strongest, harmonics weaker)
    fundGain.gain.setValueAtTime(0.6, startTime);
    harm1Gain.gain.setValueAtTime(0.2, startTime);
    harm2Gain.gain.setValueAtTime(0.1, startTime);
    
    // Create envelope (attack, sustain, release)
    const attackTime = 0.1;
    const releaseTime = 0.2;
    const sustainTime = Math.max(0, duration - attackTime - releaseTime);
    
    // Apply envelope to each gain node
    [fundGain, harm1Gain, harm2Gain].forEach(gain => {
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(gain.gain.value, startTime + attackTime);
      gain.gain.setValueAtTime(gain.gain.value, startTime + attackTime + sustainTime);
      gain.gain.linearRampToValueAtTime(0, startTime + duration);
    });
    
    // Connect the audio graph
    fundamental.connect(fundGain);
    harmonic1.connect(harm1Gain);
    harmonic2.connect(harm2Gain);
    
    fundGain.connect(gainNodeRef.current);
    harm1Gain.connect(gainNodeRef.current);
    harm2Gain.connect(gainNodeRef.current);
    
    // Start and stop the oscillators
    fundamental.start(startTime);
    harmonic1.start(startTime);
    harmonic2.start(startTime);
    
    fundamental.stop(startTime + duration);
    harmonic1.stop(startTime + duration);
    harmonic2.stop(startTime + duration);
    
    // Store references for cleanup
    oscillatorsRef.current.push(fundamental, harmonic1, harmonic2);
  };

  const playMelody = () => {
    if (!audioContextRef.current) return;
    
    let currentTime = audioContextRef.current.currentTime + 0.1;
    
    melody.forEach(({ note, duration }) => {
      createFluteTone(note, currentTime, duration);
      currentTime += duration + 0.1; // Small gap between notes
    });
    
    // Loop the melody
    setTimeout(() => {
      if (isPlaying) {
        playMelody();
      }
    }, (currentTime - audioContextRef.current.currentTime + 2) * 1000);
  };

  const initializeAudio = async () => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      setIsInitialized(true);
    } catch (error) {
      console.log('Audio context initialization failed:', error);
    }
  };

  const stopAllOscillators = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    oscillatorsRef.current = [];
  };

  useEffect(() => {
    if (isPlaying && !isInitialized) {
      initializeAudio();
    }
    
    if (isPlaying && isInitialized && audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      playMelody();
    } else {
      stopAllOscillators();
    }
    
    return () => {
      stopAllOscillators();
    };
  }, [isPlaying, isInitialized]);

  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopAllOscillators();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null; // This component doesn't render anything visual
};

export default RomanticMusic;