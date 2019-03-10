class UI {

    // Display all the Drink Categories
    displayCategories() {
        const categoryList = cocktail.getCategories()
              .then(categories => {
                //   console.log(categories);                  
                const catList = categories.categories.drinks;

                // Append first <option> without value
                const firstOption = document.createElement('option');
                firstOption.textContent = '-Select-';
                firstOption.value = '';
                document.querySelector('#search').appendChild(firstOption);

                // Append into the <select>
                catList.forEach(category => {
                    const option = document.createElement('option');
                    option.textContent = category.strCategory;
                    option.value = category.strCategory.split(' ').join('_');
                document.querySelector('#search').appendChild(option);
                })
              })
    }

    // Display the cocktails without ingredient
    displayDrinks(drinks) {
        // Show the Results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';
        // Insert the results
        const resultsDiv = document.querySelector('#results');

        // Loop through Drinks
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-4">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                            +
                        </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">
                                Get Recipe
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        this.isFavorite();
    }

    // Display Drinks with Ingredients
    displayDrinksWithIngredients(drinks) {
        // Show the Results First
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // Insert the results
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="btn favorite-btn btn-outline-info">
                            +
                        </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instructions: </p>
                            <p class="card-text">${drink.strInstructions}</p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">Ingredients</li>
                                    ${this.displayIngradients(drink)}
                                </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Information: </p>
                            <p class=""card-text>
                                <span class="badge badge-pill badge-success">${drink.strAlcoholic}</span>
                                <span class="badge badge-pill badge-warning">
                                    Category: ${drink.strCategory}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });
        this.isFavorite();
    }

    // Prints the Ingradients and measurements
    displayIngradients(drink) {
        // console.log(drink);

        let ingradients = [];
        for(let i = 1; i < 16; i++) {
            const ingradientMeasure = {};
            if( drink[`strIngredient${i}`] !== '' ) {
                ingradientMeasure.ingradient = drink[`strIngredient${i}`];
                ingradientMeasure.measure = drink[`strMeasure${i}`];
                ingradients.push(ingradientMeasure);
            }
        }
        // console.log(ingradients);
        // Build the Template
        let ingradientsTemplate = '';
        ingradients.forEach(ingradient => {
            ingradientsTemplate += `
                <li class="list-group-item">${ingradient.ingradient} - ${ingradient.measure}</li>
            `;
        });

        return ingradientsTemplate;
    }

    // Display Single Recipe
    displaySingleRecipe(recipe) {
        // Get Variables
        const modalTitle = document.querySelector('.modal-title'),
              modalDescription = document.querySelector('.modal-body .description-text'),
              modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

        // console.log(recipe);
        // Set the Values
        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;

        // Display the Ingredients
        modalIngredients.innerHTML = this.displayIngradients(recipe);
    }


    // Display a custom message
    printMessage(message, className) {
        // console.log('From the Method!')
        const div = document.createElement('div');

        // Add the HTML
        div.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">
                <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
            </div>
        `;

        // Insert Before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        // Remove after 3s
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // Clear Previous Results
    clearResults() {
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
    }

    // Display favorite from Storage
    displayFavorites(favorites) {
        const favoritesTable = document.querySelector('#favorites tbody');

        favorites.forEach(drink => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    <img src="${drink.image}" alt="${drink.name}" width="100">
                </td>
                <td>${drink.name}</td>
                <td>
                    <a href="#" class="btn btn-success get-recipe" data-toggle="modal" data-target="#recipe" data-id="${drink.id}">
                     View 
                    </a>
                </td>
                <td>
                    <a href="#" class="btn btn-danger remove-recipe" data-id="${drink.id}">
                     Remove 
                    </a>
                </td>
            `;
            favoritesTable.appendChild(tr);
        })
    }

    // remove single favorite from DOM
    removeFavorite(element) {
        element.remove();
    }

    // Add a class when cocktail is favorite 
    isFavorite() {
        const drinks = cocktailDB.getFromDB();

        drinks.forEach(drink => {
            // Destructuring the id
            let {id} = drink;

            // Select the favorites
            let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
            if(favoriteDrink) {
                favoriteDrink.classList.add('is-favorite');
                favoriteDrink.textContent = '-';
            }
        })
    }
}
