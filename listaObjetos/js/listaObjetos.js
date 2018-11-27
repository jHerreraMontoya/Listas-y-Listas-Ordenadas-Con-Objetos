"use strict";
var PersonList = new List();

/*Funciones HTML*/

//función que limpia el formulario
 function cleanData(){
    document.getElementById ('num').value = "" ;  
 }

//Función que se encarga de añadir elementos a la lista
function addPersona(name,surname){
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
        PersonList.add(new Person(name,surname));
	 	list.innerHTML = PersonList.toString();
 	} catch (err) {
 		error.innerHTML = err;
 	}	
} 
 
//Función que se encarga de eliminar elementos de la lista
function removePersona(elem){
    var error = document.getElementById ("error");
    var list = document.getElementById ("list");
    error.innerHTML = "";  
    
     try {
         PersonList.remove(new Person(elem));
         list.innerHTML = PersonList.toString();
     } catch (err) {
         error.innerHTML = err;
     }		
 }
/*JAVASCRIPT*/

//Excepciones
function MyListException() {
    this.name = "MyListException";
    this.message = "Error: List Exception.";
}
MyListException.prototype = new Error();
MyListException.prototype.constructor = MyListException;

function EmptyListException() {
    this.name = "EmptyListException";
    this.message = "Error: The List is empty.";
}
EmptyListException.prototype = new MyListException();
EmptyListException.prototype.constructor = EmptyListException;

function FullListException() {
    this.name = "FullListException";
    this.message = "Error: The List is full.";
}
FullListException.prototype = new MyListException();
FullListException.prototype.constructor = FullListException;

function IndexOutOfBounds() {
    this.name = "IndexOutOfBounds";
    this.message = "Error: Index is out of bounds.";
}
IndexOutOfBounds.prototype = new MyListException();
IndexOutOfBounds.prototype.constructor = IndexOutOfBounds;

