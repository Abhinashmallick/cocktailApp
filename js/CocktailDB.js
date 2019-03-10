class CocktailDB {

    // Save the Recipe into the local Storage
    saveIntoDB(drink) {
        const drinks = this.getFromDB();

        drinks.push(drink);

        // Add the new array into the localStorage
        localStorage.setItem('drinks', JSON.stringify(drinks) );
    }

    // Removes Element from the local Storage
    removeFromDB(id) {
        const drinks = this.getFromDB(); 

        // Loop
        drinks.forEach((drink, index) => {
            if(id === drink.id) {
                drinks.splice(index, 1);
            }
        });
        // Set the Array into local Storage
        localStorage.setItem('drinks', JSON.stringify(drinks) );
    }

    // Return the Recipe into the local Storage    
    getFromDB() {
        let drinks;
        // Check from local Storage
        if( localStorage.getItem('drinks') === null ) {
            drinks = [];
        } else {
            drinks = JSON.parse( localStorage.getItem('drinks') );
        }
        return drinks;
    }

}