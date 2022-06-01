//arreglos para evaluacion
const propuestas = [{}]
var costosPT = [{}];
//creacion del nodo
class nodo {
    //constructor para inicializar el nodo
    constructor() {
            //inicializar variables 
            this.izquierdo = null;
            this.derecho = null;
            this.indice;
            this.nivel;
            this.dato;
        }
        //set dato es un metodo que nos permite asignar un dato al nodo
        //para este caso dato seria un valor "encapsulado" entre comillas pq JS hace sus cosas 
    setDato(dato) {
        this.dato = dato;
    }
}

//clase para el arbol sin constructor significa que se crea uno por defecto
class arbol {
    //asigna el presupuesto a la raiz
    setRaiz(Presupuesto) {
        //definiri raiz
        this.raiz = new nodo(); //crear nodo raiz
        this.raiz.setDato(parseFloat(Presupuesto)); //declarar el dato de la raiz
        this.raiz.indice = parseFloat(Presupuesto); //declarar el indice de la raiz
        this.raiz.nivel = 1;

        //declarar nodo hijo izquierdo de la raiz
        this.raiz.izquierdo = new nodo(); //declarar nodo izquierdo duplicado
        this.raiz.izquierdo.indice = Presupuesto - 10; //declarar indice
        this.raiz.izquierdo.dato = Presupuesto; //declarar dato duplicado
        this.raiz.nivel = 2;

        //declarar nodo hijo derecho de la riaz
        this.raiz.derecho = new nodo(); //declarar nodo derecho duplicado
        this.raiz.derecho.indice = parseFloat(Presupuesto) + parseFloat(10); //declarar inidice
        this.raiz.derecho.dato = Presupuesto; //declarar dato duplicado
        this.raiz.derecho.nivel = 2;
    }

    //guardar el costo de la propuesta en el arbol para su futura evalucacion
    setDesicion(alternativa, costofijo, costovariable) {
        let ct = alternativa * costovariable * 200000; //guardar costo variante
        let cf = parseFloat(ct) + parseFloat(costofijo); // guardar costo de la propuesta
        propuestas.push({ costoPropuesta: cf }); // guardar en el arreglo de propuestas que se encuentra en la parte de arriba
        //con push podemos añadir datos sin necesidad de un idex ya que añade los datos uno despues del siquiente
    }

    //evaluar las propuestas guardadas y acomodarlas
    Evaluar() {
        //variable para costos totales de cada propuesta
        let Ie = 1;
        //calcular costos totales antes de su acomodacion
        for (let index = 1; index < propuestas.length; index++) {
            if (index == 2 || index == 4) continue; // continue saltea una iteracion del bucle
            if (index == 6) break; // break rompe el bucle
            //sacar costos de propuesta en variable a y b
            const element = propuestas[index];
            let elementtemp = propuestas[index + 1]
            let nuevo = new nodo();
            //calcular costo total
            costosPT.push(nuevo)
                //sumar las 2 variantes de propuestas para calcular el total
            costosPT[Ie].setDato(parseFloat(element.costoPropuesta) + parseFloat(elementtemp.costoPropuesta));
            Ie++;
        }

        let e = 1; // bucle para evaluar las hojas del arbol 
        for (let index = 1; index < propuestas.length; index++) {
            //hacer que el bucle solo se ejecute 3 veces es decir las 3 propuestas de cada arbol
            if (index == 2 || index == 4) continue; // continue saltea una iteracion del bucle
            if (index == 6) break; // break rompe el bucle
            const primero = propuestas[index]; //tomar el primer dato de la propuesta
            let segundo = propuestas[index + 1] //tomar el segundo dato de propuesta

            //evaluar hojas del arbol es decir acomodarlas en sus nodos
            // determina a donde se ira cada hoja del arbol es decir la variante de la propuesta
            if (primero.costoPropuesta > segundo.costoPropuesta) {
                costosPT[e].izquierdo = new nodo() // crea el nuevo nodo para asignarlo 
                costosPT[e].izquierdo.setDato(primero.costoPropuesta); // asigna la variante de la propuesta al nodo izquierdo
                costosPT[e].nivel = 3; // asigna el nivel 
                costosPT[e].derecho = new nodo(); // crea el nuevo nodo 
                costosPT[e].derecho.setDato(segundo.costoPropuesta); // asigna la vriante de la propuesta al nodo derecho
            } else { // lo mismo que arriba solo que invertido
                costosPT[e].izquierdo = new nodo();
                costosPT[e].izquierdo.setDato(segundo.costoPropuesta);
                costosPT[e].derecho = new nodo();
                costosPT[e].derecho.setDato(primero.costoPropuesta);
            }
            //e funciona como index para poder acceder a los nodos de las propuestas de costosPT[]
            //e solo se ejecuta el numero de veces que se ejecuta el bucle como arriba delimitamos su ejecucion 
            //entonces e solamente se ejecuta 3 veces
            e++;
        }

        //calcular al mayor
        //cada if verifica si un dato es menor a los demas en el caso de que lo encuentre lo toma y lo imprime como la mejor opcion
        if (costosPT[1].dato < costosPT[2].dato && costosPT[3].dato < costosPT[3].dato) {
            console.log("la propuesta mas optima es la de " + costosPT[1].dato + "Primera propuesta")
        } else if (costosPT[2].dato < costosPT[1].dato && costosPT[2].dato < costosPT[3].dato) {
            console.log("la propuesta mas optima es la de " + costosPT[2].dato + "Segunda propuesta")
        } else if (costosPT[3].dato < costosPT[2].dato && costosPT[3].dato < costosPT[1].dato) {
            console.log("la propuesta mas optima es la de " + costosPT[2].dato + "Tercera propuesta")
        }
        //asiignar los nodos ya creados es decir los sub arboles a la raiz
        //la palabra reservada this significa este entonces estamos hablando de la raiz que se encuentra en la clase
        this.raiz.izquierdo.izquierdo = costosPT[1];
        this.raiz.izquierdo.derecho = costosPT[2];
        this.raiz.derecho.izquierdo = costosPT[3];


    }
}

