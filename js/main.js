(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const materialCon = document.querySelector("#material-con");
  const loader = document.querySelector("#loader");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  
  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"

  
  //functions
  function loadInfoBoxes() {
    loader.classList.toggle("hidden");
    //make AJAX call here

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    // take that resppnse and turn that response into a string object
    .then(infoBoxes => {
      console.log(infoBoxes);
      
      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index + 1}`);
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;
  
        console.log(infoBox.title);
        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;
  
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
        console.log(titleElement);
        console.log(textElement);
     
      });
      loader.classList.toggle("hidden");

      
      materialCon.innerHTML = "";
      materialCon.appendChild(materialList);
      
  })
    // store in a placeholder of my choosing
    .catch(error => {
      console.log(error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Oops, it looks like something went wrong. Please check your internet connection or try again later";

      materialCon.appendChild(errorMessage);})

// need to include somehting in catch to handle proper error handling for hw 
// include a loader 
// hw: use html template, fetch functions to handle stages of ajax request, implement loading icon and error message 
  }

  loadInfoBoxes();

  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materials => {
      console.log(materials)

    materials.forEach(material => {
      // close template
      const clone = materialTemplate.content.cloneNode(true);
      //populate with data 
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading; 

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description; 

      materialList.appendChild(clone); 
})
    })
    .catch(error => {
      console.log(error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Oops, it looks like something went wrong. Please check your internet connection or try again later";

      materialCon.appendChild(errorMessage);})

  }
  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

