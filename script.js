const searchSection = document.getElementById('search-section')
const recipesSection = document.getElementById('recipes-section')


let search = 'pizza'

const RECIPES_API = `https://api.edamam.com/search?q=${search}&app_id=a528066f&app_key=ed096ed16c57eb7ed215b507030aae8c&from=0&to=10&time=10%2B`

//fetch(dummyData)
//  .then((response) => {
//    return response.json()
//  })
//  .then((data) => {
//
//  
//  })

const showRecipes = (data) => {

  console.log(data)
  const recipeHits = data.hits 

  recipeHits.forEach((hit) => {
    recipesSection.innerHTML += `
    <div class="recipe-card">
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
}
showRecipes(dummyData)

//document.querySelectorAll('recipe-card').addEventListener('click' )
