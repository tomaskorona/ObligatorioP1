$(document).ready(inicio);

//VARIABLES 
let colaboradores = [];
let recetas = [];
let logeado = null;
let admin = new Administrador("Roberto", "Giordano", "chef", "chef-01");
let ultimoIdReceta = 1;
let ultimoIdColaborador = 1;


function inicio() {
    precargarDatos();
    eventosDeClick();
    mostrarInterfazAnonimo();
    listaColaboradores();
}

function eventosDeClick() {
    $("#btnLogin").click(tomarDatosLogin);
    $("#btnGuardarReceta").click(tomarDatosReceta);
    $("#btnSalir").click(salir);
    $("#btnRegistrar").click(tomarDatosColaborador);
    $("#aReportes").click();
    $("#aRegistrar").click();
    $("#aLista").click();
    $("#aCrear").click();
    $("#btnBuscar").click(datosBuscador);
}

function datosBuscador() {

    $("#pBusqueda").html("")
    let cadena = $("#txtBusqueda").val();
    cadena=cadena.toLowerCase();
    let queIncluye= [];
    
    for (let i = 0; i < recetas.length; i++) {
        if (recetas[i].titulo.toLowerCase().includes(cadena) || recetas[i].receta.toLowerCase().includes(cadena)) {
            queIncluye.push(recetas[i]);
            $("#pBusqueda").html("Receta/Ingrediente encontrado :).");
        }else if(queIncluye.length == 0){
            $("#pBusqueda").html("Receta/Ingrediente no encontrados.");
            $("#btnSalir").show();
        }
    }

    escribirRecetas(queIncluye);
}

function tomarDatosLogin() {

    let usuario = $("#txtUsuario").val();
    let pass = $("#txtPass").val();

    if (usuario == admin.username && pass == admin.pass) {
        logeado = admin;
        $("#pRespuesta").html("Admin Logeado")
        mostrarInterfazAdmin();
    } else {
        let usu = verificarDatosLogin(usuario, pass);
        if (usu != null) {
            logeado = usu;
            $("#pRespuesta").html("Logeado");
            mostrarInterfazCol();
        } else {
            $("#pRespuesta").html("Datos incorrectos.");
        }
    }
}

function salir() {
    logueado = null;
    mostrarInterfazAnonimo();
}


function tomarDatosReceta() {

    titulo = $("#txtTitulo").val();
    duracion = parseInt($("#txtDuracion").val());
    receta = $("#txtReceta").val();
    imagen = $("#fileImagen").val().replace('C:\\fakepath\\', '');

    receta = altaRecetas(ultimoIdReceta, titulo, receta, imagen, duracion, logeado);

    $("#pRecetaSubida").html("Receta subida con exito.");

}


function mostrarInterfazAnonimo() {
    $("#txtUsuario").val("");
    $("#txtPass").val("");
    $("#pRespuesta").html("");
    $("#hBienvenida").html("Bienvenido al sitio de cocina.")
    $("#divIngresarRecetas").hide();
    $("#btnAdmin").hide();
    $("#divLogin").show();
    $("#btnSalir").hide();
    escribirRecetas(recetas);
    $("#divMuro").show();
    $("#divColaboradores").hide();
    $("#divBuscarReceta").show();
    $("#divRegistroColaborador").hide();

}

function mostrarInterfazAdmin() {
    $("#btnSalir").show();
    $("#hBienvenida").html("Bienvenido Administrador, " + admin.nombre + ".")
    $("#btnAdmin").show();
    $("#divMuro").hide();
    $("#divLogin").hide();
    $("#divIngresarRecetas").show();
    $("#divColaboradores").show();
    $("#divBuscarReceta").hide();
    $("#divRegistroColaborador").show();

}

function mostrarInterfazCol() {
    $("#btnSalir").show();
    $("#hBienvenida").html("Bienvenido Colaborador.")
    $("#btnAdmin").hide();
    $("#divMuro").hide();
    $("#divLogin").hide();
    $("#divIngresarRecetas").show();
    $("#divColaboradores").hide();
    $("#divRegistroColaborador").hide();
    $("#divBuscarReceta").hide();


}

function listaColaboradores() {

    $("#tblColaboradores").html("<tr><td>NOMBRE</td><td>APELLIDO</td><td>ESTADO</td><td>DESACTIVAR</td><td>ACTIVAR</td></tr>");
    for (let i = 0; i < colaboradores.length; i++) {
        $("#tblColaboradores").append(`<tr>
                                        <td>${colaboradores[i].nombre}</td>
                                        <td>${colaboradores[i].apellido}</td>
                                        <td>${colaboradores[i].estado}</td>
                                        <td><button id="des${colaboradores[i].username}">Desactivar</button></td>
                                        <td><button id="act${colaboradores[i].username}">Activar</button></td>
                                     </tr>`);
        $("#des" + colaboradores[i].username).click(desactivar);
        $("#act" + colaboradores[i].username).click(activar);
    }
}

