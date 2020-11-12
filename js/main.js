function productos(id, nombre, precio, categoria, color, talla){
   this.id = id;
   this.nombre = nombre;
   this.precio = precio;
   this.categoria = categoria;
   this.color = color;
   this.talla = talla;
    
}

function borrarElemento(){
    let borrarElemento = $("#productos div");
    borrarElemento.remove();
 }

var data =[];
var cate;

function callbackJSON(resp, state){
    borrarElemento();
    data =[];
    if(state === "success"){
        for (const i of resp) {
            data.push(i);
        }
    
        console.log(data);
        cate = $('input:radio[name=cat]:checked').val();
        console.log(cate);
        var salida;

       
        data.forEach(item => {

            if(cate===item.categoria){
            
                let salida = document.createElement("div")
                salida.className = 'vista';
                $("#productos").append(salida);
                console.log("se creo elemento div");


                salida = document.createElement("p");
                salida.textContent = item.nombre;
                $(".vista:last-child").append(salida);

                salida = document.createElement("p");
                salida.textContent = item.precio;
                $(".vista:last-child").append(salida);


                salida = document.createElement("div")
                salida.className = 'color';
                $("div.vista:last-child").append(salida);

                item.Color.forEach(element => {
                    salida = document.createElement("p");
                    salida.textContent= element;
                    $(".vista:last-child div.color").append(salida);
                });

                salida = document.createElement("div")
                salida.className = 'talla';
                $("div.vista:last-child").append(salida);

                item.Talla.forEach(element => {
                    salida = document.createElement("p");
                    salida.textContent= element;
                    $(".vista:last-child div.talla").append(salida);
                });

            }
        })
}
}

$("#listaProductos").click(function(){
    $.ajax({url:"../data/productsJson.json", datatype:"json", success: callbackJSON})
 })



