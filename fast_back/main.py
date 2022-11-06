from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

import api
import schemas

# CREATE API
app = FastAPI()

# CORS MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# FETCH ALL SHORTCUTS
@app.get('/all')
def all(response: Response):

    # PERFORM QUERY
    result = api.fetch_all()

    # SET STATUS & RETURN PAYLOAD
    response.status_code = 200
    return result

# CREATE NEW SHORTCUT
@app.post('/fetch')
def create(input: schemas.fetch_input, response: Response):

    # EXTRACT REQUEST DATA & PERFORM QUERY
    result = api.fetch_row(input.shortcut)

    # SUCCESS
    if len(result) > 0:
        response.status_code = 200
        return result[0]
    
    # ERROR
    response.status_code = 404
    return {
        'success': False
    }

# CREATE NEW SHORTCUT
@app.get('/random')
def create(response: Response):

    # PERFORM QUERY
    success, item = api.fetch_random()

    # SUCCESS
    if success:
        response.status_code = 200
        return item
    
    # ERROR
    response.status_code = 404
    return {
        'success': False
    }

# CREATE NEW SHORTCUT
@app.post('/create')
def create(input: schemas.url_input, response: Response):

    # EXTRACT REQUEST DATA & PERFORM QUERY
    result = api.create_row(input.url)

    response.status_code = 201
    return result

# LAUNCH SERVER
if __name__ == "__main__":
    API_PORT = os.environ.get('API_PORT')
    # API_PORT = 3003
    uvicorn.run("main:app", host="0.0.0.0", port=API_PORT, log_level="info")