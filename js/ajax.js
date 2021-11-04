'use strict';
const fetchShow = async (url) => {
  const response = await fetch(url);
  return await response.json();

};

const form = document.querySelector('#search-form');
const target = document.querySelector('#target');
const query = document.querySelector('#query');
const body= document.querySelector('body');

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const url = form.action + '?q=' + query.value;
  const tvShows = await fetchShow(url);
  console.log(tvShows);
  if (document.contains(document.querySelector('img'))) {
    document.querySelector('img').remove();
  }
  if (target.contains(target.querySelector('article'))) {
    target.innerHTML = '';
  }
  if (tvShows.length === 0) {
    let img = document.createElement('img');
    img.setAttribute('id', 'imgNo');
    img.src = 'Welcome.png';
    img.alt = 'Welcome! What shows do you want to look up?';
    body.appendChild(img);
  } else {
    for (let i = 0; i < tvShows.length; i++) {
      console.log(tvShows[i].show.name)
      let article = document.createElement('article');
      let header = document.createElement('header');
      let h2 = document.createElement('h2');
      let img = document.createElement('img');
      let figure = document.createElement('figure');
      let p = document.createElement('p');
      let p2 = document.createElement('p');
      let p3 = document.createElement('p');
      let a = document.createElement('a');

      let showName = '';
      let genresText = '';
      let summaryText = '';

      if (tvShows[i].show.name == null) {
        showName = document.createTextNode('404');
      } else {
        showName = document.createTextNode(tvShows[i].show.name);
      }
      if (tvShows[i].show.image == null) {
        img.src = 'noPicture.jpg';
        img.alt = '404 no image';
      } else {
        img.src = tvShows[i].show.image.medium;
        img.alt = tvShows[i].show.name;
      }
      target.appendChild(article);
      article.appendChild(header);
      header.appendChild(h2);
      h2.appendChild(showName);
      article.appendChild(figure);
      figure.appendChild(img);

      if (tvShows[i].show.officialSite == null) {
        figure.appendChild(p);
        let error = document.createTextNode('Sites not found');

        p.appendChild(error);
      } else {
        figure.appendChild(a);
        a.setAttribute('href', tvShows[i].show.officialSite);
        a.innerHTML = tvShows[i].show.name;

      }

      if (tvShows[i].show.genres == 0) {
        genresText = document.createTextNode('Genres not found');
      } else {
        genresText = document.createTextNode(
            'Genres: ' + tvShows[i].show.genres);
      }

      figure.appendChild(p2);
      p2.appendChild(genresText);

      if (tvShows[i].show.summary == 0) {
        figure.appendChild(p3);
        summaryText = document.createTextNode('Summary not found');
        p3.appendChild(summaryText);
      } else if (tvShows[i].show.summary == null) {
        figure.appendChild(p3);
        summaryText = document.createTextNode('Summary not found');
        p3.appendChild(summaryText);
      } else {
        article.innerHTML += tvShows[i].show.summary;
      }
    }
  }
});
form.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector('button[type="submit"]').click();
  }
});