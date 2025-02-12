y## SAE Pentest

Accueil

Création de compte (nom, password)

*** Introduction et dialogues ***

Choix du groupe (camp ? Sith / Jedi)

Niveaux: (planètes)


*** Lien des personnages qu'on utilise  ***

Le méchant de l'histoire Empereur Valkorion : https://starwars.fandom.com/fr/wiki/Valkorion

Le fils de l'empereur de Valkorion Arcann : https://starwars.fandom.com/fr/wiki/Arcann

La fille de l'empereur Valkorion  Vaylin : https://starwars.fandom.com/fr/wiki/Vaylin

Jango Fett le chasseur de primes qui se fait prendre l'ADN pour se faire cloner sur Kamino : https://starwars.fandom.com/fr/wiki/Jango_Fett


*** INTRO ***

Dans une époque lointaine et oubliée, alors que l’équilibre de la Force chancelle, la galaxie sombre dans une obscurité implacable. Le tyrannique empereur Valkorion ourdit un sinistre dessein : envahir et asservir chaque monde, imposant sa volonté de fer sur l’univers tout entier. Soutenu par l’Empire éternel de Zakel, une force impitoyable et sans répit, il ne recule devant rien pour étendre son règne de terreur. Pour triompher de Valkorion, vous devrez d’abord vaincre ses enfants, héritiers de son sombre héritage, et briser la muraille de vaisseaux qui protège leurs planètes, la flotte éternelle.

Au cœur de ce chaos, vous vous trouvez, soit en tant qu’apprenti Jedi, porteur de lumière et d’espoir, soit en tant que disciple Sith, animé par la passion dévorante et la détermination du côté obscur. Quelle que soit la voie que vous choisirez, votre destin est désormais intimement lié à celui de la galaxie.

Chargé(e) de la mission titanesque de renverser Valkorion, vous devez puiser dans la Force pour rallumer l’étincelle de liberté et rétablir l’équilibre universel. Les ombres s’allongent et l’épopée pour l’avenir de l’univers débute à cet instant… Votre maître vous attend, jeune Padawan. Que la Force soit avec vous.

( Objectif aller sur Zakel pour faire tomber Valkorion et libérer la galaxy) 

*** Level 1 - Conversation chiffré ( Croiseur )  ***

Ton maitre te communique ta mission sur un holoprojecteur : 

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


*** Level 2 - Photo métadonné (planete Endor) ***

Notre personnage se rend à la dernière base des services secrets qui se trouvent sur Endor, où une transmission directe du fils de Valkorion, Arkann, à sa sœur Vaylin a été interceptée. Cette communication renferme une photographie du vaisseau perdu. Mais ne vous y méprenez pas : l'image semble dissimuler bien plus qu'une simple illustration. Des indices subtils, minutieusement intégrés, laissent entrevoir un secret crucial pour localiser le vaisseau. C'est en décodant ces détails cachés que vous pourrez reconstituer les coordonnées tant recherchées.

Notre personnage met les coordonnées dans son vaisseau et cela lui indique une nouvelle planète, la planète ... ( a trouver) 

L'utiliateur est amené sur la vue des planètes et clique sur la prochaine destination



*** Level 3  FILE INJECTION = Reverse Shell (planète ...)  ***

------------ Image a mettre en fond  dun vaisseau avec une porte et un sorte dordinateur afin denvoyer sa ID card ------------------

Tu as retrouve le vaisseau du  Arkann mais arkann n'est pas présent aux alentours ce que tu trouves étranges (l'aurait t'il abandonné en faisant exprès ici ) mais celui ci est verouillle totalment de partout... Heureusement tu maitrises la force pour ouvrir la porte du vaisseau. 

Tu entres dans le cockpit et tout est éteint et tu voies que sur le tableua de bord il y'a un code. Pour cela, il faut mettre un fichier PHP dedans afin de faire un reverse shell et donc de controler l'accès au code. Il trouve le code grace au reverse shell dans un dossier /secret/flag.txt.  

Lorsque il active le code le vaisseau s'allume tout seul et s'envole vers une nouvelle planete. 


*** Level 4  Bruteforce DB (planète Hoth)  ***

Sur cette nouvelle planète glaciale le vaisseau se pose devant un temple.  

