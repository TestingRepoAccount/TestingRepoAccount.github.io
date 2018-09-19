"use strict";

window.onload = function () {

    const url = window.location.href;
    
    function parseURL (url) {
        const start = url.indexOf("?") + 1;
        const end = url.indexOf("#", start);
        const data = url.substring(start, end);
        return data;
    }

    const title_h1 = document.querySelector('#video-info');
    title_h1.textContent = parseURL(url);

    // console.log();

    // console.log(parseURL(url));
}