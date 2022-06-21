

import { recipes } from "./recipes.js"
import { recipesFactory, ingredientsListFactory, devicesListFactory, utensilsListFactory } from "./factories.js"

const ingredientsInput = document.getElementById("ingredients-check")
const devicesInput = document.getElementById("devices-check")
const utensilsInput = document.getElementById("utensils-check")
const ingredientsMenu = document.querySelector(".menu__ingredients")
const devicesMenu = document.querySelector(".menu__devices")
const utensilsMenu = document.querySelector(".menu__utensils")
const ingredientsSearchBar = document.querySelector(".ingredients-searchbar")
const devicesSearchBar = document.querySelector(".devices-searchbar")
const utensilsSearchBar = document.querySelector(".utensils-searchbar")
const ingredientsSearchButton = document.querySelector(".ingredients-searchbutton")
const devicesSearchButton = document.querySelector(".devices-searchbutton")
const utensilsSearchButton = document.querySelector(".utensils-searchbutton")


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

    let temp = [];

    for (let i = 0; i < recipes.length; i++) {

        temp.push(recipes[i].appliance)
    }

    console.log(temp)

    temp = [...new Set(temp)]

    return temp;
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


// function search() {

//     const searchInput = document.querySelector(".search-bar")


//     function launchResearch() {

//         // rajouter le filter après

//         let searchingString = `${ingredientsArray} ${namesArray} ${descriptionsArray}`
//         console.log(searchingString)

//         let index = searchingString.indexOf(searchInput.value)

//         if (index !== -1 && searchInput.value.length >= 3) {
//             alert("ça marche !")
//         } else {
//             console.log("ça ne marche pas !")
//         }

//         console.log(index)

//     }

function search() {

    const searchInput = document.querySelector(".search-bar")


    function launchResearch() {

        // rajouter le filter après

        let recipesFilter2 = searchInput.value

        function textFilter(recipes, recipesFilter) {
            return recipes.filter((recipeObj) => {
                return recipeObj.name.toLowerCase().indexOf(recipesFilter.toLowerCase()) !== -1;
                // Mettre des OU pour les ingredients et la description.
                // return recipeObj.name.toLowerCase().includes(recipesFilter.toLowerCase())
            })
        }

        console.log(textFilter(recipes, recipesFilter2))




        console.log(selectedRecipes);

    }

    // selectedRecipes = recipes.filter((elem) => {
    //     if (photosId === photographerId2) {
    //         return elem.photographerId === photosId;
    //     }
    // });

    // const fruits = ['pomme', 'banane', 'raisin', 'mangue'];

    const selectedRecipes = (recipes, recipeFilter) => {
        return recipes.filter(el => el.toLowerCase().indexOf(recipeFilter.toLowerCase()) !== -1);
    }

    // console.log(filtreTexte(fruits, 'an')); // ['banane', 'mangue'];
    // console.log(filtreTexte(fruits, 'm')); // ['pomme', 'mangue'];


    searchInput.addEventListener("input", () => {
        if (searchInput.value.length >= 3) {
            launchResearch()
        }
        // launchResearch()
    })
}


const displayMenu = (menu1, menu2, menu3) => {
    menu1.checked = true
    menu2.checked = false
    menu3.checked = false
    removeTabListeners()
    menu1.addEventListener("click",
        closeMenu(menu1))
    if (closeMenu(menu1)) {
        menu1.removeEventListener("click",
            closeMenu(menu1))
    }
}

