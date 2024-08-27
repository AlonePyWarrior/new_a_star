const dropArea = document.querySelector(".drop_box"),
  upload_btn = dropArea.querySelector(".upload-btn"),
  dragText = dropArea.querySelector(".upload-box-header"),
  upload_input = dropArea.querySelector("#fileID");
let file;
var filename;

upload_btn.onclick = () => {
  upload_input.click();
};

upload_input.addEventListener("change", function (e) {
  var fileName = e.target.files[0].name;
  let filedata = `
    <form action="" method="post">
    <div class="form upload-form">
    <h4>${fileName}</h4>
    
    <button class="yellow-btn upload-btn">ارسال پروژه</button>
    </div>
    </form>`;
  dropArea.innerHTML = filedata;
});

// let dropArea = document.getElementById('uploadbox');
// ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//     dropArea.addEventListener(eventName, preventDefaults, false);
// });
  
// function preventDefaults (e) {
//     e.preventDefault();
//     e.stopPropagation();
// }

// ['dragenter', 'dragover'].forEach(eventName => {
//     dropArea.addEventListener(eventName, highlight, false)
// });


// ['dragleave', 'drop'].forEach(eventName => {
//     dropArea.addEventListener(eventName, unhighlight, false)
// });

// function highlight(e) {
//     dropArea.classList.add('highlight');
// }
  
// function unhighlight(e) {
//     dropArea.classList.remove('highlight');
// }


// dropArea.addEventListener('drop', handleDrop, false);



// function handleDrop(e) {
//     let files = e.dataTransfer.files;
//     handleFiles(files);
//     // disable ff event propagation
//     event.stopPropagation();

// }
// function handleFiles(files) {
//     for(var i = 0, len = files.length; i < len; i++) {
//         console.log('added ' + files[i].name + ' ('+Math.round((files[i].size/1024*100000)/100000)+'K ) to queue');
//         uploadFile(files[i], i);
//     }

    
// }



// const files_progress_container = document.querySelector(".files-progress");
// // second approach
// function uploadFile(file, index) {
//     const progress = document.createElement("div");
//     progress.classList.add("file-progress");
//     progress.innerHTML = `
//         <span class="file-index">${index}. </span>
//         <span class="file-name">${file.name}</span>
//     `
//     files_progress_container.appendChild(progress);

//     var xhr = new XMLHttpRequest(),
//         loader;
//         fileUpload = xhr.upload;  
    
//     fileUpload.addEventListener("progress", function(event) {
//         if (event.lengthComputable) {
//             var percentage = Math.round((event.loaded * 100) / event.total);
//             console.log('progress', index, percentage); 
//         }
//     }, false);
    
//     fileUpload.addEventListener("load", function(event) {
//         console.log('loaded', index);
//     }, false);
    
//     fileUpload.addEventListener("error", function(evt) {
//         console.log('error', evt.code, index);
//     }, false);
    
//     // POST DATA
//     xhr.open("POST", "upload.php", true);
//     xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//     xhr.setRequestHeader("X-File-Name", file.fileName);
//     xhr.setRequestHeader("X-File-Size", file.fileSize);
//     xhr.setRequestHeader("Content-Type", "multipart/form-data");
//     xhr.send(file);         
// }

