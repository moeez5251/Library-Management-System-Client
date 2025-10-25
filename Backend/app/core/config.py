from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_server: str
    db_database: str
    db_username: str
    db_password: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_REFRESH_TOKEN: str
    GOOGLE_USER_EMAIL: str
    origins: str
    JWT: str
    class Config:
        env_file = ".env"

settings = Settings()
