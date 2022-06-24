

import { recipes } from "./recipes.js"
import { recipesFactory } from "./factories.js"
import { findingIngredients, findingDevices, findingUtensils } from "./finders.js"
import { displayIngredientsList, displayDevicesList, displayUtensilsList, tabListeners, displayMiniSearchBarL, tabSearchers } from "./tabs.js"


const recipesSection = document.querySelector(".recipes-section")


const recipesArray = recipes
let ingredientsArray = []
let devicesArray = []
let utensilsArray = []
// let namesArray = []
// let descriptionsArray = []





function search() {

    const searchInput = document.querySelector(".search-bar")


    function launchResearch() {


        let searchValue = searchInput.value

        function inputFilter(recipes, recipesFilter) {


            return recipes.filter((recipeObj) => {

                // for (let i = 0; i < recipeObj.ingredients.length; i++) {

                return recipeObj.name.toLowerCase().includes(recipesFilter.toLowerCase())
                    || recipeObj.description.toLowerCase().includes(recipesFilter.toLowerCase())
                    || recipeObj.ingredients.some((ingObj) => ingObj.ingredient.toLowerCase().includes(recipesFilter.toLowerCase()))

            })

        }

        let selectedRecipes = inputFilter(recipes, searchValue)
        changeRecipesSection()
        displayRecipes(selectedRecipes)

    }

    searchInput.addEventListener("input", () => {
        if (searchInput.value.length >= 3) {
            launchResearch()
        }
    })
}

function displayRecipes(recipes) {

    recipes.sort((a, b) => {
        a = a.name;
        b = b.name;

        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        if (a === b) {
            return a.name - b.name;
        }
    })

    const recipesSection = document.querySelector(".recipes-section");

    recipes.forEach((recipe) => {
        const recipeModel = recipesFactory(recipe)
        const userRecipe = recipeModel.getUserRecipe()
        recipesSection.appendChild(userRecipe)
    });

}

function changeRecipesSection() {
    recipesSection.innerHTML = ""
}

function init() {

    tabListeners()
    // console.log(recipes)
    ingredientsArray = findingIngredients(recipes)
    devicesArray = findingDevices(recipes)
    utensilsArray = findingUtensils(recipes)
    // findingNames(recipes)
    // findingDescriptions(recipes)
    search()
    displayIngredientsList(ingredientsArray)
    displayDevicesList(devicesArray)
    displayUtensilsList(utensilsArray)
    displayMiniSearchBarL()
    tabSearchers()
    displayRecipes(recipesArray)

}

init()

