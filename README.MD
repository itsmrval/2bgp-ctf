## SAE Pentest

Accueil

Création de compte (nom, password)

*** Introduction et dialogues ***

Choix du groupe (camp ? Sith / Jedi)

Niveaux: (planètes)

*** First Level ***

Sur Endor,  Notre personnage fidèle adepte de la Force – qu’elle soit du côté lumineux ou obscur. Votre vaisseau, vital pour vos voyages et vos missions, a mystérieusement disparu lors de votre dernier atterrissage. La seule piste laissée derrière vous ? Un article de presse local, publié dans les journaux indépendants de la galaxie.

L'article relate la disparition de votre vaisseau avec une précision étonnante. Une image, prise posé sur Endor, attire particulièrement votre attention. Mais ce n’est pas une simple photographie : en examinant de plus près ses métadonnées, vous découvrez des coordonnées GPS .

Il retrouve son vaisseau, après cela dans son vaissseau il recoit une comunication d'un inconnu qui lui parle deune certaine relique qui pourrait rendre immortel n'importe quel etre qui la détient ce qui intéresse notre personnage soit avide de pouvoir ou qui veut cacher cette relique. Il lui parle de tatoine et que c'est là-bas que notre personnage ira. 

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
