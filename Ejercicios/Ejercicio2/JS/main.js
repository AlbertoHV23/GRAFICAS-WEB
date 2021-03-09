$(document).ready(function () {
    $("#btnAgregar").click(function () {
        var nombre = $("#txtNombre").val();
        $("#contenedor").append("<li>" + nombre + "<button class='btnNuevo'>Agregar</button></li>");
    });
    $("body").on("click", ".btnNuevo", function () {
        $(this).parent().remove();
        $(this).remove();
    });
});
