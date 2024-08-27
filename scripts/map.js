class Maze{
    constructor(mazeContainer_selector, mazeMap, solvePath, startIndex, goalIndex){
        this.mazeContainer = document.querySelector(mazeContainer_selector);
        this.mazeBlocks = undefined;
        this.mazeMap = mazeMap;
        this.solvePath = solvePath;
        this.startIndex = startIndex;
        this.goalIndex = goalIndex;
        this.blocksRCindex = []
    }

    createMaze(rows, cols){
        // create maze structure
        let row_template_str = "auto";
        let col_template_str = "auto";
        for (let col = 1; col < cols; col++) {
            col_template_str += " auto";
        }
        for (let row = 1; row < rows; row++) {
            row_template_str += " auto";
        }
        this.mazeContainer.style.gridTemplateColumns = col_template_str;
        this.mazeContainer.style.gridTemplateRows = row_template_str;

        //add block numbers to each maze block and add styles to mazeblocks
        for (let i = 0; i < rows*cols; i++) {
            const maze_block = document.createElement("div");
            maze_block.classList.add("maze-block");
            maze_block.innerHTML = `<div class="maze-block-text">${i}</div>`;
            if (this.mazeMap[i] === 1){
                maze_block.classList.add("wall");
            }
            this.mazeContainer.appendChild(maze_block);
        }
        this.mazeBlocks = this.mazeContainer.querySelectorAll(".maze-block");

        // specify the text of start and goal maze_block
        // let maze_block_text = this.mazeContainer.querySelectorAll(".maze-block");
        this.mazeBlocks[this.startIndex].innerText = "شروع";
        this.mazeBlocks[this.goalIndex].innerText = "هدف";
        this.mazeBlocks[this.startIndex].classList.add("maze_start");
        this.mazeBlocks[this.goalIndex].classList.add("maze_end");
    }

    addMazeSolveFunctionality(explain_obj, explain_container){
        const parrentEl = this.mazeContainer.parentElement;
        const nextStepBtn =parrentEl.querySelector(".next_step");
        const prevStepBtn = parrentEl.querySelector(".prev_step");
        let mazeSolverProgressIndex = 0;
        const explain_container_el = document.querySelector(explain_container);
        // add functionality to next btn
        nextStepBtn.addEventListener('click', () =>{
            if (this.solvePath[mazeSolverProgressIndex] != this.goalIndex){
                prevStepBtn.disabled = false;
                this.mazeBlocks[this.solvePath[mazeSolverProgressIndex]].classList.add("maze-solve-path-block", "blink");
                mazeSolverProgressIndex += 1;
                if(this.solvePath[mazeSolverProgressIndex] in explain_obj){
                    explain_container_el.innerText = explain_obj[this.solvePath[mazeSolverProgressIndex]];
                }

            }
            else{
                nextStepBtn.disabled = true;
            }
        });
        // add functionality to prev btn
        prevStepBtn.addEventListener('click', ()=>{
            if (this.solvePath[mazeSolverProgressIndex] != this.startIndex){
                nextStepBtn.disabled = false;
                this.mazeBlocks[this.solvePath[mazeSolverProgressIndex]].classList.remove("maze-solve-path-block", "blink");
                mazeSolverProgressIndex -= 1;
                if(this.solvePath[mazeSolverProgressIndex] in explain_obj){
                    explain_container_el.innerText = explain_obj[this.solvePath[mazeSolverProgressIndex]];
                }
            }else{
                prevStepBtn.disabled = true;
            }
        });

    }

    addAstarMazeSolveFunctionality(explain_obj, explain_container, hDistanceObject, manhatanDistanceOBJ){
        const parrentEl = this.mazeContainer.parentElement;
        const nextStepBtn =parrentEl.querySelector(".next_step");
        const prevStepBtn = parrentEl.querySelector(".prev_step");
        let mazeSolverProgressIndex = 0;
        const explain_container_el = document.querySelector(explain_container);
        const solvePath = this.solvePath;
        const mazeBlocks = this.mazeBlocks;
        const goalIndex = this.goalIndex;
        const startIndex = this.goalIndex;
        // add functionality to next btn
        nextStepBtn.addEventListener('click', () =>{
            if (solvePath[mazeSolverProgressIndex] != goalIndex){
                prevStepBtn.disabled = false;
                mazeBlocks[solvePath[mazeSolverProgressIndex]].classList.add("maze-solve-path-block", "blink");
                if (solvePath[mazeSolverProgressIndex] in hDistanceObject){
                    mazeBlocks[solvePath[mazeSolverProgressIndex]].innerText = `${hDistanceObject[solvePath[mazeSolverProgressIndex]]} + ${manhatanDistanceOBJ[solvePath[mazeSolverProgressIndex]]}`;
                }
                mazeSolverProgressIndex += 1;
                if(solvePath[mazeSolverProgressIndex] in explain_obj){
                    explain_container_el.innerText = explain_obj[solvePath[mazeSolverProgressIndex]];
                }

            }
            else{
                nextStepBtn.disabled = true;
            }
        });
        // add functionality to prev btn
        prevStepBtn.addEventListener('click', ()=>{
            if (solvePath[mazeSolverProgressIndex] != startIndex){
                nextStepBtn.disabled = false;
                mazeBlocks[solvePath[mazeSolverProgressIndex]].classList.remove("maze-solve-path-block", "blink");
                if (solvePath[mazeSolverProgressIndex] in hDistanceObject){
                    mazeBlocks[solvePath[mazeSolverProgressIndex]].innerText = `${hDistanceObject[solvePath[mazeSolverProgressIndex]]} + ${manhatanDistanceOBJ[solvePath[mazeSolverProgressIndex]]}`;
                }
                mazeSolverProgressIndex -= 1;
                if(solvePath[mazeSolverProgressIndex] in explain_obj){
                    explain_container_el.innerText = explain_obj[solvePath[mazeSolverProgressIndex]];
                }
            }else{
                prevStepBtn.disabled = true;
            }
        });

    }

    clearSolvePath(){
        const maze_blocks = this.mazeBlocks;
        let index = 0;
        for(let step of this.solvePath){
            maze_blocks[step].classList.remove("maze-solve-path-block", "blink");
            maze_blocks[step].innerText = "";
            index++;
            
        }
    
    }
    clearMaze(){
        for (let index = 0; index < this.mazeBlocks.length; index++) {
            this.mazeBlocks[index].classList.remove("manhatan-distanc-path");
            
        }
    }

    sleep(time) { 
        return new Promise((resolve) => setTimeout(resolve, time)); 
    } 

    showSolvePath(show_steps_index=true){
        const maze_blocks = this.mazeContainer.querySelectorAll(".maze-block");
        let index = 0;
        for(let step of this.solvePath){
            maze_blocks[step].classList.add("maze-solve-path-block", "blink");
            if(show_steps_index){
                maze_blocks[step].innerText = `${index}`;
            }
            
            index++;
        }
        
    
    }


    async showSolvePath_animated(animate_time_s=0.1){
        this.clearSolvePath();
        const maze_blocks = this.mazeContainer.querySelectorAll(".maze-block");
        let index = 0;
        for(let step of this.solvePath){
            maze_blocks[step].classList.add("maze-solve-path-block", "blink");
            maze_blocks[step].innerText = `${index}`;
            index++;
            await this.sleep(animate_time_s * 1000);
        }
        
        this.mazeContainer.parentElement.querySelector(".goal-find-text").classList.add("show");
        this.mazeContainer.parentElement.querySelector(".goal-find-text").innerText= "هدف پیدا شد";


    }

    
    async playSolvePath(animate_time_s){
        const showSplvePathBtn = this.mazeContainer.parentElement.querySelector(".play-maze");
        showSplvePathBtn.addEventListener('click', async () =>{
            this.mazeContainer.parentElement.querySelector(".goal-find-text").classList.remove("show");
            this.disabled = true;
            await this.showSolvePath_animated(animate_time_s);
            
        });

    }

    showHuristicDistance(hDistanceObject){
        const block_texts = this.mazeContainer.querySelectorAll(".maze-block");
        let index;
        let bts_length = block_texts.length;
        for (index = 1; index < bts_length; index++) {
            if (index.toString() in hDistanceObject){
                block_texts[index].innerHTML = hDistanceObject[`${index}`];
                block_texts[index].style.color = "#161614";
                block_texts[index].style.fontWeight = "bold";

            }
            
        }
    }

    
    calculateManhatanDsitance(cols, distance_obj){
        for (let mazeIndex in this.mazeMap){
            
            if (this.mazeMap[mazeIndex] === 0){
                this.mazeBlocks[mazeIndex].addEventListener('click',async () =>{
                    this.clearMaze();

                    // horizontal path
                    for (let i = 1; i < (mazeIndex % cols)+1; i++) {
                        await this.sleep(100);
                        this.mazeBlocks[mazeIndex-i].classList.add("manhatan-distanc-path");
                    }
                    // vertical path
                    const verticalLength = Math.floor(mazeIndex / cols)+1;
                    for (let j = 0; j < verticalLength; j++) {
                        this.mazeBlocks[(mazeIndex-j*cols)-(mazeIndex % cols)].classList.add("manhatan-distanc-path");  
                        await this.sleep(100);
                    }
                    this.mazeBlocks[mazeIndex].innerText = distance_obj[`${mazeIndex}`];
                    this.mazeBlocks[mazeIndex].style.color = "#161614";
                    this.mazeBlocks[mazeIndex].style.fontWeight = "bold";

                    await this.sleep(1000);
                    for (let i = 1; i < (mazeIndex % cols)+1; i++) {
                        this.mazeBlocks[mazeIndex-i].classList.remove("manhatan-distanc-path");
                    }
                    // vertical path
                    for (let j = 0; j < Math.floor(mazeIndex / cols)+1; j++) {
                        this.mazeBlocks[(mazeIndex-j*cols)-(mazeIndex % cols)].classList.remove("manhatan-distanc-path");  
                    }

                });
            }
        }
    }

    changeColorOfBlocks(blockIndexes, colors){
        for (let index = 0; index < blockIndexes.length; index++) {
            console.log(blockIndexes[index]);
            this.mazeBlocks[blockIndexes[index]].style.backgroundColor = `${colors[index]}`;    
        }
    }

    arrowStyle(block){
        block.style.color = "var(--dark)";
        block.style.fontSize = "16px";
        block.style.lineHeight = "16px";
        block.style.fontWeight = "bolder";
    }
    showArrow(arrow_type, block_index){
        let value = "";
        if(arrow_type === "up"){
            value = "<span>&#8593;</span>";
        }
        else if(arrow_type === "right"){
            value = "<span>&#8594;</span>"
        }
        if(arrow_type === "left"){
            value = "<span>&#8592;</span>";
        }
        if(arrow_type === "down"){
            value = "<span>&#8595;</span>";
        }
        this.mazeBlocks[block_index].innerHTML = value;
        this.arrowStyle(this.mazeBlocks[block_index]);
    }

    
}

