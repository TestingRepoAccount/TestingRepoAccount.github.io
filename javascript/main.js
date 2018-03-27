"use strict";

window.onload = function () {

    //Select all li elements
    const home_nav_li = document.querySelectorAll('li');

    //Loop over all li menu items
    for (let i = 0; i < home_nav_li.length; i++) {

        //Mouseover/Mouseout styling for bottom border menu items
        home_nav_li[i].addEventListener('mouseover', (e) => {
            e.target.style.borderBottomColor = generate_color();
        });
        home_nav_li[i].addEventListener('mouseout', (e) => {
            e.target.style.borderBottomColor = '#F0EFF2';           
        })
    }

    //Randomly generate hex colors
    function generate_color() {
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }
}