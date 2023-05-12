const loader = document.getElementById('loader');
const baseURL = 'https://swapi.dev/api';
const select = document.getElementById('keys-list');
const numberInput = document.getElementById('number-select');
const showContent = document.getElementById('show-content');

function makeRequest() {
  const entity = select.value;
  const number = numberInput.value;
  const url =`${baseURL}/${entity}/${number}`;
   if (number < 1 || number > 10) {
    showContent.innerHTML = '<div>Error: Please choose a number between 1 and 10</div>';
    return;}
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  showContent.innerHTML = '';
  
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('The site is not responding');
      }
      return response.json();
    })
    .then((data) => {
      let resultHtml = '';
      if (entity === 'people') {
        resultHtml = `
          <p>Name: ${data.name}</p>
          <p>Height: ${data.height} cm</p>
          <p>Hair Color: ${data.hair_color}</p>
          <p>Birth Year: ${data.birth_year}</p>
          <p>Gender: ${data.gender}</p>
        `;
      } else if (entity === 'planets') {
        resultHtml = `
          <p>Name: ${data.name}</p>
          <p>Rotation Period: ${data.rotation_period}</p>
          <p>Orbital Period: ${data.orbital_period}</p>
          <p>Diameter: ${data.diameter} km</p>
        `;
      } else if (entity === 'films') {
        resultHtml = `
          <p>Title: ${data.title}</p>
          <p>Episode: ${data.episode_id}</p>
          <p>Director: ${data.director}</p>
          <p>Producer: ${data.producer}</p>
        `;
      }
  
      showContent.innerHTML = `<div>${resultHtml}</div>`;
      loader.style.display = 'none';
    })
    .catch((error) => {
      showContent.innerHTML = `<div>Error: ${error.message}</div>`;
      loader.style.display = 'none';
    })
    .finally(() => {
      select.selectedIndex = 0;
      numberInput.value = '';
    });
}

document.querySelector('#submit').addEventListener('click', makeRequest);

document.addEventListener("DOMContentLoaded", function() {
  let input = document.getElementById("number-select");
  input.focus();
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("submit").click();
    }
  });
});
