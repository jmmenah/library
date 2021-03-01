function mostrarLibros() {
  //Mostrar libros
  $.get("/biblioteca/php/libros.php", function (data) {
    libros = data.message;
    html = "";
    $("#libros").html(html);
    $("#nuestrosLibrosNum").html(data.message.length);
    for (i = 0; i < data.message.length; i++) {
      html =
        html +
        `<tr>
              <td><a class="btn" href="verLibro.html?id=${data.message[i].idLibro}" title="Ver libro"><img src='${data.message[i].imagenLibro}' style='max-height:100px'></a></td>
              <td>${data.message[i].tituloLibro}</td>
              <td>${data.message[i].autorLibro}</td>
              <td class='acciones'>
              <button class="btn botonEliminar" data-toggle="modal" data-id="${data.message[i].idLibro}" data-target="#modalEliminar">
              <i class="bi bi-trash-fill"></i>
          </button>
  
          <button class="btn botonPrestar" name="${data.message[i].tituloLibro}" data-id="${data.message[i].idLibro}" title="Tomar prestado">
            <i class="bi bi-book-fill"></i>
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
}

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
  if (puntuacion) return libros.filter((element) => element[busqueda] == libro);
  else
    return libros.filter((element) =>
      element[busqueda].toLowerCase().includes(libro.toLowerCase())
    );
}

function prestamo(idLibro) {
  usuario = JSON.parse(window.localStorage.getItem("usuario"));
  $.get(
    `/biblioteca/php/prestar.php`,
    { idUsuario: usuario.id, idLibro: idLibro },
    function (data) {
      if (data.status == 200) {
        window.location.reload();
      }
    }
  );
}

function obtenerLibrosPrestados() {
  usuario = JSON.parse(window.localStorage.getItem("usuario"));

  if (usuario.id) {
    $.get(
      `/biblioteca/php/librosPrestados.php`,
      { idUsuario: usuario.id },
      function (data) {
        if (data.status === 200) {
          let tabla = `
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Devolver antes de</th>
                                <th scope="col">Devolver</th>
                            </tr>
                        </thead>
                    <tbody>
                `;

          $("#tusLibrosNum").html(data.message.length);

          data.message.forEach((element) => {
            let colorFila = "";

            if (
              diasRestantes(new Date(element.fechaDevolver)) < 3 &&
              diasRestantes(new Date(element.fechaDevolver)) > 1
            )
              colorFila = "bg-warning";
            else if (diasRestantes(new Date(element.fechaDevolver)) < 1)
              colorFila = "bg-danger-devolverLibro";

            tabla += `<tr class="${colorFila}">
                        <td><a href="/biblioteca/verLibro.html?id=${
                          element.idLibro
                        }" >${element.tituloLibro}</a></td>
                        <td>${element.fechaDevolver} (${diasRestantes(
              new Date(element.fechaDevolver)
            )} días)</td>
                        <td>
                            <button class="btn devolverLibro" data-tituloLibro="${
                              element.tituloLibro
                            }" data-id="${element.idLibro}">
                                <i class="bi bi-arrow-return-left"></i>
                            </button>
                        </td>
                        
                        `;

            // Si el usuario tiene ya el libro, no le saldrá la opción de tomarlo de nuevo
            $(".botonTomarPrestado").each(function () {
              if ($(this).attr("name") == element.tituloLibro) $(this).remove();
            });
          });

          tabla += `</tbody>
                </table>`;

          $("#info").html(tabla);
        } else {
          $("#librosPrestados").html(`<p>${data.message}.</p>`);
          $("#pagarMulta").prop("disabled", false);
        }
      }
    );
  } else
    $("#librosPrestados").html(
      `<p>Inicia sesión para empezar a añadir libros a tu biblioteca.</p>`
    );
}

function diasRestantes(fecha) {
  let actual = new Date();

  // To calculate the time difference of two dates
  let Difference_In_Time = fecha.getTime() - actual.getTime();

  // To calculate the no. of days between two dates
  return Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
}

function eliminarLibro(id) {
  usuario = JSON.parse(window.localStorage.getItem("usuario"));

  if (usuario !== "administrador") {
    alert("Debes ser administrador para realizar esta acción");
  } else {
    $.get(
      `/biblioteca/php/eliminarLibro.php`,
      { idLibro: id },
      function (data) {
        if (data.status == 200) window.location.reload();
        else alert("Error al borrar");
      }
    );
  }
}

function devolverLibro(idLibro) {

    $.get(`/biblioteca/php/devolucion.php`, {idUsuario: usuario.id, idLibro: idLibro}, function(data) {
    
        if (data.status == 200) {
        
            alert(data.message);

            window.location.reload();

        }


    });

}