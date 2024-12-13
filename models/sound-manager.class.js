class SoundManager {
  static instance; // Singleton-Instanz

  sounds = {}; // Enthält alle Audio-Objekte
  isMuted = false;

  constructor() {
    if (SoundManager.instance) {
      return SoundManager.instance; // Gibt die bestehende Instanz zurück
    }
    SoundManager.instance = this;

    // sounds and volumes
    this.sounds = {
      background: {
        audio: new Audio(
          "audio/2021-10-11_-_Country_Fireside_-_www.FesliyanStudios.com.mp3"
        ),
        volume: 1.0,
      },
      coin: { audio: new Audio("audio/collect-coin-2.mp3"), volume: 0.03 },
      running: { audio: new Audio("audio/running.mp3"), volume: 1.0 },
      hit:{ audio: new Audio("audio/hit.mp3"), volume: 0.2},
      damage:{ audio: new Audio("audio/damage-2.mp3"), volume: 0.02},
      jump: { audio: new Audio("audio/jump-2.mp3"), volume: 0.03 },
      throw: { audio: new Audio("audio/throw.mp3"), volume: 0.03 },
      bottle: { audio: new Audio("audio/collect-bottle-1.mp3"), volume: 0.05 },
      bottle_break: { audio: new Audio("audio/bottle-break.mp3"), volume: 0.05 },
      gameOver: { audio: new Audio("audio/game-over.mp3"), volume: 1.0 },
      win: { audio: new Audio("audio/winning.mp3"), volume: 1.0 },
      chicken: { audio: new Audio("audio/chicken.mp3"), volume: 1.0 },
      chicken_small: { audio: new Audio("audio/chickenSmall.mp3"), volume: 1.0 },
    };

    // background music
    this.sounds.background.audio.loop = true;
    /* this.sounds.background.audio.volume = this.sounds.background.volume;
    this.sounds.background.audio.play(); */
  }

  play(soundName) {
    const sound = this.sounds[soundName];
    if (sound && !this.isMuted) {
      sound.audio.currentTime = 0;
      sound.audio.play();
    }
  }

  pause(soundName) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.audio.pause();
    }
  }

  play(soundName) {
    const sound = this.sounds[soundName];
    if (sound && !this.isMuted) {
      sound.audio.volume = sound.volume; // Set the volume from the `sounds` object
      sound.audio.currentTime = 0; // plays sound from the beginning
      sound.audio.play();
    }
  }

  pauseAll() {
    Object.values(this.sounds).forEach((sound) => sound.audio.pause());
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    const toggleButton = document.getElementById("toggleSounds");
    const imgElement = toggleButton.querySelector("img");

    // change img of button if clicked
    imgElement.src = this.isMuted
      ? "img/SVG/volume-off.svg"
      : "img/SVG/volume-on.svg";

    if (this.isMuted) {
      this.pauseAll();
    } 
  }
}
