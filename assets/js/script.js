//variables
var searchButton = $(".searchButton");
var apiKey = "1";

//loop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {
    var ingredient = localStorage.getItem(i);
    // console.log(localStorage.getItem("ingredient"));
    var ingredientName = $(".list-group").addClass("list-group-item");
    ingredientName.append("<li>" + ingredient + "</li>");
}

//key count for local storage 
var keyCount = 0;

//fetch the list of drinks with ingredient that is searched

//search button click event
searchButton.click(function () {
    var ingredientNameUrl = "https://www.thecocktaildb.com/api/json/v1/" + apiKey + "/filter.php?i=" + ingredient;
    $.ajax({
        type: "GET",
        url: ingredientNameUrl
    }).then(function (response) {
    });
    
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
