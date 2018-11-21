var memotest = {
  nombre: "",
  dificultad: 0
}

var intentosRestantes = 0;
const nivelFacil = 18;
const nivelIntermedio = 12;
const nivelExperto = 9;

// Funcion de logueo.

$('.boton').on('click',function(e) {
  e.preventDefault();
  var logueo = $('#logueo').val();

  if (logueo.length == 0 || logueo == undefined){
    $('#error').removeClass('oculto');
    setTimeout(function() {
      $('#error').addClass('oculto');
    }, 3000)
  } else {

    var dificultad = e.target.id;

    if (dificultad == "facil") {
      intentosRestantes = nivelFacil;
    } else if (dificultad == "intermedio") {
      intentosRestantes = nivelIntermedio;
    } else {
      intentosRestantes = nivelExperto;
    }
    $('.container').addClass('oculto');
    $('#tablero').removeClass('oculto');
    $('#hola').html(logueo);
    $('#intentos').html(intentosRestantes);
    $('#intentosTit').html(intentosRestantes);
    $('#nombreNivel').html(e.target.id);
  }
})


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



// Funcion que orderna los elementos de manera aleatoria.

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

cards = shuffle(cards);
var tapadas = $('.tapada');
var firstCard = null;
var secondCard = null;

// Funcion que agrega la imagen de atras de la tapada.

tapadas.on('click', function(e){
  var indice = tapadas.index(e.target);
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
})



















// // Funcion que agrega la imagen de atras de la tapada.
// $('.tapada').on('click', function(e) {
//   const imgId = e.target.id
//   const id = $('#' + imgId).attr('data-img')
//   $('#' + imgId).attr('src', desordenado[id - 1])
 
//   // var primerClick
  
//   var clicks = 0;

//   $('img').on('click', function() {
//    clicks = clicks + 1;
//    if (clicks == 1) {
//      var id = $(this).attr('id')
//      var img = $(this).attr('data-img')
//      primerClick = {
//        id: id,
//        img: img
//      }
//    } else {
//      if (primerClick.img == $(this).attr('data-img')) {
//        console.log('iguales')
//      } else {
//        console.log('distintas')
//      }
//      //COMPARACION
//      clicks = 0
//    }
//   })
// })







