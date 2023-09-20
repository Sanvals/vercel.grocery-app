document.addEventListener("DOMContentLoaded", function() {
    // Catch the divs
    const title = document.querySelector("h2");
    const shopping = document.querySelector("#shopping");
    const recipes = document.querySelector("#recipes");
    const itemButton = document.querySelectorAll(".item");
    const listButton = document.querySelector("#listButton");
    const recipesButton = document.querySelector("#recipesButton");
    const emptyButton = document.querySelector("#emptyButton");
    const itemRecipes = document.querySelectorAll(".recipe");
    const imgPack = JSON.parse(document.getElementById("button_img").textContent)["pack"];
    const imgList = JSON.parse(document.getElementById("button_img").textContent)["list"];
    const imgRecipes = JSON.parse(document.getElementById("button_img").textContent)["recipes"];
    const imgCart = JSON.parse(document.getElementById("button_img").textContent)["cart"];
    const imgEmpty = JSON.parse(document.getElementById("button_img").textContent)["empty"];
    const search = document.querySelector("#search");
    const searchBar = document.querySelector("#searchBar");
    const GREEN = "#72ff72";
    const BLACK = "canvasText";
    
    // Assign the btutons the proper images
    listButton.getElementsByTagName("img")[0].src = imgList;
    recipesButton.getElementsByTagName("img")[0].src = imgRecipes;
    emptyButton.getElementsByTagName("img")[0].src = imgEmpty;

    // Hide the recipes area
    recipes.style.display = "none";

    // Elaborate the eventListeners
    itemButton.forEach(btn => {
        btn.addEventListener("click", function() {
            // Switch item from the database
            checkItem(btn);
            
            if (this.classList.contains("x")) {
                this.classList.remove("x");
            } else {
                this.classList.add("x");
            }

            // Play the animation
            
            this.style.animationName = window.innerWidth > 600 ? "hide-side" : "hide-bottom";
            this.style.animationPlayState = "running";
            this.addEventListener('animationend', () => {
                // Once it ends, hide the div
                this.style.display = "none";
                this.style.animationPlayState = "paused";
            });

            displayIngredients();
        });
    });

    // EventListeners for the recipe buttons
    itemRecipes.forEach(recipe => {
        recipe.addEventListener("click", function() {
            newForm = new FormData()
            newForm.append("id", this.id)

            fetch("/addRecipe", {
                method: 'POST',
                body: newForm,
            });
            
            // Extract and parse the ingredients on the div
            const ingredients = this.dataset.ingredients.replace(/'/g, '"');
            const ingredientsArray = JSON.parse(ingredients);
            // console.log(ingredientsArray);
            
            // Identify and translate the ingredients' id into names
            const ingredientsName = [];
            
            ingredientsArray.forEach(ing => {
                itemButton.forEach(btn => {
                    if (ing == btn.getAttribute("id")) {
                        ingredientsName.push(btn.getAttribute("name"));

                        if (!btn.classList.contains("x")) {
                            // Add the class to be visible
                            btn.classList.add("x");
                            
                            // Get the ID and mark the checkbox
                            checkItem(btn);
                        }
                    }
                });
            });

            displayIngredients();
        });
    });

    // Pivot between the two modes
    listButton.addEventListener("click", function() {
        // Display the elements
        if (search.style.display === "block") {
            // Hide the search bar
            search.style.animationName = "search-disappear";
            search.style.animationPlayState = "running";
            setTimeout(() => {
                search.style.animationPlayState = "paused";
                search.style.display = "none";
            }, 500)

            // Show the recipe button
            recipesButton.style.animationName = "button-appear";
            recipesButton.style.animationPlayState = "running";

        } else {
            // Show the search bar
            search.style.display = "block";
            search.style.animationName = "search-appear";
            search.style.animationPlayState = "running";

            // Hide the recipe button
            recipesButton.style.animationName = "button-disappear";
            recipesButton.style.animationPlayState = "running";
            setTimeout(() => {
                recipesButton.style.animationPlayState = "paused";
                recipesButton.style.display = "none";
            }, 500)
        }

        // Switch the elements
        if (this.getElementsByTagName("img")[0].src == imgList) {
            this.getElementsByTagName("img")[0].src = imgPack;
            title.textContent = "Ingredients";

            // Switch the ingredients' display
            itemButton.forEach(itm => {
                if (itm.style.display == "flex") {
                    itm.style.display = "none";
                } else {
                    itm.style.display = "flex";
                }
            });


            // And hide the empty list button
            emptyButton.style.animationName = "button-disappear";
            emptyButton.style.animationPlayState = "running";
            setTimeout(() => {
                emptyButton.style.animationPlayState = "paused";
                emptyButton.style.display = "none";
            }, 500)

        } else {
            this.getElementsByTagName("img")[0].src = imgList;
            title.textContent = "Shopping list";

            // Show the recipes button
            recipesButton.style.display = "block";

            // Switch the ingredients' display
            itemButton.forEach(itm => {
                if(itm.classList.contains("x")) {
                    itm.style.display = "flex";
                } else {
                    itm.style.display = "none";
                }
            });

            // Show the empty list button
            emptyButton.style.display = "block";
            emptyButton.style.animationName = "button-appear";
            emptyButton.style.animationPlayState = "running";
        }
    })

    // Pivot between recipes and cart mode
    recipesButton.addEventListener("click", function() {
        if (this.getElementsByTagName("img")[0].src == imgRecipes) {
            // Manage the areas
            recipes.style.display = "flex";
            shopping.style.display = "none";
    
            // Change the image
            this.getElementsByTagName("img")[0].src = imgCart;
            title.textContent = "Recipes";

            // Hide the listButton
            listButton.style.animationName = "button-disappear";
            listButton.style.animationPlayState = "running";
            setTimeout(() => {
                listButton.style.animationPlayState = "paused";
                listButton.style.display = "none";
            }, 500)

            // Hide the empty list button
            emptyButton.style.animationName = "button-disappear";
            emptyButton.style.animationPlayState = "running";
            setTimeout(() => {
                emptyButton.style.animationPlayState = "paused";
                emptyButton.style.display = "none";
            }, 500)

        } else {
            // Manage the areas
            recipes.style.display = "none";
            shopping.style.display = "flex";

            // Change the image
            this.getElementsByTagName("img")[0].src = imgRecipes;
            title.textContent = "Shopping List";

            // Show the listButton
            listButton.style.display = "block";
            listButton.style.animationName = "button-appear";
            listButton.style.animationPlayState = "running";

            // Show the empty list button
            emptyButton.style.display = "block";
            emptyButton.style.animationName = "button-appear";
            emptyButton.style.animationPlayState = "running";

            // Show all the tagged icons
            itemButton.forEach(itm => {
                if(itm.classList.contains("x")) {
                    itm.style.display = "flex";
                } else {
                    itm.style.display = "none";
                }
            });

            // Change the listButton img to list
            listButton.getElementsByTagName("img")[0].src = imgList;
        }

        displayIngredients();
    })

    // Click on one button to empty all the checked elements
    emptyButton.addEventListener("click", function() {
        // Cycle through all the itemButtons
        itemButton.forEach(itm => {
            // If they are tagged as "to buy" with an "x"
            if(itm.classList.contains("x")) {
                // Hide them and remove the "x"
                itm.style.display = "none";
                itm.classList.remove("x");

                // Call the API and uncheck the item
                checkItem(itm);
            }
        });
    })

    // Search engine
    searchBar.addEventListener("input", function () {
        const query = searchBar.value.toLowerCase();
        
        // Cycle through all the ingredients against the query
        itemButton.forEach(button => {
            const name = button.getElementsByClassName("text")[0].textContent.trim().toLowerCase();
            const show = button.classList.contains("x");
            button.style.display = name.includes(query) && !show ? "flex" : "none";
        })
    });

    displayIngredients();

    // Functions
    function displayIngredients() {
        // On each of the recipe elements
        itemRecipes.forEach(recipe => {
            // First empty the list
            const ingredientsArea = recipe.getElementsByClassName("ingredients-area")[0];
            ingredientsArea.innerHTML = "";
    
            // Extract and parse the ingredients
            const ingredients = recipe.dataset.ingredients.replace(/'/g, '"');
            const ingredientsIDArray = JSON.parse(ingredients);
    
            // Identify and translate the ingredients' id into names
            let ingredientsNAMEArray = [];
            ingredientsIDArray.forEach(ing => {
                itemButton.forEach(btn => {
                    if (ing == btn.getAttribute("id")) {
                        ingredientsNAMEArray.push(btn.getAttribute("name"));
                    }
                });
            })
            
            // Add the ingredients to ingredients-area as divs
            ingredientsNAMEArray.forEach(ing => {
                const ingDiv = document.createElement("div");
                ingDiv.textContent = ing;
                // Color in green if this item exists on the list
                itemButton.forEach(btn => {
                    // First find the appropiate ingredient
                    if (ing === btn.getAttribute("name")){
                        // Then check if it has "x" on the classlist
                        if (btn.classList.contains("x")){
                            ingDiv.style.color = GREEN;
                        }
                    }
                })
                // Append the ingredient to the recipe
                ingredientsArea.appendChild(ingDiv);
            })
    
            // Count how many ingredients this recipe has tagged
            const total = ingredientsNAMEArray.length;
            let counter = 0;
    
            // Count the number of green ingredients in this recipe
            const ingredientsCounter = recipe.querySelector(".ingredients-area");
            ingredientsCounter.childNodes.forEach(ing => {
                if (ing.style.color == GREEN) {
                    counter += 1;
                }
            })
    
            // Grab the title of this recipe and modify it
            const title = recipe.querySelector(".text");
            title.style.color = total === counter ? GREEN : BLACK;
        })
    }

    function checkItem(btn){
        // Create the form for the data
        newForm = new FormData()
        newForm.append("id", btn.id)

        // Make an API call to revet the check
        fetch("/checkItem", {
            method: 'POST',
            body: newForm,
        });
    }
});
