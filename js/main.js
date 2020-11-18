////////////////////DECLARACION DE VARIABLES////////////////////
let data =[];
let carrito =[];
let cntdcarrito=0;
let cate;
let rd = false;

////////////////////VISTAS////////////////////
const index = `<!--CATEGORIA-->
<div class='col-3'>
    <div class='categoria'>
        <h2>Categorias:</h2>
        <form>
            <div>
                <input type='radio' id='jeans' onchange=cambiarCategoria() name='cat' value='Jeans'>
                <label for='Jeans'>Jeans</label>
            </div>
            <div>
                <input type='radio' id='tops' onchange=cambiarCategoria() name='cat' value='Tops'>
                <label for='Tops'>Tops</label>
            </div>
            <div>
                <input type='radio' id='camperas' onchange=cambiarCategoria() name='cat' value='Camperas'>
                <label for='Camperas'>Camperas</label>
            </div>
            <div>
                <input type='radio' id='camisas' onchange=cambiarCategoria() name='cat' value='Camisas'>
                <label for='Camisas'>Camisas</label>
            </div>
            <div>
                <input type='radio' id='remeras' onchange=cambiarCategoria() name='cat' value='Remeras'>
                <label for='Remeras'>Remeras</label>
            </div>
            <div>
                <input type='radio' id='joggins' onchange=cambiarCategoria() name='cat' value='Joggins'>
                <label for='Joggins'>Joggins</label>
            </div>
            <div>
                <input type='radio' id='blusas' onchange=cambiarCategoria() name='cat' value='Blusas'>
                <label for='Blusas'>Blusas</label>
            </div>
            <div>
                <input type='radio' id='sweaters' onchange=cambiarCategoria() name='cat' value='Sweaters'>
                <label for='Sweaters'>Sweaters</label>
            </div>
        </form>
    </div>
</div>
<!--FIN CATEGORIA-->
<!--PRODUCTOS-->
<div class ='col-9' id='productos'>
</div>
<!--FIN PRODUCTOS-->
`
const comprar =`
<div class="comprar col-12">
<div class="col-12 align-self-center">
<h1>Completa tu compra</h1>
</div>
<div class="facturaDatos">
<div id="factura" class="col-6"></div>
<div id="datos" class="col-6">

<form class="datosCliente">

            
                <div class="form-row">
                  <div class="col">
                    <label for="firstName">Nombre</label>
                    <input type="text" class="form-control" id= "firstName" placeholder="Nombre">
                  </div>
                  <div class="col">
                    <label for="lasttName">Apellido</label>
                    <input type="text" class="form-control" id= "lastName" placeholder="Apellido">
                  </div>
                </div>
              


            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Direccion</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="Calle, numero, Edificio, Departamento">
            </div>
            <div class="form-row">
              <div class="form-group col-md-8">
                <label for="inputCity">Ciudad</label>
                <input type="text" class="form-control" id="ciudad" placeholder="Indique CABA o GBA">
              </div>
              <div class="form-group col-md-4">
                <label for="inputZip">Codigo Postal</label>
                <input type="text" class="form-control" id="postal" placeholder="Codigo Postal">
              </div>
            </div>
            <div class="form-group col-md-12"></div>
            <button onclick=confirmar() type="button" class="btn btn-success">Confirmar Compra</button>
            </div>
          </form>

</div>
</div>
</div>
`


////////////////////DECLARACION DE FUNCIONES GENERICAS////////////////////
function borrarElemento(elemento){
    let borrarElemento = $(elemento);
    borrarElemento.remove();
 }

function crearTag(tag, clase, padre){
    let salida = document.createElement(tag)
    salida.className = clase;
    $(padre).append(salida);
}

function crearElemento(tag, contenido, padre){
    let salida = document.createElement(tag);
    salida.textContent = contenido;
    $(padre).append(salida)
}

function crearElementoSelect(tag, contenido, padre){
    let salida = document.createElement(tag);
    salida.className = contenido;
    salida.textContent = contenido;
    $(padre).append(salida)
    $("." + contenido).attr("value", contenido);
}

