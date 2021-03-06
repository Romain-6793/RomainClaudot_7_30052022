

import { createIngTag, createDevTag, createUteTag, tagsArray, filterByTags, selectedRecipesArray, changeRecipesSection, displayRecipes } from "./search.js"
import { recipes } from "./recipes.js"

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
            span.textContent = `${ingArray} `
        }

        div.addEventListener("click", () => {
            if (!document.getElementById(span.textContent)) {
                createIngTag(span.textContent, span.textContent.toLowerCase(), span.textContent)
                tagsArray.forEach((tag) => {
                    selectedRecipesArray.prop = [...recipes]
                    selectedRecipesArray.prop = filterByTags(selectedRecipesArray, tag);
                    console.log(selectedRecipesArray.prop)
                });

                changeRecipesSection()
                displayRecipes(selectedRecipesArray.prop)
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
            span.textContent = uteArray
        }
        div.addEventListener("click", () => {
            if (!document.getElementById(span.textContent)) {
                createUteTag(span.textContent, span.textContent, span.textContent)
            }
        })

        div.appendChild(span)
        return (div)
    }


    return { getUserUtensilsList }
}