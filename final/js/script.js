// modal functionality
let currentActiveModal = null;

document.addEventListener("DOMContentLoaded", () => {
    // add click listener to boxes
    const boxes = document.getElementsByClassName("portfolio-box");

    for (const box of boxes) {
        box.addEventListener("click", function() {
            // console.log("hi");
            currentActiveModal = document.getElementById(this.getAttribute("linked-modal"));
            if (! currentActiveModal) return;

            // load everything in modal
            currentActiveModal.querySelectorAll(".lazyload").forEach(function (element) {
                element.setAttribute("src", element.getAttribute("lazy-src"));
                element.removeAttribute("lazy-src");
                element.classList.remove("lazyload");
            });
            currentActiveModal.classList.add("modal-active");
            console.log(currentActiveModal);
        });
    }


    // add click listener to modal close button
    const closeButtons = document.getElementsByClassName("modal-close");

    for (const button of closeButtons) {
        button.addEventListener("click", () => {
            // tell active modal to hide
            currentActiveModal.classList.remove("modal-active");
        });
    }
});


// when window is resized, scroll to targeted element
window.addEventListener('resize', function(event) {
    console.log(event);
    let currentElement = document.getElementById(window.location.hash.substring(1));
    currentElement.scrollIntoView();
});
