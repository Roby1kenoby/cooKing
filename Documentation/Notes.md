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
1) Css
2) modifica
3) ricerca


Decidere i colori principali (bg, text, accent, secondario)
creare classi in app.css da applicare agli elementi (tutti bottoni)

pagina profilo: 
ricerca tag e ingredienti in un box, barra ricerca sotto nel box ricette
(per semplicità rimuovere box tag più usati)
background color magari solo negli input della ricetta
rimuovere bottoni per ricerca tag\ingredienti e sostituire con barre di ricerca vere e proprie, dare
stile conforme a quello dei bottoni per far capire che sono elementi interattivi
In profilo, affiancare ricerca per tag e ingredienti 
box per i tag in newRecipe va affiancato a input più piccoli
box per gli ingredienti in new Recipe
Ridurre la larghezza delle sezioni su schermi grandi

esempio variabili css

:root {
    --nomevariabile: #colore
}

per richiamare:
.primary-bg {
    background-color: var(--nomevariabile)
    color: var(--altravar)
}

ragionare sugli elementi a cui vuoi applicare classi specifiche che siano coerenti in tutto il sito (titoli, bottoni, form, ecc...)

Sticky side
 https://dev.to/clairecodes/how-to-make-a-sticky-sidebar-with-two-lines-of-css-2ki7
 