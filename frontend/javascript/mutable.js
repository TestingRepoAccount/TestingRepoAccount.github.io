"use strict";

window.onload = function () {

    //Store full url
    const base_url = window.location.href;

    //Establish types to reference (WRITTING, VIDEO)
    const video = 'video';
    const writting = 'writting';

    //Detect page type and set page background color
    if (base_url.includes(video)) {
        const test = document.querySelector(':root');
        test.style.backgroundColor = '#000';
    }

    //Reference DOM endpoint
    const body = document.querySelector('body > section');

    //Parse url and retrieve specific info
    //RETURN [0] -> TYPE (VIDEO, WRITTING) [1] -> DATA REFERANCE (VIDEO, WRITTING)
    function parseURL() {
        //Retrieve usefull info from url
        let url = base_url.split('mutable.html?')[1];

        //Slit url into data type and data value
        const url_data = url.split('=');

        const type = url_data[0];
        const data = url_data[1];

        //Make request to vimeo
        if (type === video) return ['video', `${data}`];

        //Make internal request to retrieve writting post
        if (type === writting) return ['writting', data];

    }

    //Evaluate URL data
    function evaluateURL(url_data) {

        const type = url_data[0];
        const data = url_data[1];

        //Create elements and make request for VIDEO type
        if (type === video) {
            //Create new iframe element, set SRC attribute, and append iframe to body
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${data}`);
            iframe.setAttribute('width', "854");
            iframe.setAttribute('height', "480");
            iframe.setAttribute('frameborder', "0");
            iframe.setAttribute('allowfullscreen', "allowfullscreen");
            body.appendChild(iframe);
        }

        //Create elements and make request for WRITTING type || PENDING
        if (type === writting) {
            //LOGIC WILL BE WRITTEN ONCE DB IS ESTABLISHED
        }
    }

    //Make request
    evaluateURL(parseURL());
}