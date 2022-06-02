export function recipesFactory(data) {
    const { name, time, ingredients, description } = data

    // let ingredientsName = ""

    // function namingIngredients() {
    //     for (let i = 0; i < ingredients.length; i++) {
    //        
    //         ingredientsList = ingredients[i].textContent
    //     }
    // }

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
        timeIcon.setAttribute("class", "fa-regular fa-clock")
        timeIcon.classList.add("time-icon")
        const timeSpan = document.createElement("span")
        timeSpan.setAttribute("class", "time-span")
        const ingredientsList = document.createElement("p")
        ingredientsList.setAttribute("class", "ingredients-list")
        const recipeDescription = document.createElement("p")
        recipeDescription.setAttribute("class", "recipe-description")
        recipeName.textContent = name
        timeSpan.textContent = `${time} min`
        ingredientsList.textContent = ingredients
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

// function ingredientsFactory(data) {
//     const {ingredients} = data

//     function getUserIngredients() {

//     const article = document.createElement("article")
//     article.setAttribute("class", "ingredients-test-article")
//     const p = document.createElement("p")


//     return (article)
// }
// }