mazeinfoObjects = {
    "bfsMaze1": {
        "id":"#sec2_dfs_maze",
        "map": [
            1,0,0,0,0,1,1,
            1,0,1,1,0,1,1,
            1,0,0,1,0,0,1,
            1,1,0,1,1,0,1,
            1,1,0,0,0,0,0,
            1,1,1,1,1,1,0
        ],
        "solvePath":[
            41,34,33,26,32,19
        ],
        "startBlockIndex":41,
        "goalBlockIndex":19,
        "rows":6,
        "cols":7,
    },
    "dfsMaze1": {
        "id":"#sec3_bfs_maze",
        "map": [
            1,0,0,0,0,1,1,
            1,0,1,1,0,1,1,
            1,0,0,1,0,0,1,
            1,1,0,1,1,0,1,
            1,1,0,0,0,0,0,
            1,1,1,1,1,1,0
        ],
        "solvePath":[
            41,34,33,32,31,30,23,16,15,8,1,2,3,4,11,18,19
        ],
        "startBlockIndex":41,
        "goalBlockIndex":19,
        "rows":6,
        "cols":7,
    },
    "bfsMaze2": {
        "id":"#sec4_bfs_maze",
        "map": [
            0,1,0,0,1,1,1,0,1,0,1,0,
            0,1,1,0,1,0,0,0,1,0,1,0,
            0,1,1,0,0,0,1,0,1,0,0,0,
            0,1,1,0,1,0,1,0,1,1,0,1,
            0,0,0,0,1,0,1,0,0,0,0,1,
            1,1,1,1,1,0,1,1,0,1,1,1,
            0,0,0,0,0,0,1,1,0,0,0,0,
        ],
        "solvePath":[
            83,82,81,80,68,56,57,55,58,43,
            46,31,34,19,35,33,23,21,7,18,
            11,9,17,29,28,41,27,53,65,15,
            39,77,3,51,76,2,50,75,49,74,48,
            73,36,72,24,12,0
        ],
        "startBlockIndex":83,
        "goalBlockIndex":0,
        "rows":7,
        "cols":12,
    }

}


