var NUMBER_OF_ELEMENTS = 7; //ziemia, mars, jowisz, słońce, fiflok, gwiazda, wybuch
var SPECIAL_NOE = 3; //pion, poziom, plusik; NOE - Number Of Elements

let SPECIAL_PROBABILITY = 0.05;

let map = []; //static

class Element{
    constructor(x, y){
        this.x = x,
        this.y = y,
        this.special = Math.random()<SPECIAL_PROBABILITY;
        //type takes values from 0 to NUMBER_OF_ELEMENTS-1 for planets, and -SPECIAL_NOE to -1 (included) for specials (... , -2, -1)
        if(special){
            let number = Math.ceil(Math.random()*SPECIAL_NOE);
            this.type = -number;
            this.className = "special" + number;
        }
        else{
            let number = Math.floor(Math.random()*NUMBER_OF_ELEMENTS);
            this.type = number;
            this.className = "planet" + number;
        }

        
    }
}

function generateMap(x, y){
    for(let i=0;i<x;i++){
        //create column
        map.push([])
        for(let j=0;j<y;j++){
            //create cell
            map[i].push(new Element(i, j))
        }
    }
    
}

function renderMap(x, y){
    let mapDiv = document.getElementById("map");
    for(let i=0;i<x;i++){
        //create column
        let column = document.createElement("div");
        column.classList.add("column");
        for(let j=0;j<y;j++){
            //create cell
            let cell = document.createElement("div");
            cell.classList.add("cell", map[i][j].className);            
        }
        mapDiv.appendChild(column);
    }
}

function checkAlign(){

}