function List(size=5) {
    if (!(this instanceof List)) 
		throw new InvalidAccessConstructorException();

    var _list = [];
    
	//Constante número máximo de elementos en el array
	Object.defineProperty(this, 'MAX_ELEM_LIST', {
		value:size,
		writable:false,
		enumerable:true,
		configurable:false
	});

	//Devolvemos si la lista esta vacia
	this.isEmpty = function (){
		return (_list.length === 0);
	} 

	//Devolvemos si la lista esta llena
	this.isFull = function (){
		return (_list.length === this.MAX_ELEM_LIST); 
	} 

    //Devolvemos el tamaño de la lista
    this.size = function () {
        return _list.length;;
    }

    /*Añade un nuevo elemento al final de la lista. Devuelve el tamaño de la lista una vez añadido.*/
    this.add = function (elem) {
        if (this.isFull()) {
            throw new FullListException();
            
        } else {
            _list.push(elem);
            
        }
        return this.size();
    }

    /*Añade un nuevo elemento en la posición especificada en la lista. Devuelve el tamaño de la lista una vez añadido.*/
    this.addAt = function (elem, index) {
        if (this.isFull()) { //Compruebo si la lista esta llena si es asi no puedo meter un nuevo elemento
            throw new FullListException();
        }

        if (index > this.size()) { //Si la posición es menor que el maximo de elementos de la lista 
            throw new IndexOutOfBounds();
        }

        _list.splice([index - 1], 0, elem); //Se le asigna el número que vamos añadir a la variable num

        return this.size(); //Devolvemos el tamaño de la lista
    }


    /*Devuelve el elemento de la lista de la posición indicada.*/
    this.get = function (index) {
        if (index > this.size()) {//Si la pos introducida es menor que 1 o la posición es mayor que el tamaño de la lista
            throw new IndexOutOfBounds(); //Lanzamos la siguiente excepción
        }
        return _list[index - 1]; //Si la posición introducida se encuentra entre el tamaño de la lista retornamos el número que se encuentra en dicha posición 
    }
    /*Devuelve la lista en formato cadena. El delimitador de elementos será “-“.*/
    this.toString = function () {
        return _list.join(" - ");

    }
    /*Devuelve la posición del elemento indicado. Si el elemento no está en la lista devuelve -1.*/
    this.indexOf = function (elem){
        var index;
        
        if(_list.indexOf(elem) != -1){  //Compruebo si el elemento se encuentra en la lista
            index = _list.indexOf(elem)+1; //Si se encuentra devolvemos la posición correspondiente al elemento indicado
        }else{
            index = -1; //Si el elemento no se encuentra devolvemos -1
        }
        
        return index; //Devuelve la posición de la primera aparición de un valor especificado en una cadena.
    }

    /*Devuelve la posición del elemento indicado comenzando por el final. Si el elemento no está en la lista devuelve -1.*/
    this.lastIndexOf = function (elem){
	    var index;
        if(_list.lastIndexOf(elem) != -1){  //Compruebo si el elemento se encuentra en la lista
            index = _list.lastIndexOf(elem)+1; //Si se encuentra devolvemos la posición correspondiente al elemento indicado
        }else{
            index = -1; //Si el elemento no se encuentra devolvemos -1
        }
        
        return index; //Devuelve la posición de la última aparición de un valor especificado en una cadena.
    }
    /*Devuelve el máximo número de elementos que podemos tener en la lista.*/
    this.capacity = function () {
        return this.MAX_ELEM_LIST;
    }

    /*Vacía la lista.*/
	this.clear = function (){
		if (!this.isEmpty(list)){ 
			_list.splice(0, _list.length); //Utilizamos los métodos de array para gestionar la lista
		} 	
    } 
    
    /*Devuelve el primer elemento de la lista*/
    this.firstElement = function () {
        var firstElem;  //Declaramos una variable a la que posteriormente le asignaremos el primer elemento de la lista
        if (this.isEmpty()) { //Comprobamos si la lista se encuentra vacia
            throw new EmptyListException(); //Si la lista se encuentra vacia lanzamos la siguiente excepción
        } else {
            firstElem = _list[0]; //Si la lista no se encuentra vacia le asignamos el primer elemento de la lista a la variable anteriormente declarada
        }
        return firstElem; //Devolvemos el primer elemento de la lista
    }

    /*Devuelve el último elemento de la lista*/
    this.lastElement = function () {
        var lastElem; //Declaramos una variable a la que posteriormente le asignaremos el último elemento de la lista
        if (this.isEmpty()) { //Comprobamos si la lista se encuentra vacia
            throw new EmptyListException(); //Si la lista se encuentra vacia lanzamos la siguiente excepción
        } else {
            lastElem = _list[_list.length - 1];  //Si la lista no se encuentra vacia le asignamos el último elemento de la lista a la variable anteriormente declarada
        }
        return lastElem; //Devolvemos el último elemento de la lista
    }

    /*Elimina el elemento de la posición indicada. Devuelve el elemento borrado.*/
    this.remove = function (index) {
        var elem = _list[index - 1]; //Guardo el elemento en una variable    

        if (index > this.size()) {
            throw new IndexOutOfBounds();
        } else {
            elem = _list.splice(index - 1, 1);
        }
        return elem;  //Devolvemos el elemento que hemos eliminado de la lista
    }

    /*Elimina el elemento indicado de la lista. Devuelve true si se ha podido borrar el elemento, false en caso contrario.*/
    this.removeElement = function(elem){
        var found=false;
        var index = 0;
        if(index>this.size(_list)){
            throw new IndexOutOfBounds();
        }
        var i = 0;
        while(index<this.size(_list) && !found){
            if(_list[i]===elem){
                found=true;
                this.remove(_list,i+1);
            }
            i++;
        }
        return found;
    }

    /*Reemplaza el elemento de la lista indicado por el índice. Devuelve el elemento que estaba anteriormente en la lista.*/
    this.set = function (elem, index) {
        var result;

        if (index > this.size()) {
            throw new IndexOutOfBounds();
        }

        result = _list[index - 1]; //Guardamos en la variable el elemento anterior de la lista para luego devolverlo

        _list[index - 1] = elem; //Sustituyo el elemento antiguo por el nuevo en la posición indicada

        return result;
    }
}
List.prototype = {};
List.prototype.constructor = List;


