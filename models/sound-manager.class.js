class SoundManager {

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
           /*  jump: new Audio('sounds/jump.mp3'), */
            coin: new Audio('audio/collect-coin.mp3'),
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
           /*  this.sounds.background.play();  */
        }
    }

}