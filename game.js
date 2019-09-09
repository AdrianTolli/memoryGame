let cardGame = (() => {
  let imageList = [
    "./images/lemur.png",
    "./images/crayfish.png",
    "./images/seal.png",
    "./images/elephant.png",
    "./images/snail.png",
    "./images/star.png"
  ];
  let openedCards = [];

  //Renders the memorygame to the supplied targetdiv
  function render(targetDiv) {
    let gameDiv = document.createElement("div");
    targetDiv.appendChild(gameDiv);
    gameDiv.classList.add("gameBoard");

    let availableCards = imageList.map(imgUrl => ({
      count: 0,
      url: imgUrl
    }));

    while (availableCards.length > 0) {
      let randomIndex = Math.floor(Math.random() * availableCards.length);
      gameDiv.appendChild(createCard(availableCards[randomIndex].url));
      availableCards[randomIndex].count++;
      availableCards = availableCards.filter(card => card.count < 2); //removes all the cards with a count more than 2
    }
  }

  function createCard(url) {
    let newCard = document.createElement("button");
    newCard.style.backgroundImage = "url(./images/card-front.png)";
    newCard.addEventListener("click", () => openCard(newCard, url));
    return newCard;
  }

  function openCard(card, url) {
    if (openedCards.length >= 2) return;
    if (card.classList.contains("flipped")) return;
    setTimeout(() => {
      card.style.backgroundImage = "url(" + url + ")";
    }, 500); //setting a 0.5 sec delay so the image changes when it flips - match the css animation
    card.setAttribute("class", "card flipped");
    openedCards.push({ card, url });
    if (openedCards.length >= 2) {
      checkMatch(openedCards[0], openedCards[1]);
    }
  }

  function checkMatch(firstCard, secondCard) {
    if (firstCard.url == secondCard.url) {
      openedCards = [];
    } else {
      setTimeout(() => {
        firstCard.card.style.backgroundImage = "url(./images/card-front.png)";
        secondCard.card.style.backgroundImage = "url(./images/card-front.png)";
        openedCards = [];
      }, 2000); //setting a 2 sec delay so the player have a little time to se the images and match the css animation
      setTimeout(() => {
        firstCard.card.setAttribute("class", "card flippedBack");
        secondCard.card.setAttribute("class", "card flippedBack");
      }, 1500); //setting a 1.5 sec delay so the image changes when it flips - match the css animation
    }
  }

  return {
    render: render
  };
})();
