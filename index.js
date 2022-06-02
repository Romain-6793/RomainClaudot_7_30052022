

import { recipes } from "./recipes.js"
import { recipesFactory } from "./factories.js"

const ingredientsInput = document.getElementById("ingredients-check")
const devicesInput = document.getElementById("devices-check")
const utensilsInput = document.getElementById("utensils-check")
const ingredientsMenu = document.querySelector(".menu__ingredients")
const devicesMenu = document.querySelector(".menu__devices")
const utensilsMenu = document.querySelector(".menu__utensils")
// const ingredientsDropdown = document.querySelector(".ingredients-nav")
// const devicesDropdown = document.querySelector(".devices-nav")
// const utensilsDropdown = document.querySelector(".utensils-nav")
let recipesArray = [];
recipesArray.push(recipes);
console.log(recipesArray)
console.log(typeof recipesArray)

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
    if (input == ingredientsInput) {
        ingredientsMenu.style.transform = "translateX(" + 0 + "px)"
        sidemenu1.style.transform = "translateX(" + 0 + "px)"
        sidemenu2.style.transform = "translateX(" + 0 + "px)"
    }
    else if (input == devicesInput) {
        devicesMenu.style.transform = "translateX(" + -190 + "px)"
        sidemenu1.style.transform = "translateX(" + 687 + "px)"
        sidemenu2.style.transform = "translateX(" + 0 + "%)"
    }
    else if (input == utensilsInput) {
        utensilsMenu.style.transform = "translateX(" + -380 + "px)"
        sidemenu1.style.transform = "translateX(" + 687 + "px)"
        sidemenu2.style.transform = "translateX(" + 687 + "px)"
    }

}

function growMenu(menu) {
    menu.style.width = 667 + "px"
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

function displayRecipes(recipesArray) {

    const recipesSection = document.querySelector(".recipes_section");

    recipesArray.forEach((recipe) => {
        const recipeModel = recipesFactory(recipe)
        const userRecipe = recipeModel.getUserRecipe()
        console.log(userRecipe)
        recipesSection.appendChild(userRecipe)
    });

}


function init() {
    const { recipesList } = recipesArray
    tabListeners()
    displayRecipes(recipesList)
}

init()