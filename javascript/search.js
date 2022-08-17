

import { ingredientsListFactory, devicesListFactory, utensilsListFactory } from "./factories.js"
import { recipes } from "./recipes.js"
import {
    recipesSection, ingredientsMenu,
    devicesMenu, utensilsMenu, ingredientsInput, devicesInput, utensilsInput, ingredientsArrow,
    devicesArrow, utensilsArrow, ingredientsList, ingredientsSearchBar, devicesSearchBar,
    utensilsSearchBar, ingredientsSearchButton, devicesSearchButton,
    utensilsSearchButton, devicesList, utensilsList, ingredientsNav, devicesNav, utensilsNav,
    tagsSpace, ingredientsArray, devicesArray, utensilsArray

} from "./index.js"
import { findingIngredients, findingDevices, findingUtensils } from "./finders.js";
import {
    screen, saveSelectedIngredients, saveSelectedDevices, saveSelectedUtensils,
    changeRecipesSection, displayRecipes, closeMenu, toggleWidthMenu, translateMenus,
    displayNav, rotateArrow, resetArrow, filterByTags
} from "./utils.js";

export let selectedRecipesArray = [...recipes]
// export let selectedRecipesArray = bigInputFilter(recipes, searchInput.value)

// Les variables suivantes sont transformées par search()

export let selectedIngredients = ""
export let selectedIngredientsArray = findingIngredients(recipes)
export let selectedDevices = ""
export let selectedDevicesArray = findingDevices(recipes)
export let selectedUtensils = ""
export let selectedUtensilsArray = findingUtensils(recipes)
export let tagsArray = []
export const searchInput = document.querySelector(".search-bar")

export function search() {

    // Cette fonction (initiée à init), contrôle toutes les modalités de la barre de recherche principale,
    // son élément clé est l'eventListener qui se trouve en bas de la fonction.

    // launchResearch s'active au moment où l'input contient 3 caractères. On y déclare une searchValue, 
    // variable qui sontient la valeur d'input (3 caractères), ainsi que selectedRecipes, liste des recettes
    // passées à la moulinette de bigInputFilter.
    // Cette fonction est capitale, elle fait plusieurs choses : 1) elle passe l'input au filtre
    // 2) elle gère l'affichage des recettes avec la valeur passée au filtre 3) elle crée des tableaux 
    // avec les données x utilisées pour une recherche x, avant chaque nouvelle recherche, ces tableaux
    // se remettent à zéro.

    function launchResearch() {

        selectedRecipesArray = []

        // Dans cette version du projet , on remet selectedRecipesArray à zéro dès que la recherche est lancée.
        // Puis la fonction bigInputFilter va explorer le tableau recipes et selon les conditions décrites dans
        // la déclaration de la fonction.


        // bigInputFilter(recipes, searchInput.value)

        let selectedRecipes = bigInputFilter(recipes, searchInput.value)
        selectedRecipesArray = [...selectedRecipes]

        // D'abord on appelle changeRecipesSection() afin de vider le contenu de la section avant un nouvel
        // affichage.

        changeRecipesSection()

        // Puis on affiche les recettes selon selectedRecipes, variable qui est elle-même le résultat 
        // de bigInputFilter. Dans le cas où il y a des recettes sélectionnées. Dans le cas contraire,
        // un message d'erreur est affiché.

        if (selectedRecipesArray.length > 0) {
            recipesSection.innerHTML = ""
            displayRecipes(selectedRecipesArray)
        } else {
            recipesSection.innerHTML = ""
            const noMatchMessage = document.createElement("p")
            noMatchMessage.classList.add("no-match-message")
            noMatchMessage.innerText = "Nous sommes désolés, aucune recette ne correspond à votre recherche. Veuillez actualiser la page ou faire une nouvelle recherche."
            recipesSection.appendChild(noMatchMessage)
        }

        // Ici, on appelle les 3 fonctions de sauvegarde des éléments avec comme paramètre le tableau
        // selectedRecipesArray (résultat du filtre), ainsi on pourra réutiliser ces éléments sauvegardés,
        // pour l'affichage dans les onglets par exemple.

        saveSelectedIngredients(selectedRecipesArray, selectedIngredients, selectedIngredientsArray)
        saveSelectedDevices(selectedRecipesArray, selectedDevices, selectedDevicesArray)
        saveSelectedUtensils(selectedRecipesArray, selectedUtensils, selectedUtensilsArray)

    }

    // Enfin nous avons l'eventListener duquel tout part. Si l'input est égal à 3 caractères ou plus, une 
    // nouvelle recherche est lancée. 
    // Sinon, on remet tous les tableaux utilisés à zéro. Sauf selectedRecipesArray.


    searchInput.addEventListener("input", () => {
        if (searchInput.value.length >= 3) {

            launchResearch()
            changeItemsList(ingredientsList)
            displayIngredientsList(selectedIngredientsArray)
            changeItemsList(devicesList)
            displayDevicesList(selectedDevicesArray)
            changeItemsList(utensilsList)
            displayUtensilsList(selectedUtensilsArray)
        } else {
            resetResearch()
            changeItemsList(ingredientsList)
            displayIngredientsList(ingredientsArray)
            changeItemsList(devicesList)
            displayDevicesList(devicesArray)
            changeItemsList(utensilsList)
            displayUtensilsList(utensilsArray)
        }
    })


}


