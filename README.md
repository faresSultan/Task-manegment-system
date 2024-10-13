# Getting Started with the App

## Prerequisites
Make sure you have the following installed on your machine:
- [Node.js and npm](https://nodejs.org/)
- [Nodemon](https://www.npmjs.com/package/nodemon) (for auto-restarting the backend server)

## Setting Up the Backend

1. Navigate to the backend directory:
    ```bash
    cd "./backend"
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Install `nodemon` globally (if not already installed):
    ```bash
    npm install -g nodemon
    ```

4. Start the backend server with `nodemon`:
    ```bash
    nodemon "./app.js"
    ```

## Setting Up the Frontend

Open a **new terminal** and follow the steps below:

1. Navigate to the frontend directory:
    ```bash
    cd "./frontend"
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Install Redux, Redux Toolkit, and Axios:
    ```bash
    npm install redux @reduxjs/toolkit axios
    ```

4. Start the frontend development server:
    ```bash
    npm start
    ```

## Running the App
Once both the backend and frontend servers are running, you can access the app by navigating to: http://localhost:3000/


## Additional Notes
- The backend server runs by default on `http://localhost:3000`.
- Make sure to configure any environment variables required for the app in the `.env` file.