function activar() {
    id = this.id;
    nombre = id.substring(3);

    for (let i = 0; i < colaboradores.length; i++) {
        if (colaboradores[i].username == nombre) {
            colaboradores[i].estado = true;
        }
    }
    listaColaboradores();
}

function desactivar() {
    id = this.id;
    nombre = id.substring(3);

    for (let i = 0; i < colaboradores.length; i++) {
        if (colaboradores[i].username == nombre) {
            colaboradores[i].estado = false;
        }
    }
    listaColaboradores();
}


function verificarDatosLogin(nombre, pass) {

    let retorno = null;
    for (let i = 0; i < colaboradores.length; i++) {
        if (colaboradores[i].username == nombre && colaboradores[i].pass == pass && colaboradores[i].estado == true) {
            retorno = colaboradores[i];
        }
    }
    return retorno;
}

function precargarDatos() {
    let u1 = altaColaborador("Marcelo", "Bielsa", "mbielsa", "m-bielsa");
    let u2 = altaColaborador("Ricardo", "Centurion", "rcenturion", "r-centurion");
    let u3 = altaColaborador("Juan", "Riquelme", "jriquelme", "j-riquelme");
    let u4 = altaColaborador("Diego", "Forlan", "dforlan", "d-forlan");
    let u5 = altaColaborador("Abel", "Hernandez", "ahernandez", "a-hernandez");
    let u6 = altaColaborador("Maximiliano", "Gomez", "agomez", "a-gomez");
    u6.estado = false;

    let r1 = altaRecetas(ultimoIdReceta, "Lemon pie", "Ingredientes: <br> -Harina 150gr <br> -Sal <br> -600gr Azucar <br> -Manteca 100gr <br> -Agua 900ml <br> -3 Claras <br> -Escencia de vainilla <br> <br> Procedimiento: <br> Procesar juntos la harina, sal, azúcar y manteca fría. Agregar de a poco el agua helada hasta que se forme una bola. Darle forma de disco (1 cm de espesor), y envolver en film. Llevar a la heladera por 1 hora. Estirar entre dos plásticos o en mesada enharinada. Cuanto más fría esté la masa, más fácil será. Enrollar en el palote y extender sobre la tartera de 22 cm de diámetro o rectangular de aprox 30 x 7 cm. Acomodar bien en el molde, cortar excedentes y pinchar con un tenedor. Precalentar el horno a 180ºC, y mientras enfriar la masa en el freezer. Le ayudará a mantener la forma durante la cocción. Hornear aprox 18 minutos, o hasta que esté dorada. Antes de desmoldar y rellenar, dejar que enfríe bien. <br>", "pastel limon.jpg", "60", u1);
    let r2 = altaRecetas(ultimoIdReceta, "Tarta de fresas", "Ingredientes: <br> -500 g fresa <br> -3 huevos (160 g) <br> -250 ml leche fresca <br> -100 g harina <br> -65 g azúcar + 1 cucharada de azúcar <br> <br> Procedimiento: <br> Precalentar el horno a 180 grados. Limpiar las fresas y espolvorear con la cucharada de azúcar. Dejar reposar. Con ayuda de unas varillas, blanquear ligeramente los huevos con el azúcar. Incorporar la leche y la harina. Engrasar el molde y disponer las fresas . Incorporar la mezcla de la leche, azúcar, harina y huevos. Cocer durante 40 min. aproximadamente. Retirar del molde y espolvorear con azúcar glass. Servir acompañado de nata montada ligeramente azucarada.", "tarta de fresas.jpg", "90", u2);
    let r3 = altaRecetas(ultimoIdReceta, "Pastel De Carne", "Ingredientes: <br> -500 gramos de carne picada <br> -3 o 4 patatas <br> -1 cebolleta <br> -1 pimiento verde <br> -3 o 4 cucharadas de tomate frito <br> -Queso rallado <br> -Sal <br> -Pimienta <br> -Leche <br> -Mantequilla <br> <br> Procedimiento: <br> Comenzamos rehogando la cebolleta y el pimiento verde. Rehogados, agregamos la carne picada y salpimentamos. Dejamos que se cocine bien. Ahora es momento de agregar el tomate frito. Yo normalmente suelo tenerlo casero así que si tenéis la oportunidad de hacer el tomate frito no dudéis en que es mejor. Aquí en este punto podéis echar alguna salsa picante porque yo lo hice y quedo genial el relleno. Retiramos y reservamos. Por otra parte hacemos un puré de patatas casero. Cocemos las patatas y una vez cocidas las mezclamos con mantequilla, sal, pimienta y un chorrito de leche. Tenéis que poner la leche poco a poco hasta que tengamos un puré de patatas de textura media, para que soporte el pastel. Si sale muy líquido se puede “diluir” y queda feo. Montamos el pastel con una capa de puré de patatas, otra de carne y otra de puré de patatas con queso por encima. Lo metemos al horno durante 10 minutos a que se caliente y se gratine el queso.", "pastelCarne.jpg", "90", u3);
    let r4 = altaRecetas(ultimoIdReceta, "Tortilla de papas", "Ingredientes: <br> -6 huevos <br> -3 patatas (600 gr) <br> -1 cebolla pequeña <br> -1 pimiento verde <br> -2 vasos de aceite de oliva <br> -sal <br> -una hoja de perejil <br> <br> Procedimiento: <br> Pela y pica la cebolla en dados medianos. Limpia el pimiento verde, retírale el tallo y las pepitas y córtalo en dados. Si las patatas estuvieran sucias, pásalas por agua. Pélalas, córtalas por la mitad a lo largo y después corta cada trozo en medias lunas finas de 1/2 centímetros.Introduce todo en la sartén, sazona a tu gusto y fríe a fuego suave durante 25-30 minutos.Retira la fritada y escúrrela. Pasa el aceite a un recipiente y resérvalo. Limpia la sartén con papel absorbente de cocina.Casca los huevos, colócalos en un recipiente grande y bátelos. Sálalos a tu gusto, agrega la fritada de patatas, cebolla y pimiento y mezcla bien.Coloca la sartén nuevamente en el fuego, agrega un chorrito del aceite reservado y agrega la mezcla. Remueve un poco con una cuchara de madera y espera (20 segundos) a que empiece a cuajarse.Separa los bordes, cubre la sartén con un plato de mayor diámetro que la sartén y dale la vuelta. Échala de nuevo para que cuaje por el otro lado.", "tortillaPapa.jpg", "30", admin);
    let r5 = altaRecetas(ultimoIdReceta, "Flan", "Ingredientes: <br> -5 huevos <br> -500cc. de leche <br> -200g de azúcar <br> <br> Procedimiento: <br> Lo primero que vamos a hacer es cascar nuestros 5 huevos en un bol y luego, vamos a agregar 100g de azúcar. Batimos un poco hasta romper el ligue de los huevos. Agregamos la leche. Sí, es mucha leche. No se asusten, queda muy líquido, pero se va a formar. Revolvemos con tenedor hasta que esté todo bien incorporado. Tener en cuenta que no hay que batir, no tiene que quedar espumoso, tiene que quedar bien mezclado y nada más, por eso lo hacemos a mano. Una vez que se mezclaron los ingredientes, reservamos. Una vez que tenemos todo armado, vamos a poner agua dentro del recipiente que contiene la flanera para nuestro baño maría y también vamos a ponerle por encima una tapa de papel aluminio para que no se forme costrita. Si no les molesta, pueden no ponerlo también. Así lo vamos a llevar a horno mínimo (160º) por 40 minutos aprox.", "flan.jpg", "60", admin);
    let r6 = altaRecetas(ultimoIdReceta, "Torta de chocolate", "Ingredientes: <br> -2 huevos <br> -8 cucharadas azúcar <br> -16 cucharadas harina <br> -4 cucharadas aceite <br> -c/n agua <br> -8 cucharadas cocoa <br> -2 cucharaditas polvo de hornear <br> <br> Procedimiento: <br> Batimos los huevos con el azúcar y el aceite. Agregamos la harina, el polvo de hornear, y la cocoa, batimos bien y llevamos a horno medio durante 25 o 30 minutos dependiendo del horno. Pinchar con un escarbadientes para verificar que esté lista. Esperar a que enfríe y a disfrutar!.", "chocolate.jpg", "30", u4);
    let r7 = altaRecetas(ultimoIdReceta, "Empanadas de carne", "Ingredientes: <br> -400 g harina <br> -10 g levadura instantánea <br> -1 cucharadita sal <br> -2 cucharadas aceite <br> -Agua tibia <br> Carne picada <br> <br> Procedimiento: Mezclar la harina, la sal y la levadura. Agregar el aceite y la cantidad necesaria de agua. Unir todo y amasar. Para el relleno, cortar la cebolla y el morrón y freír hasta que este dorado. Agregar la carne y esperar que se cocine, condimentar a gusto. Luego formar las empanadas y meter al horno a 200° por 20 minutos.", "empanadaCarne.jpg", "90", u5);
    let r8 = altaRecetas(ultimoIdReceta, "Nuggets de pollo", "Ingredientes: <br> -500 gramos pechuga de pollo <br> -1/4 taza harina <br> -1 cucharadita sal <br> -1/4 cucharadita ajo en polvo <br> -1 pizca pimienta <br> -1/4 taza leche <br> -1 huevo <br> -1/2 taza pan rallado <br> -100 gramos queso rallado <br> -Aceite para freír <br> <br> Procedimiento: <br> Mezclar en un bowl la harina junto con la sal, la pimienta y el ajo en polvo. Si no cuentas con ajo en polvo, puedes usar dos dientes de ajo picados bien chiquitos. En otro bowl, batir el huevo con la leche. Volcar en un recipiente el pan rallado con queso. Corta la pechuga de pollo en trozos iguales. Luego colocar los trozos en el recipiente de la mezcla de harina, empanando bien cada trozo de pollo, que todos queden cubiertos con la mezcla. Luego coloca el pollo en la mezcla de huevo y leche, Por último pásalo por el pan rallado y el queso. Calentar en una sartén el aceite o en una freidora. Colocar las nuggets de pollo y frita hasta que queden bien doradas. Retira las nuggets escurrir bien para que no nos vaya a quedar aceitosa y colócalas en un plato.", "nuggets.jpg", "40", u1);
    let r9 = altaRecetas(ultimoIdReceta, "Galletas de avena", "Ingredientes: <br> -200 grs Azúcar(negra o blanca) <br> -150 ml Aceite <br> -2 Huevos <br> -Ralladura de 1 Limón <br> -2 cdas Miel <br> -1 cdita Esencia de Vainilla <br> -200 grs Harina Leudante o 0000 y cdita de polvo para hornear <br> -300 grs Avena Instantánea <br> <br> Procedimiento: <br> En un bowl incorporar el azúcar con el aceite. Agregar los huevos, la miel, ralladura de limón y la ecencia, integrar todo muy bien. Una vez bien integrados los líquidos, sumarle la harina tamizada en dos partes. Batir suavemente hasta que la harina se haya integrado completamente y luego colocar la avena. Batir nuevamente hasta formar la masa. Llevar la masa(sin sacarla del bowl) a la heladera por 30 minutos a 1hs Este paso permite que la masa este un poco más firme para armar las galletitas. Pasado el tiempo en la heladera, retiran la masa de la misma, (en este momento,precalentar el horno a 180°) y tomar con una cuchara pedacitos de masa para armar los bollitos. Colocarlos en una placa para horno aceitada, aplastarlos suavemente con los dedos un poquito. IMPORTANTE: Dejar distancia entre uno y otro porque se agrandan bastante en el horno. Hornearlas a 180° de 10 a 15 minutos. Se hacen rápido así que estar atentos al horno para que no se quemen.", "avena.jpg", "30", u3);
    let r10 = altaRecetas(ultimoIdReceta, "Brownies", "Ingredientes: <br> -200 gramos de chocolate negro <br> -110 gramos de mantequilla <br> -4 huevos <br> -120 gramos de azúcar <br> -1 cucharada de esencia de vainilla <br> -85 gramos de harina <br> -bicarbonato <br> -Nueces <br> -Pepitas de chocolate <br> <br> Procedimiento: <br> En un bol ponemos el chocolate y la mantequilla. Lo metemos al microondas a temperatura media para que se vaya derritiendo. Una vez derretido lo lo mezclamos muy bien. Ponemos los 4 huevos y el azúcar en un bol. Agregamos la harina y la cucharadita de bicarbonato. Mezclamos muy bien. Agregamos el chocolate que hemos derretido junto con la mantequilla y el toque de vainilla. Seguimos mezclando. Agregamos las nueces y las pepitas de chocolate. En un recipiente de horno ponemos un poco de mantequilla y harina para que no se nos pegue el brownie. Incorporamos la mezcla y cubrimos con unas pepitas y unas nueces (opcional). Introducimos al horno durante 30-35 minutos a 180º.", "brownie.jpg", "50", u1);
    let r11 = altaRecetas(ultimoIdReceta, "Pizza", "Ingredientes: <br> -2 tazas de harina <br> -1 cucharada de polvo de hornear <br> -2 cucharadas de aceite <br> -Agua tibia cantidad necesaria <br> -1 cucharadita de sal <br> 1 cebolla mediana <br> -1 chorro de aceite <br> -4 dientes de ajo <br> -1 morrón chico <br> -3 tomates <br> -Orégano y albahaca <br> <br> Procedimiento: <br> Hacemos la masa y al horno. Vamos a necesitar dos tazas de harina a la que le ponemos 1 cucharada  de polvo de hornear y cernimos bien, hacemos un hueco en el centro y ponemos 1 cucharada de aceite y agua tibia con una cucharadita de sal, formamos una masa bien blanda que colocamos en una asadera untada con aceite y  la estiramos con las manos para cubrir toda la asadera. Ponemos al horno moderado 40 minutos más o menos. Preparamos la salsa, pelamos y picamos 1 cebolla mediana, ponemos en la sarten con un chorro de aceite, rehogamos y agregamos 4 dientes de ajo picado y un morrón chico picado, antes que se dore agregamos 3 tomates picados dejamos cocinar todo  condimentamos con sal y cuando reduzca el líquido agregamos  hojas de albahaca fresca y orégano seco. Antes que la pizza se cocine totalmente la sacamos y ponemos la salsa por arriba y la volvemos al horno hasta terminar la cocción.", "pizza.jpg", "100", u2);
    let r12 = altaRecetas(ultimoIdReceta, "Milanesa de berenjena", "Ingredientes: <br> -1 diente de ajo finamente picado <br> -30 gr de perejil finamente picado <br> -2 huevos harina (la necesaria) <br> -Pan molido (el necesario) <br> -1 berenjena grande <br> -2 cucharadas de sal gruesa <br> -Sal y pimienta a gusto <br> -1 taza de yogur <br> -1 limón (mas su ralladura) <br> -1/4 de taza de aceite de oliva <br> <br> Procedimiento: <br> En un recipiente grande disolver las dos cucharas de sal gruesa en suficiente agua (mínimo 2 litros). Cortar la berenjena en rebanadas de 1.5 cm aproximadamente a lo largo y sumergirlas durante 30 minutos en el agua salada. Picar finamente el ajo y el perejil y mezclarlos con los huevos y un poco de sal. Para que la milanesa quede bien empanizada, lo primero es secar las berenjenas y pasarla por harina, después huevo y por último el pan, si hacen esta sucesión de ingredientes el resultado será perfecto y crujiente. Freír con suficiente aceite y caliente. Es importante que el aceite este bien caliente de lo contrario la fritura absorberá el aceite y quedara grasoso. Si no quieren comer frito también pueden hornearlas y quedan muy sabrosas. En un recipiente mezclar el yogur natural, la ralladura del limón, el jugo de medio limón, el aceite de oliva y salpimentar. Servir las milanesas de berenjena con el yogur a un lado.", "berenjena.jpg", "40", u2);
    let r13 = altaRecetas(ultimoIdReceta, "Scones de queso", "Ingredientes: <br> -2 tazas de Harina (280 gramos) <br> -4 cucharaditas de Polvo de hornear <br> -½ cucharadita de Sal <br> -4 cucharadas de postre de queso rallado <br> -80 gramos de Mantequilla <br> -1 unidad de Huevo <br> -7 cucharadas soperas de Leche <br> <br> Procedimiento: <br> Tamizar los ingredientes secos todos juntos, la harina, el polvo de hornear y la sal. Agregar el queso rallado y la mantequilla fría, desmenuzándola con las manos o un tenedor. Incorporar el huevo y la leche amasando ligeramente para unir la masa. Estirar la masa en una superficie enharinada y hacer tiras de 2 centímetros de espesor más o menos y cortar piezas pequeñas que serán los scones. Colocar los scones de queso sobre una placa de hornear previamente engrasada con mantequilla y pintar los panes con yema de huevo batida. Cocer en el horno precalentado a 200º durante 12 minutos aproximadamente o hasta que se doren. Disfruta de los scones de queso recién hechos con mantequilla, una mermelada casera o solos.", "scon.jpg", "30", u2);
    let r14 = altaRecetas(ultimoIdReceta, "Budin de vainilla", "Ingredientes: <br> -4 huevos <br> -100 gramos de azúcar <br> -100 gramos de harina <br> -1 cucharada de esencia de vainilla <br> <br> Procedimiento: <br> En el boul colocamos las yemas, 2 cucharadas de los 100 gramos de azúcar, la cucharada de esencia de vainilla y batimos. Separamos las claras y las batimos hasta que se crea espuma, le ponemos el resto del azúcar y batimos hasta que se haga crema. Unimod las dos mezclas, le vamos agregando de a poco la harina y batimos hasta que se forme la mezcla y ponemos a precalentar el horno a 180°C durante diez minutos. En un molde previamente enmantecado colocamos la mezcla y lo llevamos al horno durante aproximadamente 40 minutos.", "budin.jpg", "50", u2);
    let r15 = altaRecetas(ultimoIdReceta, "Pan", "Ingredientes: <br> -500 gramos de harina de fuerza <br> -10 gramos de sal <br> -300 ml de agua tibia <br> -5 gramos de levadura fresca o de panadería (la venden en panaderías o en cualquier supermercado en la zona de refrigerados, normalmente junto a la mantequilla) <br> <br> Procedimiento: <br> Antes de nada debemos pesar bien los ingredientes y colocarlos en la mesa para poder ir agregándolos más fácilmente. En bol mezclamos todos los ingredientes. Iniciamos con la harina y la sal. Poco a poco vamos agregando el agua para que se vaya integrando. La levadura fresca la incorporaremos unos minutos antes de terminar el amasado. Formamos una bola y la dejamos reposar un lugar cálido durante 30 minutos con un paño húmedo por encima. Una vez reposado, cortamos la masa con la ayuda de un cuchillo en porciones de 120 gramos. Dejamos reposar las porciones otros 15 minutos encima de la mesa con un paño húmedo por encima. Ponemos un trapo de algodón o una tela de lino, he leído que con un paño de algodón levan perfectamente y a mi me han levado estupendamente con un trapo normal. El horno debe de tener un poco de vapor ya que ayuda a la cocción del pan por eso introduciremos antes de meter las barras de pan un cazo con uno trapos mojados y un poco de agua en el fondo, eso ayudará a que se forme vapor de agua en el horno. Cuando abráis el horno para meter las barritas hacedlo de la manera más rápida posible para que no se escape el vapor de agua. Ahora que el pan está listo para ir al horno (casi debe de haber doblado de volumen), introducimos las barras de pan a una temperatura de 200º durante 15 minutos con calor arriba y abajo. Las sacamos del horno y las dejamos enfriar en una rejilla.", "pan.jpg", "100", admin);
    let r16 = altaRecetas(ultimoIdReceta, "Pascualina", "Ingredientes: <br> -Aceite de oliva Cantidad necesaria <br> -Huevo 1 Unidad <br> -Sal 1 Pizca <br> -Harina 0000 500 g <br> -Agua 200 cc <br> -Cebolla 1 Unidad <br> -Nuez moscada Cantidad necesaria <br> -Queso parmesano rallado 150 g <br> -Sal Cantidad necesaria <br> -Huevo 6 Unidades <br> -Ajo 1 Diente <br> -Ricota 500 g <br> -Pimienta Cantidad necesaria <br> -Espinaca al vapor 500 g <br> <br> Procedimiento: <br> En una batidora, con brazo para amasar, colocamos 500 g de harina 0000, 1 huevo, pizca de sal y 200 cc de agua. Trabajamos la masa hasta que el bollo se despegue del bol de la batidora. Luego, la trabajamos con las manos hasta obtener una masa lisa y suave. Una vez que esté lista, hacemos 8 bollos y llevamos a descansar al frío. Cuando ya estén fríos, estiramos los bollos descansados y apilamos 4 pincelados con aceite de oliva. Estiramos esto hasta lograr la amplitud y el espesor deseado Repetimos esta operación con los 4 bollos restantes. Condimentamos 500 g de ricota con sal, pimienta y nuez moscada. Luego, añadimos 1 cebolla y 1 diente de ajo rehogados y 150 g de queso parmesano rallado. Incorporamos 500 g de espinacas al vapor picadas y 1 huevo. Unimos todo. Forramos un molde con una de las masas estiradas (4 capas) agregamos el relleno, 5 huevos, espolvoreamos con queso rallado, tapar con la masa estirada restante, pincelamos con huevo batido, colocamos una chimenea en el centro y llevamos al horno a 180° por 50 minutos .", "pascua.jpg", "120", u4);
    let r17 = altaRecetas(ultimoIdReceta, "Tortas Fritas", "Ingredientes: <br> -½ kilo de harina leudante <br> -1 cucharada sopera de grasa vacuna o mantequilla <br> -1 vaso de agua templada <br> -½ cucharada de sal <br> -Aceite de girasol <br> <br> Procedimiento: <br> Coloca la harina en un recipiente en forma de corona para agregar en el centro la sal, la grasa o mantequilla y el agua templada. Mezcla muy bien con una cuchara o con ayuda de tus manos hasta obtener una masa suave y homogénea. Envuelve la masa en un paño y deja descansar aproximadamente 15-30 minutos fuera de la nevera. Divide la masa de las tortas fritas en bollos de igual tamaño y estira cada uno de ellos con un palote hasta que queden finos. Hazles un hueco en el centro para que entre el aceite cuando se frían y se cocinen mucho más rápido. Deja las tortas fritas sobre un paño mientras colocas abundante aceite en una sartén. Cuando esté caliente, fríe las tortas de a una con cuidado de no quemarte hasta que se doren de ambos lados. Para ello, deberás darlas vuelta durante la cocción. Retira con una pinza y deja escurrir en papel absorbente para quitar el exceso de aceite.", "frita.jpg", "30", admin);
    let r18 = altaRecetas(ultimoIdReceta, "Alfajor de maicena", "Ingredientes: <br> -150 g de maicena <br> -100 g de harina 0000 <br> -80 g de azúcar <br> -100 g de manteca <br> -2 yemas <br> -1 cucharadita de polvo para hornear <br> -Esencia de vainilla <br> -Dulce de leche <br> -Coco rallado <br> <br> Procedimiento: <br> En un bol de su preferencia, vamos a poner la manteca (a temperatura ambiente), el azúcar y unas gotitas de escencia de vainilla. Vamos a mezclar todo hasta que esté bien incorporado. Pueden utilizar una batidora eléctrica o hacerlo a mano. Una vez que tengamos armada una especie de pomada, vamos a agregar las dos yemas de huevo y vamos a volver a batir. Llegó el momento de incorporar la harina y nuestra protagonista, la maicena. Si pueden hacerlo con un tamizado de por medio, mucho mejor. También vamos a agregar una pizca de polvo para hornear. Ahora sí, vamos a meter mano en el asunto. En el bol hasta que los ingredientes secos esté bastante incorporados con los húmedos y luego vamos a continuar en la mesada hasta que nos quede una masa bien homogénea. Vamos a dejar reposar nuestra masa unos 15 minutos aproximadamente. Pasado este tiempo, las llevamos al horno 180º por aproximadamente 10 minutos. Tengan en cuenta que la temperatura del horno es muy importante para que no queden demasiado secos. Una vez que vean que las tapitas están doraditas, las vamos a sacar. Una vez que estén frías, armamos nuestros alfajores de maicena colocando dulce de leche repostero sobre una tapita y colocando otra por encima. Si lo desean, pueden agregarle el coco rallado por al rededor. ¡Y listo!", "alfa.jpg", "30", u2);
    let r19 = altaRecetas(ultimoIdReceta, "Tarta de manzana", "Ingredientes: <br> -200g. de harina leudante <br> -12 cdas. de azúcar <br> -2 cdas. de coco rallado (opcional) <br> -100g. de manteca <br> -250ml. de leche <br> -2 huevos <br> -3 manzanas <br> -1 puñado de almendras <br> <br> Procedimiento: <br> Mezclar la manteca (debe estar blanda) con la harina, el azúcar y el coco. Hacerlo con la mano o con un tenedor. Quedará un granulado, como arena mojada. Acomodar la mitad de este granulado en una fuente enmantecada (mi papel aluminio es de paranoica nomás). Aplastar, pero no demasiado. Esta será la masa de nuestra tarta de manzana. Colocar sobre el granulado las manzanas, peladas y cortadas. No demasiado finas porque perderán consistencia. Colocar sobre las manzanas el resto del granulado, ahora SIN APLASTAR ni un poquito. Esto es para que luego el huevo penetre bien en él y la tarta de manzana no se desarme. Mezlar los huevos con la leche y volcar, despacio, sobre la tarta de manzana. Despacio eh. La idea es que, de a poco, penetre en el granulado de la parte superior. Este paso es importante ya que si el huevo no penetra bien en la masa, quedará cocido por encima y la tara no quedará bien.  Llover con las almendras machacadas groseramente, un poco de azúcar y más coco rallado (aprox 1 cda. de cada uno). Llevar a horno moderado 40-50 minutos, hasta que la parte de arriba de la tarta de manzana se vea dorada.", "manza.jpg", "90", u2);
    let r20 = altaRecetas(ultimoIdReceta, "Tarta de fiambre", "Ingredientes: <br> -3 huevos <br> -1 taza de leche <br> -10 cucharadas de aceite <br> -12 cucharadas de harina <br> -1 cucharadita de polvo de hornear <br> -1 de sal <br> -200 grs de queso <br> -200 grs de jamón <br> -200 grs de queso cortado en fetas <br> -200 gms de jamón <br> <br> Procedimiento: <br> Ponemos los huevos, aceite y la leche en la licuadora, y luego agregamos la harina mezclada con el polvo de hornear y sal. Posteriormente, ponemos a funcionar la licuadora hasta que quede una masa liquida. Mientras aceitamos y enharinamos un molde mediano, colocamos la mitad de la masa y ponemos el fiambre arriba, para después cubrir con el resto de masa. Llevamos al horno aproximadamente 20 minutos o hasta que vemos que se pone doradita. Con esta masa podemos cambiar el relleno por lo que más nos guste; el fiambre puede ser salame, mortadela o salchichón; y en la masa, unas cucharadas de queso rallado. En fin, al gusto de cada uno.", "fia.jpg", "100", u3);
    let r21 = altaRecetas(ultimoIdReceta, "Pasta frola", "Ingredientes: <br> -2 huevos <br> -1 taza de azucar <br> -2 tazas de harina <br> -100 gramos de manteca <br> -1 cucharadita de vainilla <br> -1 pizca de ralladura de limon <br> -400 gramos de dulce de membrillo <br> -1 cucharadita de escencia de vainilla <br> <br> Procedimiento: <br> Empezaremos la receta de pasta frola casera mezclando en un bol el azúcar con la manteca a temperatura ambiente. Luego, incorpora los huevos uno a uno y ve agregando la harina, la esencia de vainilla y la ralladura de limón o naranja poco a poco.Si quieres prescindir de la manteca, puedes seguir nuestra receta de pasta frola con aceite para sustituirla. Vuelca la mezcla en una superficie enharinada y amasa hasta obtener una masa blanda. Deja reposar la masa de pastafrola tradicional en la nevera por 30 minutos aproximadamente.Truco: Para saber cómo hacer pastafrola perfecta, es preciso indicar que si la masa está muy pegajosa se debe agregar un poco de harina y si está muy seca se añade un poco de leche. Pasado el tiempo de reposo, retira la masa del frigorífico y deja que tome temperatura ambiente. Luego, engrasa y espolvorea con harina un molde para horno. Extiende la masa con los dedos, haciendo la base para la pasta frola fácil casera. Corta el dulce de membrillo en pequeños trozos y aplástalo con un poco de agua caliente o vino dulce hasta que se ablande del todo. En este paso puedes usar un pasapuré o calentarlo un poco para conseguir la textura deseada. Agrega el membrillo sobre la base de masa de pasta frola que ya has preparado, espárcelo bien por todas partes y cúbrelo con tiras de masa para decorar. Finalmente, lleva al horno la receta de pasta frola con membrillo a una temperatura media de 180 ºC durante unos 45 minutos. ¡Listo! Ya puedes disfrutar de esta exquisita tarta acompañado de tus seres queridos. Si te gusta mucho el membrillo, además de utilizarlo para esta receta de pasta frola fácil y económica, también puedes echarle un vistazo a la receta de los pastelitos de membrillo y queso, una delicia.", "frola.jpg", "45", u6);

    r1.meGusta = 30;
    r1.noMeGusta = 10;

    r2.meGusta = 150;
    r2.noMeGusta = 30;

    r3.meGusta = 50;
    r3.noMeGusta = 10;

    r4.meGusta = 100;
    r4.noMeGusta = 14;

    r5.meGusta = 150;
    r5.noMeGusta = 30;

    r6.meGusta = 10;
    r6.noMeGusta = 15;

    r7.meGusta = 25;
    r7.noMeGusta = 10;

    r8.meGusta = 124;
    r8.noMeGusta = 20;


    r9.meGusta = 91;
    r9.noMeGusta = 3;

    r10.meGusta = 14;
    r10.noMeGusta = 25;

    r11.meGusta = 15;
    r11.noMeGusta = 55;

    r12.meGusta = 163;
    r12.noMeGusta = 21;

    r13.meGusta = 12;
    r13.noMeGusta = 30;

    r14.meGusta = 122;
    r14.noMeGusta = 90;

    r15.meGusta = 13;
    r15.noMeGusta = 40;

    r16.meGusta = 90;
    r16.noMeGusta = 55;

    r17.meGusta = 50;
    r17.noMeGusta = 8;

    r18.meGusta = 62;
    r18.noMeGusta = 11;

    r19.meGusta = 142;
    r19.noMeGusta = 30;

    r20.meGusta = 84;
    r20.noMeGusta = 20;

    r21.meGusta = 11;
    r21.noMeGusta = 48;

}


