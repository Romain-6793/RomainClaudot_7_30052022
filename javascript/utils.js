
import {
    recipesSection, ingredientsInput, devicesInput, utensilsInput, ingredientsSearchBar,
    devicesSearchBar, utensilsSearchBar, ingredientsSearchButton, devicesSearchButton,
    utensilsSearchButton, ingredientsArrow, devicesArrow, utensilsArrow,
} from "./index.js";
import {
    ingredientsListener, utensilsListener,
    devicesListener, ingTabSearch, devTabSearch, uteTabSearch, controlIngMiniSB, controlDevMiniSB,
    controlUteMiniSB
} from "./search.js";
import { recipesFactory } from "./factories.js";


// MEDIA QUERIES IN JAVASCRIPT
////////////////////////////////////////////////////////////////////////////////////////////

export const screen = {

    mobileMMQuery: window.matchMedia("(max-width: 424px)"),
    mobileLMQuery: window.matchMedia("(min-width: 425px)"),
    tabletMQuery: window.matchMedia("(min-width: 768px)"),
    desktopMQuery: window.matchMedia("(min-width: 1024px)"),
    desktopLMQuery: window.matchMedia("(min-width: 1270px)"),

};


export function screenListener() {
    // La boucle for ci-dessus ainsi que la fonction mqHandler permettent d'écouter le changement de dimensions 
    // de l'écran, et d'associer ainsi la propriété de screen à la taille de l'écran.

    // eslint-disable-next-line no-unused-vars
    for (let [scr, mq] of Object.entries(screen)) {
        if (mq) mq.addEventListener('change', mqHandler);
    }

}

function mqHandler() {

    let size = null;
    for (let [scr, mq] of Object.entries(screen)) {
        // eslint-disable-next-line no-unused-vars
        if (!mq || mq.matches) size = scr;
    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// SAVING SELECTED ITEMS
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ci-dessous, on enregistre les ingrédients sélectionnés par le filtre car l'on passera 
// selectedRecipesArray en argument. 
// On commence par une boucle for qui explore toutes les recettes, on fait une 2ème boucle pour 
// examiner tous les ingredients un par un puis on les push dans un tableau que l'on met 
// ensuite en new Set pour éviter les doublons.
// Le procédé en 2 boucles est quasiment le même pour enregistrer les ustensiles. 
// Pour les appareils, c'est la même idée mais avec une boucle.


export function saveSelectedIngredients(slctRecipesArr, slctIng = "", slctIngArr = []) {

    // On évite de faire slctIngArr = [] pour ne pas pointer vers une autre adresse (ce qui se passe
    // avec un paramètre). à la place , la méthode splice() permet de vider le tableau sans effet  
    // de bord
    slctIngArr.splice(0, slctIngArr.length)

    // console.log(slctRecipesArr)



    for (let i = 0; i < slctRecipesArr.length; i++) {
        // console.log(slctRecipesArr)


        for (let j = 0; j < slctRecipesArr[i].ingredients.length; j++) {
            slctIng = slctRecipesArr[i].ingredients[j].ingredient
            // console.log(slctIng)
            slctIngArr.push(slctIng)
        }


        let filteredArray = [...new Set(slctIngArr)]
        slctIngArr.length = 0

        // La ligne ci-dessus permet de casser la référence de slctIngArr

        filteredArray.forEach((recipe) => slctIngArr.push(recipe))


    }
    // console.log(slctIngArr)
    return slctIngArr;

}
// saveSelectedIngredients(recipes, selectedIngredients, selectedIngredientsArray);

export function saveSelectedDevices(slctRecipesArr, slctDev = "", slctDevArr = []) {

    slctDevArr.splice(0, slctDevArr.length)

    for (let i = 0; i < slctRecipesArr.length; i++) {




        // console.log(slctRecipesArr)

        // eslint-disable-next-line no-import-assign
        slctDev = slctRecipesArr[i].appliance
        // console.log(slctDev)
        slctDevArr.push(slctDev)

        // eslint-disable-next-line no-import-assign
        // slctDevArr = [...new Set(slctDevArr)]
        // console.log(slctDevArr)

    }

    let filteredArray = [...new Set(slctDevArr)]
    slctDevArr.length = 0

    // La ligne ci-dessus permet de casser la référence de slctDevArr en passant par
    // l'intermédiaire de filteredArray

    filteredArray.forEach((recipe) => slctDevArr.push(recipe))

    // console.log(slctDevArr)
    return slctDevArr


}
// saveSelectedDevices(recipes, selectedDevices, selectedDevicesArray)

export function saveSelectedUtensils(slctRecipesArr, slctUte = "", slctUteArr = []) {
    slctUteArr.splice(0, slctUteArr.length)

    for (let i = 0; i < slctRecipesArr.length; i++) {

        for (let j = 0; j < slctRecipesArr[i].ustensils.length; j++) {

            slctUte = slctRecipesArr[i].ustensils[j]

            slctUteArr.push(slctUte)
        }

        let filteredArray = [...new Set(slctUteArr)]
        slctUteArr.length = 0

        filteredArray.forEach((recipe) => slctUteArr.push(recipe))
    }
    return slctUteArr

}
// saveSelectedUtensils(recipes, selectedUtensils, selectedUtensilsArray)
///////////////////////////////////////////////////////////////////////////////////////////////////////



// TAG SEARCH ALGORITHM 
////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param recipiesArr an array of recipes
 */
export function filterByTags(recipesArr, tag) {

    const result = recipesArr.filter((object) => object.ingredients.some((ingObj) =>
        ingObj.ingredient.toLowerCase() === tag.dataset.property.toLowerCase())
        || object.appliance.toLowerCase() === tag.dataset.property.toLowerCase()
        || object.ustensils.some((uteObj) => uteObj.toLowerCase() === tag.dataset.property.toLowerCase()
        )
    );

    return result;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////


// TAB MANAGEMENT
///////////////////////////////////////////////////////////////////////////////////////////////////

// Cette fonction closeMenu, prend en paramètres input et menu. 
// Lorsque cette fonction est appellée, l'input (checkbox) passé en argument n'est plus coché. Donc son
// dropdown n'apparaît plus. Sa position revient à 0px, et sa taille à 170px.

// (On peut y faire un console.trace pour connaître tous les endroits où elle est appellée).

export function closeMenu(input, menu, nav) {
    // console.trace(closeMenu)
    input.checked = false
    menu.style.transform = "translateX(" + 0 + "px)"
    menu.style.width = 170 + "px"
    nav.style.opacity = 0
    nav.style.zIndex = 0
    nav.style.transform = "translateY(" + -2000 + "px)"



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

export function tabSearchers() {
    ingTabSearch()
    devTabSearch()
    uteTabSearch()
}

export function miniSBListeners() {


    ingredientsSearchButton.addEventListener("click", controlIngMiniSB)

    devicesSearchButton.addEventListener("click", controlDevMiniSB)

    utensilsSearchButton.addEventListener("click", controlUteMiniSB)

}

export function rotateArrow(arrow) {
    arrow.style.transform = "rotate(180deg)"
}

export function resetArrow(arrow) {
    arrow.style.transform = "rotate(0)"
}

/////////////////////////////////////////////////////////////////////////////////////////////////


// RECIPES SECTION MANAGEMENT
/////////////////////////////////////////////////////////////////////////////////////////////////////

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



    recipes.forEach((recipe) => {
        const recipeModel = recipesFactory(recipe)
        const userRecipe = recipeModel.getUserRecipe()
        recipesSection.appendChild(userRecipe)
    });

}

//////////////////////////////////////////////////////////////////////////////////////////////////

