"use strict";

//Access current page url
const hash = window.location.href;
let global_url = hash.substring(hash.lastIndexOf('/') + 1);
global_url = global_url.substring(0, global_url.lastIndexOf('.'));

//Object to hold all page names
const pages = {
    home: "index",
    'completed-works': 'completed-works',
    blog: 'blog',
    'about-me': 'about-me'
}

//Create 'xhr' function to hold all xhr requests
function xhr(url, load) {
    fetch(url)
    .then((data) => data.json())
    .then((data) => {
        const path = data['completed works'];
        load(path);
    })
    .catch((err) => console.log(err));
}

//JS code for 'Completed Works' page
if (global_url === pages['completed-works']) {
    const page = document.querySelector(`#${global_url}`);
    const section = page.querySelector(`.section`);
    const ul = section.querySelector('ul');
    xhr('https://www.jasonbase.com/things/wAe3.json', (data) => {
        const stored = new Array;
        for (let i in data) {
            stored.push(data[i]);
        }
        for (let i of stored) {
            const li = document.createElement('li');
            const topDiv = document.createElement('div');
            const bottomDiv = document.createElement('div');
            const title = document.createElement('h2');
            const date = document.createElement('h4');
            const time = document.createElement('h4');
            const tod = document.createElement('h4');
            const preview = document.createElement('p');

            li.className = 'display-li';

            title.innerText = i.title;
            date.innerText = i.date;
            time.innerText = i.time;
            tod.innerText = i.tod;
            preview.innerText = i.preview;

            li.appendChild(topDiv);
            topDiv.appendChild(title);
            topDiv.appendChild(date);
            topDiv.appendChild(time);
            topDiv.appendChild(tod);            
            li.appendChild(bottomDiv);
            bottomDiv.appendChild(preview);
            ul.appendChild(li);
        }
    });
}

//JS code for 'Blog' page
if (global_url === pages['blog']) {
    const page = document.querySelector(`#${global_url}`);
    const section = page.querySelector(`.section`);
    const ul = section.querySelector('ul');
    xhr('https://www.jasonbase.com/things/wAe3.json', (data) => {
        const stored = new Array;
        for (let i in data) {
            stored.push(data[i]);
        }
        for (let i of stored) {
            const li = document.createElement('li');
            const topDiv = document.createElement('div');
            const bottomDiv = document.createElement('div');
            const title = document.createElement('h2');
            const date = document.createElement('h4');
            const time = document.createElement('h4');
            const tod = document.createElement('h4');
            const preview = document.createElement('p');

            li.className = 'display-li';

            title.innerText = i.title;
            date.innerText = i.date;
            time.innerText = i.time;
            tod.innerText = i.tod;
            preview.innerText = i.preview;

            li.appendChild(topDiv);
            topDiv.appendChild(title);
            topDiv.appendChild(date);
            topDiv.appendChild(time);
            topDiv.appendChild(tod);            
            li.appendChild(bottomDiv);
            bottomDiv.appendChild(preview);
            ul.appendChild(li);
        }
    });
}