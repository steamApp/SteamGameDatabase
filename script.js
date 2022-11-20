const steamApp = {};

steamApp.storeSearch = () => {

    // Event Listener for userSearch and userCurrency
    const formElement = document.querySelector('#searchBar')
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();

        // Grab user search input
        const inputElement = document.querySelector('input');
        const userSearch = inputElement.value;

        // Grab user currency selection
        const selectElement = document.querySelector('#currency')
        const userCurrency = selectElement.value;

        // API Call
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
            })

        // Clear input after every search
        inputElement.value = ''


    })
}

steamApp.displayGame = (gamesList) => {

    // Clear gamesUl at the begining of each new user search
    document.querySelector('.gamesUl').innerHTML = '';
    gamesList.forEach((game) => {

        // Create innerHTML for the li where the games info will be shown
        const newLiElement = document.createElement('li');
        newLiElement.classList.add('newLiElement');
        newLiElement.innerHTML = `
        <img src=${game.tiny_image} alt=${game.name} />
        <h2><a href="https://store.steampowered.com/app/${game.id}" target="_blank">${game.name}</a></h2>
        `;


        // Selecting user selection for Currency and displaying it on the page
        const selectElement = document.querySelector('#currency')
        const gamePriceEl = document.createElement('p');
        const getPrice = (gamePrice) => {
            if (selectElement.value === "GB" && gamePrice) {
                gamePriceEl.innerHTML = `<a href="https://store.steampowered.com/app/${game.id}"  >£${((gamePrice.final) / 100).toFixed(2)}</a>`;
            } else if (selectElement.value === "CA" && gamePrice || selectElement.value === "US" && gamePrice) {
                gamePriceEl.innerHTML = `<a href="https://store.steampowered.com/app/${game.id}" target="_blank">$${((gamePrice.final) / 100).toFixed(2)}</a>`;
            } else {
                gamePriceEl.innerHTML = `<a href="https://store.steampowered.com/app/${game.id}" target="_blank">Click Here For Pricing</a>`;
            }
        }
        getPrice(game.price);

        //Appending games and prices
        const gamesUl = document.querySelector('.gamesUl');
        gamesUl.append(newLiElement);
        newLiElement.append(gamePriceEl);

        // Creating ul and li for game platforms
        const platformsUl = document.createElement('ul')
        platformsUl.classList.add('platformsUl');
        const windowsIcon = document.createElement('li')
        const macIcon = document.createElement('li')
        const linuxIcon = document.createElement('li')

        // Checking for platforms on each game
        if (game.platforms.windows === true) {
            windowsIcon.innerHTML = '<i class="fa-brands fa-windows"></i>'
            platformsUl.append(windowsIcon);
        } if (game.platforms.mac === true) {
            macIcon.innerHTML = '<i class="fa-brands fa-apple"></i>'
            platformsUl.append(macIcon);

        } if (game.platforms.linux === true) {
            linuxIcon.innerHTML = '<i class="fa-brands fa-linux"></i>'
            platformsUl.append(linuxIcon);
        }

        // Append platforms to games
        newLiElement.append(platformsUl)
        
    });

    steamApp.noResults(gamesList);
}

// Error message
steamApp.noResults = (emptyList) => {
    const noGames = emptyList;
    const noResults = document.querySelector('.noResults')
    if (noGames.length === 0) {
        noResults.style.display = 'flex'
    } else {
        noResults.style.display = 'none'
    }
}

// Hamburger Menu
steamApp.hamburgerMenu = () =>{
    const navUl = document.querySelector('.navUl')
    const closeIcon = document.querySelector('.closeIcon');
    const hamburgerIcon = document.querySelector('.hamburgerIcon');
    const menu = document.querySelector('.hamburgerMenu');
    
    // Toggle .active classes on hamburger menu to change display
    const toggleMenu = () => {
        navUl.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');
        closeIcon.classList.toggle('active');
    }

    menu.addEventListener('click', toggleMenu);
}

// Init
steamApp.init = () => {
    steamApp.storeSearch("CA");
    steamApp.hamburgerMenu();
}

steamApp.init();