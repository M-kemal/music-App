

const img = document.getElementById('music-img');
// const audio = document.getElementById('audio');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const prev = document.querySelector('#controls #prev');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');
const duration = document.querySelector('#progress #duration');
const currentTime = document.querySelector('#progress #currentTime');
const progressBar = document.querySelector('#progress #progress-bar');
const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');
const ul = document.querySelector('ul');
const containerCard = document.querySelector('.container .card');
const listCollapse = document.querySelector('.list');
const listMenu = document.querySelector('#listMenu');

const player = new MusicPlayer(musicList);

window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(musicList);
});


function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    img.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlay = containerCard.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener('click', () => {
    prevMusic();
});

next.addEventListener('click', () => {
    nextMusic();
});

const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const pauseMusic = () => {
    containerCard.classList.remove("playing");
    play.classList = 'fa-solid fa-play text-2xl'
    audio.pause();
}

const playMusic = () => {
    containerCard.classList.add("playing");
    play.classList = 'fa-solid fa-pause text-2xl';
    audio.play();
}


const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}`: `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}

audio.addEventListener('loadedmetadata', () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
})

audio.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value); 
})

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});


let sesDurumu = 'sesli';

volumeBar.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if ( value == 0 ) {
        audio.muted = true;
        sesDurumu = 'sessiz';
        volume.classList = "fa-solid fa-volume-xmark text-xl";
    } else {
        audio.muted = false;
        sesDurumu = 'sesli';
        volume.classList = "fa-solid fa-volume-high text-xl";
    }
});

volume.addEventListener('click', () => {
    if(sesDurumu === 'sesli') {
        audio.muted = true;
        sesDurumu = 'sessiz';
        volume.classList = "fa-solid fa-volume-xmark text-xl";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        sesDurumu = 'sesli';
        volume.classList = "fa-solid fa-volume-high text-xl";
        volumeBar.value = 100;
    }
})



const displayMusicList = (list) => {
    for(let i=0; i < list.length; i++) {
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="flex items-center justify-between mx-2 p-2">
                <span class="cursor-pointer">${list[i].getName() + list[i].singer}</span>
                <span id="music-${i}" class=""></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;

        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });

    }
}

const selectedMusic = (li) => {
    player.index = li.getAttribute('li-index');
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
};

const isPlayingNow = () => {
    for (let li of ul.querySelectorAll('li')) {
        if (li.classList.contains('playing')) {
            li.classList.remove('playing');
        }
        if (li.getAttribute('li-index') == player.index) {
            li.classList.add('playing');
        }
        
    }

    audio.addEventListener('ended', () => {
        nextMusic();
    })
};


listMenu.addEventListener('click', () => {
   listCollapse.classList.toggle('hidden')
})


document.body.onkeyup = function(e){
    if(e.keyCode == 32){ 
        if(audio.paused){
            audio.play();
            play.classList = 'fa-solid fa-pause text-2xl'
        } else {
            audio.pause();
            play.classList = 'fa-solid fa-play text-2xl'
        }
    }
}