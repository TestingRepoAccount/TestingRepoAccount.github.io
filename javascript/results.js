'use strict';

window.onload = function () {

    //Referance all LI's inside VIDEO UL
    const video = document.querySelectorAll('#video li');

    //Handle click and redirect routes for video
    video.forEach((node) => {
        node.addEventListener('click', (element) => {
            // let target = element.target;
            // target = target.getAttribute('data-route');

            const route = 'mutable.html';
            
            let video = element.target
            video = video.getAttribute('data-video');
            video = video.split('vimeo.com/')[1];

            // let password = element.target;
            // password = password.getAttribute('data-pw');

            let data = `${route}?video=${video}`;

            window.location = data;
        });
    });
}