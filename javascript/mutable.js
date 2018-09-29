"use strict";

window.onload = function () {

    //Store full url
    const url = window.location.href;
    
    //Parse url and retrieve usefull info
    function parseURL (url) {
        const start = url.indexOf("?") + 1;
        const end = url.indexOf("#", start);
        let data = url.substring(start, end);
        //Remove equal sign
        data = data.replace('=', '/');
        //Return completed/formated string
        return `https://player.vimeo.com/${data}`
    }

    //Append text to page title
    const title_h1 = document.querySelector('#video-info');
    title_h1.textContent = parseURL(url);

    //Create new iframe element
    const body = document.querySelector('body > section');
    const video = document.createElement('iframe');

    //Set src attribute
    video.setAttribute('src', parseURL(url));

    //Append video to page
    body.appendChild(video);

    // console.log(parseURL(url));
}