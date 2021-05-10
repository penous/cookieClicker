// {{ Make the game object }}
const Game = {};

Game.startGame = function () {
  // Declare DOM elements and variables
  const score = document.getElementById('score');
  const scorePs = document.getElementById('score-ps');
  const cookie = document.getElementById('bigCookie');
  const upgradeList = document.getElementById('upgrades-list');
  const template = document.getElementById('tpl-upgrades');

  // Generate game stats and stuff
  Game.cookies = 0;
  Game.cookiesPs = 0;
  Game.products = [
    { name: 'Player Power', power: 1, price: 50 },
    { name: 'Cursor', power: 1, price: 50 },
    { name: 'Granny', power: 5, price: 120 },
    { name: 'BeCode Student', power: 15, price: 400 },
    { name: 'Yarrut', power: 20, price: 650 },
    { name: 'Jonas', power: 30, price: 800 },
    { name: 'Ultimate Sicco', power: 999, price: 66666 },
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
};

Game.startGame();
