"use strict";

window.onload = function () {

    //Select all li elements
    const home_nav_li = document.querySelectorAll('li');

    //Loop over all li menu items
    for (let i = 0; i < home_nav_li.length; i++) {

        //Mouseover/Mouseout styling for bottom border menu items
        home_nav_li[i].addEventListener('mouseover', (e) => {
            // e.target.style.borderBottom = `5px solid ${generate_color()}`;
            e.target.style.fontWeight = 'bold';
        });
        home_nav_li[i].addEventListener('mouseout', (e) => {
            // e.target.style.borderBottom = 'none';      
            e.target.style.fontWeight = 'normal';
                 
        })
    }

    //Randomly generate hex colors
    function generate_color() {
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }
}