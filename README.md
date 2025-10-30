# Production-Ready Node.js REST API Template

[![CI/CD Pipeline](https://github.com/Hemanth0411/nodejs-api-template/actions/workflows/ci.yml/badge.svg)](https://github.com/Hemanth0411/nodejs-api-template/actions/workflows/ci.yml)

This repository is a production-ready template designed for any developer who needs a reliable and professional starting point for building REST APIs with Node.js. The primary goal is to provide a solid, best-practice foundation that saves you time on setup and configuration, allowing you to focus directly on your application's logic.

---

## Core Features

-   **Node.js & Express:** A fast, scalable, and widely-used backend foundation.
-   **Docker & Docker Compose:** Fully containerized for consistent development and production environments.
-   **CI/CD Automation:** A ready-to-use GitHub Actions pipeline that automatically builds and pushes the Docker image to Docker Hub on every merge to `main`.
-   **Live-Reload Development:** The local development environment uses `nodemon` for instant server restarts on code changes, speeding up the feedback loop.
-   **Interactive API Documentation:** Automatically generated, interactive API documentation powered by Swagger (OpenAPI) and served at the `/api-docs` endpoint.
-   **Security & Optimization:** The multi-stage `Dockerfile` creates a small, optimized production image and runs the application as a non-root user for improved security.
-   **Legal Compliance:** Ships with an MIT License and includes a tool (`license-checker`) to automatically generate a `3RD-PARTY-LICENSES.md` file.

---

## Getting Started (Local Development)

### Prerequisites

-   [Docker](https://www.docker.com/products/docker-desktop/)
-   [Node.js](https://nodejs.org/) (for package management)
-   Git

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Hemanth0411/nodejs-api-template.git
    cd nodejs-api-template
    ```

2.  **Install dependencies (optional, for IDE support):**
    ```bash
    npm install
    ```

3.  **Run the application using Docker Compose:**
    This command will build the Docker image and start the container. The API will be available at `http://localhost:3000`.
    ```bash
    docker-compose up --build
    ```

---

## Deployment

This application can be deployed in multiple ways, depending on your infrastructure.

### Method 1: Using the Docker Image (Recommended for Production)

The CI/CD pipeline automatically pushes a tagged image to Docker Hub. You can pull this image and run it on any server or cloud platform that supports Docker.

1.  **Pull the image from Docker Hub:**
    ```bash
    docker pull hemanth0411/nodejs-api-template:latest
    ```

2.  **Run the container:**
    This command starts the container, maps port 80 on the host to port 3000 in the container, and runs it in detached mode.
    ```bash
    docker run -d -p 80:3000 --name my-api-instance hemanth0411/nodejs-api-template:latest
    ```

### Method 2: Running with Node.js (Without Docker)

This method is suitable for environments where Docker is not available or for simpler use cases.

1.  **Clone the repository on your server:**
    ```bash
    git clone https://github.com/Hemanth0411/nodejs-api-template.git
    cd nodejs-api-template
    ```

2.  **Install production dependencies:**
    ```bash
    npm ci --omit=dev
    ```

3.  **Start the server:**
    It is highly recommended to use a process manager like `pm2` to handle restarts and logging in production.
    ```bash
    # Example using pm2
    npm install -g pm2
    pm2 start src/index.js --name "nodejs-api"
    ```

---

## How to Use This Template

This project is designed to be the base for your own application.

1.  Click the **"Use this template"** button on the GitHub repository page.
2.  Give your new repository a name.
3.  Clone your new repository to your local machine.
4.  Update the `README.md` and `package.json` files with your project's specific information.
5.  Configure your own `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets in your new repository's settings to enable the CI/CD pipeline.
6.  Start building your API!