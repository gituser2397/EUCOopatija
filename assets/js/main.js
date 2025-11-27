document.addEventListener('DOMContentLoaded', function(){
  // Existing menu toggle functionality
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', ()=>{
      mainNav.classList.toggle('open');
    });
  }
  
  // Existing dropdown toggle for small screens
  document.querySelectorAll('.has-sub > a').forEach(a=>{
    a.addEventListener('click', (ev)=>{
      const w = window.innerWidth;
      if(w <= 900){
        ev.preventDefault();
        const parent = a.parentElement;
        parent.classList.toggle('open');
      }
    });
  });
  
  // Existing lightbox functionality
  document.querySelectorAll('img[data-lightbox]').forEach(img=>{
    img.style.cursor = 'pointer';
    img.addEventListener('click', ()=>{
      const src = img.src;
      const overlay = document.createElement('div');
      overlay.style.position='fixed';
      overlay.style.left=0;overlay.style.top=0;overlay.style.right=0;overlay.style.bottom=0;
      overlay.style.background='rgba(0,0,0,0.8)';overlay.style.display='flex';
      overlay.style.alignItems='center';overlay.style.justifyContent='center';overlay.style.zIndex=9999;
      const im = document.createElement('img');
      im.src = src; im.style.maxWidth='90%'; im.style.maxHeight='90%'; im.style.borderRadius='8px';
      overlay.appendChild(im);
      overlay.addEventListener('click', ()=> overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // NEW: Hotel gallery rotation functionality
  const hotelCards = document.querySelectorAll('.hotel-card');
  
  hotelCards.forEach((card, index) => {
    if (card.dataset.gallery) {
      const galleryData = JSON.parse(card.dataset.gallery);
      const imageContainer = card.querySelector('.image-container');
      const imagePlaceholder = card.querySelector('.image-placeholder');
      
      if (!imageContainer || !imagePlaceholder) return;
      
      // Create dots
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'gallery-dots';
      imageContainer.appendChild(dotsContainer);
      
      let currentImage = 0;
      let autoRotateInterval;
      
      // Initialize first image
      imagePlaceholder.style.backgroundImage = `url(${galleryData[0]})`;
      
      // Create dots
      galleryData.forEach((_, dotIndex) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (dotIndex === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToImage(dotIndex));
        dotsContainer.appendChild(dot);
      });
      
      const dots = dotsContainer.querySelectorAll('.dot');
      
      function goToImage(index) {
        currentImage = index;
        imagePlaceholder.style.backgroundImage = `url(${galleryData[index]})`;
        
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        
        // Reset auto-rotate
        clearInterval(autoRotateInterval);
        startAutoRotate();
      }
      
      function nextImage() {
        currentImage = (currentImage + 1) % galleryData.length;
        goToImage(currentImage);
      }
      
      function startAutoRotate() {
        autoRotateInterval = setInterval(nextImage, 4000);
      }
      
      // Pause on hover
      card.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
      card.addEventListener('mouseleave', startAutoRotate);
      
      // Start auto-rotation
      startAutoRotate();
    }
  });
   const dailyGalleries = document.querySelectorAll('.daily-trips-container .gallery, .extra-activities-container .gallery');
  dailyGalleries.forEach(gallery => {
    const images = JSON.parse(gallery.dataset.gallery);
    let current = 0;

    // Create image placeholders
    images.forEach((src, index) => {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'image-placeholder';
      imgDiv.style.backgroundImage = `url(${src})`;
      imgDiv.style.opacity = index === 0 ? '1' : '0';
      gallery.appendChild(imgDiv);
    });

    const imgDivs = gallery.querySelectorAll('.image-placeholder');

    let interval = setInterval(() => {
      imgDivs[current].style.opacity = 0;
      current = (current + 1) % images.length;
      imgDivs[current].style.opacity = 1;
    }, 4000);

    gallery.addEventListener('mouseenter', () => clearInterval(interval));
    gallery.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        imgDivs[current].style.opacity = 0;
        current = (current + 1) % images.length;
        imgDivs[current].style.opacity = 1;
      }, 4000);
    });
  });
});
