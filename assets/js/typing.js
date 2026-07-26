const typingEl = document.querySelectorAll(".typing");
const hiddenEl = document.querySelectorAll(".to-hide");

hiddenEl.forEach(el => {
    el.classList.add("hidden");
});

let i = 0;
function typeWriter(text, el, hiddenResult) {
    el.innerHTML = "";
    let index = 0;
    let interval = setInterval(function () {
        if (index < text.length) {
            el.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            hiddenResult.classList.remove("hidden");
        }
    }, 100); 
    
 }



typingEl.forEach(el => {
    const text = el.innerHTML;
    id = typeWriter(text, el, hiddenEl[i])
    i++;
});
