////////////////////DECLARACION DE VARIABLES////////////////////
let data =[];
let cate;

////////////////////DECLARACION DE FUNCIONES GENERICAS////////////////////
function borrarElemento(){
    let borrarElemento = $("#productos div");
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




////////////////////RENDER PRODUCTOS POR CATEGORIA////////////////////
function callbackJSON(resp, state){
    borrarElemento();
    data =[];
    if(state === "success"){
        for (const i of resp) data.push(i);//Se guarda en data todo el jason
        
        cate = $('input:radio[name=cat]:checked').val();//Se toma la categoria seleccionada
        data.forEach(item => {
            if(cate===item.categoria){//Si el producto coincide en la categoria seleccionada se renderiza
                crearTag("div", 'vista', "#productos");//Se crea un div para la tarjeta del producto
                crearElemento("p", item.nombre, ".vista:last-child");//nombre
                agregarImagen(item.id);//imagen
                crearElemento("p", "$"+item.precio, ".vista:last-child");//precio
                crearTag("div", 'containerColor', ".vista:last-child");//se crea contenedor de area de seleccion de color
                crearElemento("p", "Color", "div.vista:last-child div.containerColor");//texto color
                crearTag("select", 'form-control color', "div.vista:last-child div.containerColor");//se crea un select para la seleccion de color
                item.Color.forEach(element => {crearElementoSelect("option", element, ".vista:last-child select.color")});//colores
                crearTag("div", 'containerTalla', ".vista:last-child");//se crea contenedor de area de seleccion de talla
                crearElemento("p", "Talla", "div.vista:last-child div.containerTalla");//texto talla
                crearTag("select", 'form-control talla', "div.vista:last-child div.containerTalla");//se crea un select para la seleccion de talla
                item.Talla.forEach(element => {crearElementoSelect("option", element, ".vista:last-child select.talla")});//tallas
                cantidad("#cntd"+item.id);//Seleccion de cantidad
                $(".vista:last-child").append("<button onclick=restarAlContador('"+item.id+"') type='button' class='btn btn-warning' id="+item.id+"'>Agregar al Carrito</button>" ); //agregar al carrito 
            }
        })
}
}

////////////////////RENDER PRODUCTOS POR CATEGORIA Y JASON(AJAX)////////////////////
$("#listaProductos").click(function(){
    $.ajax({url:"../data/productsJson.json", datatype:"json", success: callbackJSON})//Se toman los datos del Json
 })


////////////////////AGREGAR AL CARRITO////////////////////
function restarAlContador(id){
}
