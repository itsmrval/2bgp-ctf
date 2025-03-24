#!/bin/bash

source /scripts/config/backend.env
hostname="http://backend:$PORT"
token="$ADMIN_SYSTEM_TOKEN"

# Function to send curl requests
send_request() {
    curl --location "$hostname/levels" \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --header "Authorization: Bearer $token" \
        --data-urlencode "name=$1" \
        --data-urlencode "hid=$2" \
        --data-urlencode "description=$3" \
        --data-urlencode "flag=$4" \
        --data-urlencode "url=$5" \
        --data-urlencode "points=$6"
}

# Check if levels exist by sending a GET request
response=$(curl --location "$hostname/levels" \
    --header "Authorization: Bearer $token")

# If the response is an empty list, run the requests
if [[ "$response" == "[]" ]]; then
    # Request 1: Croiseur
    send_request "Croiseur" 1 "Ton maitre te communique ta mission sur un holoprojecteur, déchiffre ce message et récupère le flag pour commencer ton aventure" "diabolic-atop-compress" "https://target1.2bgp-ctf.rvcs.fr" 100

    # Request 2: Endor
    send_request "Endor" 2 "Vous pénétrez dans les recoins secrets de la dernière base des services secrets. Dans ce sanctuaire caché, une transmission clandestine a été interceptée, émanant du fils redouté de Valkorion, Arkann. Le message, énigmatique et porteur d'un défi contient une photographie qui, à première vue, semble n'être qu'une simple image du vaisseau perdu le Faucon Millenium.

    Mais sous ces pixels se dissimule une énigme bien plus profonde. En laissant la Force guider votre intuition, vous vous devez de déchiffrez ces indices cachés." "untagged-disabled-arguable" "https://target2.2bgp-ctf.rvcs.fr" 150

    # Request 3: Naboo
    send_request "Naboo" 3 "Après avoir retrouvé le vaisseau d’Arkann, une étrange inquiétude s’empare de vous : Arkann n’est nulle part en vue. Aurait-il délibérément abandonné son vaisseau pour vous mettre à l’épreuve ? Pourtant, ce dernier est hermétiquement verrouillé.

    Mais la Force est avec vous. Concentrant votre énergie, vous percevez les subtils échos des enchantements protégeant l’entrée. D’un geste sûr, vous utilisez vos pouvoirs pour déverrouiller la porte, qui s’ouvre alors dans un léger murmure, révélant l’intérieur silencieux du cockpit.

    Il est écrit sur l'écran : \"Vérifier votre identité\". Vous comprenez rapidement que ce secret ne peut être dévoilé que par un savant mélange de technologie et de maîtrise de la Force.

    Agissant avec détermination, vous injectez un code permettant de prendre le contrôle du shell du cockpit. Votre script pourrait vous guider vers un dossier dissimulé dans les entrailles du vaisseau." "reusable-bacon-cabbie" "https://target3.2bgp-ctf.rvcs.fr" 150

    # Request 4: Hoth
    send_request "Hoth" 4 "Votre vaisseau traverse l'hyperespace pour atterrir sur la planète glaciale de Hoth, où, au cœur d’un paysage balayé par des vents hurlants, se dresse un ancien temple enveloppé de glace. Ce n’est pas un hasard si vous vous trouvez ici : cet édifice oublié est un sanctuaire renfermant des secrets capables de changer le cours de la guerre.

    En fouillant les couloirs silencieux du temple, vous ressentez la présence de la Force guidant chacun de vos pas. Au centre d'une vaste salle, sur un piédestal de pierre, repose un holocron légendaire, un artefact sacré censé renfermer le savoir des anciens maîtres de la Force.

    D’un geste assuré, vous vous attardez à déverrouiller ce précieux héritage. Vous voyez qu'avec votre force mentale vous avez du mal à ouvrir cet holocron, peut etre que la force brute pourrait vous aidez à trouver le code protégeant l’holocron." "perky-snowfall-unease" "https://target4.2bgp-ctf.rvcs.fr" 200

    # Request 5: Kamino
    send_request "Kamino" 5 "Vous atterrissez sur Kamino, la planète réputée pour ses prouesses en clonage. Dans les couloirs high-tech de la station, les Kaminoans, discrets et méthodiques, vous attendent. Ils vous informent qu’ils attendaient un certain Arkann, un nom qui résonne comme une ombre menaçante dans l'Empire. Vous comprenez alors qu'il vous faut vous faire passer pour ce fameux Arkann afin de ne susciter aucun soupçon. Ici, au cœur de ces laboratoires ultramodernes, se trame le sinistre dessein de l'Empereur Éternel : forger une armée de clones, basée sur l'ADN du chasseur de primes légendaire Jango Fett.

    Le danger est imminent. Même sans cette armée, l'Empire Éternel est à deux doigts de plonger la galaxie dans un joug autoritaire impitoyable. Votre mission, aussi périlleuse qu'essentielle, consiste à pénétrer dans la salle secrète abritant l'ADN des clones, véritable noyau de l'opération. Là, un ordinateur central contrôle toutes les données génétiques. Vous devez vous connecter, mais le mot de passe du chasseur de primes n’est pas en votre possession. À vous de le retrouver." "storeroom-bonelike-dreamlike" "https://target5.2bgp-ctf.rvcs.fr" 200

    # Request 6: Tatooine
    send_request "Tatooine" 6 "Après avoir atterri sur Tatooine, la chaleur implacable et les sables infinis de cette planète vous rappellent que le destin de la galaxie se joue parfois dans les lieux les plus inhospitaliers. Utilisant la Force, vous percevez des échos de présence dans l’obscurité des ruelles et des repaires cachés. Rapidement, vous localisez le célèbre chasseur de primes, Jango Fett.

    Sans détour, vous le confrontez. Sous la pression de vos menaces et l’éclat déterminé dans vos yeux, Jango comprend qu’il ne peut plus se dérober à votre quête. Bien qu’il ne possède pas d’informations détaillées sur les plans de l’Empereur, il révèle une nouvelle capitale : une prime a été lancée pour libérer Vaylin, la fille de Valkorion, détenue dans une prison ultra-sécurisée.

    Grâce à ses contacts, Jango a mis la main sur les plans de cette prison, situés sur la planète Nathema, dissimulés dans plusieurs images numériques. Chaque image représente une partie des installations, mais une faille technique vous offre l’accès à une information cruciale." "pacifism-neurosis-karma" "https://target6.2bgp-ctf.rvcs.fr" 200

    # Request 7: Nathema
    send_request "Nathema" 7 "Arrivé sur la planète Nathema, vous vous faufilez dans les sombres corridors de la prison, votre objectif ultime étant de libérer Vaylin. Dans ce labyrinthe de couloirs glacials, une lourde porte retient la captive. Les gardes ont un réseau spécifique pour ouvrir la cellule (172.16.0.0/24)" "unsliced-unleveled-parrot" "https://target7.2bgp-ctf.rvcs.fr" 250

    # Request 8: Rodia
    send_request "Rodia" 8 "Pendant votre périple vers Rodia, Vaylin vous confie un nouvel indice crucial. Dans un souffle empreint de nostalgie, elle se remémore les doux jours de son enfance sur Rodia, lorsqu’elle se réfugiait dans la bibliothèque de sa maison d’enfance. Dans cette bibliothèque reposait une collection de dix ouvrages précieux : 'Lune Eternelle', 'Soleil Noir', 'Feu Sacré', 'Brume d'Or', 'Aube Perdue', 'Etoile Morte', 'Ombre d'Argent', 'Voile Sombre', 'Vague Infinie' et 'Senya Tirall'. Votre mission s’annonce aussi périlleuse qu’essentielle : dénicher cet ouvrage oublié et en extraire le mot de passe dissimulé entre ses lignes." "password" "https://target8.2bgp-ctf.rvcs.fr" 250

    # Request 9: Flotte Eternelle
    send_request "Flotte Eternelle" 9 "Vous vous tenez devant la flotte Éternelle, alors que votre vaisseau oscille dans l’ombre menaçante de cette armada interstellaire. Sur une planète lointaine, Vaylin a réussi à établir une connexion avec votre système, vous permettant d’écouter en direct sa conversation tendue avec son père redoutable." "cactus-hula-most" "https://target9.2bgp-ctf.rvcs.fr" 250

    # Request 10: Zakel
    send_request "Zakel" 10 "En arrivant sur la planète Zakel vous avez qu'un seul objectif, celui de sauver la galaxie et de vaincre l'Empereur Eternel. Pour cela votre objectif est de vous introduire dans sa forteresse qui est hautement sécurisé, pour défaire ces défenses vous devez retrouver a partir de la structure des informations XML de la forteresse ce qui vous permettra de trouver une url. Cette information se trouvera dans un fichier bombe.txt qui faut trouver a partir de la structure des données envoyées qui sont tres interessantes.... Cette URL sera la dernière étape de votre plan qui est de faire surchauffer le réacteur qui donne de l'énergie a la forteresse. Interroger les noms de domaine est toujours tres interessant.... Cette surchauffe provoquera une explosion assez forte pour tuer l'Empereur Valkorion." "hamper-emergency-enlisted" "https://target10.2bgp-ctf.rvcs.fr" 300
else
    echo "Level already exists"
fi

sh /scripts/deploy_level9.sh