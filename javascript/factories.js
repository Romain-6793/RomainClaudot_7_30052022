

import {
    ingredientsInput, ingredientsMenu, ingredientsNav, devicesInput, devicesMenu, devicesNav,
    utensilsInput, utensilsMenu, utensilsNav
} from "./index.js"
import {
    createIngTag, createDevTag, createUteTag, tagsArray, filterByTags, selectedRecipesArray,
    transferSelectedRecipesArray, changeRecipesSection, displayRecipes, closeMenu, translateMenus
} from "./search.js"
// import { recipes } from "./recipes.js"



export function recipesFactory(data) {

    const { name, time, ingredients, description } = data

    // Faire un push de l'ingrédient trouvé

    function getUserRecipe() {
        const article = document.createElement("article")
        article.setAttribute("class", "recipe-article")
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

            // if (ingredients[j].unit === undefined) {
            //     ingredients[j].unit = ""
            // }

            // if (ingredients[j].quantity === undefined) {
            //     ingredients[j].quantity = ""
            // }

            let row = `<li>${ingredients[i].ingredient} ${ingredients[i].quantity || ""} ${ingredients[i].unit || ""}</li>`

            ingredientsString += row

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
            span.textContent = ingArray
        }

        div.addEventListener("click", () => {
            if (!document.getElementById(span.textContent)) {
                createIngTag(span.textContent, span.textContent, span.textContent)
                tagsArray.forEach((tag) => {
                    selectedRecipesArray.prop = filterByTags(selectedRecipesArray, tag);
                    transferSelectedRecipesArray(selectedRecipesArray.prop)
                });

                closeMenu(ingredientsInput, ingredientsMenu, ingredientsNav)
                translateMenus(ingredientsInput, ingredientsMenu, devicesMenu, utensilsMenu)
                changeRecipesSection()
                console.log(selectedRecipesArray)
                displayRecipes(selectedRecipesArray)
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
                    // selectedRecipesArray.prop = [...recipes]
                    selectedRecipesArray.prop = filterByTags(selectedRecipesArray, tag);
                    transferSelectedRecipesArray(selectedRecipesArray.prop)
                });

                closeMenu(devicesInput, devicesMenu, devicesNav)
                translateMenus(devicesInput, devicesMenu, ingredientsMenu, utensilsMenu)
                changeRecipesSection()
                console.log(selectedRecipesArray)
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
                    // selectedRecipesArray.prop = [...recipes]
                    selectedRecipesArray.prop = filterByTags(selectedRecipesArray, tag);
                    transferSelectedRecipesArray(selectedRecipesArray.prop)
                });

                closeMenu(utensilsInput, utensilsMenu, utensilsNav)
                translateMenus(utensilsInput, utensilsMenu, devicesMenu, ingredientsMenu)
                changeRecipesSection()
                console.log(selectedRecipesArray)
                displayRecipes(selectedRecipesArray)
            }
        })

        div.appendChild(span)
        return (div)
    }


    return { getUserUtensilsList }
}