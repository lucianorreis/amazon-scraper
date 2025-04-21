# Amazon Web Scraper Frontend

This is the frontend for interacting with the Amazon web scraper backend.

## Prerequisites

- [Bun](https://bun.sh/) installed in your system.

## Installation

1. Navigate to the project's `frontend` folder.
2. Run the following command to install Vite dependencies:
   ```bash
   bun install
   ```

## How to run

1. Make sure the backend is running (on port 5000).
2. Still in the `frontend` folder, run the following command to start the Vite development server:
   ```bash
   bun run dev
   ```
The frontend will be available at a local address provided by Vite (usually `http://localhost:5173`).

## Features

- An input field to type the search keyword.
- A "Search" button to start the scraping process.
- An area to display the formatted search results.
- Error handling to display user-friendly messages.