//funcion recursiva (es decir que se ejecuta a si misma cierta cantidad de veces)
//esta funcion sirve para imprimir el arbol binario
const inOrden = (raiz) => {
    if (raiz.izquierdo != null) {
        inOrden(raiz.izquierdo)
    }
    console.log(" | " + raiz.dato + " | ")
    if (raiz.derecho != null) {
        inOrden(raiz.derecho)
    }
}

//funcion para ejecutar el programa
function click() {
    arbolito = new arbol(); //creacion del arbol arbolito (uso de la palabra reservada new que significa nuevo)
    arbolito.setRaiz(document.getElementById("presupuesto").value); //(set raiz es una funcon de arbolito)
    //primera desicion
    arbolito.setDesicion( // setDesicion es una funcion de arbolito que añade las desiciones
        //tomamos todos los datos de las tablas
        document.getElementById("Alternativa_1a").value,
        document.getElementById("Costo_Fijo_1a").value,
        document.getElementById("Costo_Variable_1a").value
    );
    //primera desicion segunda variable
    arbolito.setDesicion(
        document.getElementById("Alternativa_1b").value,
        document.getElementById("Costo_Fijo_1b").value,
        document.getElementById("Costo_Variable_1b").value
    );
    //segunda desicion
    arbolito.setDesicion(
        document.getElementById("Alternativa_2a").value,
        document.getElementById("Costo_Fijo_2a").value,
        document.getElementById("Costo_Variable_2a").value
    );
    //segunda desicion segunda variable
    arbolito.setDesicion(
        document.getElementById("Alternativa_2b").value,
        document.getElementById("Costo_Fijo_2b").value,
        document.getElementById("Costo_Variable_2b").value
    );
    //tercera desicion
    arbolito.setDesicion(
        document.getElementById("Alternativa_3a").value,
        document.getElementById("Costo_Fijo_3a").value,
        document.getElementById("Costo_Variable_3a").value
    );
    //tercera desicion segunda variable
    arbolito.setDesicion(
        document.getElementById("Alternativa_3b").value,
        document.getElementById("Costo_Fijo_3b").value,
        document.getElementById("Costo_Variable_3b").value
    );
    //llamar a la funcion evaluar
    arbolito.Evaluar();
    //llamar a la funcion recursiva in orden y asignarle la raiz
    inOrden(arbolito);
    //imprimir ya pq ps ya acabamos 
    console.log("ya")
}