let bfsMaze1 = new Maze(mazeinfoObjects["bfsMaze1"]["id"],
                    mazeinfoObjects["bfsMaze1"]["map"],
                    mazeinfoObjects["bfsMaze1"]["solvePath"],
                    mazeinfoObjects["bfsMaze1"]["startBlockIndex"],
                    mazeinfoObjects["bfsMaze1"]["goalBlockIndex"],);
bfsMaze1.createMaze(mazeinfoObjects["bfsMaze1"]["rows"], mazeinfoObjects["bfsMaze1"]["cols"]);
bfsMaze1.playSolvePath(0.5);


let dfsMaze1 = new Maze(mazeinfoObjects["dfsMaze1"]["id"],
                    mazeinfoObjects["dfsMaze1"]["map"],
                    mazeinfoObjects["dfsMaze1"]["solvePath"],
                    mazeinfoObjects["dfsMaze1"]["startBlockIndex"],
                    mazeinfoObjects["dfsMaze1"]["goalBlockIndex"],);
dfsMaze1.createMaze(mazeinfoObjects["dfsMaze1"]["rows"], mazeinfoObjects["cols"]);
dfsMaze1.playSolvePath(0.5);



let bfsMaze2 = new Maze(mazeinfoObjects["bfsMaze2"]["id"],
                    mazeinfoObjects["bfsMaze2"]["map"],
                    mazeinfoObjects["bfsMaze2"]["solvePath"],
                    mazeinfoObjects["bfsMaze2"]["startBlockIndex"],
                    mazeinfoObjects["bfsMaze2"]["goalBlockIndex"],);
