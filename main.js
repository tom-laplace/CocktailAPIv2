// Afficher une liste de cocktails lorsque l'utilisateur clique sur le bouton en utilisant les classes JS

const div = document.createElement("div");
div.classList.add("btnDiv");
document.body.appendChild(div);

const btn = document.createElement("button");
btn.classList.add("btn");
btn.textContent = "Cliquez ici pour voir la liste des cocktails";
div.appendChild(btn);

const api_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

class CocktailModele {
  constructor(name, image, instructions, ingredients) {
    this.name = name;
    this.image = image;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}

class CocktailController {
  constructor() {
    this.cocktail = [];
  }

  async getCocktail() {
    const response = await fetch(api_url);
    const data = await response
      .json()
      .then((data) => data.drinks)
      .then((cocktails) => {
        this.cocktail = new CocktailViewModele().filterCocktail(cocktails);
        const cocktailVue = new CocktailVue();
        cocktailVue.supprimerCocktail();

        cocktailVue.cocktail = this.cocktail;
    
        cocktailVue.cocktail.forEach((cocktail) => {
          cocktailVue.afficherCocktail(cocktail);
        });
      });
  }
}

class CocktailViewModele {
  constructor() {
    this.cocktail = [];
  }

  filterCocktail(cocktails) {
    cocktails.forEach((cocktail) => {
      const ingredients = [];
      for (let i = 1; i < 16; i++) {
        if (cocktail["strIngredient" + i]) {
          ingredients.push(
            cocktail["strIngredient" + i] + " " + cocktail["strMeasure" + i]
          );
        } else {
          break;
        }
      }
      this.cocktail.push(
        new CocktailModele(
          cocktail.strDrink,
          cocktail.strDrinkThumb,
          cocktail.strInstructions,
          ingredients
        )
      );
    });
    return this.cocktail;
  }
}

class CocktailVue {
  constructor() {
    this.cocktail = [];
  }

  afficherCocktail(cocktail) {
    const div = document.createElement("div");
    div.classList.add("cocktailDiv");
    document.body.appendChild(div);

    const h2 = document.createElement("h2");
    h2.classList.add("cocktailName");
    h2.textContent = cocktail.name;
    div.appendChild(h2);

    const img = document.createElement("img");
    img.classList.add("cocktailImg");
    img.src = cocktail.image;
    div.appendChild(img);

    const p = document.createElement("p");
    p.classList.add("cocktailInstructions");
    p.textContent = cocktail.instructions;
    div.appendChild(p);

    const ul = document.createElement("ul");
    ul.classList.add("cocktailIngredients");
    div.appendChild(ul);

    cocktail.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ul.appendChild(li);
    });
  }

  supprimerCocktail() {
    const cocktailDiv = document.querySelector(".cocktailDiv");
    if (cocktailDiv) {
      cocktailDiv.remove();
    }
  }
}

btn.addEventListener("click", () => {
  const cocktailController = new CocktailController();
  cocktailController.getCocktail();
});
