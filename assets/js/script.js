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
        }
        var drinkName
        for(i = 0; i < drinkCardList.length; i++){
            drinkName = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/search.php?s=" + drinkCardList[i].name;
            !function(i){
                $.ajax({
                    type: "GET",
                    url: drinkName,
                }).then(function (response) {
                    // console.log(response)
                    // console.log(drinkCardList)
                    // console.log(drinkCardList[i])
                    drinkCardList[i].ingredients = {};
                    drinkCardList[i].measures = {};
                    for(j = 0; j < response.drinks.length; j++){
                        if(drinkCardList[i].name === response.drinks[j].strDrink){
                            for(k = 1; k < 15; k++){
                                if(response.drinks[j]["strIngredient" + k] != null){
                                    drinkCardList[i].ingredients["ingredient" + k] = response.drinks[j]["strIngredient" + k]
                                    drinkCardList[i].measures["measure" + k] = response.drinks[j]["strMeasure" + k]
                                }
                            }
                        }
                    }
                })
            }(i)
        // console.log(response)
        // console.log(drinkCardList)
        // console.log(userIngredient)
        }
    });
     
    // build Searh array
    var cocktailDetails = [
        Cocktailname,
        Cocktailimage,
        Cocktailingredients,
        ];

    var Cocktailname = response.drinks[i].strDrink;
    var Cocktailimage = response.drinks[i].strDrinkThumb;
    var Cocktailingredients = drinkCardList[i].ingredients;

    // build cocktail Search card element
    var newCocktailCardEl = $(`
    <div style='width: 400px' class="column is-narrow">
    <article class="message is-link">
        <div class="message-header">
            <p>${Cocktailname}</p>
        </div>
        <div class="message-body">
            <div class="board-item">
                <div class="board-item-content"><a href="${Cocktailimage}" target="_blank"><img src="${Cocktailimage}" alt="cocktail-thumb" width="100"
                        height="150"></a> </div>
            <br>
            <div id="ingredients-${Cocktailname}"> ${ocktailingredients}</div>
            <br>
            </div>
        </div>
    </article>
    </div>
          `);
    // render the card on the page
    $("#cocktail-card-element").append(newCocktailCardEl);
  });

// // this.setState({ cocktail })
// // console.log(cocktail);
// // console.log(drinks);
// // console.log(ingredients);

// formSubmitHandler(searchButton.click())

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

 
    //fetch for image
    //get the details from the object array that we create
    //display name, image and ingredients as a card

    //attr changes to hide things and unhide things.
//fetch places with a range.
    //return a list of stores
    //same as above



//click on a card
    //display modal with cocktail name, instruction, ingredients , image, stores near by
        //  if(attrShown === "imgNum" + count) {
        //     console.log("true");


// make search bar fixed to bottom after search. 

//event listener to capture previous searched cocktails and store in local storage
