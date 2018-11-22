// Constantes 
const nivelFacil = 18;
const nivelIntermedio = 12;
const nivelExperto = 9;

// Variables
var nombre = "";
var dificultad = 0;
var intentosRestantes = 0;
var paresEncontrados = 0;
var firstCard = null;
var secondCard = null;
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

// Funcion de logueo e inicio
botonesDificultad.on('click', function(e) {
  e.preventDefault();
  nombre = inputNombre.val();
  
  if (nombre.length == 0 || nombre == undefined) {
    showError();
  } else {

    var dificultadId = e.target.id;

    setDificultad(dificultadId);
    ocultarElementos(sectionInicio);
    mostrarElementos(tablero);

    $('#hola').html(nombre);
    $('#intentos').html(intentosRestantes);
    $('#intentosTit').html(intentosRestantes);
    $('#nombreNivel').html(e.target.id);
  }
})

// Funcion que muestra error de input vacio

function showError() {
  mostrarElementos(error);
    setTimeout(function() {
      ocultarElementos(error);
    }, 3000)
}

// Funcion que indica cuantos intentos hay por nivel

function setDificultad(dificultadId) {
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

function tocarCarta(e){
  
  var indice = tarjetas.index(e.target);
  $('#' + e.target.id).attr('src', cards[indice]);
  
  if (firstCard == null) {
    firstCard = $(this);
  } else {
    secondCard = $(this);
  }

  if(firstCard !== null && secondCard !== null) {
    if (firstCard.attr('src') == secondCard.attr('src')) {
      firstCard.off();
      secondCard.off();
      firstCard = null;
      secondCard = null;
      paresEncontrados ++
    } else {
      setTimeout(function(){
        firstCard.attr('src', 'imagenes/tapada.jpg');
        secondCard.attr('src', 'imagenes/tapada.jpg');
        firstCard = null;
        secondCard = null;
      },1000);
    }
    
    intentosRestantes--;
    $('#intentos').html(intentosRestantes);
  }

  if (paresEncontrados == 6 && intentosRestantes >= 0) {
    var tablero = $("#tablero");
    var rankingGanador = $("#rankingGanador");
    mostrarElemento(tablero);
    mostrarElementos(rankingGanador);
  }
  if (paresEncontrados < 6 && intentosRestantes == 0) {
    var rankingPerdedor = $("#rankingPerdedor"); 
    mostrarElemento(tablero);
    mostrarElementos(rankingPerdedor);
  }
}

// Funcion para volver al inicio y volver a jugar

$('.botonVolver').on('click',function(e) {
  var rankingGanador = $("#rankingGanador");
  var rankingPerdedor = $("#rankingPerdedor"); 
  ocultarElementos(rankingGanador, rankingPerdedor);
  
  ocultarElemento(sectionInicio);
  mostrarElementos(sectionInicio);

  ocultarElementos(tablero);
  ocultarElemento(tablero);
  newGame();
  cards = shuffle(cards);
})

function newGame () {
  nombre = "";
  dificultad = 0;
  intentosRestantes = 0;
  paresEncontrados = 0;
  $('#nombre').val("");
  tarjetas.attr('src', 'imagenes/tapada.jpg');
  tarjetas.on('click', tocarCarta);
}


// Funcion para agregar clase oculto y remover clase oculto

function ocultarElementos(...jqElements) {
  for(var i = 0; i < jqElements.length; i++) {
    if (jqElements[i] != null || jqElements[i] != undefined) {
      jqElements[i].addClass('oculto');
    }
  }
}

function mostrarElementos(...jqElements) {
  for(var i = 0; i < jqElements.length; i++) {
    if (jqElements[i] != null || jqElements[i] != undefined) {
      jqElements[i].removeClass('oculto');
    }
  }
}
function mostrarElemento(...jqElements) {
  for(var i = 0; i < jqElements.length; i++) {
    if (jqElements[i] != null || jqElements[i] != undefined) {
      jqElements[i].addClass('opacity');
    }
  }
}

function ocultarElemento(...jqElements) {
  for(var i = 0; i < jqElements.length; i++) {
    if (jqElements[i] != null || jqElements[i] != undefined) {
      jqElements[i].removeClass('opacity');
    }
  }
}










