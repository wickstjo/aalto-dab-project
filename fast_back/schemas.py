from pydantic import BaseModel

class url_input(BaseModel):
    url: str

class fetch_input(BaseModel):
    shortcut: str