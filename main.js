const video_container = document.getElementById("main-video-container");
const video = video_container.querySelector("video");
const replay_button = video_container.querySelector(".replay");

video.addEventListener("ended", () => {
    replay_button.style.display = "flex";
});

replay_button.addEventListener("click", () => {
    replay_button.style.display = "none";
    video.currentTime = 0;
    video.play();
});

const nav_height = document.querySelector(".madrona-nav-wrapper").offsetHeight;

function scrollToDiv(tgt) {
    const elem = document.querySelector(tgt);
    if (!elem) {
        return;
    }

    const tgt_offset = elem.getBoundingClientRect().top;
    const total_offset = tgt_offset - nav_height;
    window.scrollBy({
        top: total_offset,
        behavior: 'smooth'
    });
}

function handleHashChange() {
    const cur_hash = window.location.hash;
    if (cur_hash) {
        scrollToDiv(cur_hash);
    }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute('href');
    
    if (href == '#') {
        link.addEventListener('click', (e) => {
            console.log(link);
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToDiv(href);
            window.history.pushState({}, "", href);
        });
    }
});

window.addEventListener("hashchange", handleHashChange);
window.addEventListener("load", handleHashChange);
