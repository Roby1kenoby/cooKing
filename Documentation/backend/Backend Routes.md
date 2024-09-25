
# User Routes

## GET

- / -> get all users
- /:id -> get specific user 
- /:id/recipes -> get specific user recipes
- /:id/ingredients -> get specific user personalized ingredients
- /:id/tags -> get specifi user personalized tags

## POST

- /createUser -> create new user

## PUT

- /:id/editUser -> edit specific user
- /:id/editAvatar -> edit specific user avatar

## DELETE

- /:id/deleteUser -> delete specific user
----------------------------------

# Recipe Routes

## GET

- / -> get all recipes
- /public -> get all public recipes
- /private -> get all private recipes of the currently logged user
- /:id -> get specific recipe

## POST

- createRecipe -> create new recipe

## PUT

- /:id/editRecipe -> edit specific recipe
- /:id/editRecipeImage -> edit specific recipe image

## DELETE

- /:id/deleteRecipe -> delete specific recipe
----------------------------------

# RecipeIngredients Routes

## POST

- /createRecipeIngredient -> create new recipe ingredient

## PUT

- /:id/editRecipeIngredient -> edit specific recipe ingredient

## DELETE

- /:id/deleteRecipeIngredient -> delete specific recipe ingredient
----------------------------------

# Ingredients Routes

## GET

- / -> get all ingredients
- /private -> get all private ingredients of the currently logged user
- /public -> get all public ingredients

## POST

- /createPrivateIngredient -> create a personal ingredient to use in the user recipes

## PUT

- /:id/editPrivateIngredient -> edit specific personal ingredient

## DELETE

- /:id/deletePrivateIngredient -> delete specific personal ingredient
----------------------------------

# Phases Routes

## POST

- /createPhase -> create new recipe phase

## PUT

- /:id/editPhase -> edit specific recipe phase

## DELETE

- /:id/deletePhase -> delete specific recipe phase
----------------------------------

# Tags Routes

## GET

- / -> get all tags
- /private -> get all private tags of the currently logged user
- /public -> get all public tags

## POST

- /createPrivateTag -> create a personal tag to use in the user recipes

## PUT

- /:id/editPrivateTag -> edit specific personal tag

## DELETE

- /:id/deletePrivateTag -> delete specific personal tag
----------------------------------

# Login Routes

## GET

- /me -> get logged user infos (from request, after authentication with jwt)
- /login-google -> route to google auth
- /callback-google -> route called by google after auth

## POST
- / -> login user with email and password