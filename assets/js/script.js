//variables
var searchButton = $("#searchBtn");
var apiKey = "1";
var userIngredient;
var drinkCardList = [];
var Cocktailingredients = []
var logo = $("#logo")
var input=$("#searchBar")
var formEl = $("#ingredient-form")

var drinkCardIngredients = [];

//declares the array and sets it in local storage.
var recentSearches = [];
if(!recentSearches){
    recentSearches.push(JSON.parse(localStorage.getItem('history')));
    localStorage.setItem('history', JSON.stringify(recentSearches));
}



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
    $("#cocktail-card-element").html('')
    logo.addClass("hide")
    //formEl.attr("class","ingredient-form-results")
    //formEl.children().css("margin","0.5rem")

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
            drinkCardList[i].totalIngredients = 1
            drinkName = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/search.php?s=" + drinkCardList[i].name;
            !function(i){
                $.ajax({
                    type: "GET",
                    url: drinkName,
                }).then(function (response) {


                    drinkCardList[i].ingredients = {};
                    drinkCardList[i].measures = {};
                    
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
        // console.log(response)
        // console.log(drinkCardList)
        // console.log(userIngredient)
        }
    })
    console.log(drinkCardList)

    //saves search to local storage.
    saveSearch();

})




function saveSearch(){
   
     //gets the value of the search bar and assigns it to latest search
     var latestSearch = $('#searchBar').val().trim();

     //check to see if the search is null. if it is console log that there was no search.
     if(latestSearch && !recentSearches.includes(latestSearch)){
        recentSearches = JSON.parse(localStorage.getItem('history')) || [];                     //get the previouse searches object and store it in history
        recentSearches.push(latestSearch);                                                      // push the value from the search bar to the recent searches array.
        localStorage.setItem('history', JSON.stringify(recentSearches));                        //set the local storage to be the new array.

        //creates a new button and adds it to the top of the recent search list.
        $('#searchHistory').prepend('<div><button type="button" class="btn-primary histBtn">' + latestSearch +'</button></div>');
        
     }else{
         console.log('nothing entered.')
     }

     
  
};

//creates recent search buttons on page load.
function createBtns(){
    recentSearches = JSON.parse(localStorage.getItem('history')) || [];
    for(var i = 0; i <= recentSearches.length -1; i++){
        if(recentSearches){
            $('#searchHistory').prepend('<div class="form-group"><button type="button" class="btn-primary histBtn">' + recentSearches[i] +'</button></div>');  
        }
    }
}


createBtns();





// function onPageLoad(){

//     var prevSearches = {
//         recentSearches: []
//     }
//     localStorage.setItem('Previous-Searches', JSON.stringify(prevSearches));

// }
// var formSubmitHandler = function (event) {
//     // event.preventDefault();

//     const ingredient = ingredientInputEl.value.trim();

//     if (ingredient) {
//         getCocktailList(ingredient);
//         ingredientHistoryArr.unshift({ ingredient })
//         ingredientInputEl.value = '';
//     } else {
//         alert('Please enter an ingredient');
//     }
// };

// //fetch the list of drinks with ingredient that is searched
// var getCocktailList = function (ingredient) {
//     let ingredientNameUrl = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/filter.php?i=" + ingredient;

//     fetch(ingredientNameUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     console.log(data)
//                     let id = data.drinks[0].idDrink;
//                     getCocktailSelected(id);
//                 });
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert('Unable to retrieve data');
//         });
// };
// //fetch the details of the cocktail from the id
// var getCocktailSelected = function (id) {

//     let cocktailSelectedUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;

//     fetch(cocktailSelectedUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     console.log(data)
//                     sortData(data);
//                 });
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert('Unable to retrieve data');
//         });

// }

// var sortData = function (data) {
//     var cocktail = data.drinks[0];
//     var ingredients = [];
//     for (var i = 1; i <= 15; i++) {
//         var ingredient = cocktail["strIngredient" + i]; // e.g. strIngredient1
//         if (ingredient) {
//             var measure = cocktail["strMeasure" + i]; // e.g. strMeasure1
//             if (measure) {
//                 ingredient = measure.trim() + " " + ingredient;
//             }
//             ingredients.push(ingredient);
//         }
//     }
//     var ingredientsList = ingredients.join(", ");
//     console.log(ingredientsList);
//     //e.g. 1/2 oz Gin, 1/2 oz Light rum, 1/2 oz Tequila, 1/2 oz Triple sec, 1/2 oz Vodka, 1/2 oz Coca-Cola, 1-2 dash Sweet and sour, 1 wedge Bitters, Garnish with Lemon
//     var image = data.drinks[i].strDrinkThumb;
//     var name = data.drinks[i].strDrink;
//     var instructions = data.drinks[i].strInstructions;
//     var glass = data.drinks[i].strGlass;
//     var alcoholic = data.drinks[i].strAlcoholic;
//     var category = data.drinks[i].strCategory;
//     ingredients
// }

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