bfsMaze2.createMaze( mazeinfoObjects["bfsMaze2"]["rows"], mazeinfoObjects["bfsMaze2"]["cols"]);
bfsMaze2.playSolvePath(0.5);

let maze3 = new Maze("#sec4_bfs_maze", sec3BfsMazeMap, sec3BfsMazeMapSolvePath, 83, 0);
maze3.createMaze(7, 12);
maze3.playSolvePath(0.5);






let maze4 = new Maze("#sec5_bfs_maze", sec3BfsMazeMap, sec3BfsMazeMapSolvePath, 83, 0);
maze4.createMaze(7, 12);

distance_obj = {
    "2": 2,
    "3": 3,
    "7":7,
    "9":9,
    "11":11,
    "12":1,
    "15":4,
    "17":6,
    "18":7,
    "19":8,
    "21":10,
    "23":12,
    "24":2,
    "27":5,
    "28":6,
    "29":7,
    "31":9,
    "33":11,
    "34":12,
    "35":13,
    "36":3,
    "39":6,
    "41":8,
    "43":10,
    "46":13,
    "48":4,
    "49":5,
    "50":6,
    "51":7,
    "53":9,
    "55":11,
    "56":12,
    "57":13,
    "58":14,
    "65":10,
    "68":13,
    "72":6,
    "73":7,
    "74":8,
    "75":9,
    "76":10,
    "77":11,
    "80":14,
    "81":15,
    "82":16,
    
}
// maze4.showHuristicDistance(distance_obj);
maze4.calculateManhatanDsitance(12, distance_obj);

sec_example_bfs_maze_solve_path = [83, 82, 81, 80, 68, 56];
let maze4_1 = new Maze("#sec_example_bfs_maze", sec3BfsMazeMap, sec_example_bfs_maze_solve_path, 83, 0);
maze4_1.createMaze(7, 12);
maze4_1.showSolvePath();
maze4_1.showArrow("right", 55);
maze4_1.showArrow("left", 57);