Tu n'es pas là par hasard et tu te dois de rentrer dans ce temple. En rentrant dans ce temple au milieu tu vois un holocron, en tant que maitre de le force tu essaye d'ouvrir cet holocron (Bruteforce la base de donné, un holocron c'es un artefact dans star war qui peut contenir tout). Dans cet holocron il y'a un texte annoncant un grand danger l'empereur aurait commandé une armée de clone. Et jsp comment mais met que il a envoyé cet homme (Jango fett)   pour etre le clone originel et met son mail dedans. Il y'a aussi le lieu qui est kamino. (Mail comme j'ai pu t'expliqué hésite pas a m'appeler si il le faut) 

Quand tu rentres dans ton vaisseau tu vois qu'il n'y a plus d'auto pilot et tu as donc pour prochain objectif de te rendre sur cette planete pour arreter la lancée de la construction de cette armée. 


*** Level 5 Faille reset password (a faire planète Kamino ) ***

------------  Image d'arrivé sur kamino +  image de la salle d'adn ------------------

Tu te retrouves sur Kamino, où les Kaminoans t'attendaient, annonçant l'arrivée d'un certain Arkann. Réputée pour ses prouesses en clonage, cette planète abrite les esprits derrière la création de l'armée de clones de l'Empereur Éternel. Dès ton arrivée, les Kaminoans t'informent que l'Empereur a mandaté leur expertise pour fabriquer une armée de clones, basée sur l'exemple d'un chasseur de primes légendaire. Le problème est d'une gravité extrême : même sans cette armée, l'Empire Éternel est à deux doigts de dominer la galaxie, et avec elle, il imposera son contrôle sur l'univers en toute impunité.

Ta mission consiste à localiser la salle contenant l'ADN des clones, véritable noyau de l'opération. Dans cette salle, un ordinateur central gère toutes les données ADN. Tu devras d'abord te connecter pour analyser les requêtes, puis réinitialiser le mot de passe. Lors de cette réinitialisation, il te faudra modifier l'URL en renseignant les champs indiqués par XXX pour contourner les mesures de sécurité.

Après avoir réinitialisé le mot de passe et infiltré le système, tu parviens à détruire les données essentielles. Tu t'enfuis discrètement, sans éveiller le moindre soupçon.

Après cela tu te donnes pour objectif de retrouvé Jango fett, tu sais que sa planète de prédilection est tatooine. Tu dois donc te diriger vers tatooine. 

*** Level 6 Transversale avec un fichier log telecharger (planete tatooine) ***

Arrivée sur tatooine tu arrives en utilisant la force a savoir ou loge le chasseur de prime Jango Fett. 

Tu vas le rencontrer et tu le menaces pour en savoir plus, il ne sait rien de plus sur les agissements de l'empereur, mais il sait que une prime à été donné pour libérer la fille de Valkorion d'une prison.  

Il te donne les plans de la prison qu'il a réussi a recevoir d'une certaine manière. Ton objectif est de trouver dans quelle salle de la prison est prisonnière Vaylin la fille de Valkorion. 

Dans ce niveau, l'utilisateur peut choisir plusieurs images qui affichent différents plans. Il y a une faille car c'est directement en clair dans l'URL (GET), et en modifiant cela, on peut récupérer les logs du vaisseau et récupérer le fichier logs.txt. Il faut modifier l'URL de l'image par secret/logs.txt et il sera téléchargé dans le navigateur.

Il y aura le flag dans les logs à récupérer.

Tu trouves ou est la salle ou est emprisoné Vaylin. Tu te dois d'aller la sauver

*** Level 7 (planete Nathema) ***

Arrivé sur la planète Nathema tu arrives a te faufiler dans la prison pour aller la libérer. 

Il y'a un problème la porte qui emprisone Vaylin est bloqué ( selon l'attaque faut trouver) 

On la sauve et elle nous explique qu'elle a ressenti dans la force la perte de son frere qui à du etre tué par son père l'empereur Valkorion. Vos objectifs deviennent commun pour elle c'est vengé son frere et nous c'est vengé la mort de notre maitre et sauver la galaxie. 

Tu as donc pour objectif de te rendre sur Zakel mais pour cela 


*** 8 Level Injection SQL (a voire quand mettre cette faille) ***

Pour récupéré le mot de passe Récupéré le compte de notre maitre qui est Llywi Minllegui (cest un exemple donne par LIA). Il faut recuper son hash et ensuite force le hash avec un kali. Son password est password ce qui est cense etre simple.
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

Grace au vaisseau récupérer 
Ainsi, maintenant qu'on a le compte de notre chef qui communique avec le chef ennemi pour se mettre d'accord, il faut pouvoir communiquer avce le chef ennemi et se connecter a son compte pour envoyer un message a ses soldats afin de leur dire de me relacher !!!!
Pour cela, lorsque le chef ennemi se connecte on recupere le cookie avec une XSS et on se levnoie sur un serveur web et on se connect a lurl chat.php du chef afin de mettre le cookie dans les datas et on est connecte au chef ennemi.



*** Avant dernieer niveau Level Attaque XSS (a voire quand mettre cette faille)  ***


*** Exemple dattaque a faire :   ***

Doubke authenth attaque. 


*** Trouver l’identifiant d’un Jedi ***
- 2: Récupérer avec faille directory
    - Lieu de la faille: page web donnée
    - Choix: entrer un utilisateur dans un champ, puis si correct cela demandera le mot de passe

*** Mot de passe du jedi ***
- 3: XSS sur un form pour un nom d’utilisateur récupéré et un mot de passe caché dans la base de donnée SQLite.
    - Lieu de la faille: page web donnée
    - Choix: entrer le bon mot de passe après l’avoir trouvé dans la base de donnée
