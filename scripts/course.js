const progress_bars = document.querySelectorAll(".progress-bar");
progress_bars.forEach(progress_bar => {
    const progress_value = progress_bar.dataset.progressValue;
    progress_bar.style.width = progress_value;
});