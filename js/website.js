/* =========Toggle menu========= */

const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/* =========remove menu========= */

const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/* =========skills========= */
const skillsContent = document.getElementsByClassName('skills_content')
skillsHeader = document.querySelectorAll('.skills_header')

function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills_content skills_close'
    }

    if (itemClass === 'skills_content skills_close') {
        this.parentNode.className = 'skills_content skills_open'
    }
}

skillsHeader.forEach((eL) => {
    eL.addEventListener('click', toggleSkills)
})

/* =========services========= */
const modalViews = document.querySelectorAll('.services_modal'),
    modalBtns = document.querySelectorAll('.services_button'),
    modalCloses = document.querySelectorAll('.services_modal-close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

let swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});