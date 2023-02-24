import '../scss/main.scss';
import '../index.html';
import { showDateAndTime } from './main/dateAndTime';
import { changeMainBackGround } from './main/backgroundSwitcher';
import { getWeather } from './header/weather';
import { getQuotes } from './footer/quotes';
import { createAudioPlayer } from './header/audioPlayer';

showDateAndTime();

changeMainBackGround();

setInterval(getWeather, 1000);

getQuotes();

createAudioPlayer();