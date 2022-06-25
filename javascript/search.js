

import { ingredientsListFactory, devicesListFactory, utensilsListFactory, recipesFactory } from "./factories.js"
import { findingIngredients, findingDevices, findingUtensils } from "./finders.js"
import { recipes } from "./recipes.js"


const recipesSection = document.querySelector(".recipes-section")
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
const ingredientsList = document.getElementById("ingredients-list")
const devicesList = document.getElementById("devices-list")
const utensilsList = document.getElementById("utensils-list")


let ingredientsArray = []
let devicesArray = []
let utensilsArray = []
let selectedRecipesArray = []

export function search() {

    const searchInput = document.querySelector(".search-bar")

    function launchResearch() {


        let searchValue = searchInput.value
        let selectedRecipes = inputFilter(recipes, searchValue)

        function inputFilter(recipes, recipesFilter) {


            return recipes.filter((recipeObj) => {

                return recipeObj.name.toLowerCase().includes(recipesFilter.toLowerCase())
                    || recipeObj.description.toLowerCase().includes(recipesFilter.toLowerCase())
                    || recipeObj.ingredients.some((ingObj) => ingObj.ingredient.toLowerCase().includes(recipesFilter.toLowerCase()))

                // La méthode some() évite de faire une boucle for pour parcourir chaque ingrédient

            })

        }


        changeRecipesSection()
        displayRecipes(selectedRecipes)
        selectedRecipesArray.push(selectedRecipes)

    }

    searchInput.addEventListener("input", () => {
        if (searchInput.value.length >= 3) {
            launchResearch()
        }
    })


}

export function changeRecipesSection() {
    recipesSection.innerHTML = ""
}

