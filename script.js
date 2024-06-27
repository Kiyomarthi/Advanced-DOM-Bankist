'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

/////////////////

btnScrollTo.addEventListener('click', function (e) {
  const section1Details = section1.getBoundingClientRect();
  console.log(section1.getBoundingClientRect());
  console.log('ofset: ', window.pageXOffset, window.pageYOffset);

  // window.scrollTo({
  //   left: section1Details.left + window.pageXOffset,
  //   top: section1Details.top + window.pageYOffset,
  //   behavior: 'smooth',
  //});
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////
// page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// selecting Elements
const header = document.querySelector('.header');

// creating and inserting Elements
const massage = document.createElement('div');
massage.classList.add('cookie-message');
massage.innerHTML =
  'we use cookied for improved <button class="btn btn--close-cookie"> Got it!</button>';
header.append(massage);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  massage.remove();
});

massage.style.backgroundColor = 'black';
massage.style.width = '120%';

massage.style.height =
  Number.parseFloat(getComputedStyle(massage).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelectorAll('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.forEach(t =>
  t.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    // check Element
    if (!clicked) return;

    // remove active element
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // add active element
    clicked.classList.add('operations__tab--active');
    console.log(clicked.dataset.tab);
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  })
);

// handlehover

const handlehover = function (e) {
  const linked = e.target;
  const siblings = linked.closest('.nav').querySelectorAll('.nav__link');
  const logo = linked.closest('.nav').querySelector('img');
  const thisLink = this;
  if (linked.classList.contains('nav__link')) {
    siblings.forEach(function (links) {
      if (links !== linked) {
        links.style.opacity = thisLink;
        logo.style.opacity = thisLink;
      }
    });
  }
};
nav.addEventListener('mouseover', handlehover.bind(0.5));

nav.addEventListener('mouseout', handlehover.bind(1));

// slider
const slide = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

// slider.style.transform = 'scale(0.5)';

// to see this is a test
// slider.style.overflow = 'visible';

// dots function
const createDots = function () {
  slide.forEach(function (_, i) {
    // console.log(i)
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const dotActive = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(s => s.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide = "${slide}"]`)
    .classList.add('dots__dot--active');
};

createDots();

// btn function
let curSlide = 0;
const maxSlide = slide.length - 1;

const goToSlide = function (sl) {
  slide.forEach((s, i) => {
    s.style.transform = `translatex(${100 * (i - sl)}%)`;
  });
};

goToSlide(0);
dotActive(0);
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  dotActive(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  dotActive(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
  dotActive(curSlide);
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    dotActive(slide);
  }
});
