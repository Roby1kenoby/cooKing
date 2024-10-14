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


Prosismi step
1) Inserimento Ricetta
    a. Finire box inserimento ingredienti globali (con altro componente, per riusarlo negli ingredienti della singola fase)
2) Modifica Ricetta

Usare direttamente newRecipe per il rendering.
Quando viene aggiunto un igrediente dal searchBox, inserirlo direttamente nella newRecipe, o nella 
fase della newRecipe.
I renderBox poi renderizzano un box per elemento inserito in newRecipe e fine.
Per le fasi, quando click su pulsante, salvare direttamente la fase nel newRecipe con uuid temp,
così anche per quelle renderizzo solo quello e basta.

PROBLEMI: 
 
- devo fare loading per ogni cosa che ha una fetch??? (ricorda il ?.nomeParametro)
- Per modifica dei dati, fare componenti specifici per edit e specifici per visualizzazione, e attivarli in base alle esigenze. 



 Sticky side
 https://dev.to/clairecodes/how-to-make-a-sticky-sidebar-with-two-lines-of-css-2ki7
 