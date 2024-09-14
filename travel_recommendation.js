async function fetchRecommendations() {
  try {
    const response = await fetch('travelRecommendation/travel_recommendation_api.json');
    const data = await response.json();
    
    const recommendations = data.countries.flatMap(country => 
      country.cities.map(city => ({
        name: city.name,
        imageUrl: city.imageUrl,
        description: city.description,
        hasBeaches: city.hasBeaches, // Assuming this attribute exists in your JSON
        hasTemples: city.hasTemples  // Assuming this attribute exists in your JSON
      }))
    );

    // Display all recommendations initially
    displayRecommendations(recommendations);

    // Add event listener for search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.toLowerCase();
      const filteredRecommendations = recommendations.filter(recommendation => 
        recommendation.name.toLowerCase().includes(keyword) ||
        recommendation.description.toLowerCase().includes(keyword) ||
        (keyword === 'beaches' && recommendation.hasBeaches) ||
        (keyword === 'temples' && recommendation.hasTemples)
      );
      displayRecommendations(filteredRecommendations);
    });

  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
}


function displayRecommendations(recommendations) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  recommendations.forEach(recommendation => {
    const recommendationDiv = document.createElement('div');
    recommendationDiv.classList.add('recommendation');

    const img = document.createElement('img');
    img.src = recommendation.imageUrl;
    img.alt = recommendation.name;

    const name = document.createElement('h3');
    name.textContent = recommendation.name;

    const description = document.createElement('p');
    description.textContent = recommendation.description;

    recommendationDiv.appendChild(img);
    recommendationDiv.appendChild(name);
    recommendationDiv.appendChild(description);

    resultsDiv.appendChild(recommendationDiv);
  });
}

// Call the fetchRecommendations function to initiate the data fetching process
fetchRecommendations();

// Function to clear the search results
function clearResults() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
}
