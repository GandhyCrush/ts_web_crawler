from pydantic import BaseModel

class Entry(BaseModel):
    number: int
    title: str
    points: int
    number_of_comments: int