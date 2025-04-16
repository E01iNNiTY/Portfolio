import { lerp } from "./utils.js";
import { createProjects, createBlogposts } from "./Projects.js";

// DOM references
const main = document.querySelector('main');
const image = document.querySelector('.main__image');
const videoSection = document.querySelector('#video');
const headerLeft = document.querySelector('.text__header__left');
const headerRight = document.querySelector('.text__header__right');
const projectsSticky = document.querySelector('.projects__sticky');
const projectSlider = document.querySelector('.projects__slider');
const blogSection = document.getElementById('blog');
const blogPosts = [...document.querySelectorAll('.post')];
const circleSection = document.getElementById('circle__section');
const circle = document.querySelector('.circle');
const dContainer = document.querySelector('.discover__container');
const leftText = document.querySelector('.text__left');
const rightText = document.querySelector('.text__right');

// Content loaders
createProjects();
createBlogposts();

// Scroll animation: image zoom + header text slide
function animateImage() {
    const { bottom } = videoSection.getBoundingClientRect();
  
    // Parallax scale
    let scale = 1 - ((bottom - window.innerHeight) * 0.0004);
    scale = Math.max(0.9, Math.min(1.05, scale));
  
    // Blur effect (increases as image scrolls out)
    let blurAmount = (window.innerHeight - bottom) * 0.10;
    blurAmount = Math.max(0, Math.min(8, blurAmount)); // Cap blur
  
    image.style.transform = `scale(${scale})`;
    image.style.filter = `blur(${blurAmount}px)`;
  
    // Text movement
    let textTrans = Math.max(0, bottom - window.innerHeight);
    headerLeft.style.transform = `translateX(${-textTrans}px)`;
    headerRight.style.transform = `translateX(${textTrans}px)`;
  }
  
  main.addEventListener('scroll', () => {
    animateImage();
    scrollBlogPosts();
    scrollCircle();
    scrollDiscover();
  });
  

// Project slider animation
let projectTargetX = 0;
let projectCurrentX = 0;
let percentages = { small: 700, medium: 300, large: 100 };

function setLimit() {
  return window.innerWidth <= 600
    ? percentages.small
    : window.innerWidth <= 1100
    ? percentages.medium
    : percentages.large;
}
let limit = setLimit();
window.addEventListener('resize', () => (limit = setLimit()));

function animateProjects() {
  if (!projectsSticky || !projectSlider) return;

  let offsetTop = projectsSticky.parentElement.offsetTop;
  let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100;
  percentage = Math.min(Math.max(percentage, 0), limit);
  projectTargetX = percentage;
  projectCurrentX = lerp(projectCurrentX, projectTargetX, 0.1);
  projectSlider.style.transform = `translate3d(${-projectCurrentX}vw, 0 , 0)`;
}

// Blog post scale on scroll
function scrollBlogPosts() {
  if (!blogSection) return;

  let blogSectionTop = blogSection.getBoundingClientRect().top;
  blogPosts.forEach((post, i) => {
    if (post.parentElement.getBoundingClientRect().top <= 1) {
      let offset = (blogSectionTop + window.innerHeight * (i + 1)) * 0.0005;
      offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset;
      post.style.transform = `scale(${1 + offset})`;
    }
  });
}

// Circle animation
function scrollCircle() {
  if (!circle || !circleSection) return;

  let { top } = circleSection.getBoundingClientRect();
  let scaleTop = Math.abs(top);
  let scale = scaleTop / window.innerHeight;
  scale = Math.min(Math.max(scale, 0), 1);
  circle.style.transform =
    top <= 0
      ? `translate(-50%, -50%) scale(${scale})`
      : `translate(-50%, -50%) scale(0)`;
}

// Discover section scroll
function scrollDiscover() {
  if (!dContainer) return;

  let { bottom } = dContainer.getBoundingClientRect();
  let textTrans = Math.max(bottom - window.innerHeight, 0);
  leftText.style.transform = `translateX(${-textTrans}px)`;
  rightText.style.transform = `translateX(${textTrans}px)`;
}

// Text reveal animation
const textReveals = [...document.querySelectorAll('.text__reveal, .about__text')];

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        [...entry.target.querySelectorAll('span')].forEach((span, idx) => {
          setTimeout(() => {
            span.style.transform = 'translateY(0)';
          }, (idx + 1) * 50);
        });
      }
    });
  },
  {
    rootMargin: '0px',
    threshold: 0.5,
  }
);

// Initialize span wrapping and observe
textReveals.forEach((text) => {
  const content = text.innerText;
  text.innerHTML = [...content].map((char) => `<span>${char}</span>`).join('');
  observer.observe(text);
});

// Scroll listeners
main.addEventListener('scroll', () => {
  animateImage();
  scrollBlogPosts();
  scrollCircle();
  scrollDiscover();
});

// Animation loop
function animate() {
  animateProjects();
  requestAnimationFrame(animate);
}

animate();
