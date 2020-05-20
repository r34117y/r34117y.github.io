paused = false;

var pauseBtn = document.getElementById('btn-pause');
pauseBtn.addEventListener('click', function () {
    if (paused) {
        this.innerText = 'Pauza';
    } else {
        this.innerText = 'Wznów';
    }
    paused = !paused;
});