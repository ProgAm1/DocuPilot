# DocuPilot

DocuPilot is a B2B SaaS AI operations platform that helps software companies and service businesses turn client requests, contracts, invoices, scope changes, and documents into structured requirements, tasks, approvals, risks, and decisions.

## Architecture

The project has been migrated to a modern **Next.js 15 + React 19** stack using the **App Router** and **Tailwind CSS**, preserving the original premium UI identity while enabling component reuse and future AI API integration.

## Getting Started

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Contains all Next.js routes (Dashboard, Projects, SRS Generator, Contracts, etc.)
- `src/components`: Contains reusable React components (Sidebar, Header, Cards, etc.)
- `src/styles`: Contains the core global CSS design system variables that enforce the brand identity.
- `src/app/api/ai`: Placeholder API route handlers ready for Gemini API integration.
