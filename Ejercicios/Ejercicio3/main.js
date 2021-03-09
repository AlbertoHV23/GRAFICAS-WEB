class Contacto {
    constructor(iNombre, iCorreo, iNumero) {
        this.nombre = iNombre;
        this.correo = iCorreo;
        this.numero = iNumero;
    }
}

var lista = [];

$(document).ready(function () {

    cargar();

    $('#btnGuardar').click(function () {

        if ($("#txtNombre").val() === "" || $("#txtCorreo").val() === "" || $("#txtTel").val() === "") {
            alert("Un campo esta vacio");
        } else {
            var contacto = new Contacto(
                $("#txtNombre").val(),
                $("#txtCorreo").val(),
                $("#txtTel").val()
            );
            guardar(contacto);
        }

    });

    function guardar(Contacto) {
        lista.push(Contacto);
        localStorage.setItem('mylista', JSON.stringify(lista));
        alert("Usuario guardado con éxito");
        $('input[type="text"]').val('');
    }

    function cargar() {
        var array = JSON.parse(localStorage.getItem("mylista"));
        if (array === null) {
            alert("No hay contáctos");
        } else {
            for (var i = 0; i < array.length; i++){
                $("#contactos").append("<li class='item' >" + array[i].nombre + "</li>");
            }
            alert("Hay contactos en la lista!");
            lista = JSON.parse(localStorage.getItem("mylista"));
        }
    }

    $('#btnBorrar').click(function () {
        eliminar();
        alert("Usuarios eliminados con éxito");
    });

    $("body").on("click", "li", function () {
        var compara = $(this).text();
        for (var i = 0; i < lista.length; i++){
            if(compara === lista[i].nombre){
               /*  alert("Correo: " + lista[i].correo + "," + "Número: " + lista[i].numero); */
               $($(this)).append("<ul class='correo' >" + "Correo: " + lista[i].correo + "</ul>");
               $($(this)).append("<ul class='numero' >" +  "Número: " + lista[i].numero + "</ul>");
            }
        }
    });

    function eliminar() {
        lista = [];
        localStorage.clear();
    }

});