/* script.js */

/**
 * Retourne un entier aléatoire entre min et max
 */
const randomInRange = (max, min) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  
  const ACTIVE_PROBABILITY = 0;
  const BASE_SIZE = 1;
  const VELOCITY_INC = 1.01;
  const VELOCITY_INIT_INC = 1.025;
  const JUMP_VELOCITY_INC = 1.25;
  const JUMP_SIZE_INC = 1.15;
  const SIZE_INC = 1.01;
  const RAD = Math.PI / 180;
  const WARP_COLORS = [
    [197, 239, 247],
    [25, 181, 254],
    [77, 5, 232],
    [165, 55, 253],
    [255, 255, 255],
  ];
  
  /**
   * Classe représentant une étoile pour l'animation hyperspace
   */
  class Star {
    STATE = {
      alpha: Math.random(),
      angle: randomInRange(0, 360) * RAD,
    }
    reset = () => {
      const angle = randomInRange(0, 360) * (Math.PI / 180);
      const vX = Math.cos(angle);
      const vY = Math.sin(angle);
      const travelled =
        Math.random() > 0.5
          ? Math.random() * Math.max(window.innerWidth, window.innerHeight) +
            Math.random() * (window.innerWidth * 0.24)
          : Math.random() * (window.innerWidth * 0.25);
      this.STATE = {
        ...this.STATE,
        iX: undefined,
        iY: undefined,
        active: travelled ? true : false,
        x: Math.floor(vX * travelled) + window.innerWidth / 2,
        vX,
        y: Math.floor(vY * travelled) + window.innerHeight / 2,
        vY,
        size: BASE_SIZE,
      };
    }
    constructor() {
      this.reset();
    }
  }
  
  /**
   * Génère un pool d'étoiles
   */
  const generateStarPool = size => new Array(size).fill().map(() => new Star());
  
  /**
   * Classe gérant l'animation hyperspace.
   * L'animation ne démarre qu'au clic sur une planète.
   * Le canvas est placé en arrière-plan.
   */
  class JumpToHyperspace {
    STATE = {
      stars: generateStarPool(300),
      bgAlpha: 0,
      sizeInc: SIZE_INC,
      velocity: VELOCITY_INC,
      triggered: false,  // Animation inactive par défaut
      initiating: false,
      jumping: false,
    }
    canvas = document.createElement('canvas');
    context = this.canvas.getContext('2d');
    
    constructor() {
      this.setup();
      document.body.appendChild(this.canvas);
      this.render();
    }
    
    render = () => {
      const {
        STATE: { bgAlpha, velocity, sizeInc, initiating, jumping, stars, triggered },
        context,
        render,
      } = this;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (bgAlpha > 0) {
        context.fillStyle = `rgba(31, 58, 157, ${bgAlpha})`;
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
      if (triggered) {
        const nonActive = stars.filter(s => !s.STATE.active);
        if (nonActive.length > 0) {
          nonActive[0].STATE.active = true;
        }
      }
      for (const star of stars.filter(s => s.STATE.active)) {
        const { active, x, y, iX, iY, iVX, iVY, size, vX, vY } = star.STATE;
        if (
          ((iX || x) < 0 ||
           (iX || x) > window.innerWidth ||
           (iY || y) < 0 ||
           (iY || y) > window.innerHeight) &&
           active &&
           !initiating
        ) {
          star.reset();
        } else if (active) {
          const newIX = initiating ? iX : iX + iVX;
          const newIY = initiating ? iY : iY + iVY;
          const newX = x + vX;
          const newY = y + vY;
          const caught =
            (vX < 0 && newIX < x) ||
            (vX > 0 && newIX > x) ||
            (vY < 0 && newIY < y) ||
            (vY > 0 && newIY > y);
          star.STATE = {
            ...star.STATE,
            iX: caught ? undefined : newIX,
            iY: caught ? undefined : newIY,
            iVX: caught ? undefined : iVX * VELOCITY_INIT_INC,
            iVY: caught ? undefined : iVY * VELOCITY_INIT_INC,
            x: newX,
            vX: star.STATE.vX * velocity,
            y: newY,
            vY: star.STATE.vY * velocity,
            size: initiating ? size : size * (iX || iY ? SIZE_INC : sizeInc),
          };
          let color = `rgba(255, 255, 255, ${star.STATE.alpha})`;
          if (jumping) {
            const [r, g, b] = WARP_COLORS[randomInRange(0, WARP_COLORS.length)];
            color = `rgba(${r}, ${g}, ${b}, ${star.STATE.alpha})`;
          }
          context.strokeStyle = color;
          context.lineWidth = size;
          context.beginPath();
          context.moveTo(star.STATE.iX || x, star.STATE.iY || y);
          context.lineTo(star.STATE.x, star.STATE.y);
          context.stroke();
        }
      }
      requestAnimationFrame(render);
    }
    
    initiate = () => {
      if (this.STATE.jumping || this.STATE.initiating) return;
      this.STATE = {
        ...this.STATE,
        initiating: true,
        triggered: true,
        initiateTimestamp: new Date().getTime(),
      };
      TweenMax.to(this.STATE, 0.25, { velocity: VELOCITY_INIT_INC, bgAlpha: 0.3 });
      for (const star of this.STATE.stars.filter(s => s.STATE.active)) {
        star.STATE = {
          ...star.STATE,
          iX: star.STATE.x,
          iY: star.STATE.y,
          iVX: star.STATE.vX,
          iVY: star.STATE.vY,
        };
      }
    }
    
    jump = () => {
      this.STATE = {
        ...this.STATE,
        bgAlpha: 0,
        jumping: true,
      };
      TweenMax.to(this.STATE, 0.25, {
        velocity: JUMP_VELOCITY_INC,
        bgAlpha: 0.75,
        sizeInc: JUMP_SIZE_INC,
      });
    }
    
    setup = () => {
      this.context.lineCap = 'round';
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.zIndex = '-1';
    }
    
    reset = () => {
      this.STATE = {
        ...this.STATE,
        stars: generateStarPool(300),
      };
      this.setup();
    }
  }
  
  // Création de l'instance de l'animation hyperspace
  window.myJump = new JumpToHyperspace();
  window.addEventListener(
    'resize',
    _.debounce(() => {
      window.myJump.reset();
    }, 250)
  );
  
  /**
   * Fonction appelée lors du clic sur une planète.
   * 1. Le vaisseau se déplace vers le centre de la planète cliquée, puis avance d'une certaine distance.
   * 2. Ensuite, l'animation hyperspace est déclenchée et la redirection s'effectue.
   */
  function goToPlanet(numPlanet) {
    if(window.redirecting) return;
    window.redirecting = true;
    
    const spaceship = document.querySelector('.spaceship');
    const targetPlanet = document.querySelector('.planet.planet' + numPlanet);
    
    // Calcul du centre de la planète cible
    const targetX = targetPlanet.offsetLeft + targetPlanet.offsetWidth / 2;
    const targetY = targetPlanet.offsetTop + targetPlanet.offsetHeight / 2;
    
    // Animation 1 : déplacement du vaisseau vers le centre de la planète
    TweenMax.to(spaceship, 1, {
      left: targetX,
      top: targetY,
      ease: Power2.easeInOut,
      onComplete: function() {
        // Calcul de la direction à partir du centre de la planète 1
        const planet1 = document.querySelector('.planet.planet1');
        const planet1X = planet1.offsetLeft + planet1.offsetWidth / 2;
        const planet1Y = planet1.offsetTop + planet1.offsetHeight / 2;
        const dx = targetX - planet1X;
        const dy = targetY - planet1Y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ADVANCE_DISTANCE = 50; // distance d'avance (à ajuster)
        const advanceX = targetX + (dx / dist) * ADVANCE_DISTANCE;
        const advanceY = targetY + (dy / dist) * ADVANCE_DISTANCE;
        
        // Animation 2 : avance supplémentaire sur la planète
        TweenMax.to(spaceship, 0.5, {
          left: advanceX,
          top: advanceY,
          ease: Power2.easeInOut,
          onComplete: function() {
            // Lancement de l'animation hyperspace et redirection
            if (window.myJump && typeof window.myJump.initiate === 'function') {
              window.myJump.initiate();
              setTimeout(function(){
                window.myJump.jump();
              }, 200);
              setTimeout(function(){
                window.location.href = "planete" + numPlanet + ".html";
              }, 3000);
            } else {
              window.location.href = "planete" + numPlanet + ".html";
            }
          }
        });
      }
    });
  }
  