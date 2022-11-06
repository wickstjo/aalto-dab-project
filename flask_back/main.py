from flask import Flask, request
from flask_cors import CORS
import os
import api

# CREATE FLASK APP
app = Flask(__name__)
cors = CORS(app)

# FETCH ALL SHORTCUTS
@app.route('/all', methods=['GET'])
def get_all():
    result = api.fetch_all()
    return result, 200

# FETCH ONE
@app.route('/fetch', methods=['POST'])
def fetch():

    # EXTRACT REQUEST DATA & PERFORM QUERY
    body = request.get_json()
    print(body)
    result = api.fetch_row(body['shortcut'])

    # SUCCESS
    if len(result) > 0:
        return result[0], 200
    
    # ERROR
    return {
        'success': False
    }, 404

# FETCH RANDOM
@app.route('/random', methods=['GET'])
def fetch_random():

    # PERFORM QUERY
    success, item = api.fetch_random()

    # SUCCESS
    if success:
        return item, 200
    
    # ERROR
    return {
        'success': False
    }, 404
    
# CREATE NEW
@app.route('/create', methods=['POST'])
def create():

    # EXTRACT REQUEST DATA & PERFORM QUERY
    body = request.get_json()
    result = api.create_row(body['url'])

    return result, 201

# RUN THE APP
API_PORT = os.environ['API_PORT']
# API_PORT = 3002
app.run(debug=True, host="0.0.0.0", port=API_PORT)