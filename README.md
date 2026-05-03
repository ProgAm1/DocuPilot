# DocuPilot Operational Hub UI

A high-fidelity static prototype for the DocuPilot B2B SaaS platform, served using a Node.js Express server.

## Features
- Complete Neo-Dark SaaS Theme
- 5 Core Views (Dashboard, Projects, Contracts, Approvals, Ask DocuPilot)
- Vanilla HTML/CSS/JS (Zero frontend framework dependencies)

## Setup Instructions

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Install Dependencies**: Open your terminal in the root directory and run:
   ```bash
   npm install
   ```
3. **Start the Server**: Run the following command to boot up the Express server:
   ```bash
   npm start
   ```
4. **View the Application**: Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

## Project Structure
- `/` - Root directory containing all HTML views (e.g., `index.html`, `projects.html`) and the Node.js server (`server.js`).
- `/css` - Contains the design system stylesheets (`index.css`, `layout.css`, `components.css`).
- `/js` - Contains the client-side interaction script (`main.js`).

## Troubleshooting
- If you encounter an `EADDRINUSE` error, it means port 3000 is already being used. You can change the port by setting an environment variable (e.g., `set PORT=3001 && npm start` on Windows).
- Make sure to run the server from the root directory (`a:\college\outside project\MM`). Do not execute `node js/main.js` as it is client-side code meant for the browser, not Node.js.
