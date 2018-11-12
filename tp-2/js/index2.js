// $('body').removeClass('oculto');

var memotest = {
    usuario: {
        nombre: ""
    }
}

var usuario = {
    nombre: ""
}

var tablero = {

}

$('.boton').on('click',function(e) {
    e.preventDefault();
    var logueo = $('#logueo').val();
    if (logueo.length == 0 || logueo == undefined){
    $('#error').removeClass('oculto');
    setTimeout(function() {
        $('#error').addClass('oculto');
      }, 3000)
    }else {
        memotest.usuario.nombre = logueo;
        console.log(memotest.usuario.nombre);
        $('.container').addClass('oculto');
        $('#tablero').removeClass('oculto');

    }
})

