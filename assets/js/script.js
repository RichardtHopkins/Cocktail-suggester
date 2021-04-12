//variables
var searchButton = $("#searchBtn");
var apiKey = "1";
var userIngredient;
var drinkCardList = [];
var drinkCardIngredients = []

//loop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {
    var ingredient = localStorage.getItem(i);
    console.log(localStorage.getItem("ingredient"));
    var ingredientName = $(".list-group").addClass("list-group-item");
    ingredientName.append("<li>" + ingredient + "</li>");
}

//key count for local storage 
var keyCount = 0;

//fetch the list of drinks with ingredient that is searched

//search button click event

searchButton.click(function () {
    userIngredient = $("#searchBar").val();
    var ingredientNameUrl = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/filter.php?i=" + userIngredient;
    $.ajax({
        type: "GET",
        url: ingredientNameUrl
    }).then(function (response) {
        for(i = 0; i < response.drinks.length; i++){
            drinkCardList[i] = {} 
            drinkCardList[i].name = response.drinks[i].strDrink;
            drinkCardList[i].image = response.drinks[i].strDrinkThumb;
        
        var drinkName = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/search.php?s=" + drinkCardList[i].name;
        $.ajax({
            type: "GET",
            url: drinkName,
        }).then(function (response) {
            console.log(response)
            for(j = 0; j < drinkCardList.length; j++){
                drinkCardList[j].ingredients = {};
                drinkCardList[j].ingredients.ingredient1 = response.drinks[0].strIngredient1;
                drinkCardList[j].ingredients.ingredient2 = response.drinks[0].strIngredient2;
                drinkCardList[j].ingredients.ingredient3 = response.drinks[0].strIngredient3;
                drinkCardList[j].ingredients.ingredient4 = response.drinks[0].strIngredient4;
                drinkCardList[j].ingredients.ingredient5 = response.drinks[0].strIngredient5;
                drinkCardList[j].ingredients.ingredient6 = response.drinks[0].strIngredient6;
                drinkCardList[j].ingredients.ingredient7 = response.drinks[0].strIngredient7;
                drinkCardList[j].ingredients.ingredient8 = response.drinks[0].strIngredient8;
                drinkCardList[j].ingredients.ingredient9 = response.drinks[0].strIngredient9;
                drinkCardList[j].ingredients.ingredient10 = response.drinks[0].strIngredient10;
                drinkCardList[j].ingredients.ingredient11 = response.drinks[0].strIngredient11;
                drinkCardList[j].ingredients.ingredient12 = response.drinks[0].strIngredient12;
                drinkCardList[j].ingredients.ingredient13 = response.drinks[0].strIngredient13;
                drinkCardList[j].ingredients.ingredient14 = response.drinks[0].strIngredient14;
                drinkCardList[j].ingredients.ingredient15 = response.drinks[0].strIngredient15;
            }
        })
    }
        console.log(response)
        console.log (drinkCardList)
    });
    console.log(userIngredient)
})


    //add drinks to the array using .push();
    // for(i = 0; i )
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
