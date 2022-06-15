

import { recipes } from "./recipes.js"
import { recipesFactory, ingredientsListFactory, devicesListFactory, utensilsListFactory } from "./factories.js"

const ingredientsInput = document.getElementById("ingredients-check")
const devicesInput = document.getElementById("devices-check")
const utensilsInput = document.getElementById("utensils-check")
const ingredientsMenu = document.querySelector(".menu__ingredients")
const devicesMenu = document.querySelector(".menu__devices")
const utensilsMenu = document.querySelector(".menu__utensils")

const recipesArray = recipes
let ingredientsArray = []
let devicesArray = []
let utensilsArray = []
let namesArray = []
let descriptionsArray = []

function findingIngredients(recipes) {



    for (let i = 0; i < recipes.length; i++) {

        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            ingredientsArray.push(recipes[i].ingredients[j].ingredient)
        }
    }

    console.log(ingredientsArray)

    ingredientsArray = [...new Set(ingredientsArray)]

    return ingredientsArray;
}

function findingDevices(recipes) {



    for (let i = 0; i < recipes.length; i++) {

        devicesArray.push(recipes[i].appliance)
    }

    console.log(devicesArray)

    devicesArray = [...new Set(devicesArray)]

    return devicesArray;
}

function findingUtensils(recipes) {



    for (let i = 0; i < recipes.length; i++) {

        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            utensilsArray.push(recipes[i].ustensils[j])
        }
    }

    console.log(utensilsArray)

    utensilsArray = [...new Set(utensilsArray)]

    return utensilsArray;
}

function findingNames(recipes) {



    for (let i = 0; i < recipes.length; i++) {

        namesArray.push(recipes[i].name)
    }

    console.log(namesArray)

    return namesArray;
}

function findingDescriptions(recipes) {



    for (let i = 0; i < recipes.length; i++) {

        descriptionsArray.push(recipes[i].description)
    }

    console.log(descriptionsArray)

    return descriptionsArray;
}


function search() {

    const searchInput = document.querySelector(".search-bar")


    function launchResearch() {

        // rajouter le filter après

        let searchingString = `${ingredientsArray} ${namesArray} ${descriptionsArray}`
        console.log(searchingString)

        let index = searchingString.indexOf(searchInput.value)

        if (index !== -1 && searchInput.value.length >= 3) {
            alert("ça marche !")
        } else {
            console.log("ça ne marche pas !")
        }

        console.log(index)


        // if (photosId === photographerId2) {
        //     return elem.photographerId === photosId;
        // }
    }


    searchInput.addEventListener("input", () => {
        // if (searchData.length >= 3) {
        //     launchResearch()
        // }
        launchResearch()
    })
}


const displayMenu = (menu1, menu2, menu3) => {
    menu1.checked = true
    menu2.checked = false
    menu3.checked = false
    menu1.addEventListener("click", () => {
        closeMenu(menu1)
    })
}

function closeMenu(menu) {
    menu.checked = false
    ingredientsMenu.style.transform = "translateX(" + 0 + "px)"
    devicesMenu.style.transform = "translateX(" + 0 + "px)"
    utensilsMenu.style.transform = "translateX(" + 0 + "px)"
    ingredientsMenu.style.width = 170 + "px"
    devicesMenu.style.width = 170 + "px"
    utensilsMenu.style.width = 170 + "px"

    tabListeners()
}

function shiftMenu(input, sidemenu1, sidemenu2) {
    if (input === ingredientsInput) {
        ingredientsMenu.style.transform = "translateX(" + 0 + "px)"
        sidemenu1.style.transform = "translateX(" + 0 + "px)"
        sidemenu2.style.transform = "translateX(" + 0 + "px)"
    }
    else if (input === devicesInput) {
        devicesMenu.style.transform = "translateX(" + -190 + "px)"
        sidemenu1.style.transform = "translateX(" + 687 + "px)"
        sidemenu2.style.transform = "translateX(" + 0 + "%)"
    }
    else if (input === utensilsInput) {
        utensilsMenu.style.transform = "translateX(" + -380 + "px)"
        sidemenu1.style.transform = "translateX(" + 687 + "px)"
        sidemenu2.style.transform = "translateX(" + 687 + "px)"
    }

}

function growMenu(menu) {
    menu.style.width = 667 + "px"
}

function displayIngredientsList(ingredientsArray) {
    const ingredientsList = document.getElementById("ingredients-list")

    ingredientsArray.forEach((ingredient) => {
        const ingredientsListModel = ingredientsListFactory(ingredient)
        const userIngredientsList = ingredientsListModel.getUserIngredientsList()
        ingredientsList.appendChild(userIngredientsList)
    })

}

function displayDevicesList(devicesArray) {


    const devicesList = document.getElementById("devices-list")

    devicesArray.forEach((device) => {
        const devicesListModel = devicesListFactory(device)
        const userDevicesList = devicesListModel.getUserDevicesList()
        devicesList.appendChild(userDevicesList)
    })

}

function displayUtensilsList(utensilsArray) {
    const utensilsList = document.getElementById("utensils-list")

    utensilsArray.forEach((utensil) => {
        const utensilsListModel = utensilsListFactory(utensil)
        const userUtensilsList = utensilsListModel.getUserUtensilsList()
        utensilsList.appendChild(userUtensilsList)
    })

}

function tabListeners() {

    ingredientsInput.addEventListener("click", () => {
        displayMenu(ingredientsInput, devicesInput, utensilsInput)
        shiftMenu(ingredientsInput, devicesMenu, utensilsMenu)
        growMenu(ingredientsMenu)

    })
    const devicesInput = document.getElementById("devices-check")
    devicesInput.addEventListener("click", () => {
        displayMenu(devicesInput, utensilsInput, ingredientsInput)
        shiftMenu(devicesInput, ingredientsMenu, utensilsMenu)
        growMenu(devicesMenu)

    })
    const utensilsInput = document.getElementById("utensils-check")
    utensilsInput.addEventListener("click", () => {
        displayMenu(utensilsInput, ingredientsInput, devicesInput)
        shiftMenu(utensilsInput, ingredientsMenu, devicesMenu)
        growMenu(utensilsMenu)

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

function init() {

    tabListeners()
    console.log(recipes)
    findingIngredients(recipes)
    findingDevices(recipes)
    findingUtensils(recipes)
    findingNames(recipes)
    findingDescriptions(recipes)
    search()
    displayIngredientsList(ingredientsArray)
    displayDevicesList(devicesArray)
    displayUtensilsList(utensilsArray)
    displayRecipes(recipesArray)

}

init()