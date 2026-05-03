// เลือกปุ่ม .delivery และ .recive-res
const deliveryBtn = document.querySelector('.delivery');
const reciveResBtn = document.querySelector('.recive-res');
const span = document.querySelector('.away-deli-container span');

// ตั้งค่าเริ่มต้น (ให้ delivery เป็นสีเขียว)
deliveryBtn.classList.add('active');
span.style.transform = 'translateX(0)';

// ฟังก์ชันเพื่อเปลี่ยนตำแหน่งของ span และเปลี่ยนสีตัวอักษร
function toggleSlide(target) {
    if (target === 'delivery') {
        span.style.transform = 'translateX(0)';
        deliveryBtn.classList.add('active');
        reciveResBtn.classList.remove('active');
    } else if (target === 'recive-res') {
        span.style.transform = 'translateX(100%)';
        reciveResBtn.classList.add('active');
        deliveryBtn.classList.remove('active');
    }
}

// เพิ่ม event listener ให้ปุ่ม
deliveryBtn.addEventListener('click', () => toggleSlide('delivery'));
reciveResBtn.addEventListener('click', () => toggleSlide('recive-res'));
