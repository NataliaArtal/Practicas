// $('body').removeClass('oculto');

$('.boton').on('click',function(e) {
    e.preventDefault();
    var logueo = $('#logueo').val();
    if (logueo.length == 0 || logueo == undefined){
    $('#error').removeClass('oculto');
    setTimeout(function() {
        $('#error').addClass('oculto');
      }, 3000)
    }else {
        $('.container').addClass('oculto');
        $('#tablero').removeClass('oculto');

    }
})

