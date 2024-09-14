async function fetchRecommendations() {
  try {
    const response = await fetch('travelRecommendation/travel_recommendation_api.json');
    const data = await response.json();
    
    const cityRecommendations = data.countries.flatMap(country => 
      country.cities.map(city => ({
        name: city.name,
        imageUrl: city.imageUrl,
        description: city.description,
        type: 'city'
      }))
    );

    const templeRecommendations = data.temples.map(temple => ({
      name: temple.name,
      imageUrl: temple.imageUrl,
      description: temple.description,
      type: 'temple'
    }));

    const beachRecommendations = data.beaches.map(beach => ({
      name: beach.name,
      imageUrl: beach.imageUrl,
      description: beach.description,
      type: 'beach'
    }));

    const recommendations = [...cityRecommendations, ...templeRecommendations, ...beachRecommendations];

    // Display all recommendations initially
    displayRecommendations(recommendations);

    // Add event listener for search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.toLowerCase();
      const filteredRecommendations = recommendations.filter(recommendation => {
        // Exclusion logic
        if (keyword === 'temples' && recommendation.name.toLowerCase() === 'kyoto, japan') {
          return false;
        }
        if (keyword === 'beaches' && recommendation.name.toLowerCase() === 'rio de janeiro, brazil') {
          return false;
        }
        return (
          recommendation.name.toLowerCase().includes(keyword) ||
          recommendation.description.toLowerCase().includes(keyword) ||
          (keyword === 'beaches' && recommendation.type === 'beach') ||
          (keyword === 'temples' && recommendation.type === 'temple')
        );
      });
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