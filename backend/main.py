from typing import Union
from scrapper import scrap_entries
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
]

app = FastAPI(
    title="Web Crawler API",
    description="This is a simple scrapper for Hacker News",
    docs_url="/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/get_entries")
def get_entries():
    try:
        entries_scrapped = scrap_entries()
        return {"result": entries_scrapped}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
