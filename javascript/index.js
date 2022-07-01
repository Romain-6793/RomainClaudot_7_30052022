

import { recipes } from "./recipes.js"
import { findingIngredients, findingDevices, findingUtensils } from "./finders.js"
import { search, displayRecipes, displayIngredientsList, displayDevicesList, displayUtensilsList, tabListeners, displayMiniSearchBarL, tabSearchers } from "./search.js"



let recipesArray = recipes
// let filterBySearch = [...recipes];
let ingredientsArray = []
let devicesArray = []
let utensilsArray = []

// let namesArray = []
// let descriptionsArray = []





function init() {

    tabListeners()
    // console.log(recipes)
    ingredientsArray = findingIngredients(recipes)
    devicesArray = findingDevices(recipes)
    utensilsArray = findingUtensils(recipes)
    // findingNames(recipes)
    // findingDescriptions(recipes)
    search()
    // filterBySearch = inputFilter(recipes, searchValue)
    // const result = inputFilterBytag(filterBySearch)
    displayIngredientsList(ingredientsArray)
    displayDevicesList(devicesArray)
    displayUtensilsList(utensilsArray)
    displayMiniSearchBarL()
    tabSearchers()
    displayRecipes(recipesArray)

}

init()

