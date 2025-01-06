async function getRecipes() {
  const cuisine = document.getElementById("cuisine").value;
  if (!cuisine) {
    document.getElementById("recipes").innerHTML = "";
    return;
  }
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
    );
    const data = await response.json();
    displayRecipeList(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("recipes").innerHTML =
      "<p>Sorry, something went wrong. Please try again later.</p>";
  }
}

function displayRecipeList(recipes) {
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "";

  if (!recipes) {
    recipesContainer.innerHTML = "<p>No recipes found for this cuisine.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = recipe.strMeal;

    const recipeTitle = document.createElement("h3");
    recipeTitle.textContent = recipe.strMeal;

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeTitle);

    recipesContainer.appendChild(recipeCard);
    });
}

async function searchRecipes() {
  const search = document.getElementById("search").value;
  if (!search) {
    document.getElementById("recipes").innerHTML = "";
    return;
  }
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await response.json();
    displayRecipeList(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("recipes").innerHTML =
      "<p>Sorry, something went wrong. Please try again later.</p>";
  }
}