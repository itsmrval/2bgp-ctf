from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

# Configuration for Selenium WebDriver
options = Options()
options.headless = True  # Headless mode so it doesn't open the browser GUI

# Set up the WebDriver (ChromeDriver)
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Define the login URL
login_url = "http://level9/"
action_url = "http://level9/action_page"  # Adjust as needed for post-login action page

# Open the login page
driver.get(login_url)

# Wait for the page to load
time.sleep(2)

# Find the login form elements
username_field = driver.find_element(By.NAME, "username")
password_field = driver.find_element(By.NAME, "password")

# Input credentials
username_field.send_keys("Valkorion")
password_field.send_keys("-ObiWk2%wQ6zNp:!")
password_field.send_keys(Keys.RETURN)  # Press Enter to submit the form

# Wait for the login response (adjust if necessary)
time.sleep(5)  # You can replace this with WebDriverWait for better performance

# Check if login is successful by searching for an element on the page
try:
    # Assuming "chat.php" is part of the URL after successful login
    driver.find_element(By.LINK_TEXT, "chat.php")  # Or change this selector based on your page

    print("Connexion réussie !")

    # After logging in, you can now execute JavaScript on the page
    driver.execute_script('console.log("JavaScript executed successfully!")')

    # Navigate to another page or interact with elements (like clicking buttons)
    driver.get(action_url)  # Navigate to another page after login if needed
    time.sleep(3)  # Wait for the new page to load

    # Perform actions or scraping as needed
    print("Page d'action récupérée et analysée.")

    # Example: Print the page title to confirm the page load
    print("Page Title:", driver.title)

except Exception as e:
    print("Échec de la connexion.")
    print(e)

# After finishing tasks, close the browser
driver.quit()
