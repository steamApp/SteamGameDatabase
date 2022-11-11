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
    
    gamesReturned.forEach(platformsList => {

        const platformsUl = document.querySelector('.platformsUl')
        platformsUl.classList.add('platformsUl');
        const windowsIcon = document.createElement('li')
        const macIcon = document.createElement('li')
        const linuxIcon = document.createElement('li')
        // platformsUl.append(windowsIcon, macIcon, linuxIcon)
        const platformsArray = platformsList.platforms;
        // const platformsUl = document.createElement('ul');
        
        if (platformsArray.windows === true) {            
            windowsIcon.innerHTML = '<i class="fa-brands fa-windows"></i>'
            // platformsUl.append(windowsIcon);
            platformsList.forEach((platformArray) => {
                console.log(platformArray)
            });
        } else {
            windowsIcon.innerHTML = ''
        }
        if (platformsArray.mac === true) {
            macIcon.innerHTML = '<i class="fa-brands fa-apple"></i>'
            // platformsUl.append(macIcon);

        } else {
            macIcon.innerHTML = 'this doesnt work rn'
            // platformsUl.append(macIcon);
        }
        if (platformsArray.linux === true) {
            linuxIcon.innerHTML = '<i class="fa-brands fa-linux"></i>'
            // platformsUl.append(linuxIcon);

        } else {
            linuxIcon.innerHTML = ''
        }
        platformsUl.append(windowsIcon, macIcon, linuxIcon)
    });

    // Deal with inner HTML
    // 
    // steamApp.checkingPlatforms = () =>{
        for(let i = 0; i < gamesReturned.length; i++){
            console.log(gamesReturned[i])
            if(gamesReturned[i][metascore]){
                console.log(gamesReturned[i])
            } else {
                console.log(`${gamesReturned[i]} doesn't have a metascore`)
            }
        }
    }

    // checkingPlatforms();

// }



steamApp.init = () => {
    steamApp.storeSearch();
}

steamApp.init();