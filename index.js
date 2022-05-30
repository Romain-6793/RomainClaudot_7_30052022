
const closeMenu = (a) => {
    const input = a
    input.checked = false;


    const clickableScreen = document.getElementById("clickable-screen")
    clickableScreen.remove()
}


const displayMenu = (a, b, c) => {
    a.checked = true
    b.checked = false
    c.checked = false
    const input = a
    let inputActive = a.checked
    if (inputActive) {
        const clickableScreen = document.createElement("div")
        clickableScreen.id = "clickable-screen"
        clickableScreen.className = "clickable-screen"
        clickableScreen.addEventListener("click", () => closeMenu(input))
        document.body.appendChild(clickableScreen)
    }
    else {
        const clickableScreen = document.getElementById("clickable-screen")
        clickableScreen.remove()
    }
}



const ingredientsInput = document.getElementById("ingredients-check")
ingredientsInput.addEventListener("click", () => displayMenu(ingredientsInput, devicesInput, utensilsInput))
const devicesInput = document.getElementById("devices-check")
devicesInput.addEventListener("click", () => displayMenu(devicesInput, utensilsInput, ingredientsInput))
const utensilsInput = document.getElementById("utensils-check")
utensilsInput.addEventListener("click", () => displayMenu(utensilsInput, ingredientsInput, devicesInput))



