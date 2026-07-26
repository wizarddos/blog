function typeWriter(text, el) {
    el.innerHTML = "";
    let index = 0;
    let interval = setInterval(function () {
        if (index < text.length) {
            el.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 100); 
 }

const typingEl = document.getElementsByClassName("typing");

for(let i = 0; i < 3; i++){
    const el = typingEl[i];
    const text = el.innerHTML;
    typeWriter(text, el)
}