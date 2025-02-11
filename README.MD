y## SAE Pentest

Accueil

Création de compte (nom, password)

*** Introduction et dialogues ***

Choix du groupe (camp ? Sith / Jedi)

Niveaux: (planètes)

*** INTRO ***

Dans une époque oubliée depuis longtemps, alors que l'équilibre de la Force vacille, la galaxie sombre dans les ténèbres. Le tyrannique empereur Valkorion a élaboré un sinistre plan : envahir et asservir chaque monde, imposant sa volonté de fer à l'univers entier. L'Empire éternel de Zakel se rallie derrière lui, une force tyrannique implacable. Pour finalement vaincre Valkorion, vous devez d'abord vaincre ses enfants, les héritiers de son sombre héritage.

Au cœur de cette tourmente, vous vous trouvez, soit en tant qu'apprenti Jedi, porteur de lumière et d'espoir, soit en tant que disciple Sith, animé par la passion et la détermination du côté obscur. Quelle que soit la voie que vous choisissez, votre destin est désormais inextricablement lié à la survie de la galaxie.

Chargé de la lourde mission de renverser Valkorion, vous devez faire appel à la Force pour raviver l'étincelle de la liberté et rétablir l'équilibre. Les ombres s'allongent alors que la bataille épique pour l'avenir de l'univers commence maintenant… Votre maître vous attend, jeune Padawan. Que la Force soit avec vous.

=> Le but est d'aller tuer sur la derniere planete Valkorion. (jai mis un but sinon yen avait pas apres vous me dites)

*** First Level ***

Premiere planete, l'article de journal. Il y a un vaisseau qui s'est perdu dans la galaxie mais c'est le seul a le connaitre. Celui ci te permettrait deja plus facilement de te deplacer au-sein de la galaxie. Retrouve vite ce vaisseau avant u'il ne soit trop tard !!!!!!

*** Level 2  FILE INJECTION = Reverse Shell ***

Tu as trouve le vaisseau mais celui ci est verouillle totalment de partout... dommage, tu ne peux pas entrer dnas le vaisseau afin de l'utiliser. ATTENTION : tu te rends compte, que le vaisseau est habite par les ennemis, il le garde afin de le proteger. Si jamais tu reussir a entrer dnas le vaisseau, essaye de ne pas te faire attraper ..... Il faudra peut etre te faire passer pour une autre personne et enfiler ton meilleur costme.
Afin de rentrer dnas le vaisseau, il faut presenter son badge (STAR WARS) afin de deverouiller la porte. Pour cela, il faut mettre un fichier PHP dedans afin de faire un reverse shell et donc de controler l'accès au digicode. Il trouve le code grace au reverse shell dans un dossier /secret/flag.txt



*** Second Level  URL  GET ***

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
    => Oubliez pas de dezip le rockyou


Aller au prochain niveau se connected avec ce password recupere et realiser la prochaine etape.






*** 9 Level Attaque XSS ***

Pendant son périple il se fait arréter par un blocus pirates ( ou empire zakelien) pour se sortir de cette situation il doit se faire passer pour un chef ennemi et dire de le laisser passer.
Ainsi, maintenant qu'on a le compte de notre chef qui communique avec le chef ennemi pour se mettre d'accord, il faut pouvoir communiquer avce le chef ennemi et se connecter a son compte pour envoyer un message a ses soldats afin de leur dire de me relacher !!!!
Pour cela, lorsque le chef ennemi se connecte on recupere le cookie avec une XSS et on se levnoie sur un serveur web et on se connect a lurl chat.php du chef afin de mettre le cookie dans les datas et on est connecte au chef ennemi.



*** Exemple dattaque a faire :   ***

DOubke autheth attaque. 


*** Trouver l’identifiant d’un Jedi ***
- 2: Récupérer avec faille directory
    - Lieu de la faille: page web donnée
    - Choix: entrer un utilisateur dans un champ, puis si correct cela demandera le mot de passe

*** Mot de passe du jedi ***
- 3: XSS sur un form pour un nom d’utilisateur récupéré et un mot de passe caché dans la base de donnée SQLite.
    - Lieu de la faille: page web donnée
    - Choix: entrer le bon mot de passe après l’avoir trouvé dans la base de donnée
