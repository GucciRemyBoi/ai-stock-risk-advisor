from fastapi import FastAPI, Query
from pydantic import HttpUrl
import requests


app = FastAPI()

#
newsURL = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT"

def print_website_contents(url: HttpUrl):
    try:
        response = requests.get(url)
        response.raise_for_status()
        html_content = response.text

        print(f"--- Website Content for {url} ---")
        print(html_content[:1000])  # print only first 1000 characters to avoid overflow

        return {
            "url": url,
            "message": "Website content printed to console.",
            "preview": html_content[:300]  # Optional: show a snippet in response
        }

    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return {"error": str(e)}



@app.get("/fetch-website/")
async def fetch_website(url: HttpUrl):
    result_of_news = print_website_contents(url)
    return result_of_news


@app.get("/")
async def root():
    # resultOfNews =  print_website_contents(newsURL)
    # return {resultOfNews}
    return {"message": "Hello World"}