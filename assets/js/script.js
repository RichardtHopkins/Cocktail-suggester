//variables
var searchButton = $("#searchBtn");
var apiKey = "1";
const ingredientInputEl = document.querySelector("#searchBar")
const FormEl = document.querySelector("#search-form")

let ingredientHistoryArr = [];

//loop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {
    var ingredient = localStorage.getItem(i);
    // console.log(localStorage.getItem("ingredient"));
    var ingredientName = $(".list-group").addClass("list-group-item");
    ingredientName.append("<li>" + ingredient + "</li>");
}

//key count for local storage 
var keyCount = 0;

var formSubmitHandler = function (event) {
    event.preventDefault();

    const ingredient = ingredientInputEl.value.trim();

    if (ingredient) {
        getCocktailList(ingredient);
        ingredientHistoryArr.unshift({ ingredient })
        ingredientInputEl.value = '';
    } else {
        alert('Please enter an ingredient');
    }
};

//fetch the list of drinks with ingredient that is searched
var getCocktailList = function (ingredient) {
    let ingredientNameUrl = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/filter.php?i=" + ingredient;

    fetch(ingredientNameUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    let id = data.drinks[0].idDrink;
                    getCocktailSelected(id);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to retrieve data');
        });
};
//fetch the details of the cocktail from the id
var getCocktailSelected = function (id) {

    let cocktailSelectedUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;

    fetch(cocktailSelectedUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    sortData(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to retrieve data');
        });

}

var sortData = function (data) {
    var cocktail = data.drinks[0];
    var ingredients = [];
    for (var i = 1; i <= 15; i++) {
        var ingredient = cocktail["strIngredient" + i]; // e.g. strIngredient1
        if (ingredient) {
            var measure = cocktail["strMeasure" + i]; // e.g. strMeasure1
            if (measure) {
                ingredient = measure.trim() + " " + ingredient;
            }
            ingredients.push(ingredient);
        }
    }
    var ingredientsList = ingredients.join(", ");
    console.log(ingredientsList);
    // e.g. 1/2 oz Gin, 1/2 oz Light rum, 1/2 oz Tequila, 1/2 oz Triple sec, 1/2 oz Vodka, 1/2 oz Coca-Cola, 1-2 dash Sweet and sour, 1 wedge Bitters, Garnish with Lemon
    // var image = data.drinks[i].strDrinkThumb;
    // var name = data.drinks[i].strDrink;
    // var instructions = data.drinks[i].strInstructions;
    // var glass = data.drinks[i].strGlass;
    // var alcoholic = data.drinks[i].strAlcoholic;
    // var category = data.drinks[i].strCategory;
    // ingredients
}
// this.setState({ cocktail })
console.log(cocktail);
console.log(drinks);
console.log(ingredients);
    // renderCocktail();
}

// var renderCocktail = function () {
//     if(!this.state.cocktail) return null
//     return ( {this.state.cocktail.ingredients.map(ingredient =>
//         <li key={ingredient.drink}><strong>{ingredient.drink}</strong> {ingredient.measure}</li>
//     )})
// }



// // search button click event
// searchButton.on("click", function () {
//     var ingredientNameUrl = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/filter.php?i=" + ingredient;
//     $.ajax({
//         type: "GET",
//         url: ingredientNameUrl
//     }).then(function (response) {
//         console.log(response)
//             



//add drinks to the array using .push();
//for fetch json array.
//if(ingreent is included)
//add to page
//else forget about it

//fetch places with a range.
//return a list of stores
//same as above

//function to display list of drinks with ingredient in them
//fetch for image
//get the details from the object array that we create
//display name, image and ingredients as a card

//attr changes to hide things and unhide things.

//click on a card
//display modal with cocktail name, instruction, ingredients , image, stores near by

// make search bar fixed to bottom after search. 

//event listener to capture previous searched cocktails and store in local storage
FormEl.addEventListener('submit', formSubmitHandler);