// Instanciate the classes
const ui = new UI(),
      cocktail = new CocktailAPI(),
      cocktailDB = new CocktailDB();



// Create the Event Listeners
function eventListeners() {
    // Document Ready
    document.addEventListener('DOMContentLoaded', documentReady);
    
    // Add event listener when form is submitted
    const searchForm = document.querySelector('#search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }

    // The Results div Listeners
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv) {
        resultsDiv.addEventListener('click', resultsDelegation);
    }
}

eventListeners();



// Get cocktails functions
function getCocktails(event) {
    event.preventDefault();

    // console.log('click');
    const searchTerm = document.querySelector('#search').value;
    
    // Check Something is on the search input
    // console.log(searchTerm); 
    if(searchTerm === '') {
        // console.log('Print Error');
        // Call user Interface Print Message
        ui.printMessage('Please Add Something into the form', 'danger');
    } else {
        // Server response from Promise
        let serverResponse;

        // Type of search (ingredients, cocktails or name)
        const type = document.querySelector('#type').value;

        // Evaluate the type of method and then execute the query
        switch(type) {
            case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm);
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient(searchTerm);
                break;
            case 'category':
                serverResponse = cocktail.getDrinksByCategory(searchTerm);
                break;
            case 'alcohol':
                serverResponse = cocktail.getDrinksByAlcohol(searchTerm);
                break;
        }

        ui.clearResults();


        // console.log('Query the REST API');
        // Query by the Name of the drink
        serverResponse.then(cocktails => {
            // console.log(cocktails);
            if(cocktails.cocktails.drinks === null) {
                // Nothing Exists
                ui.printMessage('There\'re no results, try a different term', 'danger');
            } else  {
                // console.log(cocktails);
                // Display Drinks with Ingredients
                if(type === 'name') {
                    // Display with Ingredients
                    ui.displayDrinksWithIngredients( cocktails.cocktails.drinks );
                } else {
                    // Display with out Ingredients (category, alcohol, ingredients)
                    ui.displayDrinks( cocktails.cocktails.drinks );
                }
            }
        })
    }
}

// Delegation for the #result area
function resultsDelegation(event) {
    event.preventDefault();

    if(event.target.classList.contains('get-recipe')) {
        // console.log('Yes You Click the Button');
        // console.log(event.target.dataset.id);
        // console.log(event.target.getAttribute('data-id') );
        cocktail.getSingleRecipe( event.target.dataset.id )
            .then(recipe => {
                // console.log(recipe);  
                // Displays Single Recipe into Modals
                ui.displaySingleRecipe( recipe.recipe.drinks[0] );
            })

    }

    // When Favorite Btn is clicked
    if(event.target.classList.contains('favorite-btn')) {
        // console.log('Yes');
        if(event.target.classList.contains('is-favorite') ) {
            // Remove the Class
            event.target.classList.remove('is-favorite');
            event.target.textContent = '+';
                            
            // Remove from the local Storage
            cocktailDB.removeFromDB(event.target.dataset.id);
        } else {
            // Add the Class
            event.target.classList.add('is-favorite');
            event.target.textContent = '-';

            // Get Info
            const cardBody = event.target.parentElement;

            const drinkInfo = {
                id: event.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }
            // console.log(drinkInfo);
            // Add into Storage 
            cocktailDB.saveIntoDB(drinkInfo);
        }
    }

}

// Document Ready
function documentReady() {
    // Display on load the favorite from storage
    ui.isFavorite();


    // Select the Search Category select
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory) {
        ui.displayCategories();
    }

    // When the favorite page
    const favoriteTable = document.querySelector('#favorites');
    if(favoriteTable) {
        // Get the favorite from the storage and display them
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);

        // When view or delete are clicked
        favoriteTable.addEventListener('click', (event) => {
            event.preventDefault();

            // Delegation
            if(event.target.classList.contains('get-recipe') ) {
              cocktail.getSingleRecipe( event.target.dataset.id )
                .then(recipe => {
                    // console.log(recipe);  
                    // Displays Single Recipe into Modals
                    ui.displaySingleRecipe( recipe.recipe.drinks[0] );
                })
            }

            // When Remove Button is Clicked in favorite
            if(event.target.classList.contains('remove-recipe') ) {
                // Remove from DOM
                // console.log(event.target.parentElement.parentElement);
                ui.removeFavorite( event.target.parentElement.parentElement );

                // Remove from the local Storage
                cocktailDB.removeFromDB(event.target.dataset.id);

            }
        })
    }
}
