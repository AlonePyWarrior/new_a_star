
function create_maze(maze_map,solve_path, container, rows, cols, start_index, goal_index){
    row_template_str = "auto";
    col_template_str = "auto";
    for (let col = 1; col < cols; col++) {
        col_template_str += " auto";
    }
    for (let row = 1; row < rows; row++) {
        row_template_str += " auto";
    }

    container.style.gridTemplateColumns = col_template_str;
    container.style.gridTemplateRows = row_template_str;
    for (let i = 0; i < rows*cols; i++) {
        
        const maze_block = document.createElement("div");
        maze_block.classList.add("maze-block");
        maze_block.innerHTML = `<div class="maze-block-text">${i}</div>`;
        if (maze_map[i] === 1){
            maze_block.classList.add("wall");
        }
        container.appendChild(maze_block);
        
    }
    // specify the text of start and goal maze_block
    const maze_block_text = container.querySelectorAll(".maze-block");
    maze_block_text[start_index].innerText = "شروع";
    maze_block_text[goal_index].innerText = "هدف";
    maze_block_text[start_index].classList.add("maze_start");
    maze_block_text[goal_index].classList.add("maze_end");
}


function maze_solve_functionality(maze_container,solve_path , maze_next_btn, maze_prev_btn, start_index, goal_index){
    const maze_blocks = maze_container.querySelectorAll(".maze-block");
    let maze_solve_progress_index = 0;
    maze_next_btn.addEventListener('click', function(){
        if (solve_path[maze_solve_progress_index] != goal_index){
            maze_prev_btn.disabled = false;
            maze_blocks[solve_path[maze_solve_progress_index]].classList.add("maze-solve-path-block");
            maze_solve_progress_index += 1;
        }
        else{
            maze_next_btn.disabled = true;
        }
    });
    maze_prev_btn.addEventListener('click', function(){
        if (solve_path[maze_solve_progress_index] != start_index){
            maze_next_btn.disabled = false;
            maze_blocks[solve_path[maze_solve_progress_index]].classList.remove("maze-solve-path-block");
            maze_solve_progress_index -= 1;
        }else{
            maze_prev_btn.disabled = true;
        }
        
        
    });
}



 
function sleep(time) { 
    return new Promise((resolve) => setTimeout(resolve, time)); 
} 
async function showSolvePath(maze_container, solve_path){
    clearSolvePath(maze_container, solve_path);
    const maze_blocks = maze_container.querySelectorAll(".maze-block");
    let index = 0;
    for(let step of solve_path){
        maze_blocks[step].classList.add("maze-solve-path-block");
        maze_blocks[step].innerText = index;
        index++;
        await sleep(1000);
    }
    sec1BfsMaze.parentElement.querySelector(".play-maze").disabled = false;

}

// first dfs maze
const sec1BfsMazeMap = [
    1,0,0,0,0,1,1,
    1,0,1,1,0,1,1,
    1,0,0,1,0,0,1,
    1,1,0,1,1,0,1,
    1,1,0,0,0,0,0,
    1,1,1,1,1,1,0
]
const sec1BfsMazeMapSolvePath = [
    41,34,33,26,32,19
]

const sec1BfsMaze = document.querySelector("#first_dfs_maze"); // maze container


function clearSolvePath(maze_container, solve_path){
    const maze_blocks = maze_container.querySelectorAll(".maze-block");
    let index = 0;
    for(let step of solve_path){
        maze_blocks[step].classList.remove("maze-solve-path-block");
        maze_blocks[step].innerText = "";
        index++;
        
    }

}
sec1BfsMaze.parentElement.querySelector(".play-maze").addEventListener('click', function(){
    this.disabled = true;
    showSolvePath(sec1BfsMaze, sec1BfsMazeMapSolvePath);
    
});

// craete and load maze on screen
create_maze(sec1BfsMazeMap, sec1BfsMazeMapSolvePath,sec1BfsMaze, 6,7, 41, 19);
// show solve path for maze




const sec2DfsMazeMap = [
    1,0,0,0,0,1,1,
    1,0,1,1,0,1,1,
    1,0,0,1,0,0,1,
    1,1,0,1,1,0,1,
    1,1,0,0,0,0,0,
    1,1,1,1,1,1,0
]
const sec2DfsMazeMapSolvePath = [
    41,34,33,32,31,30,23,16,15,8,1,2,3,4,11,18,19
]

const sec2DfsMaze = document.querySelector("#second_dfs_maze"); // maze container

create_maze(sec2DfsMazeMap, sec2DfsMazeMapSolvePath,sec2DfsMaze, 6,7, 41, 19);

sec2DfsMaze.parentElement.querySelector(".play-maze").addEventListener('click', function(){
    this.disabled = true;
    showSolvePath(sec2DfsMaze, sec2DfsMazeMapSolvePath);
    
});
