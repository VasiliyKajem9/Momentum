import { getRandomNum } from '../main/backgroundSwitcher';

const quoteContent = document.querySelector('.quote__content') as HTMLElement;
const quoteAutor = document.querySelector('.quote__autor') as HTMLElement;
const quoteRefresh = document.querySelector('.quote__refresh') as HTMLButtonElement;

export async function getQuotes() {
  const url = 'https://type.fit/api/quotes';
  const res = await fetch(url);
  const data = await res.json(); 
  
  const response = data[getRandomNum(1, 1500)];

  quoteContent.innerHTML = `" ${response.text} "` ;
  quoteAutor.innerHTML = response.author;
}

quoteRefresh.addEventListener('click', () => {
  quoteRefresh.classList.add('quote__refresh_active');
  getQuotes();
  setTimeout(() => quoteRefresh.className = 'quote__refresh', 400)
})