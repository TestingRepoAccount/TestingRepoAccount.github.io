'use strict';

window.onload = function () {

    //Referance all LI's inside VIDEO UL
    const video = document.querySelectorAll('#video li');

    //Handle click and redirect routes for video
    video.forEach((node) => {
        node.addEventListener('click', (element) => {
            const route = 'mutable.html';
            
            let video = element.target
            video = video.getAttribute('data-video');
            video = video.split('vimeo.com/')[1];

            let data = `${route}?video=${video}`;

            window.location = data;
        });
    });
}