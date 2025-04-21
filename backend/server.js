//Necessary dependencies
import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const app = express();
const port = process.env.PORT || 5000;

//CORs treatment
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

//Endpoint to starts the scraping
app.get('/api/scrape',async (req, res) => {
    const { keyword } = req.query;

    //keyword verification
    if (!keyword) 
    {
        return res.status(400).json({error: 'keyword Required!'});
    }

    const amazonURL = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;

    try 
    {
        //Does the HTTP Req to amazon result page
        const response = await axios.get(amazonURL, {
            headers: {
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });
        const html = response.data;
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const productListings = document.querySelectorAll('.s-result-item[data-component-type="s-search-result"]');
        const extractedData = [];

        //Iterates over each product listing found
        productListings.forEach(product => {
            try 
            {
                //Extracts the product title
                const titleElement = product.querySelector('h2 a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal');
                const title = titleElement ? titleElement.textContent.trim() : 'Title not found :(';
                // Extracts the review (stars)
                const ratingElement = product.querySelector('.a-icon-star-small .a-icon-alt');
                const rating = ratingElement ? parseFloat(ratingElement.textContent.split(' ')[0]) : null;

                // Extracts the number of reviews
                const reviewsElement = product.querySelector('.a-size-small .a-link-normal.s-underline-text.s-underline-link-text.s-link-style');
                const numReviews = reviewsElement ? parseInt(reviewsElement.textContent.replace('.', '')) : 0;

                // Extracts the URL of the product image
                const imageElement = product.querySelector('.s-image');
                const imageURL = imageElement ? imageElement.src : null;

                extractedData.push
                ({
                    title,
                    rating,
                    numReviews,
                    imageURL,
                });
            } 
            catch(error)
            {
                console.error('Error extracting data from a product:', error);
            }
        });
        //Returns the extracted data in JSON format
        res.json(extractedData);
    } catch (error)
    {
        console.error('Error on fetching or parsing Amazon Page:', error);
        res.status(500).json({error: 'Scraping error.'});
    }
});


//Starts the Express Server :D
app.listen(port, () => {
    console.log(`Backend server is running in http://localhost:${port}`);
});