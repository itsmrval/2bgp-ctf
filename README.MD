y## SAE Pentest

Accueil

Création de compte (nom, password)

*** Introduction et dialogues ***

Choix du groupe (camp ? Sith / Jedi)

Niveaux: (planètes)

*** INTRO ***

Dans une époque lointaine et oubliée, alors que l’équilibre de la Force chancelle, la galaxie sombre dans une obscurité implacable. Le tyrannique empereur Valkorion ourdit un sinistre dessein : envahir et asservir chaque monde, imposant sa volonté de fer sur l’univers tout entier. Soutenu par l’Empire éternel de Zakel, une force impitoyable et sans répit, il ne recule devant rien pour étendre son règne de terreur. Pour triompher de Valkorion, vous devrez d’abord vaincre ses enfants, héritiers de son sombre héritage, et briser la muraille de vaisseaux qui protège leurs planètes, la flotte éternelle.

Au cœur de ce chaos, vous vous trouvez, soit en tant qu’apprenti Jedi, porteur de lumière et d’espoir, soit en tant que disciple Sith, animé par la passion dévorante et la détermination du côté obscur. Quelle que soit la voie que vous choisirez, votre destin est désormais intimement lié à celui de la galaxie.

Chargé(e) de la mission titanesque de renverser Valkorion, vous devez puiser dans la Force pour rallumer l’étincelle de liberté et rétablir l’équilibre universel. Les ombres s’allongent et l’épopée pour l’avenir de l’univers débute à cet instant… Votre maître vous attend, jeune Padawan. Que la Force soit avec vous.

( Objectif aller sur Zakel pour faire tomber Valkorion et libérer la galaxy) 

*** First Level ***

Ton maitre te communique ta mission sur un holoprohecteur : 

Message du Maitre : 

Mon cher Padawan,

Mes troupes et moi sommes actuellement submergés par l'assaut implacable de l'Empire éternel.

Les derniers vestiges de nos services secrets, réduits à leurs ultimes moyens, nous ont transmis un ultime message crypté, rédigé dans une langue étrangère. Ce message recèle peut-être la clé pour renverser le cours de cette guerre.

En te confiant cette mission suicide, je suis conscient que tu risques ta vie, mais c'est un sacrifice nécessaire pour sauver notre galaxie. Hélas, malgré tous nos efforts, nous n'avons pas réussi à déchiffrer ce message, et le temps nous est compté. Nos espoirs reposent désormais sur toi. Je t'envoie donc ce message en ultime secours, sachant que cela pourrait être notre dernière communication ensemble.

Que la Force soit avec toi.

Message chiffré par les services secret : 

"Nous avons trouvé un vestige, ce vaisseau est ce qui peut nous sauver, selon les légendes c'est le vaisseau le plus rapide du monde, il a été volé par le fils de Valkorion, Arkann. Depuis des années, nous n'avions plus de nouvelles, mais nous avons retrouvé sa piste, rejoignez nous sur notre dernière base qui se trouve sur ... (Endor)."


( je vais trouvé une idée pour qu'il trouve endor plus difficilement ou sur un autre niveau) 

Première fois qu'il arrive sur la vu des planètes, il doit donc cliqué sur la planète Endor pour aller sur la base secrète. 


*** Level 2 - Photo métadonné   ***

Premiere planete Endor. 

Notre personnage se rend à la dernière base des services secrets, où une transmission directe du fils de Valkorion, Arkann, à sa sœur Vaylin a été interceptée. Cette communication renferme une photographie du vaisseau perdu. Mais ne vous y méprenez pas : l'image semble dissimuler bien plus qu'une simple illustration. Des indices subtils, minutieusement intégrés, laissent entrevoir un secret crucial pour localiser le vaisseau. C'est en décodant ces détails cachés que vous pourrez reconstituer les coordonnées tant recherchées.

Notre personnage met les coordonnées dans son vaisseau et cela lui indique une nouvelle planète, la planète ... ( a trouver) 



*** Level 3  FILE INJECTION = Reverse Shell ***



------------ Image a mettre en fond  dun vaisseau avec une porte et un sorte dordinateur afin denvoyer sa ID card ------------------

Tu as retrouve le vaisseau du de Arkann mais arkann n'est pas présent aux alentours ce que tu trouves étranges (l'aurait t'il abandonné en faisant exprès ici ) mais celui ci est verouillle totalment de partout... Heureusement tu maitrises la force pour ouvrir la porte du vaisseau. 

Tu entres dans le cockpit et tout est éteint et tu voies que sur le tableua de bord il y'a un digicode.  Pour cela, il faut mettre un fichier PHP dedans afin de faire un reverse shell et donc de controler l'accès au digicode. Il trouve le code grace au reverse shell dans un dossier /secret/flag.txt


*** Level 3  Faille reset password (a faire) ***
------------ Image a mettre en fond d'une piece d'un vaisseau avec un casier et un digicode et un endroit pour reinitlaiser son mdp ------------------

Bien joue ! TU es maintenant dans le vaisseau, cepenant, il est occupé par les ennemis ...... Essaye de ne pas te faire attraper ..... Il faut maintenant te deguiser en personnage ennemi. Pour cela va dans le vestiaire, il y a un code du casier de XXX mais tu nas pas son code. Alors il faut reinitlaiser le MDP  (fais dabord sur le compte pour anlyser les requetes etc) et lors de la reinitialisation, il faut changer l'url et indique avec les champs de XXX. 
Aisni, tu connais le MDP de son casier et tu recupere son costume.

Bie  joue, tu es maintenant deguise !!! tu puex te promener tranquillement dnas le vaisseau et continue ta mission.

*** Level 4 ***

Se rendre dnas le cotpit afin de pouvoir demarrer le vaisseau........ a continuer.....

*** LEVEL X ?? URL  GET ***

Dans ce niveau, l'utilisateur peut choisir plusieurs images qui affichent différents plans. Il y a une faille car c'est directement en clair dans l'URL (GET), et en modifiant cela, on peut récupérer les logs du vaisseau et récupérer le fichier logs.txt. Il faut modifier l'URL de l'image par secret/logs.txt et il sera téléchargé dans le navigateur.

Il y aura le flag dans les logs à récupérer.


*** 8 Level Injection SQL (a voire quand mettre cette faille) ***

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


*** 9 Level Attaque XSS (a voire quand mettre cette faille)  ***

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
