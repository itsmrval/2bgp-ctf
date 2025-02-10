## SAE Pentest

Accueil

Création de compte (nom, password)

*** Introduction et dialogues ***

Choix du groupe (camp ? Sith / Jedi)

Niveaux: (planètes)


In an age long forgotten, as the balance of the Force wavers, the galaxy sinks into darkness. The tyrannical Emperor Valkorion has hatched a sinister plan: to invade and enslave every world, imposing his iron will upon the entire universe. Rallying behind him is the Eternal Empire on Zakel—a relentless force of tyranny—and to ultimately defeat Valkorion, you must first overcome his children, the heirs of his dark legacy.

At the heart of this turmoil, you stand—either as a Jedi apprentice, bearer of light and hope, or as a Sith disciple, driven by the passion and determination of the dark side. Whichever path you choose, your destiny is now inextricably linked to the survival of the galaxy.

Tasked with the heavy mission of overthrowing Valkorion, you must draw upon the Force to rekindle the spark of freedom and restore balance. Shadows lengthen as the epic battle for the future of the universe begins now… Your master awaits you, young Padawan. May the Force be with you.

*** First Level ***

Tu reçois un appel de ton maitre qui t’envoie un ordre de mission ultra secret chiffré dans la langue star wars. La première mission



*** Second Level ***

À peine le vaisseau qui atterri sur Tatooine que notre héros se retrouve entraîné dans le tumulte d'une cantina locale. Entre les murmures des contrebandiers et le tintement des verres, une rumeur parvient à ses oreilles : Jabba le Hutt détient précieusement une information capitale. Selon les dires, ce secret se trouve dans une pièce secrète, dissimulée au cœur de son antre, et la porte qui y mène est verrouillée derrière un code impénétrable.

Mais voilà le twist digne d'un hacker galactique : la sécurité de la porte repose sur une faille dans le système informatique interne. Le code ne pourra être révélé qu’en exploitant cette vulnérabilité via une injection SQL. Seule une intelligence audacieuse et perspicace parviendra à interroger la base de données et à déchiffrer le mot de passe.


Au-delà de la porte dérobée, le message codé révèle la suite de sa quête : Mustafar, planète de feu et de cendres, où l'ombre du côté obscur se fait sentir intensément. Là-bas, de nouveaux mystères et dangers l’attendent.


*** Third Level ***

Le personnage se rend sur mustafar 




*** Trouver l’identifiant d’un Jedi ***
- 2: Récupérer avec faille directory
    - Lieu de la faille: page web donnée
    - Choix: entrer un utilisateur dans un champ, puis si correct cela demandera le mot de passe

*** Mot de passe du jedi ***
- 3: XSS sur un form pour un nom d’utilisateur récupéré et un mot de passe caché dans la base de donnée SQLite.
    - Lieu de la faille: page web donnée
    - Choix: entrer le bon mot de passe après l’avoir trouvé dans la base de donnée
