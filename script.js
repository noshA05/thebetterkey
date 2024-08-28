window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let word1 = document.getElementById('word1');
    let word2 = document.getElementById('word2');
    let word3 = document.getElementById('word3');

    let scrollFactor = scrollPosition / 5;

    word1.style.transform = `translateX(-${scrollFactor}px)`;
    word2.style.transform = `translateY(${scrollFactor}px)`;
    word3.style.transform = `translateX(${scrollFactor}px)`;

    // Add fade-in effect based on scroll position
    let opacityFactor = 1 - (scrollPosition / 500);
    word1.style.opacity = opacityFactor;
    word2.style.opacity = opacityFactor;
    word3.style.opacity = opacityFactor;
});
