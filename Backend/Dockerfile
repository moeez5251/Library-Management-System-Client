# ===== Base Image =====
FROM python:3.13-slim-bullseye

# ===== Set working directory =====
WORKDIR /app

# ===== Install system dependencies =====
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl \
        gnupg2 \
        apt-transport-https \
        unixodbc-dev \
        lsb-release \
        build-essential \
        libssl-dev \
        libffi-dev \
        git && \
    # Add Microsoft GPG key
    curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /etc/apt/trusted.gpg.d/microsoft.gpg && \
    # Add Microsoft repo
    curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | tee /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql17 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# ===== Copy requirements =====
COPY requirements.txt .

# ===== Install Python dependencies =====
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# ===== Copy application code =====
COPY ./app ./app

# ===== Expose port =====
EXPOSE 8000

# ===== Run FastAPI with Uvicorn =====
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
