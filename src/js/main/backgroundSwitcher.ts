import { timeOfDay } from './dateAndTime';

const app = document.querySelector('.app') as HTMLElement;
const sliderBtns: Array<HTMLButtonElement> = Array.from(document.querySelectorAll('.sliderControls__btn'));

const pathToImg = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

export function getRandomNum(min: number, max: number) {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand)
}

function numRef(num: number) {
  const numToStr = num + '';

  if (numToStr.length == 1) {
    return '0' + numToStr
  } else return numToStr
}

let currentSlide = +getRandomNum(1, 20);

export function changeMainBackGround() {
  app.style.backgroundImage = `url(${pathToImg}${timeOfDay}/${numRef(currentSlide)}.jpg)`;

  function changeImg() {
    const img = new Image();
    img.src = `${pathToImg}${timeOfDay}/${numRef(currentSlide)}.jpg`;

    img.addEventListener('load', () => {
      app.style.backgroundImage = `url(${img.src})` 
    })
  }

  sliderBtns[0].addEventListener('click', () => {
    currentSlide -= 1;

    if (currentSlide <= 0) {
      currentSlide = 20
    }

    changeImg()
  })
  
  sliderBtns[1].addEventListener('click', () => {
    currentSlide += 1;

    if (currentSlide >= 21) {
      currentSlide = 1
    }
    
    changeImg()
  })
}