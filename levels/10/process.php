<?php
// Lire le contenu brut de la requête POST
$xmlContent = file_get_contents("php://input");

// Désactiver la protection contre XXE

// Charger le XML avec les entités activées
$dom = new DOMDocument();
$dom->loadXML($xmlContent, LIBXML_NOENT | LIBXML_DTDLOAD);

// Convertir en SimpleXML
$data = simplexml_import_dom($dom);


// Afficher le résultat
echo "<h3>Résultat :</h3>";
echo "<pre>" . htmlspecialchars($data->asXML()) . "</pre>";

?>