let maze5 = new Maze("#sec6_bfs_maze", sec3BfsMazeMap, sec3BfsMazeMapSolvePath, 83, 0);
maze5_manahtan_distance_obj = {
    "2": 2,
    "3": 3,
    "7":7,
    "9":9,
    "11":11,
    "12":1,
    "15":4,
    "17":6,
    "18":7,
    "19":8,
    "21":10,
    "23":12,
    "24":2,
    "27":5,
    "28":6,
    "29":7,
    "31":9,
    "33":11,
    "34":12,
    "35":13,
    "36":3,
    "39":6,
    "41":8,
    "43":10,
    "46":13,
    "48":4,
    "49":5,
    "50":6,
    "51":7,
    "53":9,
    "55":11,
    "56":12,
    "57":13,
    "58":14,
    "65":10,
    "68":13,
    "72":6,
    "73":7,
    "74":8,
    "75":9,
    "76":10,
    "77":11,
    "80":14,
    "81":15,
    "82":16,
}
maze5.createMaze(7, 12);
maze5.showHuristicDistance(maze5_manahtan_distance_obj);
maze5.changeColorOfBlocks([2], ["#4799ae"]);


const sec6BfsMazeMapSolvePath
 = [83,82,81,80,68,56];
let maze6 = new Maze("#sec7_bfs_maze", sec3BfsMazeMap, sec6BfsMazeMapSolvePath, 83, 0);
maze6.createMaze(7, 12);
maze6.playSolvePath(0.5);


const sec7BfsMazeMapSolvePath = [83,82,81,80,68, 56, 55, 43, 31, 19];
let maze7 = new Maze("#sec8_bfs_maze", sec3BfsMazeMap, sec7BfsMazeMapSolvePath, 83, 0);
maze7.createMaze(7, 12);
maze7.showHuristicDistance(maze5_manahtan_distance_obj);
maze7.showSolvePath(false);



const sec9BfsMazeMapSolvePath = [83,82,81,80,68, 56, 55, 43, 31, 19, 7];
let maze9 = new Maze("#sec9_bfs_maze", sec3BfsMazeMap, sec9BfsMazeMapSolvePath, 83, 0);
maze9.createMaze(7, 12);
maze9.showHuristicDistance(maze5_manahtan_distance_obj);
maze9.showSolvePath(false);