export function resetResearch() {

    selectedRecipesArray = [...recipes]
    selectedIngredientsArray = []
    selectedDevicesArray = []
    selectedUtensilsArray = []

    changeRecipesSection()
    displayRecipes(recipes)
}


// MAIN SEARCH ALGORITHM
//////////////////////////////////////////////////////////////////////////////////////////////////////

// Cette fonction va insérer ou non dans le tableau des recettes sélectionnées la recette. 
// Elle se base sur la barre la barre de recherche principale.
// Dans cette version, on n'utilise pas filter, mais une boucle "for".

export function bigInputFilter(recipes, recipesFilter) {


    return recipes.filter((recipeObj) => {


        return recipeObj.name.toLowerCase().includes(recipesFilter.toLowerCase())
            || recipeObj.description.toLowerCase().includes(recipesFilter.toLowerCase())
            || recipeObj.ingredients.some((ingObj) => ingObj.ingredient.toLowerCase().includes(recipesFilter.toLowerCase()))

    })

}


///////////////////////////////////////////////////////////////////////////////////////////////////////


// DISPLAYING ITEMS
//////////////////////////////////////////////////////////////////////////////////////

export function displayIngredientsList(ingredientsL) {

    ingredientsL.sort((a, b) => {

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

    ingredientsL.forEach((ingredient) => {
        const ingredientsListModel = ingredientsListFactory(ingredient)
        const userIngredientsList = ingredientsListModel.getUserIngredientsList()
        ingredientsList.appendChild(userIngredientsList)
    })

}

export function displayDevicesList(devicesL) {

    devicesL.sort((a, b) => {

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


    const devicesList = document.getElementById("devices-list")

    devicesL.forEach((device) => {
        const devicesListModel = devicesListFactory(device)
        const userDevicesList = devicesListModel.getUserDevicesList()
        devicesList.appendChild(userDevicesList)
    })

}

export function displayUtensilsList(utensilsL) {

    utensilsL.sort((a, b) => {

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

    const utensilsList = document.getElementById("utensils-list")

    utensilsL.forEach((utensil) => {
        const utensilsListModel = utensilsListFactory(utensil)
        const userUtensilsList = utensilsListModel.getUserUtensilsList()
        utensilsList.appendChild(userUtensilsList)
    })

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

// LISTENING TABS CHECKBOXES
////////////////////////////////////////////////////////////////////////////////////////////////////////

// Les trois fonctions suivantes sont appellées avec tabListeners. si le menu x n'a pas l'input coché,
// alors on invoquera closemenu pour le menu x . Sinon, on invoquera closeMenu pour les 2 autres menus.
// On invoque également toggleWidthMenu pour l'input x et son menu, et translateMenus avec comme arguments
// les deux mêmes que toggleWidthMenu + les sidemenus.

export function ingredientsListener() {

    if (ingredientsInput.checked && screen.desktopLMQuery.matches) {
        closeMenu(devicesInput, devicesMenu, devicesNav)
        closeMenu(utensilsInput, utensilsMenu, utensilsNav)
        displayNav(ingredientsNav)
        toggleWidthMenu(ingredientsInput, ingredientsMenu)

        rotateArrow(ingredientsArrow)


    }

    if (ingredientsInput.checked) {
        closeMenu(devicesInput, devicesMenu, devicesNav)
        closeMenu(utensilsInput, utensilsMenu, utensilsNav)
        displayNav(ingredientsNav)


        rotateArrow(ingredientsArrow)


    }

    if (!ingredientsInput.checked) {
        closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
        resetArrow(ingredientsArrow)

    }

    translateMenus(ingredientsInput, ingredientsMenu, devicesMenu, utensilsMenu)

}

export function devicesListener() {

    if (devicesInput.checked && screen.desktopLMQuery.matches) {
        closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
        closeMenu(utensilsInput, utensilsMenu, utensilsNav)
        displayNav(devicesNav)
        toggleWidthMenu(devicesInput, devicesMenu)

        rotateArrow(devicesArrow)


    }

    if (devicesInput.checked) {
        closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
        closeMenu(utensilsInput, utensilsMenu, utensilsNav)
        displayNav(devicesNav)

        rotateArrow(devicesArrow)

    }

    if (!devicesInput.checked) {
        closeMenu(devicesInput, devicesMenu, devicesNav)
        resetArrow(devicesArrow)

    }

    translateMenus(devicesInput, devicesMenu, ingredientsMenu, utensilsMenu)

}

export function utensilsListener() {

    if (utensilsInput.checked && screen.desktopLMQuery.matches) {
        closeMenu(devicesInput, devicesMenu, devicesNav)
        closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
        displayNav(utensilsNav)
        toggleWidthMenu(utensilsInput, utensilsMenu)

        rotateArrow(utensilsArrow)
    }

    if (utensilsInput.checked) {
        closeMenu(devicesInput, devicesMenu, devicesNav)
        closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
        displayNav(utensilsNav)


        rotateArrow(utensilsArrow)
    }

    if (!utensilsInput.checked) {
        closeMenu(utensilsInput, utensilsMenu, utensilsNav)
        resetArrow(utensilsArrow)

    }

    translateMenus(utensilsInput, utensilsMenu, devicesMenu, ingredientsMenu)

}

////////////////////////////////////////////////////////////////////////////////////////////////////


// SWITCHING FROM TAB NAMES TO MINI SEARCHBARS
////////////////////////////////////////////////////////////////////////////////////////////////////

export function controlIngMiniSB() {

    if (ingredientsSearchBar.style.display === "none") {
        ingredientsSearchBar.style.display = "block"
        ingredientsSearchButton.style.display = "none"
        ingredientsInput.checked = true

    }

    if (ingredientsInput.checked) {
        closeMenu(devicesInput, devicesMenu, devicesNav)
        closeMenu(utensilsInput, utensilsMenu, utensilsNav)
        displayNav(ingredientsNav)
        toggleWidthMenu(ingredientsInput, ingredientsMenu)

        rotateArrow(ingredientsArrow)

    }


    if (!ingredientsInput.checked) {
        closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
        resetArrow(ingredientsArrow)

    }

    translateMenus(ingredientsInput, ingredientsMenu, devicesMenu, utensilsMenu)
}

export function controlDevMiniSB() {
    if (devicesSearchBar.style.display === "none") {
        devicesSearchBar.style.display = "block"
        devicesSearchButton.style.display = "none"
        devicesInput.checked = "true"

    }

    if (devicesInput.checked) {
        closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
        closeMenu(utensilsInput, utensilsMenu, utensilsNav)
        displayNav(devicesNav)
        toggleWidthMenu(devicesInput, devicesMenu)

        rotateArrow(devicesArrow)


    }

    if (!devicesInput.checked) {
        closeMenu(devicesInput, devicesMenu, devicesNav)
        resetArrow(devicesArrow)

    }

    translateMenus(devicesInput, devicesMenu, ingredientsMenu, utensilsMenu)



}

export function controlUteMiniSB() {
    if (utensilsSearchBar.style.display === "none") {
        utensilsSearchBar.style.display = "block"
        utensilsSearchButton.style.display = "none"
        utensilsInput.checked = "true"

    }

    if (utensilsInput.checked) {
        closeMenu(devicesInput, devicesMenu, devicesNav)
        closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
        displayNav(utensilsNav)
        toggleWidthMenu(utensilsInput, utensilsMenu)

        rotateArrow(utensilsArrow)


    }

    if (!utensilsInput.checked) {
        closeMenu(utensilsInput, utensilsMenu, utensilsNav)
        resetArrow(utensilsArrow)

    }

    translateMenus(utensilsInput, utensilsMenu, devicesMenu, ingredientsMenu)

}

//////////////////////////////////////////////////////////////////////////////////////////////////////

// MINI SEARCHBARS ALGORITHMS
/////////////////////////////////////////////////////////////////////////////////////////////////////

export function ingTabSearch() {

    const ingTabSearchInput = document.querySelector(".ingredients-searchbar")

    ingTabSearchInput.addEventListener("input", () => {

        function inputFilter(ingArray, textValue) {


            // Ce filtre agit de la façon suivante : en paramètre 1 je vais avoir mon tableau d'ingrédients,
            // en paramètre 2, je vais avoir ma valeur d'input.
            // Cela me retourne l'objet x (les mots clés qui vont apparaître), contenant des valeurs de
            // 3 lettres similaires à ce qui est rentré dans l'input.

            return ingArray.filter((ing) => {


                return ing.toLowerCase().includes(textValue.toLowerCase())

            })



        }

        let searchValue = ingTabSearchInput.value

        let selectedIngredients2 = inputFilter(selectedIngredientsArray, searchValue)

        if (ingTabSearchInput.value.length >= 3) {
            changeItemsList(ingredientsList)
            displayIngredientsList(selectedIngredients2)
        }
        else {
            changeItemsList(ingredientsList)
            displayIngredientsList(selectedIngredientsArray)
        }
    })
}

export function devTabSearch() {

    const devTabSearchInput = document.querySelector(".devices-searchbar")

    devTabSearchInput.addEventListener("input", () => {
        function inputFilter(devArray, textValue) {


            return devArray.filter((recipeObj) => {


                return recipeObj.toLowerCase().includes(textValue.toLowerCase())

            })

        }

        let searchValue = devTabSearchInput.value
        let selectedDevices2 = inputFilter(selectedDevicesArray, searchValue)

        if (devTabSearchInput.value.length >= 3) {
            changeItemsList(devicesList)
            displayDevicesList(selectedDevices2)
        } else {
            changeItemsList(devicesList)
            displayDevicesList(selectedDevicesArray)
        }
    })
}

export function uteTabSearch() {

    const uteTabSearchInput = document.querySelector(".utensils-searchbar")

    uteTabSearchInput.addEventListener("input", () => {
        function inputFilter(uteArray, textValue) {


            return uteArray.filter((recipeObj) => {


                return recipeObj.toLowerCase().includes(textValue.toLowerCase())

            })

        }

        let searchValue = uteTabSearchInput.value
        let selectedUtensils2 = inputFilter(selectedUtensilsArray, searchValue)

        if (uteTabSearchInput.value.length >= 3) {
            changeItemsList(utensilsList)
            displayUtensilsList(selectedUtensils2)
        } else {
            changeItemsList(utensilsList)
            displayUtensilsList(selectedUtensilsArray)
        }
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////


// CHANGING LISTS OF ITEMS
///////////////////////////////////////////////////////////////////////////////////////////////////

export function changeItemsList(itemsList) {
    itemsList.innerHTML = ""
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// CREATING TAGS
/////////////////////////////////////////////////////////////////////////////////////////////////////

export function createIngTag(label, dataProperty, id) {
    const div = document.createElement("div")
    div.setAttribute("class", "tag")
    div.classList.add("ing-tag")
    div.setAttribute("data-property", dataProperty)
    div.setAttribute("id", id)
    const span = document.createElement("span")
    span.setAttribute("class", "tag-span")
    span.innerHTML = label
    const closeBtn = document.createElement("i")
    closeBtn.classList.add("far")
    closeBtn.classList.add("fa-times-circle")
    closeBtn.classList.add("close-button")
    closeBtn.setAttribute("data-item", label)
    closeBtn.addEventListener("click", closeTag)

    function closeTag(e) {

        const value = e.target.getAttribute("data-item")
        const index = tagsArray.findIndex((div) => div.getAttribute("data-property").toLowerCase() === value.toLowerCase());

        if (index === -1) {
            return alert("NOT FOUND")
        }
        tagsArray.splice(index, 1)

        // let recipesFilteredByTag = [...selectedRecipesArray]

        tagsArray.forEach((tag) => {

            selectedRecipesArray = filterByTags(selectedRecipesArray, tag);

        });
        closeBtn.parentElement.remove()
        changeRecipesSection()
        displayRecipes(selectedRecipesArray)

        saveSelectedIngredients(selectedRecipesArray, selectedIngredients, selectedIngredientsArray)
        changeItemsList(ingredientsList)
        displayIngredientsList(selectedIngredientsArray)
        saveSelectedDevices(selectedRecipesArray, selectedDevices, selectedDevicesArray)
        changeItemsList(devicesList)
        displayDevicesList(selectedDevicesArray)
        saveSelectedUtensils(selectedRecipesArray, selectedUtensils, selectedUtensilsArray)
        changeItemsList(utensilsList)
        displayUtensilsList(selectedUtensilsArray)
    }

    tagsSpace.appendChild(div)
    div.appendChild(span)
    div.appendChild(closeBtn)
    tagsArray.push(div)

    return div
}


export function createDevTag(label, dataProperty, id) {
    const div = document.createElement("div")
    div.setAttribute("class", "tag")
    div.classList.add("dev-tag")
    div.setAttribute("data-property", dataProperty)
    div.setAttribute("id", id)
    const span = document.createElement("span")
    span.setAttribute("class", "tag-span")
    span.innerHTML = label
    const closeBtn = document.createElement("i")
    closeBtn.classList.add("far")
    closeBtn.classList.add("fa-times-circle")
    closeBtn.classList.add("close-button")
    closeBtn.setAttribute("data-item", label)
    closeBtn.addEventListener("click", closeTag)

    function closeTag(e) {

        const value = e.target.getAttribute("data-item")
        const index = tagsArray.findIndex((div) => div.getAttribute("data-property").toLowerCase() === value.toLowerCase());
        if (index === -1) {
            return alert("PAS TROUVE")
        }
        tagsArray.splice(index, 1)
        selectedRecipesArray = [...recipes]
        tagsArray.forEach((tag) => {

            selectedRecipesArray = filterByTags(selectedRecipesArray, tag);
        });
        closeBtn.parentElement.remove()
        changeRecipesSection()

        displayRecipes(selectedRecipesArray)

        saveSelectedIngredients(selectedRecipesArray, selectedIngredients, selectedIngredientsArray)
        changeItemsList(ingredientsList)
        displayIngredientsList(selectedIngredientsArray)
        saveSelectedDevices(selectedRecipesArray, selectedDevices, selectedDevicesArray)
        changeItemsList(devicesList)
        displayDevicesList(selectedDevicesArray)
        saveSelectedUtensils(selectedRecipesArray, selectedUtensils, selectedUtensilsArray)
        changeItemsList(utensilsList)
        displayUtensilsList(selectedUtensilsArray)
    }

    tagsSpace.appendChild(div)
    div.appendChild(span)
    div.appendChild(closeBtn)
    tagsArray.push(div)

    return div
}

export function createUteTag(label, dataProperty, id) {
    const div = document.createElement("div")
    div.setAttribute("class", "tag")
    div.classList.add("ute-tag")
    div.setAttribute("data-property", dataProperty)
    div.setAttribute("id", id)
    const span = document.createElement("span")
    span.setAttribute("class", "tag-span")
    span.innerHTML = label
    const closeBtn = document.createElement("i")
    closeBtn.classList.add("far")
    closeBtn.classList.add("fa-times-circle")
    closeBtn.classList.add("close-button")
    closeBtn.setAttribute("data-item", label)
    closeBtn.addEventListener("click", closeTag)

    function closeTag(e) {

        const value = e.target.getAttribute("data-item")
        const index = tagsArray.findIndex((div) => div.getAttribute("data-property").toLowerCase() === value.toLowerCase());
        if (index === -1) {
            return alert("PAS TROUVE")
        }
        tagsArray.splice(index, 1)

        selectedRecipesArray = [...recipes]
        tagsArray.forEach((tag) => {

            selectedRecipesArray = filterByTags(selectedRecipesArray, tag);

        });
        closeBtn.parentElement.remove()
        changeRecipesSection()

        displayRecipes(selectedRecipesArray)

        saveSelectedIngredients(selectedRecipesArray, selectedIngredients, selectedIngredientsArray)
        changeItemsList(ingredientsList)
        displayIngredientsList(selectedIngredientsArray)
        saveSelectedDevices(selectedRecipesArray, selectedDevices, selectedDevicesArray)
        changeItemsList(devicesList)
        displayDevicesList(selectedDevicesArray)
        saveSelectedUtensils(selectedRecipesArray, selectedUtensils, selectedUtensilsArray)
        changeItemsList(utensilsList)
        displayUtensilsList(selectedUtensilsArray)
    }

    tagsSpace.appendChild(div)
    div.appendChild(span)
    div.appendChild(closeBtn)
    tagsArray.push(div)

    return div
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

