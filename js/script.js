const endpoint = `https://jsonplaceholder.typicode.com/photos?_limit=204`

const cardWrapper = document.getElementById('card-wrapper');
const overlay = document.querySelector('.overlay');
const btnChiudiOverlay = document.querySelector('.overlay button');

let photos = [];
let currentPage = 0;

btnChiudiOverlay.addEventListener('click', () => overlay.classList.add('d-none'));

window.addEventListener('scroll', handleInfiniteScroll)

getAndPrintCards(endpoint);

// Funzione che esegue la call all'API, rimappa l'array di oggetti ottenuto e stampa le card in pagina 
function getAndPrintCards(endpoint) {
  axios.get(endpoint)
    .then(res => {
      photos = res.data.map(({ title, url }) => { return { title, url } })
      printCards(currentPage);
      addEventListenerToCards();
    })
    .catch(err => console.log(err));
}
// Funzione che restituisce la stringa di template di una card passando titolo e url dell'immagine
function getCardTemplate(title, img) {
  return `
        <div class="col">
          <div class="card">
            <div class="img-wrapper">
              <img src="${img}" alt="${title}">
            </div>
            <div class="text">
              <p>${title}</p>
            </div>
          </div>
        </div>
  `
}
// Funzione che aggiunge l'event listener del click alle card, viene richiamata nel then della richiesta axios
function addEventListenerToCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', handleClickCard);
  })
}
// Funzione che gestisce il click delle card
function handleClickCard(e) {
  overlay.classList.remove('d-none');

  const imgSrc = e.currentTarget.querySelector('img').src
  document.querySelector('.overlay img').src = imgSrc;
}
function printCards(page) {
  const start = 6 * page;
  const end = start + 6;

  for (let i = start; i < end; i++) {
    const { title, url } = photos[i];
    cardWrapper.innerHTML += getCardTemplate(title, url);
  }
}
function handleInfiniteScroll() {
  const end = window.innerHeight + window.scrollY >= document.body.offsetHeight;
  if (end) {
    printCards(++currentPage);
  }
}