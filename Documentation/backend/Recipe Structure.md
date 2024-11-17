### New recipe structure

{
    "userId": "idUtente",
    "tagsIds": ["idTag1", "idTag2"],
    "title": "Ricetta Test 2",
    "description": "Descrizione Ricetta Test 2",
    "portions": "8",
    "preparationTime": "20",
    "recipeImageUrl": "https://picsum.photos/200/300",
    "recipeVideoUrl": "",
    "privateRecipe": false,
    "phases": [
        {
            "phaseIngredients": [
                {
                    "ingredientId": "66eb43ae558e722c226da775",
                    "measurementUnit": "g",
                    "phaseId": null,
                    "quantity": "100",
                    "additionalInfos": "fave di stocazzo"
                },
                {
                    "ingredientId": "66eb43ae558e722c226da77c",
                    "measurementUnit": "g",
                    "phaseId": null,
                    "quantity": "50",
                    "additionalInfos": "non so cosa sia"
                }
            ],
            "phaseNumber": "1",
            "description": "fase 1",
            "phaseImageUrl": "https://picsum.photos/200/300"
        },
        {
            "phaseIngredients": [
                {
                    "ingredientId": "66eb43ae558e722c226da784",
                    "measurementUnit": "g",
                    "phaseId": null,
                    "quantity": "30",
                    "additionalInfos": "bianchissimo"
                },
                {
                    "ingredientId": "66eb43ae558e722c226da78c",
                    "measurementUnit": "g",
                    "phaseId": null,
                    "quantity": "20",
                    "additionalInfos": "sniff"
                }
            ],
            "phaseNumber": "2",
            "description": "fase 2",
            "phaseImageUrl": "https://picsum.photos/200/300"
        }
    ],
    "recipeIngredients": [
        {
            "ingredientId": "66eb43ae558e722c226da767",
            "measurementUnit": "g",
            "phaseId": null,
            "quantity": "10",
            "additionalInfos": "battuta al coltello"
        },
        {
            "ingredientId": "66eb43ae558e722c226da772",
            "measurementUnit": "g",
            "phaseId": null,
            "quantity": "10",
            "additionalInfos": "puliti bene"
        }
    ]
}

- valutare come gestire i recipe Ingredients (lasciare l'elemento nel db o ricavarlo in fase di rendering?)