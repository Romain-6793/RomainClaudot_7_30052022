

import { ingredientsListFactory, devicesListFactory, utensilsListFactory, recipesFactory } from "./factories.js"
import { recipes } from "./recipes.js"
import {
    recipesSection, ingredientsInput, devicesInput, utensilsInput, ingredientsMenu,
    devicesMenu, utensilsMenu, ingredientsSearchBar, devicesSearchBar, utensilsSearchBar,
    ingredientsSearchButton, devicesSearchButton, utensilsSearchButton, ingredientsList,
    devicesList, utensilsList, ingredientsNav, devicesNav, utensilsNav, tagsSpace,
    ingredientsArrow, devicesArrow, utensilsArrow

} from "./index.js"


export let selectedRecipesArray = [...recipes]


// Les variables suivantes sont transformées par search()

export let selectedIngredients = ""
export let selectedIngredientsArray = []
export let selectedDevices = ""
export let selectedDevicesArray = []
export let selectedUtensils = ""
export let selectedUtensilsArray = []
export let tagsArray = []
export const searchInput = document.querySelector(".search-bar")

//////////////////////////////////////////////////////////////////
function saveSelectedIngredients(slctRecipesArr) {
    for (let i = 0; i < slctRecipesArr.length; i++) {
        console.log(slctRecipesArr)

        for (let j = 0; j < slctRecipesArr[i].ingredients.length; j++) {
            // eslint-disable-next-line no-import-assign
            selectedIngredients = slctRecipesArr[i].ingredients[j].ingredient
            console.log(selectedIngredients)
            selectedIngredientsArray.push(selectedIngredients)
        }
        // eslint-disable-next-line no-import-assign
        selectedIngredientsArray = [...new Set(selectedIngredientsArray)]
        console.log(selectedIngredientsArray)
    }


}
saveSelectedIngredients(recipes);

function saveSelectedDevices(slctRecipesArr) {
    for (let i = 0; i < slctRecipesArr.length; i++) {
        console.log(slctRecipesArr)

        // eslint-disable-next-line no-import-assign
        selectedDevices = slctRecipesArr[i].appliance
        console.log(selectedDevices)
        selectedDevicesArray.push(selectedDevices)

        // eslint-disable-next-line no-import-assign
        selectedDevicesArray = [...new Set(selectedDevicesArray)]
        console.log(selectedDevicesArray)
    }


}
saveSelectedDevices(recipes)

function saveSelectedUtensils(slctRecipesArr) {
    for (let i = 0; i < slctRecipesArr.length; i++) {

        for (let j = 0; j < slctRecipesArr[i].ustensils.length; j++) {
            // eslint-disable-next-line no-import-assign
            selectedUtensils = slctRecipesArr[i].ustensils[j]
            console.log(selectedUtensils)
            selectedUtensilsArray.push(selectedUtensils)
        }
        // eslint-disable-next-line no-import-assign
        selectedUtensilsArray = [...new Set(selectedUtensilsArray)]
        console.log(selectedUtensilsArray)
    }


}
saveSelectedUtensils(recipes)
/////////////////////////////////////////////////////////////////

const screen = {

    mobileMMQuery: window.matchMedia("(max-width: 424px)"),
    mobileLMQuery: window.matchMedia("(min-width: 425px)"),
    tabletMQuery: window.matchMedia("(min-width: 768px)"),
    desktopMQuery: window.matchMedia("(min-width: 1024px)"),
    desktopLMQuery: window.matchMedia("(min-width: 1270px)"),

};


// La boucle for ci-dessus ainsi que la fonction mqHandler permettent d'écouter le changement de dimensions 
// de l'écran, et d'associer ainsi la propriété de screen à la taille de l'écran.

// eslint-disable-next-line no-unused-vars
for (let [scr, mq] of Object.entries(screen)) {
    if (mq) mq.addEventListener('change', mqHandler);
}

function mqHandler() {

    let size = null;
    for (let [scr, mq] of Object.entries(screen)) {
        // eslint-disable-next-line no-unused-vars
        if (!mq || mq.matches) size = scr;
    }

}


// La fonction ci-dessus permet de faire passer selectedRecipesArray au fichier factories sans avoir
// de problèmes de copies.

export function transferSelectedRecipesArray(sra) {
    selectedRecipesArray = sra
}

