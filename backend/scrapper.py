from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from models.ModelClasses import Entry

def scrap_entries():
    # Scrapper set up
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-extensions")

    service = Service(ChromeDriverManager().install())

    driver = webdriver.Chrome(service=service, options=chrome_options)
    wait = WebDriverWait(driver, 10)

    driver.get("https://news.ycombinator.com/")

    main_table = wait.until(ec.presence_of_element_located((By.TAG_NAME, "table")))

    raw_entries = main_table.find_elements(By.XPATH, "//*[contains(@class, 'athing')]")
    raw_entries_details = main_table.find_elements(
        By.XPATH, "//*[contains(@class, 'subtext')]"
    )

    entries: Entry = []

    # for i in range(len(raw_entries)):
    for i in range(30):
        number_str = raw_entries[i].find_element(By.CLASS_NAME, "title").text.split(".")[0]
        title_element = raw_entries[i].find_element(By.CLASS_NAME, "titleline")
        title = title_element.find_element(By.TAG_NAME, "a").text
        points_str = (
            raw_entries_details[i].find_element(By.CLASS_NAME, "score").text.split(" ")[0]
        )
        number_of_comments_str = (
            raw_entries_details[i]
            .find_elements(By.XPATH, ".//*[contains(text(), 'comments')]")
        )
        if len(number_of_comments_str) > 0:
            number_of_comments = number_of_comments_str[0].text.split(" ")[0]
        else:
            number_of_comments = 0

        entries.append(
            Entry(
                number=int(number_str),
                title=title,
                points=int(points_str),
                number_of_comments=int(number_of_comments),
            )
        )

    driver.quit()

    return entries
