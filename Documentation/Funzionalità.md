Creazione Utenti (anche con oauth google, Facebook ecc)
Profilo utente con dati di base + immagine profilo, condivisibile
Ricette dell'utente (visibili in modalità taccuino e poi ricetta) ricercabili per tag sul profilo (quelle pubbliche)

Ricette
Raggruppamento Ricette (Taccuini)
Tag Multipli Ricette (Forse ridondante con il taccuino)
Testata Ricetta (Nome ricetta, autore, data creazione, mini descrizione (max char 100))
Elenco ingredienti necessari (tipo, qta, um, extra info possibilità di convertire da burro a olio, da grammi a ounce\spoons ecc) - db di ingredienti
Elenco fasi preparazione (eventualmente con foto, descrizione, gli ingredienti usati in quella fase di quelli totali, link esterni)

- Possibilità di condividere la singola ricetta o il risultato di un filtro di tag o il profilo (accessi specifici determinati dall'utente?
- se ricetta pubblica, generare stringa da 16 caratteri che viene embeddata nel link di condivisione, il backend verifica che ci sia).
- [Possibilità di esportare le ricette in formato stampabile?]
- Possibilità di partire da ingredienti presenti in frigo e il tipo di ricetta e tirare fuori le ricette compatibili
- Lista della spesa su ricette selezionate

- We'll have potentially a table conversion, given the starting quantity, measure unit and resulting unit
- We'll have a fixed set of ingredients, and the user will be able to have his set of personalized ones

- Pounds <-> Grammi <-> Cups <-> Tablespoons
- Spoons <-> Millilitri
- Farenheit Degrees <-> Celsius Degrees