function agregarImagen(id){
    var image = new Image();

    var src = "img/"+id+".jpg"; 
    image.src = src;
    image.className = "img-fluid"
    $('.vista:last-child').append(image);
}

function cantidad(id){
 const cantidad = "<div class='containerCntd'><p>Cantidad</p><select class='form-control' id="+id+"><option class='1'>1</option><option class='2'>2</option><option class='3'>3</option><option class='4'>4</option><option class='5'>5</option></select></div>"
 $(".vista:last-child").append(cantidad);
}





////////////////////RENDER PRODUCTOS POR CATEGORIA Y JASON(AJAX)////////////////////
function callbackJSON(resp, state){
    borrarElemento("#productos div");
    data =[];
    if(state === "success"){
        for (const i of resp) data.push(i);//Se guarda en data todo el jason
        
        cate = $('input:radio[name=cat]:checked').val();//Se toma la categoria seleccionada
        data.forEach(item => {
            if(rd == false && cate === item.categoria || rd && item.destacado){//Si el producto coincide en la categoria seleccionada se renderiza
                crearTag("div", 'vista', "#productos");//Se crea un div para la tarjeta del producto
                crearElemento("h2", item.nombre, ".vista:last-child");//nombre
                agregarImagen(item.id);//imagen
                crearElemento("h2", "$"+item.precio, ".vista:last-child");//precio
                crearTag("div", 'containerColor', ".vista:last-child");//se crea contenedor de area de seleccion de color
                crearElemento("p", "Color", "div.vista:last-child div.containerColor");//texto color
                crearTag("select", "form-control color"+item.id, "div.vista:last-child div.containerColor");//se crea un select para la seleccion de color
                item.Color.forEach(element => {crearElementoSelect("option", element, ".vista:last-child select.color"+item.id)});//colores
                crearTag("div", 'containerTalla', ".vista:last-child");//se crea contenedor de area de seleccion de talla
                crearElemento("p", "Talla", "div.vista:last-child div.containerTalla");//texto talla
                crearTag("select", "form-control talla"+item.id, "div.vista:last-child div.containerTalla");//se crea un select para la seleccion de talla
                item.Talla.forEach(element => {crearElementoSelect("option", element, ".vista:last-child select.talla"+item.id)});//tallas
                cantidad("cntd"+item.id);//Seleccion de cantidad
                $(".vista:last-child").append("<button onclick=agregarCarrito('"+item.id+"') type='button' class='btn btn-warning' id="+item.id+"'>Agregar al Carrito</button>" ); //agregar al carrito 
            }
        })
}
}

//$("input[type=radio][name=cat]").on('change', function() {
    function cambiarCategoria() {
    rd = false;
    $.ajax({url:"../data/productsJson.json", datatype:"json", success: callbackJSON})//Se toman los datos del Json para mostrar categoria
    }
    ////});

  ////////////////////READY////////////////////

  function navbar(){
    $("body div nav ul").remove();
    $("body div nav").append("<ul class='navbar-nav mr-auto barra'><li class='nav-item'><a class='nav-link ColorText' href=#'><button type='button'  class='btn' onclick=verIndex()><img src='img/logo.png' alt='charmclothes' class='img-fluid rounded-lg'></button></a></li><li class='nav-item'><p>"+cntdcarrito+"</p><button type='button'  class='btn' onclick=verCarrito()  data-toggle='modal' data-target='#modalCarrito'><img src='img/carrito.png' alt='carrito' class='img-fluid rounded-lg'></button></li></ul>");
  }

function verIndex(){
    rd = true;
    navbar();
    $("#index_comprar div").remove();
    $("#index_comprar").append(index);
    $.ajax({url:"../data/productsJson.json", datatype:"json", success: callbackJSON})//Se toman los datos del Json para mostrar destacados
}

  $( () => {
    verIndex();
    })

   

  


