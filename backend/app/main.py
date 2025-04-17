from fastapi import FastAPI, Query
from pydantic import HttpUrl
import requests, json, os
import pandas as pd
import openpyxl

app = FastAPI()

#
newsURL = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT"
demoURL = ""


def print_website_contents(url: HttpUrl):
    try:
        response = requests.get(url)
        response.raise_for_status()
        html_content = response.text

        print(f"--- Website Content for {url} ---")
        print(html_content[:1000])  # print only first 1000 characters to avoid overflow

        return {
            "url": url,
            "message": response.status_code,
            "preview": html_content  # Optional: show a snippet in response
        }

    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return {"error": str(e)}



# def getImportantDetailsFromDictionary(dictResponse: dict):
#     if dictResponse["message"] == 200:
#         # print(type(dictResponse["preview"]))
#         if(type(dictResponse["preview"]) == str):
#             tempJson = json.loads(dictResponse["preview"])
#             for value in tempJson["data"]:
#                 print(value)



#     else:
#         print("Poop")
#     return 0

def getImportantDetailsFromDictionary(dictResponse: dict):
    if dictResponse["message"] == 200:
        if isinstance(dictResponse["preview"], str):
            tempJson = json.loads(dictResponse["preview"])
            data = tempJson.get("data", [])

            # Convert the data to a DataFrame
            df = pd.DataFrame(data)

            # Get the parent directory
            parent_dir = os.path.abspath(os.path.join(os.getcwd(), os.pardir))

            # Create the path for the Excel file
            excel_path = os.path.join(parent_dir, "important_details.xlsx")

            # Save the DataFrame to Excel
            df.to_excel(excel_path, index=False)

            print(f"Data written to {excel_path}")
        else:
            print("Preview is not a string")
    else:
        print("Poop")
    
    return 0
    # return 0






@app.get("/fetch-website/")
async def fetch_website(url: HttpUrl):
    result_of_news = print_website_contents(url)
    print(getImportantDetailsFromDictionary(result_of_news))
    return result_of_news


@app.get("/")
async def root():
    # resultOfNews =  print_website_contents(newsURL)
    # return {resultOfNews}
    return {"message": "Hello World"}