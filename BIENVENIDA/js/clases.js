class Administrador{
    constructor(unNombre,unApellido,unUsername,unPass){
        this.nombre=unNombre;
        this.apellido=unApellido;
        this.username=unUsername;
        this.pass=unPass;
        this.estado=true;
        this.rol="admin"; 
    }
}

class Colaborador{  
    constructor(unNombre,unApellido,unUsername,unPass){
        this.nombre=unNombre;
        this.apellido=unApellido;
        this.username=unUsername;
        this.pass=unPass;
        this.estado=true;
        this.rol="Usuario";
    }
}

class Recetas{
    constructor(unId,unTitulo,unaReceta,unaImagen,unaDuracion,unCreador){
        this.id=unId;
        this.titulo=unTitulo;
        this.receta=unaReceta;
        this.imagen=unaImagen;
        this.duracion=unaDuracion;
        this.meGusta=0;
        this.noMeGusta=0;
        this.puntuacion=0;
        this.creador=unCreador;
    }
}