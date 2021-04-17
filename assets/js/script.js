//variables
var searchButton = $("#searchBtn");
var apiKey = "1";
var userIngredient;
var drinkCardList = [];
var drinkCardIngredients = []
var Cocktailingredients = []

//loop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {
    var ingredient = localStorage.getItem(i);
    console.log(localStorage.getItem("ingredient"));
    var ingredientName = $(".list-group").addClass("list-group-item");
    ingredientName.append("<li>" + ingredient + "</li>");
}

//key count for local storage
var keyCount = 0;

//search function on button click
searchButton.click(function () {
    //initialising ingredient search data
    userIngredient = $("#searchBar").val();
    var ingredientNameUrl = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/filter.php?i=" + userIngredient;
    $.ajax({
        type: "GET",
        url: ingredientNameUrl
    }).then(function (response) {

        //populating array where drink details are pulled from
        for(i = 0; i < response.drinks.length; i++){
            drinkCardList[i] = {} 
            drinkCardList[i].name = response.drinks[i].strDrink;
            drinkCardList[i].image = response.drinks[i].strDrinkThumb;
            
        }
        var drinkName

        //initialising drink name search data
        for(i = 0; i < drinkCardList.length; i++){
            drinkCardList[i].totalIngredients = 1
            drinkName = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/search.php?s=" + drinkCardList[i].name;
            !function(i){
                $.ajax({
                    type: "GET",
                    url: drinkName,
                }).then(function (response) {

                    //creating objects for a drink's ingredient and measures
                    drinkCardList[i].ingredients = {};
                    drinkCardList[i].measures = {};

                    //populating the objects with ingredient and measure data
                    for(j = 0; j < response.drinks.length; j++){
                        if(drinkCardList[i].name === response.drinks[j].strDrink){ 
                            for(k = 1; k < 15; k++){
                                if(response.drinks[j]["strIngredient" + k] != null){
                                    if(response.drinks[j]["strMeasure" + k] != null){
                                        drinkCardList[i].ingredients["ingredient" + k] = response.drinks[j]["strIngredient" + k]
                                        drinkCardList[i].measures["measure" + k] = response.drinks[j]["strMeasure" + k]
                                        drinkCardList[i].totalIngredients ++
                                    } else {
                                        drinkCardList[i].ingredients["ingredient" + k] = response.drinks[j]["strIngredient" + k]
                                        drinkCardList[i].totalIngredients ++
                                    }
                                }
                            }
                        }
                    }

                    //building the html to display drink cards

                    //initialising variables
                    var Cocktailname =drinkCardList[i].name;
                    var Cocktailimage = drinkCardList[i].image;
                    Cocktailingredients[i] = "<h3>Ingredients</h3>"

                    //looping through array to concatenate measure and drink data; creates a new list item for each ingredient and its measure
                    for(j = 1; j < drinkCardList[i].totalIngredients; j++){
                        if(drinkCardList[i].measures["measure" + j] != null){
                            Cocktailingredients[i] =  Cocktailingredients[i] + "<li>" + 
                            drinkCardList[i].measures["measure" + j] +
                            " " + 
                            drinkCardList[i].ingredients["ingredient" + j]; + "</li>"
                        } else {
                            Cocktailingredients[i] = Cocktailingredients[i] + "<li>" +
                            " " + drinkCardList[i].ingredients["ingredient" + j] + "</li>"
                        }
                    }

                    //construct html card for each drink
                    var newCocktailCardEl = $(`
                                        <div style='width: 400px' class=" is-wide">
                                        <article class="message is-link">
                                            <div class="message-header">
                                                <h2>${Cocktailname}</h2>
                                            </div>
                                            <div class="message-body">
                                                <div class="board-item">
                                                    <div class="board-item-content"><a href="${Cocktailimage}" target="_blank"><img src="${Cocktailimage}" alt="cocktail-thumb" width="100"
                                                        height="150"></a> </div>
                                            <br>
                                            <div id="ingredients-${Cocktailname}">
                                                <ul>
                                                    ${Cocktailingredients[i]}
                                                </ul>
                                            </div>
                                            <br>
                                            </div>
                                        </div>
                                    </article>
                                    </div>
                                            `);
                                    $("#cocktail-card-element").append(newCocktailCardEl);
                })
        }(i)
        }
    });
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
