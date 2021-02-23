const searchSection = document.getElementById('search-section')
const recipesSection = document.getElementById('recipes-section')
const searchField = document.getElementById('search-field')
const searchButton = document.getElementById('submit-button')
const cookingTimeField = document.getElementById('cooking-time')
const cuisineDropdown = document.getElementById('cuisine-dropdown')
const cookingTimeSpan = document.getElementById('cookingTimeValue')
const recipePageHeader = document.getElementById('recipe-page-header')
const recipeIngredients = document.getElementById('ingredients')
const recipeInstructions = document.getElementById('instructions')


const showCookingValue = () => {
  cookingTimeSpan.innerHTML = `${cookingTimeField.value} min`
}

const showResults = (event) => {
    if (event) {
        event.preventDefault()
    }

    const search = searchField.value
    const cookingTime = cookingTimeField.value
    const cuisineChoice = cuisineDropdown.value

    const RECIPES_API = `https://api.edamam.com/search?q=${cuisineChoice}%20${search}&app_id=a528066f&app_key=ed096ed16c57eb7ed215b507030aae8c&from=0&to=10&time=10-${cookingTime}`

    fetch(RECIPES_API)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            showRecipes(data)
        })

}

const showRecipes = (data) => {


    const recipeHits = data.hits
    recipesSection.innerHTML = ''

    recipeHits.forEach((hit) => {
        recipesSection.innerHTML += `
    <div id="${hit.recipe.uri}"class="recipe-card">
      <div class="img-container">
        <img src="${hit.recipe.image}"/>
      </div>
      <div class="caption">
        <h3>${hit.recipe.label}</h3>
        <p>${hit.recipe.totalTime} min</p>
      </div>
    </div>
    `
    })

    document.querySelectorAll('.recipe-card').forEach(recipeCard => {
      recipeCard.addEventListener('click', () => {
        viewRecipe(recipeCard.id)
        
      })
    })
}

const viewRecipe = (recipeId) => {

  const CURRENT_RECIPE_API = `https://api.edamam.com/search?app_id=a528066f&app_key=ed096ed16c57eb7ed215b507030aae8c&r=${encodeURIComponent(recipeId)}`

  fetch(CURRENT_RECIPE_API)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
          const ingredients = data.ingredientLines
          
          console.log(ingredients)
          
        
          recipePageHeader.innerHTML = `
          <h1>${data[0].label}</h1>
          <p>Cooking time: ${cookingTimeField.value}</p>
          `
          ingredients.forEach((ingredient) => {
            recipeIngredients.innerHTML +=
            `<li>${ingredient}</li>`
          })
          
        
        
            console.log(data)
        })



}

showResults()

searchSection.addEventListener('change', showResults)
searchSection.addEventListener('submit', (event) => showResults(event))
//recipesSection.addEventListener('click')
