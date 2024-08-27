// adds img_overlays to video sections
function add_img_overlays_to_vid_sections(seletor){
    const img_overlays = document.querySelectorAll(seletor);
    img_overlays.forEach(element => {
        const src = element.dataset.imgOverlay;
        element.style.backgroundImage = `url('${src}')`;
        element.classList.add('cover-img');//'grey-img' for add grey
    
    });
}

add_img_overlays_to_vid_sections('[data-img-overlay]');