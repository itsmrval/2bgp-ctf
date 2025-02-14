from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

def setup_driver():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    capabilities = {
        "browserName": "chrome",
        "platformName": "LINUX"
    }
    
    try:
        driver = webdriver.Remote(
            command_executor='http://selenium_chrome:4444/wd/hub',
            options=options
        )
        return driver
    except Exception as e:
        print(f"Failed to connect to Selenium Grid: {e}")
        return None

def login(driver, url):
    try:
        # Navigate to the login page
        driver.get(url)
        
        # Wait for login form elements to be present
        wait = WebDriverWait(driver, 10)
        username_field = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        password_field = wait.until(EC.presence_of_element_located((By.NAME, "password")))
        
        # Input credentials
        username_field.send_keys("Valkorion")
        password_field.send_keys("-ObiWk2%wQ6zNp:!")
        password_field.send_keys(Keys.RETURN)
        
        # Wait for redirect or success indicator
        time.sleep(2)  # Brief wait for redirect
        
        # Check current URL for successful login
        if "chat.php" in driver.current_url:
            print("Login successful!")
            return True
        else:
            print("Login failed - couldn't verify success")
            return False
            
    except Exception as e:
        print(f"Error during login: {e}")
        return False

def main():
    driver = setup_driver()
    if not driver:
        return
    
    try:
        login_successful = login(driver, "http://level9/")
        
        if login_successful:
            # Navigate to action page
            driver.get("http://level9/action_page")
            print(f"Current page title: {driver.title}")
            
            # Execute any JavaScript if needed
            driver.execute_script('console.log("Action completed")')
            
    except Exception as e:
        print(f"Error in main execution: {e}")
    
    finally:
        driver.quit()

if __name__ == "__main__":
    main()