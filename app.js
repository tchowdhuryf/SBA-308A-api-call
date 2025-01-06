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

    const mealId = recipe.idMeal;

    recipeCard.addEventListener("click", () => {
      getRecipe(mealId);
      displayRecipeModal(recipe);
    });
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

async function getRandomRecipe() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await response.json();
    displayRecipeModal(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("recipes").innerHTML =
      "<p>Sorry, something went wrong. Please try again later.</p>";
  }
}

async function getRecipe(mealId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    displayRecipeModal(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("recipes").innerHTML =
      "<p>Sorry, something went wrong. Please try again later.</p>";
  }
}

function displayRecipeModal(meal) {
    const dialog = document.querySelector("dialog");
    const closeButton = document.getElementById("close");
    dialog.showModal();
    meal = meal[0];

    const recipe = document.querySelector(".recipe-details");
  
    let html = `<h2 class = "recipe-title">${meal.strMeal}</h2>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-instruct">
            <h3>Ingredients:</h3>
            <ul>
                ${getIngredientsList(meal)}
            </ul>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div> 
        `;

    recipe.innerHTML = html;

    closeButton.addEventListener("click", () => {
      dialog.close();
    }); 
  }

  function getIngredientsList(meal) {
    let ingredients = '';
    for (let i = 1; i <= 25; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
        }
    }
    return ingredients;
}