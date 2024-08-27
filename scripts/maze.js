
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
 


// first dfs maze
const first_dfs_maze_map = [
    0,1,0,0,1,1,1,0,1,0,1,0,
    0,1,1,0,1,0,0,0,1,0,1,0,
    0,1,1,0,0,0,1,0,1,0,0,0,
    0,1,1,0,1,0,1,0,1,1,0,1,
    0,0,0,0,1,0,1,0,0,0,0,1,
    1,1,1,1,1,0,1,1,0,1,1,1,
    0,0,0,0,0,0,1,1,0,0,0,0

]
const first_dfs_solve_path = [
    83,82,81,80,68,56,57,58,46,34,35,23,11,33,21,9,55,43,31,19,7,18,17,
    29,28,27,15,3,2,39,51,50,49,48,36,24,12,0
]

const first_dfs_maze = document.querySelector("#first_dfs_maze"); // maze container
// next prev buttons
const first_dfs_maze_next_btn = document.querySelector("#first_dfs_maze_next");
const first_dfs_maze_prev_btn = document.querySelector("#first_dfs_maze_prev");

// craete and load maze on screen
create_maze(first_dfs_maze_map, first_dfs_solve_path,first_dfs_maze, 7,12, 83, 0);
// // add functionality to buttons
maze_solve_functionality(first_dfs_maze,first_dfs_solve_path, first_dfs_maze_next_btn, first_dfs_maze_prev_btn, 83, 0)





// second maze bfs
const first_bfs_maze_map = [
    0,1,0,0,1,1,1,0,1,0,1,0,
    0,1,1,0,1,0,0,0,1,0,1,0,
    0,1,1,0,0,0,1,0,1,0,0,0,
    0,1,1,0,1,0,1,0,1,1,0,1,
    0,0,0,0,1,0,1,0,0,0,0,1,
    1,1,1,1,1,0,1,1,0,1,1,1,
    0,0,0,0,0,0,1,1,0,0,0,0

]


const first_bfs_solve_path = [
    83,82,81,80,68,56,57,55,58,43,46,31,34,19,35,33,7,18,23,21,17,11,9,
    29,28,41,27,53,15,39,65,3,51,77,2,50,76,49,75,48,74,36,73,24,72, 12,0
]



const first_bfs_maze = document.querySelector("#first_bfs_maze");
// next prev buttons
const first_bfs_maze_next_btn = document.querySelector("#first_bfs_maze_next");
const first_bfs_maze_prev_btn = document.querySelector("#first_bfs_maze_prev");

// craete and load maze on screen
create_maze(first_bfs_maze_map, first_bfs_solve_path, first_bfs_maze, 7, 12, 83, 0);
// // add functionality to buttons
maze_solve_functionality(first_bfs_maze,first_bfs_solve_path, first_bfs_maze_next_btn, first_bfs_maze_prev_btn, 83,0);





const two_way_dfs_maze_map = [
    1,1,1,1,1,0,
    0,0,0,0,0,0,
    1,1,0,1,1,0,
    1,1,0,1,1,0,
    1,1,0,0,1,0,
    1,1,1,0,1,0,
    1,1,1,0,0,0
]


const two_way_dfs_solve_path = [
    41,35,29,23,17,11,5,10,9,8,14,20
]



const tw_dfs_maze = document.getElementById("tw_dfs_maze");
alert(tw_dfs_maze);
// next prev buttons
const tw_dfs_next_btn = document.querySelector("#tw_dfs_next_btn");
const tw_dfs_prev_btn = document.querySelector("#tw_dfs_prev_btn");

create_maze(two_way_dfs_maze_map, two_way_dfs_solve_path, tw_dfs_maze, 7, 6, 41, 20);
// // add functionality to buttons
maze_solve_functionality(tw_dfs_maze,two_way_dfs_solve_path, tw_dfs_next_btn, tw_dfs_prev_btn, 41, 20);






const two_way_bfs_maze_map = [
    0,0,0,0,0,1,
    0,0,0,0,0,0,
    1,1,0,1,1,0,
    1,1,0,1,1,0,
    1,1,0,0,1,0,
    1,1,1,0,1,0,
    1,1,1,0,0,0
]


const two_way_bfs_solve_path = [
    41,35,40,29,39,23,33,17,27,11,26,5,20
]



const tw_bfs_maze = document.getElementById("tw_bfs_maze");
// next prev buttons
const tw_bfs_next_btn = document.querySelector("#tw_bfs_next_btn");
const tw_bfs_prev_btn = document.querySelector("#tw_bfs_prev_btn");

create_maze(two_way_bfs_maze_map, two_way_bfs_solve_path, tw_bfs_maze, 7, 6, 41, 20);
// // add functionality to buttons
maze_solve_functionality(tw_bfs_maze,two_way_bfs_solve_path, tw_bfs_next_btn, tw_bfs_prev_btn, 41, 20);




const campare_bfs_maze_map = [
        0,1,0,0,1,1,1,0,1,0,1,0,
        0,1,1,0,1,0,0,0,1,0,1,0,
        0,1,1,0,0,0,1,0,1,0,0,0,
        0,1,1,0,1,0,1,0,1,1,0,1,
        0,0,0,0,1,0,1,0,0,0,0,1,
        1,1,1,1,1,0,1,1,0,1,1,1,
        0,0,0,0,0,0,1,1,0,0,0,0
    
]


const campare_bfs_solve_path = [
    83,82,81,80,68,56,57,55,58,43,46,31,34,19,35,33,7,18,23,21,17,11,9,
    29,28,41,27,53,15,39,65,3,51,77,2,50,76,49,75,48,74,36,73,24,72, 12,0
]




const campare_bfs_maze = document.getElementById("campare_bfs_maze");
// next prev buttons
const campare_bfs_next_btn = document.querySelector("#campare_bfs_next_btn");
const campare_bfs_prev_btn = document.querySelector("#campare_bfs_prev_btn");

create_maze(campare_bfs_maze_map, campare_bfs_solve_path, campare_bfs_maze, 7, 12, 83, 0);
// // add functionality to buttons
maze_solve_functionality(campare_bfs_maze,campare_bfs_solve_path, campare_bfs_next_btn, campare_bfs_prev_btn, 83, 0);




const campare_dfs_maze_map = [
    0,1,0,0,1,1,1,0,1,0,1,0,
    0,1,1,0,1,0,0,0,1,0,1,0,
    0,1,1,0,0,0,1,0,1,0,0,0,
    0,1,1,0,1,0,1,0,1,1,0,1,
    0,0,0,0,1,0,1,0,0,0,0,1,
    1,1,1,1,1,0,1,1,0,1,1,1,
    0,0,0,0,0,0,1,1,0,0,0,0

]


const campare_dfs_solve_path = [
    83,82,81,80,68,56,57,58,46,34,35,23,11,33,21,9,55,43,31,19,7,18,17,
    29,28,27,15,3,2,39,51,50,49,48,36,24,12,0
]


const campare_dfs_maze = document.getElementById("campare_dfs_maze");
// next prev buttons
const campare_dfs_next_btn = document.querySelector("#campare_dfs_next_btn");
const campare_dfs_prev_btn = document.querySelector("#campare_dfs_prev_btn");

create_maze(campare_dfs_maze_map, campare_dfs_solve_path, campare_dfs_maze, 7, 12, 83, 0);
// // add functionality to buttons
maze_solve_functionality(campare_dfs_maze,campare_dfs_solve_path, campare_dfs_next_btn, campare_dfs_prev_btn, 83, 0);

