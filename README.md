# Amazon Web Scraper

This project consists of a frontend and a backend to perform web scraping on Amazon, searching for products on the first page of results for a given keyword.

## Project Structure

amazon-scraper/                           
├── backend/             
│   ├── server.js         
│   ├── package.json             
│   └── README.md            
└── frontend/                 
├── index.html                         
├── main.js                   
├── style.css                 
├── vite.config.js                   
├── package.json               
└── README.md                 

## Prerequisites

- [Bun](https://bun.sh/) installed on your system.

## Setting Up and Running

1. **Clone this repository**
2. **Navigate to the `backend`** folder and follow the instructions in `README.md` to install the dependencies and start the backend server.
3. **Navigate to the `frontend`** folder and follow the instructions in `README.md` to install the dependencies and start the frontend development server.
4. **Open the frontend address** in your web browser (usually `http://localhost:5173`).
5. **Type a keyword** in the search field and click "Search". The first page of Amazon results for that keyword will be displayed on the page.

## Notes

- The backend uses `axios` to make the HTTP request and `jsdom` to parse the HTML of the Amazon page.
- The frontend uses JavaScript to interact with the backend through AJAX calls.
- Error handling is implemented in both the backend and the frontend to provide a better user experience.
