const API_TOKEN = "13720399-9fdeb26cc5867a1283c9e5641";

export function getImagesFromApiWithSearchedText (text, page) {
  const url = (text !== '') ? ("https://pixabay.com/api/?key=" + API_TOKEN + "&q=" + text + "&page=" + page) : ("https://pixabay.com/api/?key=" + API_TOKEN + "&page=" + page);
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageDetailFromApi (id) {
  const url = "https://pixabay.com/api/?key=" + API_TOKEN + "&id=" + id;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}