////////////////////DECLARACION DE VARIABLES////////////////////
let data =[];
let carrito =[];
let cate;
let rd = false;

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

$('input[type=radio][name=cat]').on('change', function() {
    rd = false;
    $.ajax({url:"../data/productsJson.json", datatype:"json", success: callbackJSON})//Se toman los datos del Json para mostrar categoria
  });

////////////////////READY////////////////////

  $( () => {
    rd = true;
    $.ajax({url:"../data/productsJson.json", datatype:"json", success: callbackJSON})//Se toman los datos del Json para mostrar destacados
  })


////////////////////AGREGAR AL CARRITO////////////////////
function agregarCarrito(id){
    let nuevoElemento;
    let color = $(".color"+id).val();
    let talla = $(".talla"+id).val();
    let cntd = parseInt($("#cntd"+id).val());
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
        
}

////////////////////VER AL CARRITO////////////////////
function verCarrito(){
    let compra = 0;
    $(".modal-body div").remove();//se remueve la data enterior
    $(".modal-body").append("<div class='elementoCarrito row'><p class='col-2'>Cantidad</p><p class='col-6'>Descripcion</p><p class='col-2'>Precio Unitario</p><p class='col-2'>Precio Total</p></div>");//cabezal de carrito
    
    if(carrito.length == 0)
        {$(".modal-body").append("<div class='elementoCarrito row justify-content-center'><p>No haz agregado productos a tu carrito</p></div>");//Si no hay productos en carrito
    }   
    else {for(const item of carrito){
        total = item.precio*item.cntd;
        $(".modal-body").append("<div id='"+item.id+"+"+item.color+"+"+item.talla+"' class='elementoCarrito row'><div class='elementoCarrito col-2'><button type='button' class='btn btn-danger' onclick=eliminarProducto('"+item.id+"+"+item.color+"+"+item.talla+"')>X</button><p class='col-2'>"+item.cntd+"</p></div><p class='col-6'>"+item.nombre+" Color "+item.color+" Talla "+item.talla+"</p><p class='col-2'>"+item.precio+"</p><p class='col-2'>"+total+"</p></div>");//productos en carrito
        compra = compra + total;
    }}

    $(".modal-body").append("<div class='elementoCarrito row justify-content-end'><p class='col-2'>Total</p><p class='col-2'>"+compra+"</p></div>");//precio final
}

////////////////////ELIMINAR PRODUCTO DEL CARRITO////////////////////
function eliminarProducto(id){
    let result = id.split("+");//Se trae los datos del elemento a borrar
    for(const item of carrito){//Eliminar elemento
        if(item.id==result[0]&&item.color==result[1]&&item.talla==result[2]){//se consulta si coincide con los datos del elemento a borrar
            let i = carrito.indexOf(item);
            carrito.splice(i,1);//Eliminar elemento
        }
    verCarrito();//Render carrito
    }
}