//Creamos el constructor del objeto persona
function Person(name, surname) {
    this.name = name;        //Declaramos las propiedas del objeto
    this.surname = surname;

    if(!(this instanceof Person)){
        throw new InvalidAccessConstructorException();
    }

    name = typeof name !== 'undefined' ? name : "";
    surname = typeof name !== 'undefined' ? surname : "";
    
    
}
Person.prototype = {};
Person.prototype.constructor = Person; //Creamos la propiedad prototype del constructor del objeto persona

Person.prototype.toString = function () {
    return "Name: " + this.name + ", Surname: " + this.surname;
}

function testList() {
    //Creamos un objeto PersonList de la superclase List()
    var PersonList = new List();

    console.log("¿Esta vacia la lista? "+PersonList.isEmpty());
    console.log("¿Esta llena la lista? "+PersonList.isFull());
    console.log("Capacidad: "+PersonList.capacity());
    console.log("Longitud: "+PersonList.size());
    
    var p1 = new Person ("Jennifer","Herrera"); //Creamos objetos de la subclase Person
    console.log("El tamaño de la lista después de añadir el objeto p1 es: "+PersonList.add(p1));
    console.log(p1.toString());


    var p2 = new Person ("Antonio","Moreno"); //Creamos objetos de la subclase Person
    console.log("El tamaño de la lista después de añadir el objeto p2 es: "+PersonList.add(p2));
    console.log(p2.toString());

    var p3 = new Person("Sandra","Talavera");
    console.log("El tamaño de la lista después de añadir el objeto p3 es: "+PersonList.add(p3));
    console.log(PersonList.toString()); //Mostramos el contenido de la lista

    var p4 = new Person("Javier","Gurtierrez");
    console.log("El tamaño de la lista después de añadir el objeto p4 es: "+PersonList.add(p4));
    console.log("Longitud "+PersonList.size()); //Tamaño de la lista después de añadir objetos
    console.log(PersonList.toString()); //Mostramos el contenido de la lista
    
    console.log("¿Esta vacia la lista? "+PersonList.isEmpty());
    console.log("¿Esta llena la lista? "+PersonList.isFull());

    

    console.log("Primer elemento de la lista: "+PersonList.firstElement());
    console.log("Último elemento de la lista: "+PersonList.lastElement());

    console.log("El elemento en la posición 2 es "+PersonList.get(2));

    console.log("El elemento indicado es el p4 se encuentra en la posición: "+PersonList.indexOf(p4));
    console.log("El elemento indicado es el p2 se encuentra en la posición: "+PersonList.lastIndexOf(p2));

    console.log("El elemento indicado en la posición 2 para eliminar es: "+PersonList.remove(2));
    console.log(PersonList.toString());

    var p5 = new Person("Jesus","Rubio");
    console.log("El tamaño de la lista después de añadir el objeto p5 es: "+PersonList.add(p5));
    console.log("Longitud "+PersonList.size()); //Tamaño de la lista después de añadir objetos
    console.log(PersonList.toString()); //Mostramos el contenido de la lista
    
    console.log("¿Esta vacia la lista? "+PersonList.isEmpty());
    console.log("¿Esta llena la lista? "+PersonList.isFull());
    
    var p6 = new Person("Fernando","Torres");
    console.log("El tamaño de la lista después de añadir el elemento p6 en la posición 2 es de: "+PersonList.addAt(p6,3));
    console.log(PersonList.toString());

    /*console.log("El elemento p3 es el indicado para eliminar: "+PersonList.removeElement(p5));
    console.log(PersonList.toString());*/

}
window.onload = testList;