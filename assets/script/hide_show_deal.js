document.querySelector('.promotion svg').addEventListener('click', function() {
    const promotion = document.querySelector('.promotion');
    const svg = promotion.querySelector('svg');
    
    if (promotion.classList.contains('moved')) {
        promotion.classList.remove('moved');
        svg.classList.remove('moved');
    } else {
        promotion.classList.add('moved');
        svg.classList.add('moved');
    }
});