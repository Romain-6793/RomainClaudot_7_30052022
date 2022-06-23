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

export function ingredientsListFactory(ingredientsArray) {

    function getUserIngredientsList() {
        const a = document.createElement("a")
        a.setAttribute("class", "menu-link")
        const span = document.createElement("a")
        span.setAttribute("class", "menu-name")

        for (let i = 0; i < ingredientsArray.length; i++) {
            span.textContent = `${ingredientsArray} `
        }

        a.appendChild(span)
        return (a)
    }
    return { getUserIngredientsList }
}

export function devicesListFactory(devicesArray) {

    function getUserDevicesList() {
        const a = document.createElement("a")
        a.setAttribute("class", "menu-link")
        const span = document.createElement("a")
        span.setAttribute("class", "menu-name")
        for (let i = 0; i < devicesArray.length; i++) {
            span.textContent = devicesArray
        }

        a.appendChild(span)
        return (a)
    }

    return { getUserDevicesList }
}

export function utensilsListFactory(utensilsArray) {

    function getUserUtensilsList() {
        const a = document.createElement("a")
        a.setAttribute("class", "menu-link")
        const span = document.createElement("a")
        span.setAttribute("class", "menu-name")

        for (let i = 0; i < utensilsArray.length; i++) {
            span.textContent = utensilsArray
        }

        a.appendChild(span)
        return (a)
    }


    return { getUserUtensilsList }
}