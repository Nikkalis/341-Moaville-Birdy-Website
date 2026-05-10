// Navigation toggle
function toggleNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Update navbar title based on scroll position
function updateNavbarTitle() {
    const sections = document.querySelectorAll('section[id]');
    const navbarSectionTitle = document.getElementById('navbarTitle');
    
    if (!navbarSectionTitle) return;
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    let titleText = '';
    
    switch(currentSection) {
        case 'students':
            titleText = '/ Students';
            break;
        case 'projects':
            titleText = '/ Projects';
            break;
        case 'contact':
            titleText = '/ Contact';
            break;
        case 'home':
        default:
            titleText = '';
    }
    
    navbarSectionTitle.textContent = titleText;
    navbarSectionTitle.classList.remove('active');
    
    if (currentSection !== 'home' && currentSection !== '') {
        navbarSectionTitle.classList.add('active');
    }
}

// Update active navigation links
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.topnav a[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        if (section.style.display === 'none') {
            return;
        }
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        const visibleSections = Array.from(sections).filter(s => s.style.display !== 'none');
        if (visibleSections.length > 0) {
            currentSection = visibleSections[visibleSections.length - 1].getAttribute('id');
        }
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    updateNavbarTitle();
}

function setStudentPageActive() {
    const navLinks = document.querySelectorAll('.topnav a');
    const navbarSectionTitle = document.getElementById('navbarTitle');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'index.html#students') {
            link.classList.add('active');
        }
    });
    
    if (navbarSectionTitle) {
        navbarSectionTitle.textContent = '/ Students';
        navbarSectionTitle.classList.add('active');
    }
}

// Easter Egg variables
let clickCount2025 = 0;
let easterEggActive = false;

