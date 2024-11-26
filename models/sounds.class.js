class SoundManager {
    sounds = []; // Liste aller Sounds
    isMuted = false; // Zustand: Sind Sounds stummgeschaltet?

    // Sound hinzufügen
    addSound(sound) {
        this.sounds.push(sound);
    }

    // Alle Sounds abspielen
    playAll() {
        if (!this.isMuted) {
            this.sounds.forEach((sound) => sound.play());
        }
    }

    // Alle Sounds pausieren
    pauseAll() {
        this.sounds.forEach((sound) => sound.pause());
    }

    // Stummschalten umschalten
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.pauseAll();
        } else {
            this.playAll();
        }
    }
}