explain_obj = {
    83: "از نقطه آغازین (Initial State) شروع می کنیم و باید 5 قدم حرکت کنیم تا به وضعیتی برسیم که باید انتخاب کنیم.",
    82: "از نقطه آغازین (Initial State) شروع می کنیم و باید 5 قدم حرکت کنیم تا به وضعیتی برسیم که باید انتخاب کنیم.",
    81: "از نقطه آغازین (Initial State) شروع می کنیم و باید 5 قدم حرکت کنیم تا به وضعیتی برسیم که باید انتخاب کنیم.",
    80: "از نقطه آغازین (Initial State) شروع می کنیم و باید 5 قدم حرکت کنیم تا به وضعیتی برسیم که باید انتخاب کنیم.",
    68: "از نقطه آغازین (Initial State) شروع می کنیم و باید 5 قدم حرکت کنیم تا به وضعیتی برسیم که باید انتخاب کنیم.",
    56:"به این حالت Decision Point یا نقطه تصمیم گیری می گویند.حالا باید انتخاب کنیم که قصد داریم به چپ یا راست برویم.بر اساس تابع هیوریستیک، مسیر سمت راست 11 قدم و مسیر سمت چپ 13 قدم تا هدف فاصله دارد، پس به سمت راست حرکت میکنیم.",
    55:"ما قادر به اتخاذ یک تصمیم آگاهانه بودیم زیرا اطلاعات بیشتری در مورد این مسئله نسبت به گذشته داریم.    مشاهده کردید که در این نقطه با توجه به دانشی که از مسئله داشتیم تصمیمی آگاهانه تری گرفتیم.پس به مسیر خود تا رسیدن به نقطه تصمیم گیری بعدی ادامه میدهیم.",
    43:"ما قادر به اتخاذ یک تصمیم آگاهانه بودیم زیرا اطلاعات بیشتری در مورد این مسئله نسبت به گذشته داریم.    مشاهده کردید که در این نقطه با توجه به دانشی که از مسئله داشتیم تصمیمی آگاهانه تری گرفتیم.پس به مسیر خود تا رسیدن به نقطه تصمیم گیری بعدی ادامه میدهیم.",
    31:"ما قادر به اتخاذ یک تصمیم آگاهانه بودیم زیرا اطلاعات بیشتری در مورد این مسئله نسبت به گذشته داریم.    مشاهده کردید که در این نقطه با توجه به دانشی که از مسئله داشتیم تصمیمی آگاهانه تری گرفتیم.پس به مسیر خود تا رسیدن به نقطه تصمیم گیری بعدی ادامه میدهیم.",
    19:"در این نقطه تصمیم گیری باید بین این دو سلول که هر کدام مقدار 7 را دارند انتخاب کنیم، در این حالت با توجه به الگوریتم میتوانیم بصورت دلخواه یکی از  مسیر را انتخاب کنیم",
    7: "مسیر بالا را انتخاب میکنیم.",
    18:"روند جست و جو را ادامه میدهیم.",
    17:"روند جست و جو را ادامه میدهیم.",
    29:"مجددا به یک نقطه تصمیم گیری دیگر رسیدیم، حال باید بین حالت های 6، 7 و 13 یک مسیر را انتخاب کنیم.بدیهی است که کوچکترین مقدار 6 است.",
    28:"با دقت در تصویر متوجه میشوید که مجددا قادر بودیم که یک تصمیم آگاهانه بگیریم و سمت راست حرکت کنیم.",
    27:"در اینجا به نقطه تصمیم گیری میرسیم که کمی چالش برانگیز است. مشاهده میکنید که بر اساس تابع هیوریستیک، 4 به هدف نزدیک تر است با توجه به الگوریتم حق انتخاب دیگری نداریم و باید به سمت بالا حرکت کنیم (انتخاب خانه 4  به عنوان وضعیت بعدی).",
    15:"روند جست و جو را ادامه میدهیم.",
    3:"روند جست و جو را ادامه میدهیم.",
    2:"در اینجا مشاده میکنید به یک بن بست میرسیم اما هیچ اشکالی ندارد، زیرا میتوانیم به مسیر دیگری بازگردیم و اینبار 6 را انتخاب کنیم.",
    39:"روند جست و جو را ادامه میدهیم.",
    51:"روند جست و جو را ادامه میدهیم.",
    50:"روند جست و جو را ادامه میدهیم.",
    49:"روند جست و جو را ادامه میدهیم.",
    48:"روند جست و جو را ادامه میدهیم.",
    36:"روند جست و جو را ادامه میدهیم.",
    24:"روند جست و جو را ادامه میدهیم.",
    12:"روند جست و جو را ادامه میدهیم.",
    0:"حالت هدف را پیدا کردیم",
}
const sec10BfsMazeMapSolvePath = [
    83,82,81,80,68, 56, 55, 43, 31, 19,
    7,18,17,29, 28, 27,15,3,2,39,51,50,
    49,48,36, 24,12,0];
let maze10 = new Maze("#sec10_gbsf_maze", sec3BfsMazeMap, sec10BfsMazeMapSolvePath, 83, 0);
maze10.createMaze(7, 12);
maze10.showHuristicDistance(maze5_manahtan_distance_obj);
maze10.addMazeSolveFunctionality(explain_obj, "#gbfsExplainBox");



sec11_distance_obj = {
    "1": 1,
    "2":2,
    "3": 3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "12":1,
    "22":11,
    "24":2,
    "26":4,
    "27":5,
    "28":6,
    "29":7,
    "30":8,
    "31":9,
    "32":10,
    "34":12,
    "36":3,
    "38":5,
    "44":11,
    "46":13,
    "48":4,
    "50":6,
    "51":7,
    "52":8,
    "53":9,
    "54":10,
    "56":12,
    "57":13,
    "58":14,
    "60":5,
    "66":11,
    "68":13,
    "72":6,
    "73":7,
    "74":8,
    "75":9,
    "76":10,
    "77":11,
    "78":12,
    "80":14,
    "81":15,
    "82":16,
    "83":17,
}
const sec11BfsMazeMapSolvePath = [83,82,81,80,68, 56,];
let maze11 = new Maze("#sec11_gbsf_maze", sec3BfsMazeMap, sec11BfsMazeMapSolvePath, 83, 0);
maze11.createMaze(7, 12);
maze11.changeColorOfBlocks([56], ["#4799ae"]);
maze11.showSolvePath(false);
maze10.showHuristicDistance(sec11_distance_obj);






