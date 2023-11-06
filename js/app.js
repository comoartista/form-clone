import { lerp } from "./utils.js";
import { createProjects } from "./projects.js";
const main = document.querySelector('main');
const video = document.querySelector('video');
const videoSection = document.querySelector('#video');

createProjects();

main.addEventListener('scroll', () => {
    animatedVideo();
});

//Video
const headerLeft = document.querySelector('.video__header__left');
const headerRight = document.querySelector('.video__header__right');

function animatedVideo() {
    let {bottom} = videoSection.getBoundingClientRect();
    let scale = 1 - ((bottom - window.innerHeight) * .0005);
    scale = scale < .2 ? .2 : scale > 1 ? 1 : scale;
    video.style.transform = `scale(${scale})`
    console.log(bottom);

    //Text transformation
    let textTrans = bottom - window.innerHeight;
    textTrans = textTrans < 0 ? 0 : textTrans;
    headerLeft.style.transform = `translateX(${-textTrans}px)`;
    headerRight.style.transform = `translateX(${textTrans}px)`;
}

//Projects
const projectSticky = document.querySelector('.projects__sticky');
const projectSlider = document.querySelector('.projects__slider');

let projectTargetX = 0;
let projectCurrentX = 0;

let percentages = {
    small: 700,
    medium: 300,
    large: 100
}

let limit = window.innerWidth <= 600 ? percentages.small :
            window.innerWidth <= 1100 ? percentages.medium :
            percentages.large;

function setLimit() {
    let limit = window.innerWidth <= 600 ? percentages.small :
                window.innerWidth <= 1100 ? percentages.medium :
                percentages.large;
}

window.addEventListener('resize', setLimit);

function animateProjects(){
    let offsetTop = projectSticky.parentElement.offsetTop;
    let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage;
    projectTargetX = percentage;
    projectCurrentX = lerp(projectCurrentX, projectTargetX, .1);
    projectSlider.style.transform = `translate3d(${-(projectCurrentX)}vw, 0 , 0)`;
}


function animate() {
    animateProjects();
    requestAnimationFrame(animate);
}

animate();
