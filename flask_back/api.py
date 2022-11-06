import psycopg2
import random
import string

# SETUP DB CONNECTION
pg_client = psycopg2.connect(
    database="database",
    host='postgres_db',
    user="username",
    password="password",
    port="5432"
)

# PERFORM POSTGRES QUERY
def pg_query(query_string, query_values=[]):

    cursor = pg_client.cursor()
    cursor.execute(query_string, query_values)
    pg_client.commit()

    return cursor

# FORMAT RESPONSE TUPLE
def db_row(input_tuple):
    return {
        'id': input_tuple[0],
        'full_url': input_tuple[1],
        'shortcut': input_tuple[2],
    }

def fetch_all():
    cursor = pg_query('SELECT * FROM temp_tbl')
    result = cursor.fetchall()

    return [db_row(x) for x in result]

def fetch_row(col_value):
    query = 'SELECT * FROM temp_tbl WHERE shortcut = %s'
    cursor = pg_query(query, (col_value, ))
    result = cursor.fetchall()

    return [db_row(x) for x in result]

def fetch_random():
    
    # PERFORM QUERY
    cursor = pg_query('SELECT * FROM temp_tbl')
    result = cursor.fetchall()

    # SUCCESS
    if len(result) > 0:
        random_item = db_row(random.choices(result)[0])
        return True, random_item
    
    return False, None

def count_rows(col_value):
    query = 'SELECT COUNT(*) FROM temp_tbl WHERE shortcut = %s'
    cursor = pg_query(query, (col_value, ))
    result = cursor.fetchall()

    return result[0][0]

# GENERATE RANDOM STRING ID -- VERIFIED
def random_string(length):
    container = ''

    while True:
        chars = string.ascii_uppercase + string.ascii_lowercase + string.digits
        container = ''.join(random.choices(chars, k=length))

        rows = count_rows(container)
        
        if rows == 0:
            break
    
    return container

def create_row(url):

    query = 'INSERT INTO temp_tbl (full_url, shortcut) VALUES (%s, %s)'
    item_id = random_string(5)
    values = (url, item_id)

    # PERFORM QUERY
    pg_query(query, values)

    return {
        'full_url': url,
        'shortcut': item_id
    }