// Year Easter Egg Activation Function
function activateYearEasterEgg() {
    if (easterEggActive) return;
    easterEggActive = true;
    
    createSwirlyShapes();
    
    const messages = [
        'Irem\'im seni çok seviyorum' 
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    showYearMessage(randomMessage);
    
    setTimeout(() => {
        showKissEmoji();
    }, 4000);
    
    setTimeout(() => {
        easterEggActive = false;
    }, 6000);
}

function createSwirlyShapes() {
    const colors = ['#FF03F7', '#1CF1FF', '#FFF602'];
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        pointer-events: none;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 20; i++) {
        const swirl = document.createElement('div');
        const size = Math.random() * 100 + 50;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;
        
        swirl.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border: 4px solid ${color};
            border-radius: 50% 40% 60% 50%;
            left: ${startX}%;
            top: ${startY}%;
            opacity: 0;
            animation: swirlFloat ${duration}s ease-in-out ${delay}s forwards;
        `;
        
        wrapper.appendChild(swirl);
    }
    
    document.body.appendChild(wrapper);
    
    setTimeout(() => {
        wrapper.remove();
    }, 4000);
}

function showKissEmoji() {
    const message = document.createElement('div');
    message.textContent = '😘';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-5deg);
        font-family: 'Punktype02', sans-serif;
        font-size: clamp(4rem, 20vw, 8rem);
        z-index: 100000;
        pointer-events: none;
        animation: kissPopIn 2s ease-out forwards;
        white-space: nowrap;
    `;
    
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100000;
        pointer-events: none;
    `;
    wrapper.appendChild(message);
    document.documentElement.appendChild(wrapper);
    
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.cssText = `position: fixed; top: calc(50% - ${80 + Math.random()*60}px); left: calc(50% + ${(Math.random()-0.5)*200}px); transform: translate(-50%, -50%); font-size: 3rem; z-index: 100001; pointer-events: none; animation: heartFloat 2s ease-out ${i*0.15}s forwards; opacity: 0;`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2500);
    }
    
    setTimeout(() => {
        wrapper.remove();
    }, 2000);
}

function showYearMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Punktype02', sans-serif;
        font-size: clamp(3rem, 12vw, 5rem);
        color: #FF03F7;
        text-shadow: 3px 3px 0 #1CF1FF;
        z-index: 100000;
        pointer-events: none;
        animation: yearMessageFade 4s ease-out forwards;
        white-space: nowrap;
    `;
    
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100000;
        pointer-events: none;
    `;
    wrapper.appendChild(message);
    document.documentElement.appendChild(wrapper);
    
    setTimeout(() => {
        wrapper.remove();
    }, 4000);
}

// Load students data
async function loadStudentsData() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) throw new Error('Failed to load students data');
        
        const data = await response.json();
        
        populateStudentGrid(data.students);
        populateProjectGrid(data.students);  // Add await here
        
        if (data.hideProjects) {
            const projectsSection = document.getElementById('projects');
            const cyanDivider = document.querySelector('.cyan-rip-divider');
            const contactSection = document.getElementById('contact');
            const footerImg = document.querySelector('.footer_img');
            
            if (projectsSection) projectsSection.style.display = 'none';
            if (cyanDivider) cyanDivider.style.display = 'none';
            if (contactSection) contactSection.classList.add('cyan-background');
            if (footerImg) footerImg.classList.add('cyan-background');
        }
        
    } catch (error) {
        console.error('Error loading students data:', error);
    }
}

function populateStudentGrid(students) {
    const studentGrid = document.querySelector('.flex-student-rows');
    if (!studentGrid) return;
    
    studentGrid.innerHTML = '';
    
    students.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.className = 'flex-student';
        
        studentDiv.innerHTML = `
            <a href="Student_Webpage.html?student=${student.id}">
                <img src="${student.photo}" class="placeholder-student" alt="${student.firstName} ${student.lastName}">
            </a>
            <h5>${student.firstName}</h5>
            <h5>${student.lastName}</h5>
        `;
        
        studentGrid.appendChild(studentDiv);
        
        const link = studentDiv.querySelector('a');
        if (link && student.photoAlt) {
            link.style.setProperty('--alt-image', `url('${student.photoAlt}')`);
        }
    });
}

function populateProjectGrid(students) {
    const projectGrid = document.querySelector('.flex-project-rows');
    if (!projectGrid) return;
    
    projectGrid.innerHTML = '';
    
    // Filter out students with "_" as project title (no video)
    const studentsWithProjects = students.filter(s => 
        s.projectTitle && 
        s.projectImage && 
        s.projectTitle !== "_"
    );
    
    studentsWithProjects.forEach(student => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'flex-project';
        
        projectDiv.innerHTML = `
            <a href="Student_Webpage.html?student=${student.id}#projects">
                <img src="${student.projectImage}" class="placeholder-img" alt="${student.projectTitle}">
            </a>
            <h5>${student.projectTitle}</h5>
            <p>By ${student.firstName} ${student.lastName}</p>
        `;
        
        projectGrid.appendChild(projectDiv);
    });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.topnav a');
    
    const navbarTitleFixed = document.querySelector('.navbar-title-fixed');
    if (navbarTitleFixed) {
        navbarTitleFixed.addEventListener('click', function() {
            if (window.location.pathname.includes('Student_Webpage.html')) {
                window.location.href = 'index.html';
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    const yearSvg = document.querySelector('.year');
    if (yearSvg) {
        yearSvg.style.cursor = 'pointer';
        yearSvg.addEventListener('click', function() {
            clickCount2025++;
            
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            if (clickCount2025 === 15 && !easterEggActive) {
                activateYearEasterEgg();
                clickCount2025 = 0;
            }
        });
    }
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                    
                    var x = document.getElementById("myTopnav");
                    if (x.className.includes("responsive")) {
                        x.className = "topnav";
                    }
                }
            }
        });
    }

    if (window.location.pathname.includes('Student_Webpage.html')) {
        setStudentPageActive();
    } else {
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav();
    }
    
    window.addEventListener('scroll', updateNavbarTitle);
    updateNavbarTitle();
    
    loadStudentsData();
});