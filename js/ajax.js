'use strict';
const fetchShow = async () => {
  const response = await fetch('https://api.tvmaze.com/search/shows?q=squ');
  return await response.json();

};

const form = document.querySelector('#search-form');
const target = document.querySelector('#target');
const query = document.querySelector('#query');
const main = document.querySelector('main');
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const url = form.action + '?q=' + query.value;
  const tvShows = await fetchShow(url);

  console.log(tvShows.length)
  if (tvShows.length == 0) {

    let main = document.querySelector('main');

    let img = document.createElement('img');
    img.setAttribute('id', 'img');
    img.src = 'cooltext363311245930538.png';
    img.alt = 'Welcome! What shows do you want to look up?';
    main.appendChild(img);
  } else {
    for (let i = 0; i < tvShows.length; i++) {

      const article = document.createElement('article');
      const header = document.createElement('header');
      const h2 = document.createElement('h2');
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const p = document.createElement('p');
      const figcaption = document.createElement('figcaption');
      console.log(tvShows[i].show.name)
      h2.innerHTML = tvShows[i].show.name;
      img.src = tvShows[i].show.image.medium;
      img.alt = tvShows[i].show.title;
      figcaption.innerHTML = tvShows[i].show.caption;
      p.innerHTML = tvShows[i].show.description;

      header.appendChild(h2);
      figure.appendChild(img);
      figure.appendChild(figcaption);

      article.appendChild(header);
      article.appendChild(figure);
      article.appendChild(p);
      target.appendChild(article);
    }
    console.log(tvShows);
  }
});
