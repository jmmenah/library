$(document).ready(function () {
  let usuario;
  mostrarLibros();

  //Busqueda de libros

  $("#inputBusqueda").keyup(function () {
    buscarLibro($(this).val());
  });

  //Prestar libro

  $(document).on("click", ".botonPrestar", function () {
    if (usuario == null) {
      alert("Inicia sesión para conseguir el libro");
    } else {
      idLibro = $(this).data("id");

      prestamo(idLibro);

      console.log("Tomando prestado");
    }
  });

  //Obtener libros prestados

  $(document).on("click", "#tusLibros", function () {
    if (usuario == null) {
      alert("Inicia sesión para ver tus libros");
    } else {
      obtenerLibrosPrestados();
    }
  });

  $("#nuestrosLibros").on("click", function () {
    let html = `<table class="table">
    <thead>
      <tr>
        <th scope="col">Imagen</th>
        <th scope="col">Título</th>
        <th scope="col">Autor</th>
        <th class="acciones" scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody id="libros"></tbody>
    </table>`;
    $("#info").html(html);
    mostrarLibros();
  });

  //Eliminar libro

  $("#modalEliminar").click(function (e) {
    if (e.target.id === "#eliminarLibro") {
      idLibro = $(this).data("id");
      eliminarLibro(idLibro);
    }
  });

  //Devolver libro

  $("#info").on("click", ".devolverLibro", function () {
    idLibro = $(this).data("id");

    devolverLibro(idLibro);
  });

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

  $("#nuestrosLibros").on("click", function () {
    mostrarLibros();
    $("#inputBusqueda").val("");
  });

  //Gestión de la sesión
  $(function () {
    $(window).ready(function () {
      if (window.localStorage.getItem("usuario") == null) {
        $("#cerrarSesion").remove();
        $("#panelAdmin").remove();
        $("#tusLibros").remove();
      } else {
        usuario = JSON.parse(window.localStorage.getItem("usuario"));
        $("#inicioSesion").remove();
        if (usuario.rol !== "administrador") {
          $("#panelAdmin").remove();
        }
      }

      $("#cerrarSesion").click(function () {
        window.localStorage.removeItem("usuario");
        window.location = "/biblioteca/index.html";
      });
    });
  });
});
