import requests
import os
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.environ["TOKEN"]

headers = {
  "Authorization": "Bearer " + TOKEN,
  "Content-type": "application/json",
  "Notion-Version": "2022-06-28"
}

def callDB(method, kind, id, payload={}):
    match kind:
        case "block":
            kind = "https://api.notion.com/v1/blocks/"
        case "database":
            kind = "https://api.notion.com/v1/databases/"
        case "page":
            kind = "https://api.notion.com/v1/pages/"

    if method == "POST":
        return requests.request(method,
                                kind + id + "/query",
                                json=payload,
                                headers=headers).json()
    elif method == "GET":
        return requests.request(method,
                                kind + id,
                                json=payload,
                                headers=headers).json()
    elif method == "PATCH":
        return requests.request(method,
                                kind + id,
                                data=payload,
                                headers=headers)
    
    else:
        print("Not a valid method")