function closeMenu(menu) {
    menu.checked = false

    ingredientsMenu.style.transform = "translateX(" + 0 + "px)"
    devicesMenu.style.transform = "translateX(" + 0 + "px)"
    utensilsMenu.style.transform = "translateX(" + 0 + "px)"
    ingredientsMenu.style.width = 170 + "px"
    devicesMenu.style.width = 170 + "px"
    utensilsMenu.style.width = 170 + "px"

    // removeTabListeners()
    // tabListeners()
    removeMiniSearchBar()
    displayMiniSearchBarL()
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

function growMenu2(menu) {
    menu.style.width = 225 + "px"
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

function ingredientsListener() {
    displayMenu(ingredientsInput, devicesInput, utensilsInput)
    shiftMenu(ingredientsInput, devicesMenu, utensilsMenu)
    growMenu(ingredientsMenu)
    // removeTabListeners()
    // tabListeners()
}

function devicesListener() {
    displayMenu(devicesInput, utensilsInput, ingredientsInput)
    shiftMenu(devicesInput, ingredientsMenu, utensilsMenu)
    growMenu(devicesMenu)
    // removeTabListeners()
    // tabListeners()
}

function utensilsListener() {
    displayMenu(utensilsInput, ingredientsInput, devicesInput)
    shiftMenu(utensilsInput, ingredientsMenu, devicesMenu)
    growMenu(utensilsMenu)
    // removeTabListeners()
    // tabListeners()
}

function tabListeners() {

    ingredientsInput.addEventListener("click", ingredientsListener)
    devicesInput.addEventListener("click", devicesListener)
    utensilsInput.addEventListener("click", utensilsListener)
}

function removeTabListeners() {

    ingredientsInput.removeEventListener("click", ingredientsListener)

    // const devicesInput = document.getElementById("devices-check")
    devicesInput.removeEventListener("click", devicesListener)
    // const utensilsInput = document.getElementById("utensils-check")
    utensilsInput.removeEventListener("click", utensilsListener)

}

function displayIngSearchBar() {

    ingredientsSearchBar.style.display = "block";
    ingredientsSearchButton.style.display = "none";
    if (ingredientsMenu.style.width < 667 + "px") {
        growMenu2(ingredientsMenu)
    }
}

function displayDevSearchBar() {
    devicesSearchBar.style.display = "block";
    devicesSearchButton.style.display = "none";
    if (devicesMenu.style.width < 667 + "px") {
        growMenu2(devicesMenu)
    }
}

function displayUteSearchBar() {
    utensilsSearchBar.style.display = "block";
    utensilsSearchButton.style.display = "none";
    if (utensilsMenu.style.width < 667 + "px") {
        growMenu2(utensilsMenu)
    }
}

function displayMiniSearchBarL() {

    ingredientsSearchButton.addEventListener("click", displayIngSearchBar)

    devicesSearchButton.addEventListener("click", displayDevSearchBar)

    utensilsSearchButton.addEventListener("click", displayUteSearchBar)

}

function removeMiniSearchBar() {

    const ingredientsSearchButton = document.querySelector(".ingredients-searchbutton")
    const ingredientsSearchBar = document.querySelector(".ingredients-searchbar")
    ingredientsSearchButton.removeEventListener("click", displayIngSearchBar)
    ingredientsSearchBar.style.display = "none";
    ingredientsSearchButton.style.display = "block";

    const devicesSearchButton = document.querySelector(".devices-searchbutton")
    const devicesSearchBar = document.querySelector(".devices-searchbar")
    devicesSearchButton.removeEventListener("click", displayDevSearchBar)
    devicesSearchBar.style.display = "none";
    devicesSearchButton.style.display = "block";

    const utensilsSearchButton = document.querySelector(".utensils-searchbutton")
    const utensilsSearchBar = document.querySelector(".utensils-searchbar")
    utensilsSearchButton.removeEventListener("click", displayUteSearchBar)
    utensilsSearchBar.style.display = "none";
    utensilsSearchButton.style.display = "block";

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
    devicesArray = findingDevices(recipes)
    findingUtensils(recipes)
    findingNames(recipes)
    findingDescriptions(recipes)
    search()
    displayIngredientsList(ingredientsArray)
    displayDevicesList(devicesArray)
    displayUtensilsList(utensilsArray)
    displayMiniSearchBarL()
    displayRecipes(recipesArray)

}

init()