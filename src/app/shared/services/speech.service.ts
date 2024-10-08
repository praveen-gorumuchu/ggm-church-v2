import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private speechSynthesis: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();

    // Load voices and ensure they are ready
    this.loadVoices();
  }

  private loadVoices(): void {
    this.voices = this.speechSynthesis.getVoices();

    if (!this.voices.length) {
      // Sometimes the voices take time to load, so we handle that with an event listener
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = this.speechSynthesis.getVoices();
      };
    }
  }

  // Speak in English (or default language)
  speak(text: string, rate = 1, pitch = 1, volume?: number): void {
    this.cancel();
    this.utterance.text = text;
    this.utterance.lang = 'en-US';
    this.utterance.rate = rate;
    this.utterance.pitch = pitch;
    this.utterance.volume = volume ? volume : 1;
    this.speechSynthesis.speak(this.utterance);
  }

  // Speak in Telugu
  speakInTelugu(text: string): void {
    if (this.speechSynthesis) {
      this.cancel();
  
      // Get available voices
      const teluguVoice = this.voices.find(voice => voice.lang === 'te-IN');
  
      if (teluguVoice) {
        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.voice = teluguVoice;
        this.utterance.lang = 'te-IN'; // Telugu language
        this.utterance.rate = 1; // Speed of the speech
        this.utterance.pitch = 1; // Pitch of the speech
        this.speechSynthesis.speak(this.utterance);
      } else {
        this.speak(text); // Fallback to English or default voice
      }
    } 
  }
  
  stop(): void {
    this.speechSynthesis.cancel(); // Stops the speech
  }

  pause(): void {
    this.speechSynthesis.pause(); // Pauses the speech
  }

  resume(): void {
    this.speechSynthesis.resume(); // Resumes paused speech
  }

  private cancel(): void {
    this.speechSynthesis.cancel(); // Cancels any ongoing speech
  }
}
