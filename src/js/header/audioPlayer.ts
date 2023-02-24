// const audioPlayer = document.querySelector('.audioPlayer') as HTMLElement;
const soundName = document.querySelector('.audioPlayer__name') as HTMLElement;
const soundDuration = document.querySelector('.audioPlayer__length') as HTMLElement;

const audio = document.querySelector('.audio') as HTMLAudioElement;
const playBtn = document.querySelector('.audioPlayer__play') as HTMLElement;
const timeLine = document.querySelector('.audioPlayer__timeLine') as HTMLElement;

const playList = document.querySelector('.playList') as HTMLUListElement;

let currentTrack = 0;

const sounds = [
  {      
    title: 'POD - YouthOfTheNation',
    src: 'images/POD - YouthOfTheNation.mp3',
    duration: '4:16'
  },  
  {      
    title: 'Stone Sour - Inhale',
    src: 'images/Stone Sour - Inhale.mp3',
    duration: '4:25'
  },
  {      
    title: 'SayYouWillHauntMe',
    src: 'images/Stone Sour - Say You Will Haunt Me.mp3',
    duration: '4:24'
  },
];

function getTimeCodeFromNum(num: number) {
  let seconds = parseInt('' + num);
  let minutes = parseInt('' + seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt('' + minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
  return `${String(hours).padStart(2, '0')}:${minutes}:${String(
    seconds % 60
  ).padStart(2, '0')}`;
}

export function createAudioPlayer() {
  function listElemActivator(arr: Array<HTMLLIElement>) {
    arr.forEach(elem => {
      elem.className = 'playList__elem'
    })
    arr[currentTrack].classList.add('playList__elem_active');
  }
  sounds.forEach(elem => {
    const listElem = document.createElement('li');
    listElem.className = 'playList__elem';
    listElem.textContent = elem.title;
    playList.append(listElem);
  })

  audio.volume = .75;

  soundName.textContent = sounds[0].title;
  soundDuration.textContent = sounds[0].duration;

  const allTrack: Array<HTMLLIElement> = Array.from(document.querySelectorAll('.playList__elem'));

  function trackAutoSwitcher() {
    if (currentTrack > 2) {
      currentTrack = 0;
    } else if (currentTrack < 0) {
      currentTrack = sounds.length - 1;
    }

    audio.src = sounds[currentTrack].src;
    listElemActivator(allTrack);
    soundName.textContent = sounds[currentTrack].title;
    soundDuration.textContent = sounds[currentTrack].duration;
    audio.play();
  }

  // TimeLine
  timeLine.addEventListener('click', e => {
    const timelineWidth = window.getComputedStyle(timeLine).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
  }, false);

  setInterval(() => {
    const progress = document.querySelector('.audioPlayer__progress') as HTMLElement;
    progress.style.width = audio.currentTime / audio.duration * 100 + '%';
    const currentTime = document.querySelector('.audioPlayer__current') as HTMLElement;
    currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
    if (getTimeCodeFromNum(audio.currentTime) == soundDuration.textContent) {
      currentTrack += 1;
      trackAutoSwitcher();
    }
  }, 1000)
  
  // Volume
  const volume = document.querySelector('.audioPlayer__volumeSlider') as HTMLElement;
  volume.addEventListener('click', event => {
    const volumeWidth = window.getComputedStyle(volume).width;
    const newVolume = event.offsetX / parseInt(volumeWidth);

    audio.volume = newVolume;
    const volumePercentage = document.querySelector('.audioPlayer__volumePercentage') as HTMLElement;
    volumePercentage.style.width = newVolume * 100 + '%'
  }, false)

  // Play Pause

  function playPause() {
    playBtn.classList.toggle('audioPlayer__play_active');
    playBtn.classList.toggle('audioPlayer__play_disabled');

    if (playBtn.className.includes('active')) {
      audio.pause();
    } else audio.play();
  }
  playBtn.addEventListener('click', () => {
    playPause();
  }, false)

  // click at any track

  listElemActivator(allTrack);

  allTrack.forEach((elem, index) => {
    elem.addEventListener('click', () => {
      console.log(index)
      currentTrack = index;

      trackAutoSwitcher();

      playBtn.classList.remove('audioPlayer__play_active');
      playBtn.classList.add('audioPlayer__play_disabled');
    }, false)
  })

  // next prev click
  const nextPrev = Array.from(document.querySelectorAll('.audioPlayer__nextPrev'));

  nextPrev[0].addEventListener('click', () => {
    currentTrack -= 1;
    trackAutoSwitcher();
  }, false)

  nextPrev[1].addEventListener('click', () => {
    currentTrack += 1;
    trackAutoSwitcher();
  }, false)
}