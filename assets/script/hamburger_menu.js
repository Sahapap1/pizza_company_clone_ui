document.querySelector('.hamburger-menu').addEventListener('click', function() {
    const menu = document.querySelector('.hamburger-menu-container');
    menu.style.display = 'flex'; // แสดงเมนู
    setTimeout(() => {
        menu.style.transform = 'translateX(0)'; // เลื่อนกลับมาจากขวา
    }, 10); // ดีเลย์เล็กน้อยเพื่อให้ transition ทำงาน
});

// ปิดเมนู
document.querySelector('.hamburger-menu-container .close').addEventListener('click', function() {
    const menu = document.querySelector('.hamburger-menu-container');
    menu.style.transition = 'transform 0.3s ease';
    menu.style.transform = 'translateX(100%)'; // เลื่อนไปทางขวา

    setTimeout(() => {
        menu.style.display = 'none'; // ซ่อนเมื่อ animation จบ
    }, 300); // ต้องตรงกับระยะเวลา transition (0.3s)
});