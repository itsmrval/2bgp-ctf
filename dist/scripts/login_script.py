import requests
from bs4 import BeautifulSoup

# Définir l'URL de la page de connexion
login_url = "http://level9/"

# Créer une session pour enregistrer les cookies
session = requests.Session()

# Obtenir la page de connexion
response = session.get(login_url)
soup = BeautifulSoup(response.text, 'html.parser')

# Créer les données de connexion
login_data = {
    'username': 'Valkorion',
    'password': '-ObiWk2%wQ6zNp:!',
    # 'csrf_token': csrf_token,  # Décommenter si un token CSRF est nécessaire
    'connect': 'Login'  # Assurez-vous que la valeur est correcte si nécessaire
}

# Envoyer la requête POST au serveur
response = session.post(login_url, data=login_data)

# Vérifier si la connexion a réussi en cherchant un élément qui confirme la connexion
if "chat.php" in response.url:
    print("Connexion réussie !")
else:
    print("Échec de la connexion.")
