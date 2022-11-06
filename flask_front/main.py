from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

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

# SERVE FRONTEND FILES
app.mount("/", StaticFiles(directory="static", html=True), name="static")

# LAUNCH SERVER
if __name__ == "__main__":
    API_PORT = 3000
    uvicorn.run("main:app", host="0.0.0.0", port=API_PORT, log_level="info")