function tomarDatosColaborador() {

    $("#pRegistroColaborador").html("");

    let nombre = $("#txtRegistroNombre").val();
    let apellido = $("#txtRegistroApellido").val();
    let pass = verifiacionPass(nombre, apellido);
    let username = verificacionUsername(nombre, apellido);

    colaborador = altaColaborador(nombre, apellido, username, pass);


    $("#pRegistroColaborador").html("Colaborador creado con exito. <br> Username= " + username + "<br> Password= " + pass);

    listaColaboradores();
}

function verifiacionPass(n, a) {

    pass = null;

    for (let i = 0; i < colaboradores.length; i++) {
        if (n !== colaboradores[i].nombre && a !== colaboradores[i].apellido) {
            pass = n.charAt(0).toLowerCase() + "-" + a.toLowerCase();
        } else if (colaboradores[i].nombre.charAt(0) == n.charAt(0) && colaboradores[i].apellido.charAt(0) == a.charAt(0)) {
            pass = n.charAt(0).toLowerCase() + "-" + a.toLowerCase();
        }
    }
    return pass;

}

function verificacionUsername(n, a) {
    let username = null;
    let usernamesId = 1;

    for (let i = 0; i < colaboradores.length; i++) {
        if (n.charAt(0) !== colaboradores[i].nombre.charAt(0) && a !== colaboradores[i].apellido) {
            username = n.charAt(0).toLowerCase() + a.toLowerCase();
        } else if (colaboradores[i].nombre.charAt(0) == n.charAt(0) && colaboradores[i].apellido.charAt(0) == a.charAt(0)) {
            username = n.charAt(0).toLowerCase() + a.toLowerCase() + usernamesId++;
        }
    }
    return username;

}