const sec12GBfsMazeMap = [
    0,0,0,0,0,0,0,0,0,0,0,1,
    0,1,1,1,1,1,1,1,1,1,0,1,
    0,1,0,0,0,0,0,0,0,1,0,1,
    0,1,0,1,1,1,1,1,0,1,0,1,
    0,1,0,0,0,0,0,1,0,0,0,1,
    0,1,1,1,1,1,0,1,0,1,1,1,
    0,0,0,0,0,0,0,1,0,0,0,0,
]
const sec12BfsMazeMapSolvePath = [
    83,82,81,80,68, 56, 44, 32, 31, 30, 29, 28,
    27, 26, 38, 50,51, 52,53, 54, 66, 78, 77, 76,
    75, 74, 73, 72, 60, 48, 36,24, 12, 0];
let maze12 = new Maze("#sec12_gbsf_maze", sec12GBfsMazeMap, sec12BfsMazeMapSolvePath, 83, 0);
maze12.createMaze(7, 12);
maze12.showSolvePath(false);
maze12.showHuristicDistance(sec11_distance_obj);


const sec13BfsMazeMapSolvePath = [83,82,81,80,68, 56, 57, 58, 46, 34, 22, 10, 9,8, 7, 6,5,4,3,2,1,0];
let maze13 = new Maze("#sec13_gbsf_maze", sec12GBfsMazeMap, sec13BfsMazeMapSolvePath, 83, 0);
maze13.createMaze(7, 12);
maze13.showSolvePath(false);
maze13.showHuristicDistance(sec11_distance_obj);


let maze14 = new Maze("#sec14_gbsf_maze", sec12GBfsMazeMap, sec12BfsMazeMapSolvePath, 83, 0);
maze14.createMaze(7, 12);
maze14.showSolvePath(false);
maze14.showHuristicDistance(sec11_distance_obj);
maze14.changeColorOfBlocks([57, 56, 78], ["purple", "orange", "blue"]);





