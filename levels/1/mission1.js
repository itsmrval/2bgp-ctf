// Tableau contenant les différents messages
const messages = [
    `Mon cher Padawan,
  
  Mes troupes et moi-même sommes actuellement submergés par l'assaut de l'Empire éternel.`,
    
    `Ce qui reste de nos services secrets, désormais réduits à leurs derniers moyens, nous a transmis une ultime communication cryptée, rédigée dans une langue étrangère. Ce message recèle peut-être la clé pour renverser le cours de cette guerre.`,
    
    `En t'envoyant dans cette mission suicide, je sais pertinemment que tu risques ta vie, mais c'est un sacrifice nécessaire pour sauver notre galaxie. Hélas, malgré tous nos efforts, nous n'avons pas réussi à déchiffrer ce message, et je n'ai plus le temps de le faire. Cela sera peut-être notre dernière communication ensemble...
  
  Que la Force soit avec toi.`
  ];
  
  let currentMessage = 0;
  
  const messageContent = document.querySelector('.message-content');
  const nextBubble = document.querySelector('.next-bubble');
  const nextPageBtn = document.querySelector('.next-page-btn');
  
  // Lors du clic sur la flèche
  nextBubble.addEventListener('click', () => {
    if (currentMessage < messages.length - 1) {
      currentMessage++;
      messageContent.innerText = messages[currentMessage];
    }
    
    // Si on est arrivé au dernier message, on cache la flèche et on affiche le bouton de redirection
    if (currentMessage === messages.length - 1) {
      nextBubble.style.display = 'none';
      nextPageBtn.style.display = 'block';
    }
  });
  
  // Au clic sur le bouton de redirection, on redirige vers une autre page
  nextPageBtn.addEventListener('click', () => {
    window.location.href = "suite.php"; // Remplacez "autrepage.html" par l'URL de destination souhaitée
  });
  

  