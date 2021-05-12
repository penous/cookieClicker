// {{ Make the game object }}
const Game = {};

Game.startGame = function () {
  // Declare DOM elements and variables
  const score = document.getElementById('score');
  const scorePs = document.getElementById('score-ps');
  const cookie = document.getElementById('bigCookie-click');
  const cookieBG = document.getElementById('cookie');
  const cookieImg = document.getElementById('bigCookie');
  const upgradeList = document.getElementById('upgrades-list');
  const template = document.getElementById('tpl-upgrades');

  // Generate game stats and stuff
  Game.cookies = 0;
  Game.cookiesPs = 0;
  Game.products = [
    { id: 0, name: 'Power Up', power: 0, defaultPrice: 50, price: 50 },
    { id: 1, name: 'Cursor', power: 1, defaultPrice: 50, price: 50 },
    { id: 2, name: 'Granny', power: 5, defaultPrice: 120, price: 120 },
    { id: 3, name: 'BeCode Student', power: 15, defaultPrice: 400, price: 400 },
    { id: 4, name: 'Yarrut', power: 20, defaultPrice: 650, price: 650 },
    { id: 5, name: 'Jonas', power: 30, defaultPrice: 800, price: 800 },
    {
      id: 6,
      name: 'Ultimate Sicco',
      power: 999,
      defaultPrice: 66666,
      price: 66666,
    },
  ];
  Game.upgrades = [];
  Game.player = { power: 1 };

  Game.playerPower = function () {
    return Game.player.power;
  };

  // Fill in store
  for (let [index, product] of Game.products.entries()) {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.upgrade-item').id = index;
    clone.querySelector('.upgrade-name').innerHTML = product.name;
    clone.querySelector('.upgrade-price').innerHTML = product.price;
    upgradeList.appendChild(clone);
  }

  // Update stats function
  function updateCookies() {
    score.innerHTML = `${Game.cookies} Cookies`;
  }

  // Power up
  function powerUp() {
    let timer = 10;
    // Game.cookiesPs *= 2;
    Game.cookiesPs = Game.cookiesPs * 2;
    Game.player.power *= 2;
    cookieBG.classList.add('power-up');
    const powerUp = setInterval(() => {
      --timer;
      if (timer === 0) {
        Game.upgrades = Game.upgrades.filter((upgrade) => upgrade.id != 0);
        Game.player.power /= 2;
        updateCps();
        cookieBG.classList.remove('power-up');
        clearInterval(powerUp);
      }
    }, 1000);
  }

  // Buy upgrade function
  Game.buyUpgrade = function (id) {
    const item = Game.products.find((product) => +id === product.id);
    if (Game.upgrades.some((e) => e.id === item.id)) {
      const tempItem = Game.upgrades.find((e) => e.id === item.id);
      tempItem.amount++;
    } else {
      const upgrade = {
        id: item.id,
        name: item.name,
        power: item.power,
        amount: 1,
      };
      Game.upgrades.push(upgrade);
      ultimateSicCheck(upgrade);
    }
    if (item.id === 0) powerUp();
    Game.cookies -= item.price;
  };

  // Click the cookie
  cookie.addEventListener('click', () => {
    cookie.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }], {
      duration: 60,
      iterations: 1,
    });

    Game.cookies += Game.playerPower();
    updateCookies();
  });

  // Click shop items
  document.querySelectorAll('.upgrade-item').forEach((listItem) => {
    listItem.addEventListener('click', (e) => {
      Game.buyUpgrade(e.currentTarget.id);
      updateCps();
      updateCookies();
      updateShopPrice(e.currentTarget.id);
    });
  });

  // Autoclick functionality from products
  function updateCps() {
    if (Game.upgrades.length === 0) return;

    Game.cookiesPs = Game.upgrades.reduce((acc, upgrade) => {
      return acc + upgrade.power * upgrade.amount;
    }, 0);

    if (Game.upgrades.some((upgrade) => upgrade.id === 0)) {
      Game.cookiesPs *= 2;
    }

    scorePs.innerHTML = `${Game.cookiesPs} cookies per second`;
  }

  // Increase cookies by cookies per second
  const bakeFreeCookies = () => {
    // if (Game.cookiesPs === 0) return;
    setTimeout(() => {
      Game.cookies += Game.cookiesPs;
      updateCookies();
      bakeFreeCookies();
    }, 1000);
  };
  bakeFreeCookies();

  // Increase price of shop items
  const updateShopPrice = (id) => {
    const productIndex = Game.products.findIndex(
      (element) => element.id === +id
    );
    const product = Game.products[productIndex];
    const temp = Game.upgrades.find((el) => product.id === el.id);

    product.price = product.defaultPrice * (temp.amount + 1);
    document.querySelector(`li[id='${id}'] p.upgrade-price`).innerHTML =
      product.price;
  };

  // Check if upgrades are buyable
  const upgradeAvailability = () => {
    setTimeout(() => {
      const listItems = document.querySelectorAll('.upgrade-item');
      listItems.forEach((li) => {
        const temp = Game.products.find((el) => +li.id === el.id);
        if (temp.price > Game.cookies) {
          li.classList.add('no-events');
        } else {
          li.classList.remove('no-events');
        }
      });
      upgradeAvailability();
    }, 10);
  };
  upgradeAvailability();

  // Check the ultimate sic
  function ultimateSicCheck(upgrade) {
    if (upgrade.id === 6) {
      cookieImg.classList.add('secret');
      cookieImg.style.backgroundImage = 'url(../images/sic.png)';
    }
  }
};

Game.startGame();
