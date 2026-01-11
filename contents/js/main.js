<script>
  let currentIndex = 0;
  const slider = document.getElementById("testimonialSlider");
  const cardWidth = 350; // card + gap

  function slideRight() {
    currentIndex++;
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    if (currentIndex >= slider.children.length - 1) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentIndex = 0;
        slider.style.transform = `translateX(0px)`;
        setTimeout(() => slider.style.transition = "transform 0.6s ease-in-out", 50);
      }, 600);
    }
  }

  function slideLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }

  /* Auto slide (optional) */
  setInterval(slideRight, 4000);
</script>
