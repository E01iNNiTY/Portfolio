const projects = [
    {
        name: 'Fire Alarm System',
        type: 'WEB APPLICATION',
        pos: 'start',
        image: 'projectsmoker.png',
        video: 'mapapp.mp4'
    },
    {
        name: 'PROJECT 2',
        type: 'GRAPHIC DESIGN',
        pos: 'mid',
        video: 'comingsoon.mp4'
    },
    {
        name: 'PROJECT 3',
        type: 'TYPE DESIGN',
        pos: 'end',
        video: 'comingsoon.mp4'
    },
    {
        name: 'PROJECT 4',
        type: 'WEB DESIGN',
        pos: 'mid',
        video: 'comingsoon.mp4'
    },
    {
        name: 'PROJECT 5',
        type: 'WEB DESIGN',
        pos: 'end',
        video: 'comingsoon.mp4'
    },
    {
        name: 'PROJECT 6',
        type: 'GRAPHIC DESIGN',
        pos: 'mid',
        video: 'comingsoon.mp4'
    },
    {
        name: 'PROJECT 7',
        type: 'WEB DESIGN',
        pos: 'start',
        video: 'comingsoon.mp4'
    },
    {
        name: 'PROJECT 8',
        type: 'APPLICATION',
        pos: 'end',
        video: 'comingsoon.mp4'
    }
];


const createProjects = () => {
    projects.forEach(project => {
        let panel = document.createElement('div');
        panel.classList.add('project', project.pos);

        let imageContainer = document.createElement('div');
        imageContainer.className = 'image__container';

        let media;

        if (project.video) {
            media = document.createElement('video');
            media.src = project.video;
            media.muted = true;
            media.playsInline = true;
            media.setAttribute('loading', 'lazy');
            media.classList.add('project__image');
            media.poster = project.image || 'comingsoon.png';

            // ✅ Play on hover
            media.addEventListener('mouseenter', () => media.play());
            media.addEventListener('mouseleave', () => {
                media.pause();
                media.currentTime = 0;
            });
        } else {
            media = document.createElement('img');
            media.src = project.image || 'comingsoon.png';
            media.classList.add('project__image');
        }

        let projectDetails = document.createElement('div');
        projectDetails.classList.add('project__details');

        let projectTitle = document.createElement('p');
        projectTitle.innerText = project.name;

        let projectType = document.createElement('p');
        projectType.innerText = project.type;

        projectDetails.append(projectTitle, projectType);
        imageContainer.appendChild(media);
        panel.append(imageContainer, projectDetails);
        document.querySelector('.projects__slider').appendChild(panel);
    });
};

const blogPosts = [
    {
        title: 'RECENT PROJECT ONE',
        time: '3 MIN',
        video: 'comingsoon.mp4'
    },
    {
        title: 'RECENT PROJECT TWO',
        time: '4 MIN',
        video: 'comingsoon.mp4'
    },
    {
        title: 'RECENT PROJECT THREE',
        time: '5 MIN',
        video: 'comingsoon.mp4'
    }
];



const createBlogposts = () => {
    blogPosts.forEach(post => {
        let blogPostSection = document.createElement('div');
        blogPostSection.classList.add('blog__post');

        let postDiv = document.createElement('div');
        postDiv.classList.add('post');

        let imageContainer = document.createElement('div');
        imageContainer.classList.add('post__image__container');

        let media;

        if (post.video) {
            media = document.createElement('video');
            media.src = post.video;
            media.muted = true;
            media.playsInline = true;
            media.setAttribute('loading', 'lazy');
            media.classList.add('blog__post__img');

            // ✅ Use custom poster if provided
            media.poster = post.image || 'comingsoon.png';

            // ✅ Hover-to-play behavior
            media.addEventListener('mouseenter', () => media.play());
            media.addEventListener('mouseleave', () => {
                media.pause();
                media.currentTime = 0;
            });
        } else {
            media = document.createElement('img');
            media.src = post.image || 'comingsoon.png';
            media.classList.add('blog__post__img');
        }

        let postDetails = document.createElement('div');
        postDetails.classList.add('post__details');

        let postTitle = document.createElement('p');
        postTitle.innerText = post.title;

        let postTime = document.createElement('p');
        postTime.innerText = post.time;

        imageContainer.appendChild(media);
        postDetails.append(postTitle, postTime);
        postDiv.append(imageContainer, postDetails);
        blogPostSection.appendChild(postDiv);

        document.getElementById('blog').appendChild(blogPostSection);
    });
};





export {
    createProjects,
    createBlogposts
}