export function search() {

    // Cette fonction (initiée à init), contrôle toutes les modalités de la barre de recherche principale,
    // son élément clé est l'eventListener qui se trouve en bas de la fonction.

    // launchResearch s'active au moment où l'input contient 3 caractères. On y déclare une searchValue, 
    // variable qui sontient la valeur d'input (3 caractères), ainsi que selectedRecipes, liste des recettes
    // passées à la moulinette de l'inputFilter.
    // Cette fonction est capitale, elle fait plusieurs choses : 1) elle passe l'input au filtre
    // 2) elle gère l'affichage des recettes avec la valeur passée au filtre 3) elle crée des tableaux 
    // avec les données x utilisées pour une recherche x, avant chaque nouvelle recherche, ces tableaux
    // se remettent à zéro.

    function launchResearch() {

        // let searchValue = searchInput.value
        // let selectedRecipes = inputFilter(recipes, searchValue)
        // console.log(selectedRecipes);

        selectedRecipesArray = []

        // Voici donc l'inputFilter qui vérifie que la valeur d'input matche avec le contenu des noms, 
        // descriptions ou ingredients de certaines recettes (les seules qui seront affichées) => 
        // selectedRecipes. Pour vérifier cela, on utilise la méthode includes() 
        // Tout y est mis en lowerCase pour ignorer les majuscules.
        // recipeObj est le paramètre de l'argument "recipes".
        // recipesFilter est le paramètre de l'argument "searchValue".

        inputFilter(recipes, searchInput.value)

        function inputFilter(recipes, searchVal) {


            // return recipes.filter((recipeObj) => {

            //     return recipeObj.name.toLowerCase().includes(recipesFilter.toLowerCase())
            //         || recipeObj.description.toLowerCase().includes(recipesFilter.toLowerCase())
            //         || recipeObj.ingredients.some((ingObj) => ingObj.ingredient.toLowerCase().includes(recipesFilter.toLowerCase()))

            //     // La méthode some() évite de faire une boucle for pour parcourir chaque ingrédient

            // })

            for (let i = 0; i < recipes.length; i++) {
                if (recipes[i].name.toLowerCase().includes(searchVal.toLowerCase()) ||
                    recipes[i].description.toLowerCase().includes(searchVal.toLowerCase()) ||
                    recipes[i].ingredients.some((ingObj) => ingObj.ingredient.toLowerCase().includes(searchVal.toLowerCase()))) {
                    selectedRecipesArray.push(recipes[i])
                }
                // let result = recipes[i].name.toLowerCase().includes(searchVal.toLowerCase())
                //     || recipes[i].description.toLowerCase().includes(searchVal.toLowerCase())
                //     || recipes[i].ingredients.some((ingObj) => ingObj.ingredient.toLowerCase().includes(searchVal.toLowerCase()))

                //     // La méthode some() évite de faire une boucle for pour parcourir chaque ingrédient

                console.log(selectedRecipesArray)
            }

        }

        // D'abord on appelle changeRecipesSection() afin de vider le contenu de la section avant un nouvel
        // affichage.

        changeRecipesSection()

        // Puis on affiche les recettes selon selectedRecipes, variable qui est elle-même le résultat 
        // de l'inputFilter.

        displayRecipes(selectedRecipesArray)

        // Ci dessous, on attribue un nouveau tableau à selectedRecipesArray (qui était vide), on le fait 
        // à l'aide des ... Cette solution a permis de tout refondre dans un seul tableau
        // au lieu de renvoyer un tableau de tableaux.

        // eslint-disable-next-line no-import-assign


        // selectedRecipesArray = [...selectedRecipes]

        // Ci-dessous, on enregistre les ingrédients sélectionnés par le filtre car l'on passera 
        // selectedRecipesArray en argument. 
        // On commence par une boucle for qui explore toutes les recettes, on fait une 2ème boucle pour 
        // examiner tous les ingredients un par un puis on les push dans un tableau que l'on met 
        // ensuite en new Set pour éviter les doublons.
        // Le procédé en 2 boucles est quasiment le même pour enregistrer les ustensiles. 
        // Pour les appareils, c'est la même idée mais avec une boucle.


        // Ici, on appelle les 3 fonctions de sauvegarde des éléments avec comme paramètre le tableau
        // selectedRecipesArray (résultat du filtre), ainsi on pourra réutiliser ces éléments sauvegardés,
        // pour l'affichage dans les onglets par exemple.

        saveSelectedIngredients(selectedRecipesArray)
        saveSelectedDevices(selectedRecipesArray)
        saveSelectedUtensils(selectedRecipesArray)

    }

    // Enfin nous avons l'eventListener duquel tout part. Si l'input est égal à 3 caractères ou plus, une 
    // nouvelle recherche est lancée. 
    // Sinon, on remet tous les tableaux utilisés à zéro.
    // Trouver pourquoi cela ne fonctionne pas.


    searchInput.addEventListener("input", () => {
        if (searchInput.value.length >= 3 || searchInput.value.length === 4) {
            launchResearch()
            changeIngList()
            displayIngredientsList(selectedIngredientsArray)
            changeDevList()
            displayDevicesList(selectedDevicesArray)
            changeUteList()
            displayUtensilsList(selectedUtensilsArray)
        } else {
            resetResearch()
        }
    })


}


