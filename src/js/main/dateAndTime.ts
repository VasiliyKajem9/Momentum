const time = document.querySelector('.date__time') as HTMLElement;
const date = document.querySelector('.date__date') as HTMLElement;
const greetings = document.querySelector('.date__greetings') as HTMLElement;
const nameInput = document.querySelector('.date__name') as HTMLInputElement;

export let timeOfDay: string;

function setName() {
  localStorage.setItem('name', nameInput.value);
}

function getName() {
  if (localStorage.getItem('name')) {
    nameInput.value = '' + localStorage.getItem('name');
  }
}

export function getTimeOfDay(dateObj: Date) {
  if (dateObj.getHours() < 12 && dateObj.getHours() >= 6) {
    return 'morning'
  } else if (dateObj.getHours() < 18 && dateObj.getHours() >= 12) {
    return 'afternoon'
  } else if (dateObj.getHours() < 24 && dateObj.getHours() >= 18) {
    return 'evening'
  } else if (dateObj.getHours() < 6 && dateObj.getHours() >= 0) {
    return 'night'
  } else return 'day'
}

export function showDateAndTime() {
  const newDate = new Date;
  const currentTime = newDate.toLocaleTimeString();

  timeOfDay = getTimeOfDay(newDate);

  function getMonthAndDay(curDate: Date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  
    return `
      ${days[curDate.getDay()]}, 
      ${month[curDate.getMonth()]} 
      ${curDate.getDate()}`;
  }

  time.innerHTML = currentTime;
  date.innerHTML = getMonthAndDay(newDate);
  greetings.innerHTML = `Good ${timeOfDay}`

  setTimeout(showDateAndTime, 1000)
}

window.addEventListener('beforeunload', setName);
window.addEventListener('load', getName);