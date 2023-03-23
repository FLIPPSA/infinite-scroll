const imageContainer = document.getElementById('image-container');
const laoder = document.getElementById('loader');

let imageArr = [];
let readyForNextImages = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let Imagecount = 5;
const APIKEY = `dNElh4Agq36N8aIqrNRnWRVJT8DIjeEVsj3lbf6X9rs`;
let AIPURL = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${Imagecount}`

function ImagesSuccessfullyLoaded(){
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    laoder.hidden = true;
    //'to increase performance' -> doesn't do the loading animation
    Imagecount = 30
    AIPURL = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${Imagecount}`
  }
}

function setAttributesforElement(item, attribute){
  for(const key in attribute){
    item.setAttribute(key, attribute[key]);
  }
}

// Create HTMl Elements for Links & Photos, Add to DOM
function displayImages(){
  imagesLoaded = 0;
  totalImages = imageArr.length;
  // Run function for each object in imageArr
  imageArr.forEach((image) => {

    // Create <a> to link to photo url
    const item = document.createElement('a');
    setAttributesforElement(item, {
      href: image.links.html,
      target: '_blank',
    });

    //Create <img> for image
    const img = document.createElement('img');
    setAttributesforElement(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    })

    // Checking when each image is finished loading
    img.addEventListener('load', ImagesSuccessfullyLoaded)

    //Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getImagesFromAPI(){
  try{
    const data = await fetch(AIPURL);
    imageArr = await data.json();
    displayImages();
  } catch(err){
    console.log("ohhhh nooo", err)
  }

}

//EventListeners (checks if scrolling bar is near bottom)
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getImagesFromAPI();
  }
})

// On Load
getImagesFromAPI()