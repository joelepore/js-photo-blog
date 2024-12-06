let photos = [];
let currentPage = 0;
const photosPerPage = 6;
const numPhotos = 204;
const endpoint = `https://jsonplaceholder.typicode.com/photos?_limit=${numPhotos}`

const cardWrapper = document.getElementById('card-wrapper');
const overlay = document.querySelector('.overlay');
const btnChiudiOverlay = document.querySelector('.overlay button');


btnChiudiOverlay.addEventListener('click', () => overlay.classList.add('d-none'));

window.addEventListener('scroll', handleInfiniteScroll)

getAndPrintCards(endpoint);

// Funzione che esegue la call all'API, rimappa l'array di oggetti ottenuto e stampa le card in pagina 
function getAndPrintCards(endpoint) {
  axios.get(endpoint)
    .then(res => {
      photos = res.data.map(({ title, url }) => { return { title, url } })
      printCards(currentPage++, photosPerPage);
      printCards(currentPage, photosPerPage);
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
              <img 
                src="${img}" 
                alt="${title}" 
                onerror="this.src='https://archive.org/download/placeholder-image/placeholder-image.jpg';">
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
// Funzione che, data la pagina corrente, stampa le card
function printCards(page, photosPerPage) {
  const start = photosPerPage * page;
  const end = start + photosPerPage;

  for (let i = start; i < end; i++) {
    const { title, url } = photos[i];
    cardWrapper.innerHTML += getCardTemplate(title, url);
  }
}
// Funzione che rileva il punto di scroll a cui sono, incrementa la pagina e stampa le card
function handleInfiniteScroll() {
  const end = window.innerHeight + window.scrollY >= document.body.offsetHeight;
  if (end && currentPage * photosPerPage + photosPerPage < numPhotos) {
    console.log(currentPage * photosPerPage + photosPerPage);
    printCards(++currentPage, photosPerPage);
    addEventListenerToCards();
  }
}