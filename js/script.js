const endpoint = `https://jsonplaceholder.typicode.com/photos?_limit=6`

const cardWrapper = document.getElementById('card-wrapper');

getAndPrintCards(endpoint);

function getAndPrintCards(endpoint) {
  axios.get(endpoint)
    .then(res => {
      const photos = res.data.map(({ title, url }) => {
        return {
          title,
          url
        }
      })
      photos.forEach(photo => {
        cardWrapper.innerHTML += getCardTemplate(photo.title, photo.url);
      })
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