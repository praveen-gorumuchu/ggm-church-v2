import { CAPS_LOCK } from "@angular/cdk/keycodes";

export class CanvasConstant {
    static readonly QUESTION_MARK = 'https://lottie.host/26a43c31-bde6-4d11-a5a4-c3d5639ad13c/7PWrSXBcMc.json';
    static readonly CORRECT = 'https://lottie.host/39e472ad-401f-4230-b4c2-0aa3a8aaadc5/FU65GaOR07.json';
    static readonly TIMER = 'https://lottie.host/ed562d3a-ce50-4f11-8275-bd58970afab2/YgRATdxIFM.json';
    static readonly START = 'https://lottie.host/acdfea00-fc93-4d46-9245-3d244c39ab68/InnNgddzMe.json';
    static readonly WRONG = 'https://lottie.host/0c87bf34-d832-405f-a704-6c2bc426c13b/fFHjVBA82t.json'
}

export const SoundConstantUrl = {
    CARD_CLICK: '../../../../assets/sounds/Correct_answer.wav',
    WRONG: '../../../../assets/sounds/wrong_answer.wav',
    CORRECT: '',
    CELEBRATION: '',
    TIMER: '../../../../assets/sounds/clock_sound.wav',
}

export const SoundConstant = {
    CARD_CLICK: 'card_click',
    WRONG: 'wrong',
    CORRECT: 'correct',
    CELEBRATION: 'celebration',
    TIMER: 'timer',
}

export const SpeechTextConstant = {
    welcome: 'wwelcome to the online quiz compitetion',
    hello: 'Hello',
    lucky_number: 'please select your any one number',
    speech_mode_off: 'speech mode off',
    speech_mode_on: 'speech mode on',

}