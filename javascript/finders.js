export function findingIngredients(recipes) {

    let tempIngredients = [];

    for (let i = 0; i < recipes.length; i++) {

        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            tempIngredients.push(recipes[i].ingredients[j].ingredient)
        }
    }

    console.log(tempIngredients)

    tempIngredients = [...new Set(tempIngredients)].sort()

    return tempIngredients;
}

export function findingDevices(recipes) {

    let tempDevices = [];

    for (let i = 0; i < recipes.length; i++) {

        tempDevices.push(recipes[i].appliance)
    }

    // console.log(tempDevices)

    tempDevices = [...new Set(tempDevices)].sort()

    return tempDevices;
}

export function findingUtensils(recipes) {

    let tempUtensils = [];

    for (let i = 0; i < recipes.length; i++) {

        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            tempUtensils.push(recipes[i].ustensils[j].toLowerCase())
        }
    }

    // console.log(tempUtensils)

    tempUtensils = [...new Set(tempUtensils)].sort((a, b) => {
        // a = a.name;
        // b = b.name;

        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        if (a === b) {
            return a - b;
        }
    })

    return tempUtensils;
}


// function findingNames(recipes) {



//     for (let i = 0; i < recipes.length; i++) {

//         namesArray.push(recipes[i].name)
//     }

//     // console.log(namesArray)

//     return namesArray;
// }

// function findingDescriptions(recipes) {



//     for (let i = 0; i < recipes.length; i++) {

//         descriptionsArray.push(recipes[i].description)
//     }

//     // console.log(descriptionsArray)

//     return descriptionsArray;
// }