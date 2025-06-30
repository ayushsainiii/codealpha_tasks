const images = document.querySelectorAll('.image img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 0;

const imageArray = Array.from(images);

// Open lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showLightbox(img.src);
  });
});

function showLightbox(src) {
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
}

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Next/Prev
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imageArray.length;
  lightboxImg.src = imageArray[currentIndex].src;
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
  lightboxImg.src = imageArray[currentIndex].src;
});

// Filter buttons
const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery .image').forEach(img => {
      img.style.display =
        filter === 'all' || img.classList.contains(filter)
          ? 'block'
          : 'none';
    });
  });
});