export function displayRecipes(recipes) {

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

// Cette fonction closeMenu, prend en paramètres input et menu. 
// Lorsque cette fonction est appellée, l'input (checkbox) passé en argument n'est plus coché. Donc son
// dropdown n'apparaît plus. Sa position revient à 0px, et sa taille à 170px.

// (On y fait un console.trace pour connaître tous les endroits où elle est appellée).

export function closeMenu(input, menu) {
    // console.trace(closeMenu)
    input.checked = false
    menu.style.transform = "translateX(" + 0 + "px)"
    menu.style.width = 170 + "px"

    if (input === ingredientsInput) {
        ingredientsSearchButton.style.display = "block"
        ingredientsSearchBar.style.display = "none"
    }
    else if (input === devicesInput) {
        devicesSearchButton.style.display = "block"
        devicesSearchBar.style.display = "none"
    }
    else if (input === utensilsInput) {
        utensilsSearchButton.style.display = "block"
        utensilsSearchBar.style.display = "none"
    }



}

// Cette fonction prend en paramètres l'input(checkbox), le menu concerné et ses sidemenus. On commence par 
// y mettre un état initial : chaque menu est à 0 px . Ensuite, on pose les conditions, si l'input est 
// coché, et on bouge les positions selon l'input qui est coché.

export function translateMenus(input, menu, sidemenu1, sidemenu2) {
    menu.style.transform = "translateX(" + 0 + "px)"
    sidemenu1.style.transform = "translateX(" + 0 + "px)"
    sidemenu2.style.transform = "translateX(" + 0 + "px)"

    if (input.checked) {
        if (input === ingredientsInput) {
            menu.style.transform = "translateX(" + 0 + "px)"
            sidemenu1.style.transform = "translateX(" + 0 + "px)"
            sidemenu2.style.transform = "translateX(" + 0 + "px)"
        }
        else if (input === devicesInput) {
            menu.style.transform = "translateX(" + -190 + "px)"
            sidemenu1.style.transform = "translateX(" + 687 + "px)"
            sidemenu2.style.transform = "translateX(" + 0 + "%)"
        }
        else if (input === utensilsInput) {
            menu.style.transform = "translateX(" + -380 + "px)"
            sidemenu1.style.transform = "translateX(" + 687 + "px)"
            sidemenu2.style.transform = "translateX(" + 687 + "px)"
        }
    }
}

// Cette fonction détermine la taille que doit prendre un menu avec input coché ou non .

export function toggleWidthMenu(input, menu) {
    // console.log(menu, input.checked)
    if (input.checked) {
        menu.style.width = 667 + "px"
    } else {
        menu.style.width = 170 + "px"
    }
}

export function growMenu(menu) {
    menu.style.width = 225 + "px"
}

export function displayIngredientsList(ingredientsArray) {

    ingredientsArray.forEach((ingredient) => {
        const ingredientsListModel = ingredientsListFactory(ingredient)
        const userIngredientsList = ingredientsListModel.getUserIngredientsList()
        ingredientsList.appendChild(userIngredientsList)
    })

}

export function displayDevicesList(devicesArray) {


    const devicesList = document.getElementById("devices-list")

    devicesArray.forEach((device) => {
        const devicesListModel = devicesListFactory(device)
        const userDevicesList = devicesListModel.getUserDevicesList()
        devicesList.appendChild(userDevicesList)
    })

}

export function displayUtensilsList(utensilsArray) {
    const utensilsList = document.getElementById("utensils-list")

    utensilsArray.forEach((utensil) => {
        const utensilsListModel = utensilsListFactory(utensil)
        const userUtensilsList = utensilsListModel.getUserUtensilsList()
        utensilsList.appendChild(userUtensilsList)
    })

}

// Les trois fonctions suivantes sont appellées avec tabListeners. si le menu x n'a pas l'input coché,
// alors on invoquera closemenu pour le menu x . Sinon, on invoquera closeMenu pour les 2 autres menus.
// On invoque également toggleWidthMenu pour l'input x et son menu, et translateMenus avec comme arguments
// les deux mêmes que toggleWidthMenu + les sidemenus.

export function ingredientsListener() {
    // console.log(ingredientsListener)

    if (!ingredientsInput.checked) {
        closeMenu(ingredientsInput, ingredientsMenu)
    }
    closeMenu(devicesInput, devicesMenu)
    closeMenu(utensilsInput, utensilsMenu)

    toggleWidthMenu(ingredientsInput, ingredientsMenu)

    translateMenus(ingredientsInput, ingredientsMenu, devicesMenu, utensilsMenu)

}

export function devicesListener() {
    // console.log(devicesListener)

    if (!devicesInput.checked) {
        closeMenu(devicesInput, devicesMenu)
    }
    closeMenu(ingredientsInput, ingredientsMenu)
    closeMenu(utensilsInput, utensilsMenu)

    toggleWidthMenu(devicesInput, devicesMenu)

    translateMenus(devicesInput, devicesMenu, ingredientsMenu, utensilsMenu)

}

export function utensilsListener() {
    // console.log(devicesListener)

    if (!utensilsInput.checked) {
        closeMenu(utensilsInput, utensilsMenu)
    }

    closeMenu(devicesInput, devicesMenu)
    closeMenu(ingredientsInput, ingredientsMenu)

    toggleWidthMenu(utensilsInput, utensilsMenu)

    translateMenus(utensilsInput, utensilsMenu, ingredientsMenu, devicesMenu)

}

export function tabListeners() {

    ingredientsInput.addEventListener("click", ingredientsListener)
    devicesInput.addEventListener("click", devicesListener)
    utensilsInput.addEventListener("click", utensilsListener)
}

// function removeTabListeners() {

//     ingredientsInput.removeEventListener("click", ingredientsListener)

//     // const devicesInput = document.getElementById("devices-check")
//     devicesInput.removeEventListener("click", devicesListener)
//     // const utensilsInput = document.getElementById("utensils-check")
//     utensilsInput.removeEventListener("click", utensilsListener)

// }

export function controlIngSearchBar() {

    ingredientsInput.checked = true
    closeMenu(devicesInput, devicesMenu)
    closeMenu(utensilsInput, utensilsMenu)
    toggleWidthMenu(ingredientsInput, ingredientsMenu)
    translateMenus(ingredientsInput, ingredientsMenu, devicesMenu, utensilsMenu)

    if (ingredientsSearchBar.style.display === "none") {
        ingredientsSearchBar.style.display = "block"
        ingredientsSearchButton.style.display = "none"
    }
    if (ingredientsMenu.style.width < 667 + "px") {
        growMenu(ingredientsMenu)
    }
}

export function controlDevSearchBar() {

    devicesInput.checked = true
    closeMenu(ingredientsInput, ingredientsMenu)
    closeMenu(utensilsInput, utensilsMenu)
    toggleWidthMenu(devicesInput, devicesMenu)
    translateMenus(devicesInput, devicesMenu, ingredientsMenu, utensilsMenu)

    if (devicesSearchBar.style.display === "none") {
        devicesSearchBar.style.display = "block"
        devicesSearchButton.style.display = "none"
    }
    if (devicesMenu.style.width < 667 + "px") {
        growMenu(devicesMenu)
    }
}

export function controlUteSearchBar() {

    utensilsInput.checked = true
    closeMenu(ingredientsInput, ingredientsMenu)
    closeMenu(devicesInput, devicesMenu)
    toggleWidthMenu(utensilsInput, utensilsMenu)
    translateMenus(utensilsInput, utensilsMenu, ingredientsMenu, devicesMenu)

    if (utensilsSearchBar.style.display === "none") {
        utensilsSearchBar.style.display = "block"
        utensilsSearchButton.style.display = "none"
    }
    if (utensilsMenu.style.width < 667 + "px") {
        growMenu(utensilsMenu)
    }
}

export function displayMiniSearchBarL() {

    ingredientsSearchButton.addEventListener("click", controlIngSearchBar)

    devicesSearchButton.addEventListener("click", controlDevSearchBar)

    utensilsSearchButton.addEventListener("click", controlUteSearchBar)

}


export function ingTabSearch() {

    const ingTabSearchInput = document.querySelector(".ingredients-searchbar")

    ingredientsArray = findingIngredients(recipes)

    ingTabSearchInput.addEventListener("input", () => {
        function inputFilter(ingArray, textValue) {


            // Ce filtre agit de la façon suivante : en paramètre 1 je vais avoir mon tableau d'ingrédients,
            // en paramètre 2, je vais avoir ma valeur d'input.
            // Cela me retourne l'objet x (les mots clés qui vont apparaître), contenant des valeurs de
            // 3 lettres similaires à ce qui est rentré dans l'input.

            return ingArray.filter((recipeObj) => {


                return recipeObj.toLowerCase().includes(textValue.toLowerCase())

            })



        }

        let searchValue = ingTabSearchInput.value
        let selectedIngredients = inputFilter(ingredientsArray, searchValue)

        if (ingTabSearchInput.value.length >= 3) {
            changeIngList()
            // launchResearch()
            displayIngredientsList(selectedIngredients)
        } else {
            changeIngList()
            displayIngredientsList(ingredientsArray)
        }
    })
}

export function devTabSearch() {

    const devTabSearchInput = document.querySelector(".devices-searchbar")

    devicesArray = findingDevices(recipes)

    devTabSearchInput.addEventListener("input", () => {
        function inputFilter(devArray, textValue) {


            return devArray.filter((recipeObj) => {


                return recipeObj.toLowerCase().includes(textValue.toLowerCase())

            })

        }

        let searchValue = devTabSearchInput.value
        let selectedDevices = inputFilter(devicesArray, searchValue)

        if (devTabSearchInput.value.length >= 3) {
            changeDevList()
            displayDevicesList(selectedDevices)
        } else {
            changeDevList()
            displayDevicesList(devicesArray)
        }
    })
}

export function uteTabSearch() {

    const uteTabSearchInput = document.querySelector(".utensils-searchbar")

    utensilsArray = findingUtensils(recipes)

    uteTabSearchInput.addEventListener("input", () => {
        function inputFilter(uteArray, textValue) {


            return uteArray.filter((recipeObj) => {


                return recipeObj.toLowerCase().includes(textValue.toLowerCase())

            })

        }

        let searchValue = uteTabSearchInput.value
        let selectedUtensils = inputFilter(utensilsArray, searchValue)

        if (uteTabSearchInput.value.length >= 3) {
            changeUteList()
            // launchResearch()
            displayUtensilsList(selectedUtensils)
        } else {
            changeUteList()
            displayUtensilsList(utensilsArray)
        }
    })
}


function changeIngList() {
    ingredientsList.innerHTML = ""
}

function changeDevList() {
    devicesList.innerHTML = ""
}

function changeUteList() {
    utensilsList.innerHTML = ""
}

export function tabSearchers() {
    ingTabSearch()
    devTabSearch()
    uteTabSearch()
}