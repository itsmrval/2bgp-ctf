from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Configuration de Selenium avec webdriver-manager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

try:
    # Ouvrir la page de connexion
    driver.get("http://localhost/2bgp-ctf/levels/9/index.php")  # Remplacez par l'URL de votre site
    time.sleep(2)  # Attendre que la page se charge

    # Remplir le formulaire de connexion
    username_input = driver.find_element(By.NAME, "username")
    password_input = driver.find_element(By.NAME, "password")

    username_input.send_keys("Valkorion")  # Remplacez par le nom d'utilisateur
    password_input.send_keys("-ObiWk2%wQ6zNp:!")  # Remplacez par le mot de passe

    # Soumettre le formulaire
    login_button = driver.find_element(By.NAME, "connect")
    login_button.click()

    # Attendre que la page se charge après la connexion
    time.sleep(3)

    # Vérifier si la connexion a réussi
    if "chat.php" in driver.current_url:
        print("Connexion réussie !")
    else:
        print("Échec de la connexion.")

except Exception as e:
    print(f"Une erreur s'est produite : {e}")

finally:
    # Fermer le navigateur
    time.sleep(5)  # Attendre avant de fermer pour voir le résultat
    driver.quit()