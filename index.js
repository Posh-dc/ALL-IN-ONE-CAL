window.addEventListener("load", linkTransition);

function linkTransition () {
     anchorTags = document.querySelectorAll("div > a").length;
     for ( let i=0; i<anchorTags; i++) {
        setTimeout ( ()=> document.querySelectorAll("div > a")[i].classList.add("animation"), i*100);
     }
}