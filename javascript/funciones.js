usuario = JSON.parse(window.localStorage.getItem("usuario"));
let tieneMulta = false;
let multaPagada = false;

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
    gestionSesion();
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
                  <td class='acciones'>
              <button class="btn botonEliminar" data-toggle="modal" data-id="${librosResultado[i].idLibro}" data-target="#modalEliminar">
              <i class="bi bi-trash-fill"></i>
          </button>
  
          <button class="btn botonPrestar" name="${librosResultado[i].tituloLibro}" data-id="${librosResultado[i].idLibro}" title="Tomar prestado">
            <i class="bi bi-book-fill"></i>
          </button>
              </td>
              </tr>`;
    }
    html = html + "</tbody>";
    $("#libros").append(html);
    gestionSesion();
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
          if (usuario == null) {
            console.log("No hay usuario");
          } else {
            $("#tusLibrosNum").html(data.message.length);
          }

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

  let Difference_In_Time = fecha.getTime() - actual.getTime();

  return Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
}

function eliminarLibro(id) {
  

  if (usuario === null) {
    alert("Debes ser administrador para realizar esta acción");
  } else {
    if (usuario.rol == "administrador") {
      $.get(
        `/biblioteca/php/eliminarLibro.php`,
        { idLibro: id },
        function (data) {
          if (data.status == 200) window.location.reload();
          else alert("Error al borrar");
        }
      );
    } else {
      alert("Debes ser administrador para realizar esta acción");
    }
  }
}

function devolverLibro(idLibro) {
  $.get(
    `/biblioteca/php/devolucion.php`,
    { idUsuario: usuario.id, idLibro: idLibro },
    function (data) {
      if (data.status == 200) {
        alert(data.message);

        window.location.reload();
      }
    }
  );
}

function mostrarUsuarios() {
  $.get(`/biblioteca/php/usuarios.php`, function (data) {
    if (data.status == 200) {
      let contenido = data.message
        .map(({ emailUsuario, rolUsuario, idUsuario }) => {
          return `
                
                <tr>
                    <td>${emailUsuario}</td>
                    <td>${rolUsuario}</td>
                    <td>

                        <button class="btn" onclick="eliminarUsuario(${idUsuario})">
                        <i class="bi bi-trash-fill"></i>
                        </button>
                    
                    </td>
                </tr>
                
                `;
        })
        .join("");

      $("#usuarios").html(`
            

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${contenido}
                    </tbody>
                </table>

            
            `);
    }
  });
}

function eliminarUsuario(idUsuario) {
  $.post(
    `/biblioteca/php/eliminarUsuario.php`,
    { idUsuario: idUsuario },
    function (data) {
      if (data.status == 200) {
        alert(data.message);
        window.location.reload();
      } else alert(data.message);
    }
  );
}

function añadirLibro() {
  $(".btn").prop("disabled", true);

  let titulo = $("#tituloLibroInput").val();
  let autor = $("#autorLibroInput").val();
  let descripcion = $("#descripcionLibroInput").val();
  let puntuacion = $("#puntuacionLibroInput").val();
  let genero = $("#generoLibroInput").val();
  let imagen = $("#imagenLibroInput").val();

  $.post(
    `/biblioteca/php/nuevoLibro.php`,
    {
      tituloLibro: titulo,
      autorLibro: autor,
      descripcionLibro: descripcion,
      puntuacionLibro: puntuacion,
      generoLibro: genero,
      imagenLibro: imagen,
    },
    function (data) {
      if (data.status === 200) {
        alert("Libro añadido correctamente");
        window.location.reload();
      }

      $(".btn").prop("disabled", false);
    }
  );
}

function gestionSesion() {
  $(window).ready(function () {
    if (window.localStorage.getItem("usuario") == null) {
      $("#cerrarSesion").remove();
      $("#panelAdmin").remove();
      $("#tusLibros").remove();
      $(".acciones").remove();
      $(".botonEliminar").remove();
      $(".botonPrestar").remove();
    } else {
      usuario = JSON.parse(window.localStorage.getItem("usuario"));
      $("#inicioSesion").remove();
      if (usuario.rol !== "administrador") {
        $("#panelAdmin").remove();
        $(".botonEliminar").remove();
      }
    }

    $("#cerrarSesion").click(function () {
      window.localStorage.removeItem("usuario");
      window.location = "/biblioteca/index.html";
    });
  });
}

function administrarMulta() {
  
  $.get(
    `/biblioteca/php/librosPrestados.php`,
    { idUsuario: usuario.id },
    function (data) {
      if (data.status == 200) {
        let libros = data.message;

        let actual = new Date();

        libros.forEach(({ fechaDevolver }) => {
          let libro = new Date(fechaDevolver);

          if (libro < actual && !tieneMulta) {
            ponerMulta();
            tieneMulta = true;
          }
        });
      } else {
        $("#pagarMulta").prop("disabled", false);
      }
    }
  );
}

function ponerMulta() {
  $.get(
    `/biblioteca/php/multar.php`,
    { idUsuario: usuario.id },
    function (data) {
      if (data.status == 200) {
        window.location.reload();
      }
    }
  );
}

function obtenerMulta() {
  
  $.get(
    `/biblioteca/php/multa.php`,
    { idUsuario: usuario.id },
    function (data) {
      let { multaHasta, multaUsuario } = data.message;

      if (multaUsuario == 1) {
        let fechaActual = new Date();
        let fechaMulta = new Date(multaHasta);

        if (fechaActual >= fechaMulta || multaPagada) {
          $.get(
            `/biblioteca/php/quitarMulta.php`,
            { idUsuario: usuario.id },
            function (data) {
              if (data.status == 200) {
                window.location.reload();
              }
            }
          );
        } else {
          $("#alertas").show();
          $("#alerta").show();
          $("#alerta").html(
            `Tiene una multa por pasarse el plazo para devolver un libro. Su cuenta queda restringida y no podrá tomar prestados más libros hasta la fecha ${multaHasta} o hasta que no pague 10€. <button class="btn btn-warning" data-toggle="modal" data-target="#pagarMultaModal" data-toggle="tooltip" data-placement="right" title="Primero debe devolver todos los libros pasados de fecha" id="pagarMulta">Pagar</button>`
          );
          $("#pagarMulta").prop("disabled", false);
          $(".botonPrestar").remove();
        }
      } else {
        $("#alertas").hide();
        $("#alerta").hide();
      }
    }
  );
}

let errorDOM = '.error';

$(function (){


    $(errorDOM).toggle();
    $('#realizarCompra').prop('disabled', true);

    // Validar DNI
    $('#inputDNI').focusout(function() {

        let valor = this.value;
        let dniRegex = new RegExp('^[0-9]{8}[A-z]$');

        // Comprobamos si la letra del DNI es válida
        if (comprobarLetraDNI(valor)) {

            if (!dniRegex.test(valor))
                mostrarError($(this), 'Introduzca un DNI válido');
            else 
                ocultarError($(this));
        }else {
            mostrarError($(this), 'Introduzca un DNI válido');

        }

    });

    // Validar tarjeta de crédito
    $('#inputTarjetaCredito').keyup(function() {

        if ($(this).val().length < 18) {
    
            // Añadimos un espacio cada 4 números
            if ($(this).val().length == 4 || $(this).val().length == 9 || $(this).val().length == 14) $(this).val($(this).val() + ' ');
    
            // Comprobamos el tipo de tarjeta
            if ($(this).val().length >= 5) {
    
                comprobarTipoTarjetaCredito($(this));
    
            }
            
            
        }else {
            $(this).val($(this).val().substring(0, 19));
        }
        
        
    });

    $('#inputTarjetaCredito').focusout(function () {

        let valor = this.value;
        let tarjetaCreditoRegex = new RegExp(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/);

        comprobarTipoTarjetaCredito($(this));

        if (!tarjetaCreditoRegex.test(valor)) {

            let nuevoValor = '';
    
            for (let index = 0; index < $(this).val().length; index++) {
                const element = $(this).val()[index];
                
                if (index == 3 || index == 7 || index == 11) nuevoValor += `${element} `;
                else nuevoValor += element;
    
            }
    
            $(this).val(nuevoValor);
        }
        // mostrarError($(this), 'El número de tarjeta de crédito debe tener el siguiente formato: 1234 5678 1234 5678');
        else 
            ocultarError($(this));



    });
    
    // Validar fecha de caducidad
    $('#inputFechaCaducidad').focusout(function () {

        
        if ($(this)[0].valueAsDate < new Date())
            mostrarError($(this), 'La tarjeta de crédito ha caducado. Introduzca una tarjeta válida');
        else 
            ocultarError($(this));


    });

    // Validar CCV
    $('#inputCCV').focusout(function() {

        let valor = this.value;
        let dniRegex = new RegExp('^[0-9]{3}$');

        if (!dniRegex.test(valor))
            mostrarError($(this), 'Introduzca un CCV válido');
        else 
            ocultarError($(this));


    });

    $('#inputCCV').keyup(function() {

        if ($(this).val().length > 3) $(this).val($(this).val().substring(0, 3));


    });
    
    // Validar errores e inputs sin rellenar
    $('#pagarMultaModal input').focusout(function() {

        let hayError = false;
        let inputEnBlanco = false;

        // Primero comprobamos si hay inputs sin rellenar
        $('#pagarMultaModal input').each(function () {

            if ($(this).val() == '') 
                inputEnBlanco = true;

        });

        // Si el usuario ha rellenado todo, comprobamos que no haya errores
        if (!inputEnBlanco) {

            $('div > .error').each(function () {
    
                if ($(this).css('display') !== 'none' && !hayError) hayError = true;

                $('#realizarCompra').prop('disabled', hayError)
            })
        
        }else {
            $('#realizarCompra').prop('disabled', true)
        }

    })


    $('#realizarCompra').click(function (e) {
        e.preventDefault();

    });

});

function mostrarError(thisObj, error = '') {

    thisObj.parent().find(errorDOM).text(error);
    thisObj.parent().find(errorDOM).show();

}

function ocultarError(thisObj) {

    thisObj.parent().find(errorDOM).hide();


}

function tipoTarjetaCredito(clase) {

    $('#tipoTarjetaCredito').removeClass();
    $('#tipoTarjetaCredito').addClass(`fab fa-cc-${clase}`);
}

function comprobarTipoTarjetaCredito(thisObj) {

    // Comprobamos el tipo de tarjeta
    if (thisObj.val().length >= 5) {
        
        switch(thisObj.val().charAt(5)) {
            
            case '3':
                tipoTarjetaCredito('amex');
                break;
            case '4':
                tipoTarjetaCredito('visa');
                break;
            case '5':
                tipoTarjetaCredito('mastercard');
                break;

            default:
                tipoTarjetaCredito('');
                break;

        }

    }

}

function comprobarLetraDNI(dni) {

    let letra = dni.substring(dni.length - 1).toUpperCase();
    let digitos = parseInt(dni.substring(0, dni.length - 1));

    let letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    return letra == letras.charAt(digitos % 23);

}