<?php
// Lire le contenu brut de la requête POST
$xmlContent = file_get_contents("php://input");

// Désactiver la protection contre XXE (laissé tel quel pour conserver la faille)

// Charger le XML avec les entités activées
$dom = new DOMDocument();
$dom->loadXML($xmlContent, LIBXML_NOENT | LIBXML_DTDLOAD);

// Convertir en SimpleXML
$data = simplexml_import_dom($dom);

// Fonction pour afficher les données XML
function displayXmlData($node) {
    if ($node->children()->count() == 0) {
        // Si le nœud n'a pas d'enfants, afficher directement son contenu
        echo htmlspecialchars((string)$node);
    } else {
        foreach ($node->children() as $child) {
            if ($child->children()->count() > 0) {
                echo ucfirst($child->getName()) . ":\n";
                displayXmlData($child);
                echo "\n";
            } else {
                echo ucfirst($child->getName()) . ": " . htmlspecialchars((string)$child) . "\n";
            }
        }
    }
}

// Afficher le résultat
echo "<h3>Résultat :</h3>";
echo "<pre>";
displayXmlData($data);
echo "</pre>";

?>
