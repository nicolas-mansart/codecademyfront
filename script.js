let t = new Date()
let t2 = null;
let t3 = null;
let bt = false;

let hasForm = document.querySelector('form') ? true : false;

const dmToggle = (e) => {
    document.querySelector('body').classList.toggle('darkmode');
}
const burgToggle = (e) => {
    document.querySelector('header').classList.toggle('open');
}
const burgClose = (e) => {
    document.querySelector('header').classList.remove('open');
}
const formSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(document.querySelector('form'))
    t3 = new Date();
    if((t2 && t3 - t2 < 5000) || t3 - t < 1000 || data.get('title') != "") {
        bt = true;
    }
    data.set('bt', bt ? 'true' : 'false');
  
    postData("https://adreqi.fr/portfoliocontact", Object.fromEntries(data.entries())).then((data) => {
        document.querySelector('form').innerHTML = "Thank you, I'll get back to you shortly!"
    });
}
const formCheckKey = (e) => {
    if(!t2) {
        t2 = new Date()
        if(t2 - t < 1000)
            bt = true;
    }
}

// Example POST method implementation:
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: Object.entries(data).map(([k,v])=>{return k+'='+v}).join('&')
    });
    const resp = await response.json();
    return resp; // parses JSON response into native JavaScript objects
  }
  




document.querySelector("#dm").addEventListener('click', dmToggle);
document.querySelector("#burg").addEventListener('click', burgToggle);

let menulinks = document.querySelectorAll("header nav a");
menulinks.forEach(elt => {
    elt.addEventListener("click", burgClose)
})
if(hasForm) {
    document.querySelector('form').style.display = 'flex'
    document.querySelector("[for='form-title']").style.display="none";
    document.querySelector("input#form-title").style.display="none";
    
    document.querySelector("form").addEventListener('submit', formSubmit)
    document.querySelectorAll("form input, form textarea").forEach(elt => {
        elt.addEventListener('keyup', formCheckKey)
    });
}