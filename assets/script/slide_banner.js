const slider = document.querySelector('.slide-banner');
const container = document.querySelector('.container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Clone สไลด์
const slides = slider.querySelectorAll('img');
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.classList.add('clone');
lastClone.classList.add('clone');
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

let allSlides = slider.querySelectorAll('img'); // รวม clones
let isDown = false;
let startX;
let scrollLeft;
let currentIndex = 1; // เริ่มที่ slide แรกจริง
let slideWidth = allSlides[0].offsetWidth + 20;

function goToSlide(index) {
    let slideWidth = allSlides[0].offsetWidth + 20;
    slider.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
    });
    currentIndex = index;

    setTimeout(() => {
        if (allSlides[currentIndex].classList.contains('clone')) {
            if (currentIndex === 0) {
                currentIndex = allSlides.length - 2;
            } else if (currentIndex === allSlides.length - 1) {
                currentIndex = 1;
            }
            slider.scrollTo({
                left: currentIndex * slideWidth,
                behavior: 'auto'
            });
        }
    }, 800);
}

// เริ่มต้น

slider.scrollTo({
    left: currentIndex * slideWidth,
    behavior: 'auto' // ไม่มี animation ตอนเปิด
});

// Auto Slide
let autoSlideInterval = setInterval(() => {
    goToSlide(currentIndex + 1);
}, 5000);

slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 3000);
});

// ปุ่ม
leftArrow.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
});

rightArrow.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
});

// เมาส์ลาก
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

window.addEventListener('mouseup', (e) => {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove('dragging');

    const diff = e.pageX - (startX + slider.offsetLeft);
    if (Math.abs(diff) > 50) {
        if (diff < 0) currentIndex += 1;
        else currentIndex -= 1;
    }
    goToSlide(currentIndex);
});

window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
});

// ทัชมือถือ
slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

window.addEventListener('touchend', (e) => {
    if (!isDown) return;
    isDown = false;

    const diff = e.changedTouches[0].pageX - (startX + slider.offsetLeft);
    if (Math.abs(diff) > 50) {
        if (diff < 0) currentIndex += 1;
        else currentIndex -= 1;
    }
    goToSlide(currentIndex);
});

window.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
});

// ปิดการลากรูป
document.querySelectorAll('.slide-banner img').forEach(img => {
    img.setAttribute('draggable', 'false');
});

// ฟังก์ชันในการจัดการเมื่อขนาดหน้าจอเปลี่ยน
window.addEventListener('resize', () => {
    goToSlide(currentIndex); // ไปที่ currentIndex หลัง resize
});
