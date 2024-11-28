/* class SoundManager {

    static instance; // Singleton-Instanz

    sounds = {}; 

    isMuted = false; 
    

    constructor(){
        if (SoundManager.instance) {
            return SoundManager.instance; // Returns existing instance
        }
        SoundManager.instance = this;

        this.sounds = {
            background: new Audio('audio/2021-10-11_-_Country_Fireside_-_www.FesliyanStudios.com.mp3'),
            coin: new Audio('audio/collect-coin.mp3'),
            running: new Audio('audio/running.mp3'),
            jump: new Audio('audio/jump-1.mp3'),
            gameOver: new Audio('audio/game-over-1.mp3'),
            win: new Audio('audio/win-1.mp3'),
        };

        this.sounds.background.loop = true;
       this.sounds.background.play(); 

        
    }

    play(soundName) {
        const sound = this.sounds[soundName];
        if (sound && !this.isMuted) {
            sound.currentTime = 0;
            sound.play();
        } 
    }

    pause(soundName) {
        const sound = this.sounds[soundName];
        sound.pause();
    }

    setVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume;
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


    toggleMute() {
        this.isMuted = !this.isMuted; // Toggle mute status
    
        const toggleButton = document.getElementById('toggleSounds');
        const imgElement = toggleButton.querySelector('img'); 
    
        // change img when button is clicked
        imgElement.src = this.isMuted ? 'img/SVG/volume-off.svg' : 'img/SVG/volume-on.svg';
    
        if (this.isMuted) {
            this.pauseAll(); 
        } else {
            console.log('Sounds sind nicht mehr gemutet.');
           
        }
    }

} */


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
    background: { audio: new Audio('audio/2021-10-11_-_Country_Fireside_-_www.FesliyanStudios.com.mp3'), volume: 1.0 },
    coin: { audio: new Audio('audio/collect-coin.mp3'), volume: 0.1 },
    running: { audio: new Audio('audio/running.mp3'), volume: 1.0 },
    jump: { audio: new Audio('audio/jump-1.mp3'), volume: 0.1 },
    gameOver: { audio: new Audio('audio/game-over-1.mp3'), volume: 1.0 },
    win: { audio: new Audio('audio/win-1.mp3'), volume: 1.0 },
};

        // background music
        this.sounds.background.audio.loop = true; 
        this.sounds.background.audio.volume = this.sounds.background.volume; 
        this.sounds.background.audio.play(); 
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

/*     setSoundVolume(soundName, volume) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.volume = volume; // Aktualisiere die gespeicherte Lautstärke
            sound.audio.volume = volume; // Setze die Lautstärke des Audio-Objekts
        } 
    } */

/*     setVolumeForAll(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume; // Aktualisiere die gespeicherte Lautstärke
            sound.audio.volume = volume; // Setze die Lautstärke des Audio-Objekts
        });
    } */

    play(soundName) {
        const sound = this.sounds[soundName]; 
        if (sound && !this.isMuted) {
            sound.audio.volume = sound.volume; // Set the volume from the `sounds` object
            sound.audio.currentTime = 0; // plays sounds from the beginning
            sound.audio.play(); 
        }
    }

    pauseAll() {
        Object.values(this.sounds).forEach(sound => sound.audio.pause());
    }

    toggleMute() {
        this.isMuted = !this.isMuted; 

        const toggleButton = document.getElementById('toggleSounds');
        const imgElement = toggleButton.querySelector('img'); 

        // change img of button if clicked
        imgElement.src = this.isMuted ? 'img/SVG/volume-off.svg' : 'img/SVG/volume-on.svg';

        if (this.isMuted) {
            this.pauseAll(); 
        } /* else {
            console.log('Sounds sind nicht mehr gemutet.');
            this.sounds.background.audio.play(); 
        } */
    }
}