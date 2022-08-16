

import {
    ingredientsInput, ingredientsMenu, ingredientsNav, devicesInput, devicesMenu, devicesNav,
    utensilsInput, utensilsMenu, utensilsNav
} from "./index.js"
import {
    createIngTag, createDevTag, createUteTag, tagsArray, filterByTags, selectedRecipesArray,
    transferSelectedRecipesArray, changeRecipesSection, displayRecipes, closeMenu, translateMenus,
    saveSelectedIngredients, changeIngList, displayIngredientsList, changeDevList, displayDevicesList,
    saveSelectedDevices, changeUteList, displayUtensilsList, saveSelectedUtensils
} from "./search.js"




export function recipesFactory(data) {

    const { name, time, ingredients, description } = data

    function getUserRecipe() {
        const article = document.createElement("article")
        article.setAttribute("class", "recipe-article")
        article.setAttribute("id", "recipe-article")
        const pictureDiv = document.createElement("div")
        pictureDiv.setAttribute("class", "picture-div")
        const recipeDiv = document.createElement("div")
        recipeDiv.setAttribute("class", "recipe-div")
        const recipeName = document.createElement("h3")
        recipeName.setAttribute("class", "recipe-name")
        const timeIcon = document.createElement("i")
        timeIcon.setAttribute("class", "far fa-clock")
        timeIcon.classList.add("time-icon")
        const timeSpan = document.createElement("span")
        timeSpan.setAttribute("class", "time-span")

        let ingredientsString = ""

        for (let i = 0; i < ingredients.length; i++) {


            let row = `<li>${ingredients[i].ingredient} ${ingredients[i].quantity || ""} ${ingredients[i].unit || ""}</li>`

            // Solution Alternative
            // if (ingredients[j].unit === undefined) {
            //     ingredients[j].unit = ""
            // }

            // if (ingredients[j].quantity === undefined) {
            //     ingredients[j].quantity = ""
            // }


            ingredientsString += row

            // La row permet d'avoir une string constituée de plusieurs éléments pris sur mon tableau d'objets.

        }




        const ingredientsList = document.createElement("p")
        ingredientsList.setAttribute("class", "ingredients-list")
        const recipeDescription = document.createElement("p")
        recipeDescription.setAttribute("class", "recipe-description")
        recipeName.textContent = name
        timeSpan.textContent = `${time} min`
        ingredientsList.innerHTML = ingredientsString
        recipeDescription.textContent = description

        article.appendChild(pictureDiv)
        article.appendChild(recipeDiv)
        recipeDiv.appendChild(recipeName)
        recipeDiv.appendChild(timeIcon)
        recipeDiv.appendChild(timeSpan)
        recipeDiv.appendChild(ingredientsList)
        recipeDiv.appendChild(recipeDescription)
        return (article)

    }

    return { name, time, ingredients, description, getUserRecipe }

}

export function ingredientsListFactory(ingArray) {

    function getUserIngredientsList() {
        const div = document.createElement("div")
        div.setAttribute("class", "menu-tag")
        const span = document.createElement("span")
        span.setAttribute("class", "menu-name")

        for (let i = 0; i < ingArray.length; i++) {
            // CORRECTIF
            span.textContent = ingArray.charAt(0).toUpperCase() + ingArray.slice(1)
        }

        div.addEventListener("click", () => {
            if (!document.getElementById(span.textContent)) {
                createIngTag(span.textContent, span.textContent, span.textContent)
                let tempSra = [...selectedRecipesArray];
                tagsArray.forEach((tag) => {
                    tempSra = filterByTags(tempSra, tag);
                }
                );

                /////////////////////////////////// CORRECTIF WIP
                closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
                translateMenus(ingredientsInput, ingredientsMenu, devicesMenu, utensilsMenu)
                changeRecipesSection()
                console.log(tempSra)
                displayRecipes(tempSra)

                // Après l'affichage des recettes, je déclare des ingrédients sélect à 0, ainsi qu'un 
                // tableau vide censé les accueillir, la fonction saveSelectedIngredients va les 
                // parcourir pour voir ceux correspondant aux recettes affichées et les mettre dans mon 
                // tableau, tableau qui va servir à l'affichage de ces ingrédients
                // dans displayIngredientsList()

                let selectedIngredients = ""
                let selectedIngredientsArray2 = []
                saveSelectedIngredients(tempSra, selectedIngredients, selectedIngredientsArray2)
                let selectedDevices = ""
                let selectedDevicesArray2 = []
                saveSelectedDevices(tempSra, selectedDevices, selectedDevicesArray2)
                let selectedUtensils = ""
                let selectedUtensilsArray2 = []
                saveSelectedUtensils(tempSra, selectedUtensils, selectedUtensilsArray2)


                console.log(selectedIngredientsArray2)
                changeIngList()
                console.log(selectedIngredientsArray2)
                displayIngredientsList(selectedIngredientsArray2)
                changeDevList()
                displayDevicesList(selectedDevicesArray2)
                changeUteList()
                displayUtensilsList(selectedUtensilsArray2)

            }
        })
        div.appendChild(span)
        return (div)
    }
    return { getUserIngredientsList }
}

export function devicesListFactory(devArray) {

    function getUserDevicesList() {
        const div = document.createElement("div")
        div.setAttribute("class", "menu-tag")
        const span = document.createElement("span")
        span.setAttribute("class", "menu-name")

        for (let i = 0; i < devArray.length; i++) {
            span.textContent = devArray
        }

        div.addEventListener("click", () => {
            if (!document.getElementById(span.textContent)) {
                createDevTag(span.textContent, span.textContent, span.textContent)
                tagsArray.forEach((tag) => {
                    selectedRecipesArray.prop = filterByTags(selectedRecipesArray, tag);
                    transferSelectedRecipesArray(selectedRecipesArray.prop)
                });

                closeMenu(devicesInput, devicesMenu, devicesNav)
                translateMenus(devicesInput, devicesMenu, ingredientsMenu, utensilsMenu)
                changeRecipesSection()
                displayRecipes(selectedRecipesArray)
            }
        })

        div.appendChild(span)
        return (div)
    }

    return { getUserDevicesList }
}

export function utensilsListFactory(uteArray) {

    function getUserUtensilsList() {
        const div = document.createElement("div")
        div.setAttribute("class", "menu-tag")
        const span = document.createElement("span")
        span.setAttribute("class", "menu-name")

        for (let i = 0; i < uteArray.length; i++) {
            span.textContent = uteArray.charAt(0).toUpperCase() + uteArray.slice(1);
        }

        div.addEventListener("click", () => {
            if (!document.getElementById(span.textContent)) {
                createUteTag(span.textContent, span.textContent, span.textContent)
                tagsArray.forEach((tag) => {
                    selectedRecipesArray.prop = filterByTags(selectedRecipesArray, tag);
                    transferSelectedRecipesArray(selectedRecipesArray.prop)
                });

                closeMenu(utensilsInput, utensilsMenu, utensilsNav)
                translateMenus(utensilsInput, utensilsMenu, devicesMenu, ingredientsMenu)
                changeRecipesSection()
                displayRecipes(selectedRecipesArray)
            }
        })

        div.appendChild(span)
        return (div)
    }


    return { getUserUtensilsList }
}