// Astar Algorithm
aStartExplainObject ={
    82:"در شروع از حالت ابتدایی، 1 قدم برداشته ایم و 16 قدم تا هدف فاصله داریم، در نتیجه بر اساس الگوریتم جست و جوی A*، مقدار نهایی برای این سلول برابر است با 16+1، که این مقدار معادل 17 می باشد.",
    81:"برای حرکت به سلول بعدی باید 2 قدم نسبت به A برداریم و همچنین براساس تابع هیوریستیک، 15 قدم تا B فاصله داریم. در نتیجه بر اساس الگوریتم جست و جوی ستاره ای، مقدار نهایی برای این سلول 15+2 ، یعنی 17 میباشد.",
    80:"برای حرکت به سلول بعدی باید 3 قدم نسبت به A برداریم و همچنین براساس تابع هیوریستیک، 14 قدم تا B فاصله داریم. در نتیجه بر اساس الگوریتم جست و جوی ستاره ای، مقدار نهایی برای این سلول 14+3 ، یعنی 17 میباشد.",
    68: "با ادامه دادن این مسیر به نقطه ی تصمیم گیری می رسیم که با رنگ نارجی مشخص شده است." ,
    56:"با ادامه دادن این مسیر به نقطه ی تصمیم گیری می رسیم که با رنگ نارجی مشخص شده است.زمانی که به این نقطه تصمیم گیری میرسیم، بر اساس الگوریتم جست و جوی ستاره ای ، 11+6 (خانه بالا)مقدار کمتری نسبت به 13+6(خانه سمت چپ) دارد، در نتیجه این الگوریتم به سمت بالا حرکت کرده و رفتاری شبیه به G-BFS را از خود نشان می دهد",
    44:"7+10 مقدار کمتری نسبت به 6+13 است(انتخاب خانه بالا)",
    32:"8+9 مقدار کمتری نسبت به 6+13 دارد",
    31:"8+9 مقدار کمتری نسبت به 6+13 دارد",
    30:"10+7 مقدار کمتری نسبت به 6+13 دارد",
    29:"11+6 مقدار کمتری نسبت به 6+13 دارد",
    28:"12+5 مقدار کمتری نسبت به 6+13 دارد",
    27:"13+4 مقدار کمتری نسبت به 6+13 دارد",
    37:"14+5 مقداری مساوی با 6+13 دارد بنابراین الگوریتم A*  میتواند به صورت شانسی یکی از خانه ها را به عنوان حالت بعدی انتخاب کند.",
    48:"در اینجا 15+6 مقدار بیشری نسبت به 6+13 دارد، با توجه به اینکه 15+6 معادل 21 و 13+6 معادل 19 است، الگوریتم  A* سلول بنفش را برای ادامه ی مسیر انتخاب میکند.",
    55:"در قدم بعدی الگوریتم جست و جوی ستاره ای، بین دو سلول 14+7 و 16+7 ، خانه 7+14 که مقدار آن کوچکتر است را انتخاب میکند.",
    44:"در قدم بعدی الگوریتم جست و جوی ستاره ای، بین دو سلول 13+8 و 16+7 ، خانه 8+13 که مقدار آن کوچکتر است را انتخاب میکند.",
    33:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 12+9 و 15+6 وضعیت با مقدار کمتر یعنی، 12+9 را انتخاب میکند",
    22:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 11+10و 15+6 وضعیت با مقدار کمتر یعنی، 11+10 را انتخاب میکند.",
    10:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 10+11و 15+6 وضعیت با مقدار کمتر یعنی، 10+11 را انتخاب میکند.",
    9:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 9+12و 15+6 وضعیت با مقدار کمتر یعنی، 9+12 را انتخاب میکند.",
    8:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 8+13و 15+6 وضعیت با مقدار کمتر یعنی، 8+13 را انتخاب میکند.",
    7:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 7+14و 15+6 وضعیت با مقدار کمتر یعنی، 7+14 را انتخاب میکند.",
    6:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 6+15و 15+6 وضعیت با مقدار کمتر یعنی، 6+15 را انتخاب میکند.",
    5:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 5+16و 15+6 وضعیت با مقدار کمتر یعنی، 5+16 را انتخاب میکند.",
    4:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 4+17و 15+6 وضعیت با مقدار کمتر یعنی، 4+17 را انتخاب میکند.",
    3:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 3+18و 15+6 وضعیت با مقدار کمتر یعنی، 3+18 را انتخاب میکند.",
    2:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 2+19و 15+6 وضعیت با مقدار کمتر یعنی، 2+19 را انتخاب میکند.",
    1:"در قدم بعدی الگوریتم جست و جوی A*، بین دو سلول 1+20و 15+6 وضعیت با مقدار کمتر یعنی، 1+20 را انتخاب میکند.",
}
AStartDistanceOBJ = {
    "82":"1",
    "81":2,
    "80": 3,
    "68": 4,
    "56": 5,
    "44":6,
    "32":7,
    "31": 8,
    "30":9,
    "29":10,
    "28":11,
    "27":12,
    "26":13,
    "38":14,
    "57":6,
    "50":15,
    "58":7,
    "46":8,
    "34":12,
    "22":10,
    "10":11,
    "9":12,
    "8":13,
    "7":14,
    "6":15,
    "5":16,
    "4":17,
    "3":18,
    "2":19,
    "1":20,
    "0":21

}
AstarSolvePath = [
    82,81,80,68,56, 44, 32, 31, 30,29,28,27,26,57,
    38, 50,58, 46,34, 22,10,9,8,7,6,5,4,3,2,1,0]
let maze15 = new Maze("#sec14_Astar_maze", sec12GBfsMazeMap, AstarSolvePath, 83, 0);
maze15.createMaze(7, 12);
maze15.showHuristicDistance(sec11_distance_obj);
// maze15.changeColorOfBlocks([57, 56, 78], ["purple", "orange", "blue"]);
maze15.addAstarMazeSolveFunctionality(aStartExplainObject, "#AstarExplain", AStartDistanceOBJ, sec11_distance_obj)
