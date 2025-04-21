 Amazon Web Scraper backend

This is the backend for a simple Amazon web scraper that searches for products on the first result page for a given keyword

## Prerequisites

- [Bun](https://bun.sh/) installed in your system.

## Installation

1. Navigates to the project's `backend` folder
2. Run the following command to install dependencies:
   ```bash
   bun install
   ```

## How to run

1. Still in the `backend` folder, run the following command to start the server:
   ```bash
   bun run server.js
   ```
The server will run in `http://localhost:5000`.

## Endpoints

- `/api/scrape?keyword=yourkeyword`: Returns a JSON array with the data of the products found for the given keyword.

## Observations

- The script uses `axios` to make the HTTP request and `jsdom` to parse the HTML of the Amazon page.
- The HTTP request includes a `User-Agent` to simulate a browser and avoid blocking.
- Error handling is implemented to handle failures in the request or in the HTML parsing.