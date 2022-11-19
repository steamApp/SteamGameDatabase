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

        const newLiElement = document.createElement('li');
        newLiElement.classList.add('newLiElement');
        newLiElement.innerHTML = `
        <img src=${game.tiny_image} alt=${game.name} />
        <h2><a href="https://store.steampowered.com/app/${game.id}" target="_blank">${game.name}</a></h2>
        `;

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
        } if (game.platforms.mac === true) {
            macIcon.innerHTML = '<i class="fa-brands fa-apple"></i>'
            platformsUl.append(macIcon);

        } if (game.platforms.linux === true) {
            linuxIcon.innerHTML = '<i class="fa-brands fa-linux"></i>'
            platformsUl.append(linuxIcon);
        }

        newLiElement.append(platformsUl)
        
    });

    steamApp.noResults(gamesList);
}

steamApp.noResults = (emptyList) => {
    const noGames = emptyList;
    const noResults = document.querySelector('.noResults')
    if (noGames.length === 0) {
        noResults.style.display = 'flex'
    } else {
        noResults.style.display = 'none'
    }
}


steamApp.slideOutNav = () =>{
    const navItems = document.querySelector('.navUl')
    const closeIcon = document.querySelector('.closeIcon');
    const hamburgerIcon = document.querySelector('.hamburgerIcon');
    const slideOutNav = document.querySelector('.slideOutNav');
    
    const toggleMenu = () => {
        if(navItems.classList.contains('active')){
            navItems.classList.remove('active');
            closeIcon.style.display = 'none';
            hamburgerIcon.style.display = 'block';
        } else{
            navItems.classList.add('active');
            closeIcon.style.display = 'block';
            hamburgerIcon.style.display = 'none'
        }
    }

    slideOutNav.addEventListener('click', toggleMenu);
}

steamApp.init = () => {
    steamApp.storeSearch("CA");
    steamApp.slideOutNav();
}

steamApp.init();