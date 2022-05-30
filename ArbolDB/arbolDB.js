


const propuestas = [{}] 
var costosPT = [{}];
class nodo {
    constructor(){
        this.izquierdo = null;
        this.derecho = null;
        this.indice;
        this.nivel;
        this.dato;
    }
    setDato(dato){
        this.dato = dato;
    }
}

class arbol{
    setRaiz(Presupuesto){
        //definiri raiz
        this.raiz = new nodo();//crear nodo raiz
        this.raiz.setDato(parseFloat(Presupuesto));//declarar el dato de la raiz
        this.raiz.indice = parseFloat(Presupuesto);//declarar el indice de la raiz
        this.raiz.nivel = 1;

        //declarar nodo hijo izquierdo de la raiz
        this.raiz.izquierdo = new nodo();//declarar nodo izquierdo duplicado
        this.raiz.izquierdo.indice = Presupuesto - 10;//declarar indice
        this.raiz.izquierdo.dato = Presupuesto;//declarar dato duplicado
        this.raiz.nivel = 2;

        //declarar nodo hijo derecho de la riaz
        this.raiz.derecho = new nodo();//declarar nodo derecho duplicado
        this.raiz.derecho.indice = parseFloat(Presupuesto) + parseFloat(10);//declarar inidice
        this.raiz.derecho.dato = Presupuesto;//declarar dato duplicado
        this.raiz.derecho.nivel = 2;
    }

    //guardar el costo de la propuesta en el arbol para su futura evalucacion
    setDesicion(alternativa, costofijo, costovariable){
        let ct = alternativa * costovariable * 200000;
        let cf = parseFloat(ct) + parseFloat(costofijo);
        propuestas.push({costoPropuesta: cf});
    }

    //evaluar las propuestas guardadas y acomodarlas
    Evaluar(){
        //variable para costos totales de cada propuesta
        
        let Ie = 1;
        //calcular costos totales antes de su acomodacion
        for (let index = 1; index < propuestas.length; index++) {
            if(index == 2 || index == 4) continue;
            if(index == 6) break;
            //sacar costos de propuesta en variable a y b
            const element = propuestas[index];
            let elementtemp = propuestas[index + 1]
            let nuevo = new nodo();
            //calcular costo total
            costosPT.push(nuevo)
            costosPT[Ie].setDato(parseFloat(element.costoPropuesta) + parseFloat(elementtemp.costoPropuesta));
            Ie++;
        }
        
        let e = 1;// identificador para costosPT
        for (let index = 1; index < propuestas.length; index++) {
            if(index == 2 || index == 4) continue;
            if(index == 6) break;
            const primero = propuestas[index];
            let segundo = propuestas[index + 1]
            //evaluar hojas del arbol
            if(primero.costoPropuesta > segundo.costoPropuesta){
                costosPT[e].izquierdo = new nodo()
                costosPT[e].izquierdo.setDato(primero.costoPropuesta);
                costosPT[e].nivel = 3;
                costosPT[e].derecho = new nodo();
                costosPT[e].derecho.setDato(segundo.costoPropuesta); 
            }
            else{
                costosPT[e].izquierdo = new nodo();
                costosPT[e].izquierdo.setDato(segundo.costoPropuesta);
                costosPT[e].derecho = new nodo();
                costosPT[e].derecho.setDato(primero.costoPropuesta); 
            }
            e++;
        }
        /* ordenacion */
        //costosPT = sortItems(costosPT);
        /*
        for (let index = 1; index < costosPT.length; index++) {
            //asignar indicies 
            if (index == 1) {
                costosPT[index].indice = this.raiz.dato - 15
            }
            if (index == 2) {
                costosPT[index].indice = this.raiz.dato - 5
            }
            if (index == 3) {
                costosPT[index].indice = parseFloat(this.raiz.dato) + parseFloat(5)
            }

            //Declarar nuevo nodo que sera añadido al arbol
            let nuevo = costosPT[index];
            //Declarar variables para recorrer el arbol binario
            let anterior = null, recorre = this.raiz
            //Evaluar destino del nuevo nodo
            while (recorre != null) {
                anterior = recorre
                recorre = (nuevo.indice > recorre.indice) ? recorre.izquierdo : recorre.derecho
            }
            if (nuevo.indice > anterior.indice) {
                anterior.derecho = nuevo;
            }
            else {
                anterior.izquierdo = nuevo;
            }
        }*/

        
        //acomodar datos
        this.raiz.izquierdo.izquierdo = costosPT[1];
        this.raiz.izquierdo.derecho = costosPT[2];
        this.raiz.derecho.izquierdo = costosPT[3];
        /*
       var impresion = "";
       inOrden(this.raiz);
       document.getElementById("ayuda").value = impresion 
       */
    }
}
/*
const inOrden = (raiz) => {
    if(raiz.izquierdo != null){
        inOrden(raiz.nodohi)
    }
    impresion += " | " + raiz.dato + " | ";
    if(raiz.nodohd != null){
        inOrden(raiz.derecho)
    }
}*/

const click = () =>{
    arbolito = new arbol();
    arbolito.setRaiz(document.getElementById("presupuesto").value);
    //primera desicion
    arbolito.setDesicion(
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
    arbolito.Evaluar();
    console.log("ya")
}
