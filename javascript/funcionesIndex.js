$(document).ready(function () {

  $("#alertas").hide();
  mostrarLibros();
  gestionSesion();
  if(usuario!=null){
    obtenerLibrosPrestados();
    administrarMulta();
    obtenerMulta();
  }

  //Busqueda de libros

  $("#inputBusqueda").keyup(function () {
    buscarLibro($(this).val());
  });

  //Prestar libro

  $(document).on("click", ".botonPrestar", function () {
    usuario = JSON.parse(window.localStorage.getItem("usuario"));
    if (usuario == null) {
      alert("Inicia sesión para conseguir el libro");
    } else {
      idLibro = $(this).data("id");

      prestamo(idLibro);
      obtenerLibrosPrestados();

      console.log("Tomando prestado");
    }
  });

  //Obtener libros prestados

  $(document).on("click", "#tusLibros", function () {
    usuario = JSON.parse(window.localStorage.getItem("usuario"));
    if (usuario == null) {
      alert("Inicia sesión para ver tus libros");
    } else {
      obtenerLibrosPrestados();
    }
  });

  $("#nuestrosLibros").on("click", function () {
    let html = `<table class="table table-hover">
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

  $(document).on("click", ".botonEliminar", function () {
    idLibro = $(this).data("id");
  });

  $("#modalEliminar").click(function (e) {
    if (e.target.id === "#eliminarLibro") {
      eliminarLibro(idLibro);
    }
  });

  //Devolver libro

  $("#info").on("click", ".devolverLibro", function () {
    idLibro = $(this).data("id");

    devolverLibro(idLibro);
  });

  //Añadir libro

  $("#añadirLibro").click(function () {
    añadirLibro();
  });

  //Eliminar usuario

  $("#eliminarUsuarioBn").click(function () {
    mostrarUsuarios();
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
    $("#botonRegistro").on('click',function (e) {
      e.preventDefault();

      $.post(
        "/biblioteca/php/registro.php",
        $("#formularioRegistro").serialize()
        ).done(function (data) {
        if (data.status === 200) {
        alert("Usuario registrado");
        window.location.reload();
        }
      });
    });
  });

  $("#nuestrosLibros").on("click", function () {
    mostrarLibros();
    $("#inputBusqueda").val("");
    $("#inputBusqueda").show();
    $("#tipoBusqueda").show();
  });

  $('#realizarCompra').click (function () {
        
    multaPagada = true;
    obtenerMulta();
  });

});
