var NUMBER_OF_ELEMENTS = 7; //ziemia, mars, jowisz, słońce, fiflok, gwiazda, wybuch
var SPECIAL_NOE = 3; //pion, poziom, plusik; NOE - Number Of Elements

let SPECIAL_PROBABILITY = 0.05;

let clicked_tiles = 0;
let first_click = [0,0];

let map = []; //static

class Element{
    x;
    y;
    selected;
    htmlElement;
    special;
    type;
    className;

    constructor(x, y){
        this.x = x,
        this.y = y,
        this.selected = false,
        this.htmlElement = null,
        this.special = Math.random()<SPECIAL_PROBABILITY;
        //type takes values from 0 to NUMBER_OF_ELEMENTS-1 for planets, and -SPECIAL_NOE to -1 (included) for specials (... , -2, -1)
        if(this.special){
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

    click(){
        let checked = checkClick(this);
        if(checked){
            if(!this.selected){
                this.htmlElement.classList.add("selected")
                clicked_tiles++;
            }
            else{ //reset if double-click
                clicked_tiles--;
                this.htmlElement.classList.remove("selected");
            }
            this.selected = !this.selected; 
            
            if(clicked_tiles==2){
                swap(this);
                checkAlign();
            }
            
        }  
        console.log(clicked_tiles)
    }
}

function swap(element){
    let element2 = map[first_click[0]][first_click[1]]
    let x1 = element.x, y1 = element.y, x2 = element2.x, y2 = element2.y;

    element2.x = x1;
    element2.y = y1;

    element.x = x2;
    element.y = y2;

    
    map[x2][y2] = element;
    map[x1][y1] = element2;

    console.log(element)
    console.log(element2)

    element.htmlElement.innerHTML = element2.type;
    element2.htmlElement.innerHTML = element.type;
}

function checkClick(element){
    let i = element.x;
    let j = element.y;

    if(clicked_tiles>1)
        return false;
    else if(clicked_tiles==1){
        if(i==first_click[0] && first_click[1]==j){
            return true;
        }
        else if(map[i][j].type<0){ //special clicked
            return false;
        }
        else {
            if((Math.abs(first_click[0]-i)==1 && Math.abs(first_click[1]-j)==0) ||(Math.abs(first_click[0]-i)==0 && Math.abs(first_click[1]-j)==1)){
                return true;
            }
            else{
                return false;
            }
        }
    }
    else if(clicked_tiles==0){
        if(map[i][j].type<0){ //special clicked
            return true;
        }
        else{
            first_click = [i,j];
            return true;
        }

    }
    else return false;

}

function generateMap(){
    for(let i=0;i<x;i++){
        //create column
        map.push([])
        for(let j=0;j<y;j++){
            //create cell
            map[i].push(new Element(i, j))
        }
    }    
}

function renderMap(){
    let mapDiv = document.getElementById("map");
    for(let i=0;i<x;i++){
        //create column
        let column = document.createElement("div");
        column.classList.add("column");
        for(let j=0;j<y;j++){
            //create cell
            let cell = document.createElement("div");
            cell.classList.add("cell", map[i][j].className);      
            cell.innerHTML = map[i][j].type;     
            cell.addEventListener("click", ()=>map[i][j].click(map[i][j])); 
            map[i][j].htmlElement = cell;
            column.appendChild(cell);
        }
        mapDiv.appendChild(column);
    }
}

function checkAlign(){
    let elementsMatch = false, verticalyAligned = false, horizontalyAligned = false;
    for(let i=0;i<x;i++){
        for(let j=0;j<y;j++){
            //create cell
            let k=1, l=1;
            let prevtype = map[i][j].type;
            elementsMatch = false, verticalyAligned = false, horizontalyAligned = false;
            while(!elementsMatch && i+k<x){
                if(map[i+k][j].type>0 && map[i+k][j].type==prevtype){
                    k+=1;
                }
                else{
                    if(k>=3){
                        horizontalyAligned = true;
                    }
                    elementsMatch = true;
                }
            }
            elementsMatch = false;
            while(!elementsMatch && j+l<y){
                if(map[i][j+l].type>0 && map[i][j+l].type==prevtype){
                    l+=1;
                }
                else{
                    if(l>=3){
                        verticalyAligned = true;
                    }
                    elementsMatch = true;
                }
            }
            if(verticalyAligned){
                console.log("foundV", i, j, l);
                break; 
            }
            if(horizontalyAligned){
                console.log("foundH", i, j, k);
                break;                
            }
            
        }
        
    }
}