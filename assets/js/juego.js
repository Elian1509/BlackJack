(() => {
  "use strict";

  /**
   * 2C = TWO OF CLUBS
   * 2D = TWO OF DIAMINDS
   * 2H = TWO OF HEARTS
   * 2S = TWO OF SPADES
   */

  let deck = [];
  const types = ["C", "D", "H", "S"];
  const specials = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  // RefsHtml
  const btnPC = document.querySelector("#btnPC");
  const btnP = document.querySelector("#btnP");
  const btnNJ = document.querySelector("#btnNJ");

  const divCartasJugadores = document.querySelectorAll(`.divCartas`),
    PuntosHtml = document.querySelectorAll("small");

  const iniciarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    console.log({ puntosJugadores });
  };

  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }

    for (let type of types) {
      for (let esp of specials) {
        deck.push(esp + type);
      }
    }

    return _.shuffle(deck);;
  };


  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en la baraja";
    }

    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    PuntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  //turno cupier

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
  };

  const turnoCrupier = (puntosMinimos) => {
    let puntosCrupier = 0;
    do {
      const carta = pedirCarta();
      puntosCrupier = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosCrupier < puntosMinimos && puntosMinimos <= 21);

    setTimeout(() => {
      if (puntosCrupier === puntosMinimos) {
        alert("Nadie gana :(");
      } else if (puntosMinimos > 21) {
        alert("Crupier gana");
      } else if (puntosCrupier > 21) {
        alert("Jugador gana");
      } else {
        alert("Crupier gana");
      }
    }, 10);
  };

  //  Eventos

  btnPC.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Tienes mas de 21, PERDISTE!!");
      btnPC.disabled = true;
      btnP.disabled = true;
      turnoCrupier(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPC.disabled = true;
      btnP.disabled = true;
      console.warn("Tienes 21. Blackjack, Ganaste");
    }
  });

  btnP.addEventListener("click", () => {
    btnPC.disabled = true;
    btnP.disabled = true;
    turnoCrupier(puntosJugadores[0]);
  });

  btnNJ.addEventListener("click", () => {
    console.clear();

    iniciarJuego();

    // PuntosHtml[0].innerText = 0;
    // PuntosHtml[1].innerText = 0;
    // divCartasJugador.innerHTML = "";
    // divCartasCrupier.innerHTML = "";
    // btnPC.disabled = false;
    // btnP.disabled = false;
  });
})();
