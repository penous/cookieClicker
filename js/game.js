// {{ Make the game object }}
const Game = {};

Game.startGame = function () {
  // Declare DOM elements and variables
  const score = document.getElementById('score');
  const scorePs = document.getElementById('score-ps');
  const cookie = document.getElementById('bigCookie-click');
  const upgradeList = document.getElementById('upgrades-list');
  const template = document.getElementById('tpl-upgrades');

  // Generate game stats and stuff
  Game.cookies = 0;
  Game.cookiesPs = 0;
  Game.products = [
    { id: 0, name: 'Player Power', power: 1, defaultPrice: 50, price: 50 },
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

  function getPlayerPower(player) {
    return player.power;
  }

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
    }
  };

  // Click the cookie
  cookie.addEventListener('click', () => {
    cookie.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }], {
      duration: 60,
      iterations: 1,
    });

    Game.cookies++;
    updateCookies();
  });

  // Click shop items
  document.querySelectorAll('.upgrade-item').forEach((listItem) => {
    listItem.addEventListener('click', (e) => {
      Game.buyUpgrade(e.currentTarget.id);
      updateCps();
      updateShopPrice(e.currentTarget.id);
    });
  });

  // Autoclick functionality from products
  function updateCps() {
    if (Game.upgrades.length === 0) return;

    Game.cookiesPs = Game.upgrades.reduce((acc, upgrade) => {
      return acc + upgrade.power * upgrade.amount;
    }, 0);

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
    console.log(productIndex);
    const product = Game.products[productIndex];
    const temp = Game.upgrades.find((el) => product.id === el.id);

    product.price = product.defaultPrice * (temp.amount + 1);
    document.querySelector(`li[id='${id}'] p.upgrade-price`).innerHTML =
      product.price;
  };
};

Game.startGame();
