y## SAE Pentest

Accueil

Création de compte (nom, password)

*** Introduction et dialogues ***

Choix du groupe (camp ? Sith / Jedi)

Niveaux: (planètes)


In an age long forgotten, as the balance of the Force wavers, the galaxy sinks into darkness. The tyrannical Emperor Valkorion has hatched a sinister plan: to invade and enslave every world, imposing his iron will upon the entire universe. Rallying behind him is the Eternal Empire on Zakel—a relentless force of tyranny—and to ultimately defeat Valkorion, you must first overcome his children, the heirs of his dark legacy.

At the heart of this turmoil, you stand—either as a Jedi apprentice, bearer of light and hope, or as a Sith disciple, driven by the passion and determination of the dark side. Whichever path you choose, your destiny is now inextricably linked to the survival of the galaxy.

Tasked with the heavy mission of overthrowing Valkorion, you must draw upon the Force to rekindle the spark of freedom and restore balance. Shadows lengthen as the epic battle for the future of the universe begins now… Your master awaits you, young Padawan. May the Force be with you.

*** First Level ***

Tu reçois un appel de ton maitre qui t’envoie un ordre de mission ultra secret chiffré dans la langue star wars. La première mission est lié au fils et un des bras droits de l'empereur, d'après des informations 


*** Second Level  File Injection GET ***

Dans ce niveau, l'utilisateur peut choisir plusieurs images qui affichent différents plans. Il y a une faille car c'est directement en clair dans l'URL (GET), et en modifiant cela, on peut récupérer les logs du vaisseau et récupérer le fichier logs.txt. Il faut modifier l'URL de l'image par secret/logs.txt et il sera téléchargé dans le navigateur.

Il y aura le flag dans les logs à récupérer.


*** Third Level ***




*** 4 Level ***


*** 8 Level Injection SQL ***

Récupéré le compte de notre maitre qui est Llywi Minllegui (cest un exemple donne par LIA). Il faut recuper son hash et ensuite force le hash avec un kali. Son password est password ce qui est cense etre simple.
Cela a pour but de pouvoir se connecter a son compte et discuter avec le chef ennemi (qui est MAS TYMAR). Cela  apour but de lui evnoyer un XSS via la messagerie.

Voici le payload SQL.

PAYLOAD = ' UNION SELECT NULL, username, password, NULL, NULL FROM users #

recupere le hash de Llywi Minllegui alleer sur kali et faire un force avec hashcat par ex.
avoir un fichier hash.txt qui comprend le hash recupere

hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt

-m 0 : Spécifie que le hash est de type MD5.

-a 0 : Mode d'attaque par dictionnaire.

hash.txt : Fichier contenant le hash MD5.

/usr/share/wordlists/rockyou.txt : Chemin vers le fichier de dictionnaire.


Aller au prochain niveau se connected avec ce password recupere et realiser la prochaine etape.






*** 9 Level Attaque XSS ***

Pendant son périple il se fait arréter par un blocus pirates ( ou empire zakelien) pour se sortir de cette situation il doit se faire passer pour un chef ennemi et dire de le laisser passer. 



DOubke autheth attaque. 


*** Trouver l’identifiant d’un Jedi ***
- 2: Récupérer avec faille directory
    - Lieu de la faille: page web donnée
    - Choix: entrer un utilisateur dans un champ, puis si correct cela demandera le mot de passe

*** Mot de passe du jedi ***
- 3: XSS sur un form pour un nom d’utilisateur récupéré et un mot de passe caché dans la base de donnée SQLite.
    - Lieu de la faille: page web donnée
    - Choix: entrer le bon mot de passe après l’avoir trouvé dans la base de donnée
