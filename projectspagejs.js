import { projects } from "./projectspage.js";
import { lerp } from "./utils.js";

const content = document.querySelector('.content');
const contentImage = document.querySelector('.content__main__img');
const contentHeader = document.querySelector('.content__header');
const contentText = document.querySelector('.content__text');
const contentClose = document.querySelector('.close');
const container = document.querySelector('.container');
const columns = [...document.querySelectorAll('.column')];

let projectArray = [];
let animating = true;

class Project {
    constructor(image, idx, title, content) {
        this.image = image;
        this.idx = idx;
        this.title = title;
        this.content = content;
        this.active = false;
        this.createItem();
    }

    createItem() {
        this.gridItem = document.createElement('div');
        this.gridItem.classList.add('item');
        this.img = document.createElement('img');
        this.img.src = this.image;
        this.gridItem.appendChild(this.img);
        let i = this.idx % columns.length;
        columns[i].appendChild(this.gridItem);
        this.gridItem.addEventListener('click', this.activate.bind(this));
    }

    activate() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.active = true;
        animating = false;

        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].idx !== this.idx) {
                projectArray[i].gridItem.style.opacity = 0;
            }
        }

        let { left, top, width, height } = this.gridItem.getBoundingClientRect();
        let x = (window.innerWidth / 2) - (left + (width / 2));
        let y = (window.innerHeight / 2) - (top + (height / 2)) - (window.innerHeight * 0.1);

        if (this.active) {
            this.gridItem.style.transform = `translate3d(${x}px, ${y}px, 0) scale(4)`;

            contentHeader.innerHTML = '';
            contentText.innerHTML = '';
            contentImage.src = this.image;
            let header = document.createElement('h1');
            header.textContent = this.title;
            contentHeader.appendChild(header);

            for (let i = 0; i < this.content.length; i++) {
                let text = document.createElement('p');
                text.textContent = this.content[i];
                contentText.appendChild(text);
            }

            setTimeout(() => {
                content.classList.add('active');
            }, 500);
        }
    }

    deactivate() {
        this.active = false;
        this.gridItem.style.transform = 'translate3d(0, 0, 0) scale(1)';
        this.gridItem.style.opacity = 1;
    }
}

projects.forEach((project, idx) => {
    let newProject = new Project(project.image, idx, project.title, project.content);
    projectArray.push(newProject);
});

contentClose.addEventListener('click', () => {
    content.classList.remove('active');
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
        animating = true;
    }, 500);
    for (let i = 0; i < projectArray.length; i++) {
        projectArray[i].deactivate();
    }
});

let mouseCoordinates = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
};

window.addEventListener('mousemove', (e) => {
    mouseCoordinates.targetX = e.clientX - window.innerWidth / 2;
    mouseCoordinates.targetY = e.clientY - window.innerHeight / 2;
});

function animate() {
    if (animating) {
        mouseCoordinates.x = lerp(mouseCoordinates.x, mouseCoordinates.targetX, 0.075);
        mouseCoordinates.y = lerp(mouseCoordinates.y, mouseCoordinates.targetY, 0.075);
        let { x, y } = mouseCoordinates;
        container.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
    }

    window.requestAnimationFrame(animate);
}

animate();
