class SoundManager {

    static instance; // Singleton-Instanz

    sounds = {}; 

    isMuted = false; 
    

    constructor(){
        if (SoundManager.instance) {
            return SoundManager.instance; // Existierende Instanz zurückgeben
        }
        SoundManager.instance = this;

        this.sounds = {
            background: new Audio('audio/2021-10-11_-_Country_Fireside_-_www.FesliyanStudios.com.mp3'),
           /*  jump: new Audio('sounds/jump.mp3'), */
            coin: new Audio('audio/collect-coin.mp3'),
            gameOver: new Audio('audio/game-over-1.mp3'),
            win: new Audio('audio/win-1.mp3'),
        };

        this.sounds.background.loop = true;

        
    }

    play(soundName) {
        const sound = this.sounds[soundName];
        if (sound && !this.isMuted) {
            sound.currentTime = 0; // Zurücksetzen
            sound.play();
        } 
    }

    pause(soundName) {
        const sound = this.sounds[soundName];
        sound.pause();
    }

    setVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume; // Wert zwischen 0 und 1
        });
    }
        

    playAll() {
        if (!this.isMuted) {
            Object.values(this.sounds).forEach(sound => {
                sound.currentTime = 0;
                sound.play();
            });
        }
    }

    pauseAll() {
        Object.values(this.sounds).forEach(sound => sound.pause());
    }

    // Mute/Unmute umschalten
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.pauseAll();
        } else {
            console.log('Sounds sind nicht mehr gemutet.');
        }
    }

}