export function resetResearch() {
    // eslint-disable-next-line no-import-assign
    selectedRecipesArray = [...recipes]
    // eslint-disable-next-line no-import-assign
    selectedIngredientsArray = []
    // eslint-disable-next-line no-import-assign
    selectedDevicesArray = []
    // eslint-disable-next-line no-import-assign
    selectedUtensilsArray = []

    changeRecipesSection()
    displayRecipes(recipes)
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

export function closeMenu(input, menu, nav) {
    // console.trace(closeMenu)
    input.checked = false
    menu.style.transform = "translateX(" + 0 + "px)"
    menu.style.width = 170 + "px"
    nav.style.opacity = 0
    nav.style.zIndex = 0


    if (input === ingredientsInput) {
        resetArrow(ingredientsArrow)

        ingredientsSearchButton.style.display = "block"
        ingredientsSearchBar.style.display = "none"



    }
    else if (input === devicesInput) {
        resetArrow(devicesArrow)

        devicesSearchButton.style.display = "block"
        devicesSearchBar.style.display = "none"


    }
    else if (input === utensilsInput) {
        resetArrow(utensilsArrow)

        utensilsSearchButton.style.display = "block"
        utensilsSearchBar.style.display = "none"



    }

    tabListeners()



}




// Cette fonction prend en paramètres l'input(checkbox), le menu concerné et ses sidemenus. On commence par 
// y mettre un état initial : chaque menu est à 0 px . Ensuite, on pose les conditions, si l'input est 
// coché, et on bouge les positions selon l'input qui est coché.

export function translateMenus(input, menu, sidemenu1, sidemenu2) {
    menu.style.transform = "translateX(" + 0 + "px)"
    sidemenu1.style.transform = "translateX(" + 0 + "px)"
    sidemenu2.style.transform = "translateX(" + 0 + "px)"

    if (input.checked && screen.desktopLMQuery.matches) {
        if (input === ingredientsInput) {
            menu.style.transform = "translateX(" + 0 + "px)"
            sidemenu1.style.transform = "translateX(" + 0 + "px)"
            sidemenu2.style.transform = "translateX(" + 0 + "px)"
        }
        else if (input === devicesInput && screen.desktopMQuery.matches) {
            menu.style.transform = "translateX(" + -190 + "px)"
            sidemenu1.style.transform = "translateX(" + 687 + "px)"
            sidemenu2.style.transform = "translateX(" + 0 + "%)"
        }
        else if (input === utensilsInput && screen.desktopMQuery.matches) {
            menu.style.transform = "translateX(" + -380 + "px)"
            sidemenu1.style.transform = "translateX(" + 687 + "px)"
            sidemenu2.style.transform = "translateX(" + 687 + "px)"
        }
    }
}



// Cette fonction détermine la taille que doit prendre un menu avec input coché ou non .

export function toggleWidthMenu(input, menu) {
    if (input.checked && screen.desktopLMQuery.matches) {
        menu.style.width = 667 + "px"
    } else {
        menu.style.width = 170 + "px"
    }
}



export function displayIngredientsList(ingredientsL) {

    ingredientsL.forEach((ingredient) => {
        const ingredientsListModel = ingredientsListFactory(ingredient)
        const userIngredientsList = ingredientsListModel.getUserIngredientsList()
        ingredientsList.appendChild(userIngredientsList)
    })

}

export function displayDevicesList(devicesL) {


    const devicesList = document.getElementById("devices-list")

    devicesL.forEach((device) => {
        const devicesListModel = devicesListFactory(device)
        const userDevicesList = devicesListModel.getUserDevicesList()
        devicesList.appendChild(userDevicesList)
    })

}

export function displayUtensilsList(utensilsL) {
    const utensilsList = document.getElementById("utensils-list")

    utensilsL.forEach((utensil) => {
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

    console.log(ingredientsInput.checked)


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


    console.log(devicesInput.checked)



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

    console.log(utensilsInput.checked)


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

export function displayNav(nav) {

    nav.style.opacity = 1
    nav.style.transform = "translateX(0)"
    nav.style.zIndex = 1
    nav.style.top = 63 + "px"

}




export function tabListeners() {

    ingredientsInput.addEventListener("click", ingredientsListener)
    devicesInput.addEventListener("click", devicesListener)
    utensilsInput.addEventListener("click", utensilsListener)
}




function controlIngMiniSB() {

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

function controlDevMiniSB() {
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

function controlUteMiniSB() {
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

export function rotateArrow(arrow) {
    arrow.style.transform = "rotate(180deg)"
}

export function resetArrow(arrow) {
    arrow.style.transform = "rotate(0)"
}


export function miniSBListeners() {


    ingredientsSearchButton.addEventListener("click", controlIngMiniSB)

    devicesSearchButton.addEventListener("click", controlDevMiniSB)

    utensilsSearchButton.addEventListener("click", controlUteMiniSB)

}


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
            changeIngList()
            displayIngredientsList(selectedIngredients2)
        }
        else {
            changeIngList()
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
            changeDevList()
            displayDevicesList(selectedDevices2)
        } else {
            changeDevList()
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
            changeUteList()
            displayUtensilsList(selectedUtensils2)
        } else {
            changeUteList()
            displayUtensilsList(selectedUtensilsArray)
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
        console.log(index)
        if (index === -1) {
            return alert("NOT FOUND")
        }
        tagsArray.splice(index, 1)
        console.log(tagsArray)
        selectedRecipesArray = [...recipes]
        tagsArray.forEach((tag) => {

            selectedRecipesArray = filterByTags(selectedRecipesArray, tag);
            console.log(selectedRecipesArray)

        });
        closeBtn.parentElement.remove()
        changeRecipesSection()

        displayRecipes(selectedRecipesArray)
    }

    tagsSpace.appendChild(div)
    div.appendChild(span)
    div.appendChild(closeBtn)
    tagsArray.push(div)
    console.log(tagsArray)

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
        console.log(index)
        if (index === -1) {
            return alert("PAS TROUVE")
        }
        tagsArray.splice(index, 1)
        console.log(tagsArray)
        selectedRecipesArray = [...recipes]
        tagsArray.forEach((tag) => {

            selectedRecipesArray = filterByTags(selectedRecipesArray, tag);
            console.log(selectedRecipesArray)
        });
        closeBtn.parentElement.remove()
        changeRecipesSection()

        displayRecipes(selectedRecipesArray)
    }

    tagsSpace.appendChild(div)
    div.appendChild(span)
    div.appendChild(closeBtn)
    tagsArray.push(div)
    console.log(tagsArray)

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
        console.log(index)
        if (index === -1) {
            return alert("PAS TROUVE")
        }
        tagsArray.splice(index, 1)
        console.log(tagsArray)
        selectedRecipesArray = [...recipes]
        tagsArray.forEach((tag) => {

            selectedRecipesArray = filterByTags(selectedRecipesArray, tag);
            console.log(selectedRecipesArray)
        });
        closeBtn.parentElement.remove()
        changeRecipesSection()

        displayRecipes(selectedRecipesArray)
    }

    tagsSpace.appendChild(div)
    div.appendChild(span)
    div.appendChild(closeBtn)
    tagsArray.push(div)
    console.log(tagsArray)

    return div
}

export function filterByTags(recipesArr, tag) {

    const result = recipesArr.filter((object) => object.ingredients.some((ingObj) =>
        ingObj.ingredient.toLowerCase() === tag.dataset.property.toLowerCase())
        || object.appliance.toLowerCase() === tag.dataset.property.toLowerCase()
        || object.ustensils.some((uteObj) => uteObj.toLowerCase() === tag.dataset.property.toLowerCase()
        )
    );

    return result;

}

