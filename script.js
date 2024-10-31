const quote = document.querySelector("blockquote");
const heartBtn = document.querySelector("#heart");
const sound = new Audio('click.mp3');
const favContainer = document.querySelector(".favorite-container");
const favList = document.querySelector("#fav-list");
const closeFav = document.querySelector("#close-favorite");
const url =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist&type=single";

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  quote.textContent = data.joke;
  checkIfFavorite(); 
  sound.play();
}
getData();

let favQuotes = JSON.parse(localStorage.getItem('favorites')) || [];

function checkIfFavorite() {
  if (favQuotes.includes(quote.textContent)) {
    heartBtn.classList.add('red');
  } else {
    heartBtn.classList.remove('red'); 
  }
}

function saveFavorite() {
  if (!favQuotes.includes(quote.textContent)) {
  favQuotes.push(quote.textContent);
  localStorage.setItem('favorites', JSON.stringify(favQuotes));
  heartBtn.classList.add('red');
  sound.play();
  }
}

function showFavorites() {
  favContainer.classList.remove('hidden');
  sound.play();
  favQuotes.forEach(quote => {
    const li = document.createElement('li');
    li.textContent = quote;
    favList.appendChild(li);
  });
}

function clearFavorites() {
  localStorage.removeItem('favorites');
  favQuotes = [];
  favList.innerHTML = ''; 
}

function closeFavList() {
  favContainer.classList.add('hidden');
}

function copyToClipBoard() {
  navigator.clipboard.writeText(quote.textContent);
  sound.play();
}
