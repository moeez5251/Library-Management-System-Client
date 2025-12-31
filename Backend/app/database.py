import pyodbc
from app.core.config import settings

connection_string = (
    f"DRIVER={{ODBC Driver 18 for SQL Server}};"
    f"SERVER={settings.db_server};"
    f"DATABASE={settings.db_database};"
    f"UID={settings.db_username};"
    f"PWD={settings.db_password};"
    "TrustServerCertificate=yes;"
)

def get_connection():
    return pyodbc.connect(connection_string)
