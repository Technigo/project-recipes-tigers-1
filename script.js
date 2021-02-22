const searchSection = document.getElementById('search-section')
const recipesSection = document.getElementById('recipes-section')
const searchField = document.getElementById('search-field')
const searchButton = document.getElementById('submit-button')
const cookingTimeField = document.getElementById('cooking-time')

const showResults = (event) => {
  if (event) {
    event.preventDefault()
  } 
  console.log(event)
  const search = searchField.value
  const cookingTime = cookingTimeField.value
  console.log(search, cookingTime)
  const RECIPES_API = `https://api.edamam.com/search?q=${search}&app_id=a528066f&app_key=ed096ed16c57eb7ed215b507030aae8c&from=0&to=10&time=${cookingTime}`

  fetch(RECIPES_API)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      showRecipes(data)
    })
    
}

showResults()

const showRecipes = (data) => {

  const recipeHits = data.hits 

  recipeHits.forEach((hit) => {
    recipesSection.innerHTML += `
    <div class="recipe-card">
      <img src="${hit.recipe.image}"/>
      <h3>${hit.recipe.label}</h3>
      <p>${hit.recipe.totalTime} min</p>
    `
  })
}


console.log(searchButton)
searchSection.addEventListener('submit',(event) => showResults(event))
//document.querySelectorAll('recipe-card').addEventListener('click' )
