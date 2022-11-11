const steamApp = {};

steamApp.storeSearch = () => {

    const url = new URL('https://proxy-ugwolsldnq-uc.a.run.app/https://store.steampowered.com/api/storesearch')


    url.search = new URLSearchParams({
        term: "portal",
        l: "english",
        cc: "CA",
    })

    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            steamApp.displayGame(data.items);
        })
}

steamApp.displayGame = (gamesList) => {
    console.log(gamesList)
    gamesList.forEach((game) => {
        const newLiElement = document.createElement('li');
        newLiElement.innerHTML = `
        <img src=${game.tiny_image} alt=${game.name} />
        <h2>${game.name}</h2>
        `;

        const gamePriceEl = document.createElement('p');
        const getPrice = (gamePrice) => {
            if (gamePrice.price) {
                gamePriceEl.innerHTML = `<a href="https://store.steampowered.com/app/${game.id}">${game.price.final}</a>`;
            } else {
                gamePriceEl.innerHTML = `<a href="https://store.steampowered.com/app/${game.id}">Pricing Info Here</a>`;
            }
        }
        getPrice(game);
        const gamesUl = document.querySelector('.gamesUl');
        gamesUl.append(newLiElement);
        newLiElement.append(gamePriceEl);
        steamApp.gamingPlatforms(gamesList);
        
    });



}

steamApp.gamingPlatforms = (gamesReturned) => {
    const plats = document.createElement('p');
    const gamesUl = document.querySelector('.gamesUl')
    gamesUl.append(plats);

    gamesReturned.forEach(platformsList => {
        const platformsArray = platformsList.platforms
        if ((platformsArray.windows === true) && (platformsArray.mac === true) && (platformsArray.linux === true)) {
            plats.innerHTML = '<p>Available on all platforms</p>'
            console.log("works on EVERYTHING")
        } else {
            console.log("it does not!")
        }
    });
    
    
}










steamApp.init = () => {
    steamApp.storeSearch();
}

steamApp.init();