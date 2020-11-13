////////////////////DECLARACION DE VARIABLES////////////////////
let data =[];
let cate;

////////////////////DECLARACION DE VARIABLES GENERICAS////////////////////
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
    $(padre).append(salida);
}

////////////////////RENDER PRODUCTOS POR CATEGORIA////////////////////
function callbackJSON(resp, state){
    borrarElemento();
    data =[];
    if(state === "success"){
        for (const i of resp) {
            data.push(i);//Se guarda en data todo el jason
        }
        cate = $('input:radio[name=cat]:checked').val();//Se toma la categoria seleccionada
        data.forEach(item => {
            if(cate===item.categoria){//Si el producto coincide en la categoria seleccionada se renderiza
                crearTag("div", 'vista', "#productos");//Se crea un div para la tarjeta del producto
                crearElemento("p", item.nombre, ".vista:last-child");//nombre
                crearElemento("p", item.precio, ".vista:last-child");//precio
                crearTag("div", 'color', "div.vista:last-child");//se crea un div para la seleccion de color
                item.Color.forEach(element => {
                    crearElemento("p", element, ".vista:last-child div.color")});//color
                crearTag("div", 'talla', "div.vista:last-child");//se crea un div para la seleccion de talla
                item.Talla.forEach(element => {
                    crearElemento("p", element, ".vista:last-child div.talla")});//talla
            }
        })
}
}

////////////////////RENDER PRODUCTOS POR CATEGORIA Y JASON(AJAX)////////////////////
$("#listaProductos").click(function(){
    $.ajax({url:"../data/productsJson.json", datatype:"json", success: callbackJSON})//Se toman los datos del Json
 })



