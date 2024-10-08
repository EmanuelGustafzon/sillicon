const slider = document.getElementsByClassName('slider-images')[0];
const slides = document.querySelectorAll('.slide');
const nextbtn = document.getElementById('next-btn');
const prevbtn = document.getElementById('prev-btn');
const heading = document.getElementById('slider-heading');

// duplicate slides in dom
for(const slide of slides) {
    const newSlide = slide.cloneNode(true);
    slider.appendChild(newSlide)
}

// keep count of the active slide and how many times clicked in one direction as a step
let allSlides = slider.children;
let activeSlide = 1; 
allSlides[activeSlide].classList.add('active-slide')
let step = 0;
const maxSteps = slides.length - 1
// indicates that you need to start going to the right
prevbtn.style.opacity = 0.5
const nextSlide = () => {
    if(step === maxSteps) return;
    if(step === maxSteps - 1) nextbtn.style.opacity = 0.5
    step++;
    allSlides[activeSlide].classList.remove('active-slide'); // the middle one is active
    Array.from(allSlides).forEach(slide => slide.style.transform = `translateX(-${100 * step}%)`);  // moves the slide
    activeSlide++
    allSlides[activeSlide].classList.add('active-slide');
    showText()
    prevbtn.style.opacity = 1
}

const prevSlide = () => {
    if(step === 0) return;
    if(step === 1) prevbtn.style.opacity = 0.5
    step--;
    allSlides[activeSlide].classList.remove('active-slide');
    Array.from(allSlides).forEach(slide => slide.style.transform = `translateX(${-100 * (step % allSlides.length)}%)`);
    activeSlide--
    allSlides[activeSlide].classList.add('active-slide');
    showText()
    nextbtn.style.opacity = 1
}

const showText = () => {
    const headings = {
        1: 'Latest Transaction History',
        2: 'Transfers to People From Your Contact List',
        3: 'Keep Track Of Your Budget'
    }
    heading.style.transition = `opacity 0.5s ease`
    heading.style.opacity = 0;
    setTimeout(() => {
        heading.innerText = headings[activeSlide];
        heading.style.opacity = 1; 
    }, 250);
}

nextbtn.addEventListener('click', nextSlide);
prevbtn.addEventListener('click', prevSlide);
// On small screens it starts from the first slide otherwise the secound
window.addEventListener('resize', () => {
    window.innerWidth < 720 ? slides[0].style.display = 'none' : slides[0].style.display = 'block' ;
})




