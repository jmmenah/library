$(document).ready(() => {
  //Mostrar libros
  $.get("/biblioteca/php/libros.php", function (data) {
    libros = data.message;
    html = "";
    for (i = 0; i < data.message.length; i++) {
      html =
        html +
        `<tr>
            <td><a class="btn" href="verLibro.html?id=${data.message[i].idLibro}" title="Ver libro"><img src='${data.message[i].imagenLibro}' style='max-height:100px'></a></td>
            <td>${data.message[i].tituloLibro}</td>
            <td>${data.message[i].autorLibro}</td>
            <td class='acciones'>
            <button class="btn botonEliminar" data-toggle="modal" data-id="${data.message[i].idLibro}" data-target="#confirmarEliminarLibro">
            <i class="fas fa-trash"></i>
        </button>

        <button class="btn botonTomarPrestado" name="${data.message[i].tituloLibro}" data-id="${data.message[i].idLibro}" title="Tomar prestado">
            <i class="fas fa-book"></i>
        </button>
            </td>
        </tr>`;
    }
    if (data.status == 500) {
      html = "";
    }
    html = html + "</tbody>";
    $("#libros").append(html);
  });

  //Busqueda de libros

  $("#inputBusqueda").keyup(function () {
    buscarLibro($(this).val());
  });
  function buscarLibro(libro) {
    let tipoBusqueda = $("#tipoBusqueda").val();

    let librosResultado = [];

    let buscar = true;

    switch (tipoBusqueda) {
      case "Titulo":
        librosResultado = librosCoincidentes("tituloLibro", libro);
        break;

      case "Genero":
        librosResultado = librosCoincidentes("generoLibro", libro);
        break;

      case "Autor":
        librosResultado = librosCoincidentes("autorLibro", libro);
        break;

      case "Puntuacion":
        librosResultado = librosCoincidentes("puntuacionLibro", libro, true);
        break;

      default:
        buscar = false;
        break;
    }

    if (buscar) {
      html = "";
      $("#libros").text(html);
      for (i = 0; i < librosResultado.length; i++) {
        html =
          html +
          `<tr>
                  <td><img src='${librosResultado[i].imagenLibro}' style='max-height:100px'></td>
                  <td>${librosResultado[i].tituloLibro}</td>
                  <td>${librosResultado[i].autorLibro}</td>
                  <td>A</td>
              </tr>`;
      }
      html = html + "</tbody>";
      $("#libros").append(html);
    }
  }

  function librosCoincidentes(busqueda, libro, puntuacion = false) {
    if (puntuacion)
      return libros.filter((element) => element[busqueda] == libro);
    else
      return libros.filter((element) =>
        element[busqueda].toLowerCase().includes(libro.toLowerCase())
      );
  }

  //Validación formulario de registro e incio
  $(function () {
    var forms = document.getElementsByClassName("needs-validation");

    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          event.preventDefault();

          if (form.checkValidity() === false) {
            event.stopPropagation();
          } else {
            console.log("Todo correcto");
          }

          form.classList.add("was-validated");
        },
        false
      );
    });

    $("#error").hide();

    //Inicio de sesion
    $("#botonIniciarSesion").click(function (e) {
      e.preventDefault();

      $.post(
        "/biblioteca/php/usuario.php",
        $("#formularioIniciarSesion").serialize()
      ).done(function (data) {
        if (data.status === 200) {
          window.localStorage.setItem(
            "usuario",
            JSON.stringify({
              id: data.message.idUsuario,
              email: data.message.emailUsuario,
              rol: data.message.rolUsuario,
            })
          );

          window.location = "/biblioteca/index.html";
        } else {
          $("#errorTexto").text(data.message);
          $("#error").show();
        }
      });
    });

    //Registro
    $("#botonRegistrarse").click(function (e) {
      e.preventDefault();

      $.post(
        "/biblioteca/php/registro.php",
        $("#formularioRegistro").serialize()
      ).done(function (data) {
        alert(res.message.emailUsuario);
      });
    });
  });

  //Gestión de la sesión
  $(function () {
    $(window).ready(function () {
      if (window.localStorage.getItem("usuario") == null) {
        $("#cerrarSesion").remove();
        $("#panelAdmin").remove();
        $(".acciones").html('').remove();
      } else {
        usuario = JSON.parse(window.localStorage.getItem("usuario"));
        $("#inicioSesion").remove();
        usuario.rol == "administrador" ? "" : $("#panelAdmin").remove();
      }
    });

    $("#cerrarSesion").click(function () {
      window.localStorage.removeItem("usuario");
      window.location = "/biblioteca/index.html";
    });
  });
});
