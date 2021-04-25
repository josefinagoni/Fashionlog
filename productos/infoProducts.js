let listadoProducts = {
    lista: [
        {
            id: 1,
            nombre: "Campera Zara",
            descripcion: "Campera de Jean color Azul con tachas",
            estado: "Usada",
            cover:"/images/producto1.jpeg"
            
        },
        {
            id: 2,
            nombre: "Campera Rapsodia",
            descripcion: "Campera de cuero negra con mangas tres cuartos",
            estado: "Usada",
            cover:"/images/producto2.jpeg"
            
        },
        {
            id: 3,
            nombre:"Pantalon Zara",
            descripcion: "Pantalon de cuero original con abertura al final",
            estado: "Casi nuevo",
            cover:"/images/producto3.jpeg"
        },
        {
            id: 4,
            nombre: "Campera Mango",
            descripcion:"Campera de Jean color negra",
            estado: "Nueva con etiqueta",
            cover:"/images/producto4.jpeg"
        },
        {
            id: 5,
            nombre: "Remera Forever XXI",
            descripcion: "Remera negra trasnparente con detalles de piedras",
            estado: "Nueva con etiqueta",
            cover: "/images/producto5.jpeg"
        },
        {
            id: 6,
            nombre: "Jean Abercrombie",
            descripcion:"Jean azul recto con corte en rodilla",
            estado:"Nuevo sin etiqueta",
            cover:"/images/producto6.jpeg"
        },
        {
            id: 7,
            nombre: "Joggin Uniqlo",
            descripcion: "Joggin verde militar basico",
            estado: "Casi nuevo",
            cover: "/images/producto7.jpeg"
        },
        {
            id: 8,
            nombre: "Sweater Bershka",
            descripcion: "Sweater gris corto con peludito",
            estado: "Usado",
            cover: "/images/producto8.jpeg"
        },
        {
            id: 9,
            nombre: "Borcegos Prune",
            descripcion: "Borcegos negros acharolados",
            estado: "Usado",
            cover: "/images/producto9.jpeg"
        },
        {
            id: 10,
            nombre: "Cartera Kralice",
            descripcion: "Cartera color rosa con tonos claros",
            estado: "Usado",
            cover: "/images/producto10.jpeg"
        },
    ],
   porNombre: function(nombre){
    let respuesta = [];
    this.lista.forEach(element => {
        if (element.nombre.toLowerCase().includes(nombre.toLowerCase())) {
            respuesta.push(element)
        }
        
    });
    return respuesta;

    }

};
 
module.exports = listadoProducts;