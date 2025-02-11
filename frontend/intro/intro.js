document.addEventListener("DOMContentLoaded", function() {
    const titleContent = document.querySelector('.star-wars-intro .title-content');
    const spaceButton = document.querySelector('.star-wars-intro .space-button');
    
    let pauseTimeout; // Pour stocker l'identifiant du timeout

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Lorsque le bouton est visible, attendre 2 secondes avant de mettre l'animation en pause
          pauseTimeout = setTimeout(() => {
            titleContent.style.animationPlayState = 'paused';
          }, 2000);
        } else {
          // Si le bouton n'est plus visible, on annule le timeout et on relance l'animation
          clearTimeout(pauseTimeout);
          titleContent.style.animationPlayState = 'running';
        }
      });
    }, {
      root: null,       // Observer le viewport
      threshold: 0.5    // Considère le bouton comme visible lorsque 50 % de celui-ci est dans le viewport
    });

    observer.observe(spaceButton);
  });