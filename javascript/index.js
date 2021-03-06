

import { recipes } from "./recipes.js"
import { findingIngredients, findingDevices, findingUtensils } from "./finders.js"
import {
    search, displayRecipes, displayIngredientsList, displayDevicesList,
    displayUtensilsList, tabListeners, miniSBListeners, tabSearchers
} from "./search.js"

export const searchInput = document.querySelector(".search-bar")
export const recipesSection = document.querySelector(".recipes-section")
export const ingredientsInput = document.getElementById("ingredients-check")
export const devicesInput = document.getElementById("devices-check")
export const utensilsInput = document.getElementById("utensils-check")
export const ingredientsInput2 = document.getElementById("ingredients-check2")
export const devicesInput2 = document.getElementById("devices-check2")
export const utensilsInput2 = document.getElementById("utensils-check2")
export const ingredientsMenu = document.querySelector(".menu__ingredients")
export const devicesMenu = document.querySelector(".menu__devices")
export const utensilsMenu = document.querySelector(".menu__utensils")
export const ingredientsSearchBar = document.querySelector(".ingredients-searchbar")
export const devicesSearchBar = document.querySelector(".devices-searchbar")
export const utensilsSearchBar = document.querySelector(".utensils-searchbar")
export const ingredientsSearchButton = document.querySelector(".ingredients-searchbutton")
export const devicesSearchButton = document.querySelector(".devices-searchbutton")
export const utensilsSearchButton = document.querySelector(".utensils-searchbutton")
export const ingredientsList = document.getElementById("ingredients-list")
export const devicesList = document.getElementById("devices-list")
export const utensilsList = document.getElementById("utensils-list")
export const ingredientsNav = document.querySelector(".ingredients-nav")
export const devicesNav = document.querySelector(".devices-nav")
export const utensilsNav = document.querySelector(".utensils-nav")
export const ingredientsArrow = document.querySelector(".ingredients-arrow")
export const devicesArrow = document.querySelector(".devices-arrow")
export const utensilsArrow = document.querySelector(".utensils-arrow")
export const tagsSpace = document.querySelector(".tags-space")



let recipesArray = recipes
// let filterBySearch = [...recipes];
let ingredientsArray = []
let devicesArray = []
let utensilsArray = []

// let namesArray = []
// let descriptionsArray = []

// export let selectedRecipesArray = []
// export let selectedIngredients = ""
// export let selectedIngredientsArray = []
// export let selectedDevices = ""
// export let selectedDevicesArray = []
// export let selectedUtensils = ""
// export let selectedUtensilsArray = []





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
    miniSBListeners()
    tabSearchers()
    displayRecipes(recipesArray)

}

init()