function altaColaborador(unNombre, unApellido, unUsername, unPass) {
    let nuevoColaborador = new Colaborador(unNombre, unApellido, unUsername, unPass);
    colaboradores.push(nuevoColaborador);
    ultimoIdColaborador++;
    return nuevoColaborador;
}

function altaRecetas(unId, unTitulo, unaReceta, unaImagen, unaDuracion, unCreador) {
    let nuevaReceta = new Recetas(unId, unTitulo, unaReceta, unaImagen, unaDuracion, unCreador);
    recetas.push(nuevaReceta);
    ultimoIdReceta++;
    return nuevaReceta;
}

function escribirRecetas(unaLista) {

    $("#divMuro").html("");

    for (let i = 0; i < unaLista.length; i++) {
        $("#divMuro").append(`<div>
                                <h2>${unaLista[i].titulo}</h2>
                                <h4 id="idReceta">${unaLista[i].id}</h4>
                                <img src="img/${unaLista[i].imagen}" alt="IMAGEN" width="300" height="300">
                                <p class="duracion"><strong>${unaLista[i].duracion + " minutos"}</strong></p>
                                <p>
                                ${unaLista[i].receta}
                                </p>
                                <p id="likes">
                                ${unaLista[i].meGusta}
                                <button id="btnSimg${unaLista[i].id}">Me gusta</button>
                                |
                                <button id="btnNomg${unaLista[i].id}">No me gusta</button>
                                ${unaLista[i].noMeGusta}
                              </p>
                                </div>`);
        $("#btnSimg" + unaLista[i].id).click(megustear);
        $("#btnNomg" + unaLista[i].id).click(nomegustear);
    }
}

function megustear() {
    let id = this.id;
    let recetabuscadaid = id.substring(7)

    for (let i = 0; i < recetas.length; i++) {
        if (recetas[i].id == recetabuscadaid) {
            recetas[i].meGusta++;
        }
    }
    escribirRecetas(recetas);
}

function nomegustear() {
    let id = this.id;
    let recetabuscadaid = id.substring(7)

    for (let i = 0; i < recetas.length; i++) {
        if (recetas[i].id == recetabuscadaid) {
            recetas[i].noMeGusta++;
        }
    }
    escribirRecetas(recetas);
}