////////////////////AGREGAR AL CARRITO////////////////////
function agregarCarrito(id){
    let nuevoElemento;
    let color = $(".color"+id).val();
    let talla = $(".talla"+id).val();
    let cntd = parseInt($("#cntd"+id).val());
    cntdcarrito = cntdcarrito + cntd;
    let precio;
    let nombre;
    data.forEach(item => {
        if(item.id == id) {
            precio = item.precio;
            nombre = item.nombre
        }
    })//tomamos los datos de la tarjeta del producto
    nuevoElemento = {id,nombre,precio,color,talla,cntd};//Se crea una variable con los datos para incluir en el carrito

    let flag=false;
    carrito.forEach(item => {
        if(item.id == id && item.talla == talla && item.color == color ) {
            item.cntd=item.cntd+cntd;//si el producto ya esta en el carrito, solo se actualiza la cantidad
            flag = true;
        }
    })
    if(!flag){
        carrito.push(nuevoElemento);//si el producto NO esta en el carrito, se agrega
    }
    navbar();   
}

////////////////////VER AL CARRITO////////////////////
function renderCarrito(padre){
    let compra = 0;
    $(padre+" div").remove();//se remueve la data enterior
    $(padre).append("<div class='elementoCarrito row'><p class='col-2'>Cantidad</p><p class='col-6'>Descripcion</p><p class='col-2'>Precio Unitario</p><p class='col-2'>Precio Total</p></div>");//cabezal de carrito
    
    if(carrito.length == 0)
        {$(padre).append("<div class='elementoCarrito row justify-content-center'><p>No haz agregado productos a tu carrito</p></div>");//Si no hay productos en carrito
    }   
    else {for(const item of carrito){
        total = item.precio*item.cntd;
        if(padre === ".modal-body") $(padre).append("<div id='"+item.id+"+"+item.color+"+"+item.talla+"' class='elementoCarrito row'><div class='elementoCarrito col-2'><button type='button' class='btn btn-danger' onclick=eliminarProducto('"+item.id+"+"+item.color+"+"+item.talla+"')>X</button><p class='col-2'>"+item.cntd+"</p></div><p class='col-6'>"+item.nombre+" Color "+item.color+" Talla "+item.talla+"</p><p class='col-2'>"+item.precio+"</p><p class='col-2'>"+total+"</p></div>");//productos en carrito
        else $(padre).append("<div id='"+item.id+"+"+item.color+"+"+item.talla+"' class='elementoCarrito row'><div class='elementoCarrito col-2'><p class='col-2'>"+item.cntd+"</p></div><p class='col-6'>"+item.nombre+" Color "+item.color+" Talla "+item.talla+"</p><p class='col-2'>"+item.precio+"</p><p class='col-2'>"+total+"</p></div>");//productos en carrito
        compra = compra + total;
    }}

    $(padre).append("<div class='elementoCarrito row justify-content-end'><p class='col-2'>Total</p><p class='col-2'>"+compra+"</p></div>");//precio final


}

function verCarrito(){
    renderCarrito(".modal-body");
    }


////////////////////ELIMINAR PRODUCTO DEL CARRITO////////////////////
function eliminarProducto(id){
    let result = id.split("+");//Se trae los datos del elemento a borrar
    for(const item of carrito){//Eliminar elemento
        if(item.id==result[0]&&item.color==result[1]&&item.talla==result[2]){//se consulta si coincide con los datos del elemento a borrar
            cntdcarrito = cntdcarrito - item.cntd;
            let i = carrito.indexOf(item);
            carrito.splice(i,1);//Eliminar elemento
        }
        renderCarrito(".modal-body");//Render carrito
    navbar();
    }
}

////////////////////CERRAR COMPRA////////////////////

function confirmar(){
    let nombre = $("#firstName").val();
    let apellido = $("#lastName").val();
    let mail = $("#inputEmail4").val();
    let direccion = $("#inputAddress").val();
    let ciudad = $("#ciudad").val();
    let postal = $("#postal").val();

    if(carrito.length == 0) alert("Aun no haz agregado productos a tu compra")
    else(alert(nombre+" "+apellido+" Gracias por tu compra, en breve nos pondremos en contacto con vos, enviaremos tu pedido a "+direccion+" "+ciudad));
    
}

function mostrarVenta(){
    renderCarrito("#factura");
}

function concretar(){
    $("#index_comprar div").remove();
    $("#index_comprar").append(comprar);
    mostrarVenta();
}








