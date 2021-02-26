$(document).ready(() => {
  
  //Mostrar libros
  $.get("/biblioteca/php/libros.php", function (data) {
    
    html = "";
    for (i = 0; i < data.message.length; i++) {
      html =
        html +
        `<tr>
            <td><img src='${data.message[i].imagenLibro}' style='max-height:100px'></td>
            <td>${data.message[i].tituloLibro}</td>
            <td>${data.message[i].autorLibro}</td>
            <td>A</td>
        </tr>`;
    }
    if(data.status==500 ){
      html='';
    }
    html=html+'</tbody>';
    $("#libros").append(html);
  });

  //
});
