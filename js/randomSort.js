var elem = document.querySelector("body");

/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function openFullscreen() {
    if (elem.requestFullscreen != null) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen != null) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen != null) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen != null) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

openFullscreen();