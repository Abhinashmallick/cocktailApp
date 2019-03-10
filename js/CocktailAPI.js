class CocktailAPI {
    // Get recipe by Name
    async getDrinksByName(name) {
        // Search by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        // Returns a JSON response
        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }

    // Get Recipe by Ingredient
    async getDrinksByIngredient(ingredient) {
        // Search by Ingredients
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        // Wait for Response and then Returns a JSON
        const cocktails = await apiResponse.json();

        return {
            cocktails
        }  
        
    }

    // Get Single Recipe
    async getSingleRecipe(id) {
        // Search by Ingredients
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        // Wait for Response and then Returns a JSON
        const recipe = await apiResponse.json();

        return {
            recipe
        }  
    }

    // Retrieves all the Categories from the REST API
    async getCategories() {
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        // Wait for the Response
        const categories = await apiResponse.json();

        return {
            categories
        }

    }

    // Get Drinks By Category
    async getDrinksByCategory(category) {
        // Search by Categories
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        // Wait for Response and then Returns a JSON
        const cocktails = await apiResponse.json();

        return {
            cocktails
        }  
    }

    // Get Alcohol or Non-Alcohol Drinks
    async getDrinksByAlcohol(term) {
        // Search by Alcohol
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
        // Wait for Response and then Returns a JSON
        const cocktails = await apiResponse.json();

        return {
            cocktails
        } 
    }
}