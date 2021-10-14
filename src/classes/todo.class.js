export class Todo
{
    static fromJson( {id, descripcion, completado, creado} )
    {
        const tempTodo = new Todo( descripcion );
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }
    constructor( descripcion )
    {
        this.descripcion = descripcion;

        this.id          = new Date().getTime();
        this.completado = false;
        this.creado      = new Date();
        

    }

}