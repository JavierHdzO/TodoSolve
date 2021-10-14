import { todoList } from "../index";
import { Todo, TodoList } from "../classes";

const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnClear      = document.querySelector('.clear-completed');
const ulFilters     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const pendientesID  = document.querySelector('#pendientesID'); 


export const crearTodoHtml = ( todo ) => 
{
    
    const htmlTodo = `
    <li class="${ todo.completado?'completed':''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${todo.completado? 'checked': ''}>
        <label>${todo.descripcion}</label>
        <button class="destroy"></button>
    </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );

    

    return div.firstElementChild; //Regresa el primer hijo de ese elemento HTML

}

txtInput.addEventListener('keyup', ( event )=>{

    if( event.keyCode === 13 && txtInput.value.length > 0)
    {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInput.value = ''; // recupera o modifica el valor de un input


        
    }

});

divTodoList.addEventListener('click', ( event ) => {
    //target regresa el elemento HTML que fue presionado
    //localName regresa el nombre del elementos
    const nombreElemento    = event.target.localName ; 
    //retorna el padre el elemento HTML que le indiques
    const todoElemento      = event.target.parentElement.parentElement;
    //getAttribute obtiene el valor del atributo que le especifiques.
    const todoId            = todoElemento.getAttribute('data-id');


    //includes retorna un booleano si es que el elemento incluye lo especificado
    if( nombreElemento.includes('input') ) //Click en el check
    {
        todoList.toogleTodo( todoId );
        todoElemento.classList.toggle('completed'); 
        //toggle si tiene una clase la quita, si no la tiene la pone


    }
    else if( nombreElemento.includes('button'))
    {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento ); //Remuve al hijo que parezca


    
    }

    

});


/**  Elimar todos los Todos */
btnClear.addEventListener('click', ( ) => {
    todoList.eliminarCompletados()
    
    for( let i = divTodoList.children.length -1; i >=0; i--)
    {
        const elemento = divTodoList.children[i];
      
        if(elemento.classList.contains('completed'))
        {
            divTodoList.removeChild(elemento);
        }
    }
 

});



/* Ver los Todos por filtros> Pendientes, completados y todos */
ulFilters.addEventListener( 'click', ( event )=>{

    const filter = event.target.text;
    if( !filter ) { return; };

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children)
    {
        elemento.classList.remove('hidden');
        const completado =  elemento.classList.contains('completed');

        switch(filter)
        {
            case 'Pendientes':
                if (completado)
                {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if (!completado)
                {
                    elemento.classList.add('hidden');
                }
            break;

            
        }
    }

});

