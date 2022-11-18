const steamApp = {};

steamApp.storeSearch = () => {

    const formElement = document.querySelector('#searchBar')
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        const inputElement = document.querySelector('input');
        const userSearch = inputElement.value;

        const selectElement = document.querySelector('#currency')
        const userCurrency = selectElement.value;

            const url = new URL('https://proxy-ugwolsldnq-uc.a.run.app/https://store.steampowered.com/api/storesearch')
    
            url.search = new URLSearchParams({
                term: userSearch,
                l: "english",
                cc: userCurrency,
            })
        
            fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    steamApp.displayGame(data.items);
                    // console.log(data.items);
                })
            
            inputElement.value = ''
    })
}

steamApp.displayGame = (gamesList) => {
    document.querySelector('.gamesUl').innerHTML = '';
    gamesList.forEach((game) => {
        // console.log(game)

        const newLiElement = document.createElement('li');
        newLiElement.classList.add('newLiElement');
        newLiElement.innerHTML = `
        <img src=${game.tiny_image} alt=${game.name} />
        <h2><a href="https://store.steampowered.com/app/${game.id}" target="_blank">${game.name}</a></h2>
        `;
        

        const gamePriceEl = document.createElement('p');
        const getPrice = (gamePrice) => {
            if (gamePrice.price) {
                gamePriceEl.innerHTML = `<a href="https://store.steampowered.com/app/${game.id}" target="_blank">$${game.price.final}</a>`;
            } else {
                gamePriceEl.innerHTML = `<a href="https://store.steampowered.com/app/${game.id}" target="_blank">Click Here For Pricing</a>`;
            }
        }
        getPrice(game);
        const gamesUl = document.querySelector('.gamesUl');
        gamesUl.append(newLiElement);
        newLiElement.append(gamePriceEl);

        const platformsUl = document.createElement('ul')
        platformsUl.classList.add('platformsUl');
        const windowsIcon = document.createElement('li')
        const macIcon = document.createElement('li')
        const linuxIcon = document.createElement('li')

        if (game.platforms.windows === true) {
            windowsIcon.innerHTML = '<i class="fa-brands fa-windows"></i>'
            platformsUl.append(windowsIcon);
        } else {
            // windowsIcon.innerHTML = 'doesnt work'
        }
        if (game.platforms.mac === true) {
            macIcon.innerHTML = '<i class="fa-brands fa-apple"></i>'
            platformsUl.append(macIcon);

        } else {
            // macIcon.innerHTML = 'this doesnt work rn'
            // platformsUl.append(macIcon);
        }
        if (game.platforms.linux === true) {
            linuxIcon.innerHTML = '<i class="fa-brands fa-linux"></i>'
            platformsUl.append(linuxIcon);

        } else {
            // platformsUl.append(linuxIcon);
            // linuxIcon.innerHTML = 'this doesnt work rn'
        }

        newLiElement.append(platformsUl)

    });
}


steamApp.init = () => {
    steamApp.storeSearch("CA");
}

steamApp.init();