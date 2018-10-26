'use strict';

window.onload = function () {

    //Referance specific LI's
    const video = document.querySelectorAll('#video li');
    const writting = document.querySelectorAll('#writting li');

    //Establish route for mutable redirect
    const route = 'mutable.html';

    //PARENT -> Collection of elements
    //DATA_TARGET -> Specify which data attribute to target
    //MUTABLE_TYPE -> Speficty which type of data is being passed (writting or video)
    //SPLIT_VALUE -> Specify where to split data attribute value (false by default means to splitting)
    function filterElements(parent, data_target, mutable_type, split_value = false) {
        parent.forEach(node => {
            if (node.hasAttribute('data-mutable')) {
                node.addEventListener('click', element => {
                    //Retrieve DOM element target
                    const target = element.target;

                    //Retrieve correct data attribute value
                    let element_data = target.getAttribute(data_target);
                    if (split_value) element_data = element_data.split(split_value)[1];
                    
                    //Hold finale route info
                    const final_route = `${route}?${mutable_type}=${element_data}`;
                    console.log(final_route);
                    window.location.href = final_route;
                });
            }
        }); 
    }

    //Handle redirect for writings
    filterElements(writting, 'data-writting', 'writting');
    filterElements(video, 'data-video', 'video', 'vimeo.com/');
}