import '../scss/main.scss';
import '../index.html';
import { showDateAndTime } from './main/dateAndTime';
import { changeMainBackGround } from './main/backgroundSwitcher';
import { getWeather } from './header/weather';

showDateAndTime();

changeMainBackGround();

setInterval(getWeather, 1000);