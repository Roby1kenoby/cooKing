Gestione delle conversioni ? 
Gestione Ids dentro recipe - no
Rotte per ricerca con insieme di tag


Categorie per ingredienti base (2 liv)


Su esposizione delle quantità lato frontend, avere una funzione che in base alla quantità fa visualizzare in k, etti o gr, stessa cosa per i liquidi, e che in base alle preferenze dell'utente usi unità di misura regionali (metrico\imperiale ecc)


Per condivisione ricerche
creare un modello che genera link: 
i campi sono il token generato per autenticare un utente non loggato
i tag id a cui punta la ricerca
l'id utente che ha generato la richiesta di condivisione

nel db devo avere una struttura così:
- stringa random
- tagIds []
- recipeIds []
- userId

Se ricetta privata, chiedere all'utente di renderla pubblica, prima di generare i link.


TODO: 
- Testare RecipeIngredients
- Testare Phases
- Testare Recipes