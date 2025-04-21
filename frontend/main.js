
document.addEventListener('DOMContentLoaded', () => {
    const port = 5000;
  const keywordInput = document.getElementById('keyword');
  const scrapeButton = document.getElementById('scrapeButton');
  const resultsContainer = document.getElementById('results');

  scrapeButton.addEventListener('click', async() => {
      const keyword = keywordInput.value.trim();

      if (!keyword) {
          resultsContainer.innerHTML = '<p class="error-message">Please, type the keyword.</p>';
          return;
      }
      resultsContainer.innerHTML = '<p>Loading results...</p>';

      try {
        console.log("Try catch, resposta assincrona inicial")
          const response = await fetch(`http://localhost:${port}/api/scrape?keyword=${encodeURIComponent(keyword)}`);
          const data = await response.json();

          if (response.ok) {
              if (data.length > 0) {
                  resultsContainer.innerHTML = '';
                  data.forEach(product => {
                      const productCard = document.createElement('div');
                      productCard.classList.add('product-card');

                      const image = document.createElement('img');
                      image.src = product.imageURL || 'https://via.placeholder.com/100';
                      image.alt = product.title;
                      image.classList.add('product-image');

                      const details = document.createElement('div');
                      details.classList.add('product-details');

                      const title = document.createElement('h3');
                      title.classList.add('product-title');
                      title.textContent = product.title;

                      const rating = document.createElement('p');
                      rating.classList.add('product-rating');
                      rating.textContent = product.rating ? '★'.repeat(Math.round(product.rating)) + ' (' + product.rating + ')' : 'No Review';

                      const reviews = document.createElement('p');
                      reviews.classList.add('product-reviews');
                      reviews.textContent = product.numReviews > 0 ? product.numReviews + ' avaliações' : 'Nenhuma avaliação';

                      details.appendChild(title);
                      details.appendChild(rating);
                      details.appendChild(reviews);

                      productCard.appendChild(image);
                      productCard.appendChild(details);

                      resultsContainer.appendChild(productCard);
                  });
              } else {
                  resultsContainer.innerHTML = '<p>No products found for this keyword.</p>';
              }
          } else {
              resultsContainer.innerHTML = `<p class="error-message">Error during data search: ${data.error || response.statusText}</p>`;
          }

      } catch (error) {
          console.error('Request Error:', error);
          resultsContainer.innerHTML = '<p class="error-message">Error communicating with server.</p>';
      }
  });
});
