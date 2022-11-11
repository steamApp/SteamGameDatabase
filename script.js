const steamApp = {};

steamApp.storeSearch = () => {

    const url = new URL('https://proxy-ugwolsldnq-uc.a.run.app/https://store.steampowered.com/api/storesearch')


    url.search = new URLSearchParams({
        term: "star wars",
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
        newLiElement.classList.add('newLiElement');
        newLiElement.innerHTML = `
        <img src=${game.tiny_image} alt=${game.name} />
        <h2>${game.name}</h2>
        <ul class="platformsUl"></ul>
        `;

        const gamePriceEl = document.createElement('p');
        newLiElement.classList.add('gamesLi')
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
        

    });
    steamApp.gamingPlatforms(gamesList);
}


steamApp.gamingPlatforms = (gamesReturned) => {
    const windowsIcon = document.createElement('li')
    const macIcon = document.createElement('li')
    const linuxIcon = document.createElement('li')

    const platformsUl = document.querySelector('.platformsUl')
    platformsUl.append(windowsIcon, macIcon, linuxIcon)

    gamesReturned.forEach(platformsList => {
        const platformsArray = platformsList.platforms;
        const platformsUl = document.createElement('ul');
        platformsUl.classList.add('platformsUl');
        if (platformsArray.windows === true) {
            windowsIcon.innerHTML = '<i class="fa-brands fa-windows"></i>'
            
        } else {
            windowsIcon.innerHTML = ''
        }
        if (platformsArray.mac === true) {
            macIcon.innerHTML = '<i class="fa-brands fa-apple"></i>'
        } else {
            macIcon.innerHTML = ''
        }
        if (platformsArray.linux === true) {
            macIcon.innerHTML = '<i class="fa-brands fa-linux"></i>'
        } else {
            macIcon.innerHTML = ''
        }
    });
}



steamApp.init = () => {
    steamApp.storeSearch();
}

steamApp.init();