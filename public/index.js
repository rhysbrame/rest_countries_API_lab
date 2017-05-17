COUNTRIES = [];

var app = function(){
  makeRequest();
}


var populateDropdown = function(countries) {
  var selectTag = document.getElementById("country-selector");

  for (country of countries) {
    var option = document.createElement('option');
    option.value = country.alpha3Code;
    option.innerText = country.name;
    selectTag.appendChild(option);
  }

  selectTag.addEventListener('change', function(event) {
    displayCountry(event.target.value);
  });
}

var displayCountry = function(code) {

  var imgFlag = document.querySelector('img');

  console.log("CODE: ", code, "CODE === \"null\"", code === "null");

  if ( code === "null") {
    console.log("Shoussld display if code is null");
    imgFlag.style.display = 'NONE';
  } else {
    console.log("Should display if code is not null");
    imgFlag.style.display = 'INITIAL';

    localStorage.setItem('code', code);

  var body = document.querySelector('body');

  var selectedCountry = COUNTRIES.find(function(country) {
    return country.alpha3Code === code;
  });
  
  imgFlag.src = selectedCountry.flag;
  // body.appendChild(imgFlag);
}

}


var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;

  var countries = JSON.parse(jsonString);

  COUNTRIES = countries;

  var code = localStorage.getItem('code');
  console.log(code, "has been retrieved from local storage");
  displayCountry(code);
  console.log("displayed code");
  populateDropdown(COUNTRIES);
  console.log("populated dropdown");
}

var makeRequest = function() {
  var url = "https://restcountries.eu/rest/v2"
  var request = new XMLHttpRequest();

  request.open("GET", url);
  
  request.addEventListener("load", requestComplete);

  request.send();
}

window.addEventListener('load', app);

// ["0"].nativeName

// var populateList = function(countries){
//   var ul = document.getElementById("country-list");

//   countries.forEach(function(country){
//     var liDetails = document.createElement('li');
//     liDetails.innerText = country.nativeName + "  ---  " + country.name  + "  ---  " + country.capital;
//     ul.appendChild(liDetails);

//     var liFlags = document.createElement('li');
//     var imgFlag = document.createElement('img');

//     imgFlag.src = country.flag;
//     liFlags.appendChild(imgFlag);
//     ul.appendChild(liFlags);
//   })
// }
