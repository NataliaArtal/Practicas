// Constantes 
const nivelFacil = 18;
const nivelIntermedio = 12;
const nivelExperto = 9;
const lsRankingKey = "memotest-ranking";

// Variables
var nombre = "";
var dificultad = "";
var intentosRestantes = 0;
var paresEncontrados = 0;
var clickIntento = 0;
var firstCard = null;
var secondCard = null;
// var ranking = [];
var lsRankingString = "";
var cards = [
  "imagenes/alce.jpg",
  "imagenes/alce.jpg",
  "imagenes/epelante.jpg",
  "imagenes/epelante.jpg",
  "imagenes/nena.jpg",
  "imagenes/nena.jpg",
  "imagenes/peces.jpg",
  "imagenes/peces.jpg",
  "imagenes/unichancho.jpg",
  "imagenes/unichancho.jpg",
  "imagenes/zapas.jpg",
  "imagenes/zapas.jpg"
]

// Elementos
var inputNombre = $('#nombre');
var botonesDificultad = $('.botonDificultad');
var tarjetas = $('.tarjeta');
var error = $('#error');
var sectionInicio = $('.inicio');
var tablero = $('#tablero');
var hola = $('#hola');
var intentosTablero = $('#intentos');
var intentosTitulo = $('#intentosTitulo');
var nombreNivel = $('#nombreNivel');
var rankingGanador = $("#rankingGanador");
var rankingPerdedor = $("#rankingPerdedor"); 
var botonVolver = $('.botonVolver');
var tablaRanking = $('table');
var resultado = $('#result');



// Funcion de logueo e inicio
botonesDificultad.on('click', function(e) {
  e.preventDefault();
  nombre = inputNombre.val();
  
  if (nombre.length == 0 || nombre == undefined) {
    showError();
  } else {

    var dificultadId = e.target.id;

    setDificultad(dificultadId);
    hideElements(sectionInicio);
    showElements(tablero);

    hola.html(nombre);
    intentosTablero.html(intentosRestantes);
    intentosTitulo.html(intentosRestantes);
    nombreNivel.html(e.target.id);
  }
})

// Funcion que muestra error de input vacio

function showError() {
  showElements(error);
    setTimeout(function() {
      hideElements(error);
    }, 3000)
}

// Funcion que indica cuantos intentos hay por nivel

function setDificultad(dificultadId) {
  dificultad = dificultadId;
  if (dificultadId == "facil") {
    intentosRestantes = nivelFacil;
  } else if (dificultadId == "intermedio") {
    intentosRestantes = nivelIntermedio;
  } else {
    intentosRestantes = nivelExperto;
  }
}


// Funcion que orderna los elementos de manera aleatoria.

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
cards = shuffle(cards);

// Funcion juego

tarjetas.on('click', tocarCarta);

function tocarCarta(e) {
  $(this).addClass('girar');
  var indice = tarjetas.index(e.target);
  $('#' + e.target.id).attr('src', cards[indice]);
  if (firstCard == null) {
    firstCard = $(this);
  } else {
    secondCard = $(this);
  }  
  clickIntento++;
  
  if(firstCard !== null && secondCard !== null) {
    if  (firstCard.attr('src') == secondCard.attr('src') && firstCard.attr('id') !== secondCard.attr('id')) {
      tarjetas.off();
      firstCard.addClass('color');
      secondCard.addClass('color');
      // firstCard.off();
      // secondCard.off();
      firstCard = null;
      secondCard = null;
      paresEncontrados++;
      tarjetas.on('click', tocarCarta);
    } else {
      tarjetas.off();
      setTimeout(function(){
        firstCard.attr('src', 'imagenes/tapada.jpg');
        firstCard.removeClass('girar');
        secondCard.attr('src', 'imagenes/tapada.jpg');
        secondCard.removeClass('girar');
        firstCard = null;
        secondCard = null;
        tarjetas.on('click', tocarCarta);
      },1100);
    }
    intentosRestantes--;
    intentosTablero.html(intentosRestantes);
  }
  

  if (paresEncontrados == 6 && intentosRestantes >= 0) {
    var ranking = calcularRanking({
      nombre: nombre,
      nivel: dificultad,
      intentos: calcularPuntaje()
    });
    dibujarRanking(ranking);
    resultado.html(calcularPuntaje());

    setTimeout(function(){
      addOpacity(tablero);
      showElements(rankingGanador);
    },1300);
    
  }
  if (paresEncontrados < 6 && intentosRestantes == 0) {
    addOpacity(tablero);
    showElements(rankingPerdedor);
  }
}


// Funcion para volver al inicio y volver a jugar

botonVolver.on('click',function(e) {
  // var rankingGanador = $("#rankingGanador");
  // var rankingPerdedor = $("#rankingPerdedor"); 
  // hideElements(rankingGanador, rankingPerdedor);
  // removeOpacity(sectionInicio);
  // showElements(sectionInicio);
  // hideElements(tablero);
  // removeOpacity(tablero);
  // cards = shuffle(cards);
  // newGame();
  location.reload();
})

// function newGame () {
//   // nombre = "";
//   // dificultad = 0;
//   // intentosRestantes = 0;
//   // paresEncontrados = 0;
//   // $('#nombre').val("");
//   // tarjetas.attr('src', 'imagenes/tapada.jpg');
//   // tarjetas.on('click', tocarCarta);
//   // tarjetas.removeClass('color');
// }

// Funcion para calcular el puntaje de la partida

function calcularPuntaje() {
  if (dificultad == "facil") {
    return nivelFacil - intentosRestantes;
  }
  if (dificultad == "intermedio") {
    return nivelIntermedio - intentosRestantes;
  }
  return nivelExperto - intentosRestantes;
}

// Funcion para calcular y actualizar el ranking desde local storage

function calcularRanking(nuevoPuntaje) {
  var lsRanking = localStorage.getItem(lsRankingKey);
  var ranking = [];
  if (lsRanking != null) {
    ranking = JSON.parse(lsRanking); 
  }
  ranking.push(nuevoPuntaje);
  ranking.sort(function(intentosA,intentosB){
    return intentosA.intentos - intentosB.intentos;
  })
  ranking = ranking.slice(0,5);
  localStorage.setItem(lsRankingKey, JSON.stringify(ranking));
  console.log(ranking);
  return ranking; 
}

// Funcion para dibujar tabla de ranking

function dibujarRanking(ranking) {
   var tableRow = "<tr><td></td><td></td><td></td></tr>";
   ranking.forEach(function(puntaje) {
     tablaRanking.append("<tr><td>" + puntaje.nombre + "</td><td>" + puntaje.nivel + "</td><td>" + puntaje.intentos + "</td></tr>");
   });
} 


// Funcion para agregar clase oculto y remover clase oculto

function hideElements(...jqElements) {
  for(var i = 0; i < jqElements.length; i++) {
    if (jqElements[i] != null || jqElements[i] != undefined) {
      jqElements[i].addClass('oculto');
    }
  }
}

function showElements(...jqElements) {
  for(var i = 0; i < jqElements.length; i++) {
    if (jqElements[i] != null || jqElements[i] != undefined) {
      jqElements[i].removeClass('oculto');
    }
  }
}
function addOpacity(...jqElements) {
  for(var i = 0; i < jqElements.length; i++) {
    if (jqElements[i] != null || jqElements[i] != undefined) {
      jqElements[i].addClass('opacity');
    }
  }
}

function removeOpacity(...jqElements) {
  for(var i = 0; i < jqElements.length; i++) {
    if (jqElements[i] != null || jqElements[i] != undefined) {
      jqElements[i].removeClass('opacity');
    }
  }
}