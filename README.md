# MansiVerse

## Project Overview
MansiVerse is a fullstack web application built with React, Vite, TypeScript, Tailwind CSS, and Express.js. It provides an interactive and romantic experience with features like quizzes, animations, and music.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/MansiVerse.git
   cd MansiVerse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Project

### Development Mode

To run the project in development mode:

1. Start the backend server:
   ```bash
   npm run dev:server
   ```

2. Start the frontend:
   ```bash
   npm run dev:client
   ```

3. Open your browser and navigate to `http://localhost:5173`.

### Production Mode

To build and run the project in production mode:

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to the deployed URL or `http://localhost:3000`.

---

## Deployment

### Frontend (GitHub Pages)

1. Build the frontend:
   ```bash
   npm run build:client
   ```

2. Push the `dist` folder to the `gh-pages` branch.

3. Enable GitHub Pages in the repository settings.

### Backend (Render/Railway)

1. Push the backend code to GitHub.

2. Deploy the backend using [Render](https://render.com) or [Railway](https://railway.app).

---

## Folder Structure

```
MansiVerse/
├── client/          # Frontend code
│   ├── src/
│   ├── public/
│   └── index.html
├── server/          # Backend code
├── shared/          # Shared utilities and schema
├── package.json     # Project scripts and dependencies
└── README.md        # Project documentation
```

---

## Scripts

- `npm run dev` - Run both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm start` - Start the production server

---

## Troubleshooting

- Ensure all dependencies are installed with `npm install`.
- Check for errors in the terminal and resolve them step by step.
- For Windows users, ensure `cross-env` is installed for environment variable compatibility.

---

## License

This project is licensed under the MIT License.
