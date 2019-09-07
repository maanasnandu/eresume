const TypeWriter = function(txtElement, words, wait = 2000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//Method
TypeWriter.prototype.type = function() {
  //get current index of word array

  const current = this.wordIndex % this.words.length;

  // getting the full text of current word
  const fullTxt = this.words[current];

  //check if deleting
  if (this.isDeleting) {
    //remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // initial Type speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    //make a pause at end
    typeSpeed = this.wait;
    //Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //Move to next word
    this.wordIndex++;
    //pause before starting typing
    typeSpeed = 600;
  }

  setTimeout(() => this.type(), 500);
};

//Initiate on DOM load
document.addEventListener("DOMContentLoaded", init);

//Initiate app
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
}
