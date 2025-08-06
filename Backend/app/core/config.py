from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_server: str
    db_database: str
    db_username: str
    db_password: str
    origins: str
    Email:str
    Password:str
    class Config:
        env_file = ".env"

settings = Settings()
