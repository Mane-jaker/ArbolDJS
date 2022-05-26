//Jorge Brandon Chandomi Esponda Arbol Binario

//clase nodo para el arbol binario
class nodo {
    //Constructor para añadir el dato a la raiz
    constructor(dato) {
        this.dato = dato
    }
    setNDH(nodoDH) {
        this.nodohd = nodoDH
    }
    setNHI(nodoHI) {
        this.nodohi = nodoHI
    }
    getDato() {
        return this.Dato;
    }
}

class arbol {
    //construcor del arbol binario
    constructor(Raiz) {
            this.Raiz = new nodo(Raiz)
            this.Raiz.nodohd = new nodo(Raiz)
            this.Raiz.nodohi = new nodo(Raiz)
        }
        //añadir nuevo dato al arbol binario 
    anadir(dato) {
        //Declarar nuevo nodo que sera añadido al arbol
        let nuevo = new nodo(dato)
            //Declarar variables para recorrer el arbol binario
        let anterior = null,
            recorre = this.Raiz
            //Evaluar destino del nuevo nodo
        while (recorre != null) {
            anterior = recorre
            recorre = (dato > recorre.dato) ? recorre.nodohd : recorre.nodohi
        }
        if (dato > anterior.dato) {
            anterior.setNDH(nuevo)
        } else {
            anterior.setNHI(nuevo)
        }
    }
}
//imprimir arbol binario en orden
const inOrden = (raiz) => {
        if (raiz.nodohi != null) {
            inOrden(raiz.nodohi)
        }
        console.log(" | " + raiz.dato + " | ")
        if (raiz.nodohd != null) {
            inOrden(raiz.nodohd)
        }
    }
    //imprimir arbol binario en pre orden
const preOrden = (raiz) => {
        console.log(" | " + raiz.dato + " | ")
        if (raiz.nodohi != null) {
            preOrden(raiz.nodohi);
        }
        if (raiz.nodohd != null) {
            preOrden(raiz.nodohd);
        }
    }
    //imprimir arbol binario en post orden
const postOrden = (raiz) => {
    if (raiz.nodohi != null) {
        postOrden(raiz.nodohi)
    }
    if (raiz.nodohd != null) {
        postOrden(raiz.nodohd)
    }
    console.log(" | " + raiz.dato + " | ");
}