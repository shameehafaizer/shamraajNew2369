// DOM elements of booking
const nameText = document.getElementById("nameInput");
const contactText = document.getElementById("contactInput");
const durationInput = document.getElementById("duration");
const childrenAbove5Input = document.getElementById("childrenAbove5Input");
const branchText = document.getElementById("branchInput");
const roomType = document.getElementById("Room_type");
const noofRoomsInput = document.getElementById("NoofRooms");
const guideInput = document.getElementsByName("guide")
const booknowBtn = document.getElementById("bookNow");
const extraBedInput = document.getElementById("extrabed");
const promoCodeText = document.getElementById("PromoCode");
const favoritesBtn = document.getElementById("addToFavorites");
const loyaltyPointsButton = document.getElementById("loyaltypoints");
const loyaltyText = document.getElementById("displayLoyaltyPoints");
const currentBooking = document.getElementById("output3");
const currentCostoutput = document.getElementById("CurrentCost");


// Variables of booking
let roomCosts;
let room = "";
let noofRooms ;
let kidsAbove5 = 0;
let promoCode = "";
let LoyaltyPoints=0;
let total;
let extraBedCost = 0;
let numDay;
let guideType;
let adultGuideText;
let kidGuideText;
let guideCost;
let bedCost;


// Event listeners of booking
durationInput.addEventListener("input",durationFunction);
roomType.addEventListener("change", changeRoomType);
childrenAbove5Input.addEventListener("input",childrenAboveFiveFunction);
noofRoomsInput.addEventListener("input",noofRoomsInputFunction);
guideInput.forEach((item) => item.addEventListener("change", guideFunction));
extraBedInput.addEventListener("input", bedFunction);
promoCodeText.addEventListener("change"  ,promoCodeCheck);
favoritesBtn.addEventListener("click" ,AddToFavorites);
loyaltyPointsButton.addEventListener("click", checkLoyalty);
booknowBtn.addEventListener("click" ,bookNowFunction);





// Initialization function of booking
function initialize() {
    roomCosts = 0;
    room = "";
    noofRooms = 1;
    kidsAbove5 = 0;
    promoCode = "";
    total = 0;
    extraBedCost = 0;
    numDay = 1;
    adultGuideText="";
     kidGuideText ="";
     guideCost=0;
     bedCost = 0;
     LoyaltyPoints= parseInt(localStorage.getItem("loyaltyPoints")) || 0 ;
    


     //initialization for adventures
     adultLocal=0;
     ChildrenLocalAndAbove=0;
     adultForeign=0;
     childrenForeign=0;
     totalAdv =0;
    
}




function bedFunction(){
    bedCost = extraBedInput.value*8000
    total = (((roomCosts*noofRooms )+bedCost + kidsAbove5 )* numDay)+ guideCost  +  adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign ;
    currentCostoutput.innerText = `${total} LKR`;
}





function noofRoomsInputFunction(){
    noofRooms = noofRoomsInput.value
    total = (((roomCosts*noofRooms )+bedCost + kidsAbove5 )* numDay)+ guideCost  +  adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign ;
    currentCostoutput.innerText = `${total} LKR`;
  
}



function childrenAboveFiveFunction(){
    kidsAbove5 = (childrenAbove5Input.value)*5000
    total = (((roomCosts*noofRooms )+bedCost + kidsAbove5 )* numDay)+ guideCost +  adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign  ;
    currentCostoutput.innerText = `${total} LKR`;

}



function durationFunction() {
    console.log("Hello");
    numDay = parseInt(durationInput.value);
    total = (((roomCosts*noofRooms) +bedCost + kidsAbove5 )* numDay)+ guideCost +  adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign  ;
    currentCostoutput.innerText = `${total} LKR`;
}


// Function to handle room type change
function changeRoomType() {
    if (roomType.value.toLowerCase() === "single") {
        roomCosts = 25000;
        room = "single";
        } 
    else if (roomType.value.toLowerCase() === "double") {
        roomCosts = 35000;
        room = "double";
    } 
    else {
        roomCosts = 40000;
        room = "triple";
    }

    total = (((roomCosts*noofRooms) +bedCost + kidsAbove5 )* numDay)+ guideCost + adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign  ;
    currentBooking.innerText = `You have booked ${noofRooms}, ${room} room(s) with ${extraBedInput.value} extra bed(s), and ${kidsAbove5}  for kids meals.`;
    currentCostoutput.innerText = `${total} LKR`;

    // updateTotalCost();
}

function checkLoyalty(){
  if(noofRooms > 3) {
    LoyaltyPoints = (noofRooms-3)*20
  }
  else{
    LoyaltyPoints=0
  }
    
    localStorage.setItem ("loyaltyPoints" , `${LoyaltyPoints}`);
  
  displayLoyaltyPoints(); 
}



function displayLoyaltyPoints() {
  loyaltyText.innerText = LoyaltyPoints;
}



function AddToFavorites() {
  localStorage.setItem("room_fvrt" ,`${roomCosts}`);
  localStorage.setItem("numrooms_fvrt" ,`${noofRooms}`);
  localStorage.setItem("kidsabove5_fvrt", `${kidsAbove5}`);
  localStorage.setItem("promo_fvrt", `${promoCode}`);
  localStorage.setItem("total_fvrt", `${ total}`);
  localStorage.setItem("extraBed_fvrt", `${extraBedCost}`);
  localStorage.setItem("numDay_fvrt", `${numDay}`);
  localStorage.setItem("adultGuide_fvrt", `${adultGuideText}`);
  localStorage.setItem("kidGuide_fvrt", `${kidGuideText}`);
  localStorage.setItem("guideCost_fvrt", `${guideCost}`);
  localStorage.setItem("bedCost_fvrt", `${bedCost}`);
  localStorage.setItem("loyaltyPoints_fvrt", `${LoyaltyPoints}`);
  localStorage.setItem("adultLocal_fvrt", `${adultLocal}`);
  localStorage.setItem("childLocal_fvrt", `${ChildrenLocalAndAbove}`);
  localStorage.setItem("adultForeign_fvrt", `${adultForeign}`);
  localStorage.setItem("childForeign_fvrt", `${childrenForeign}`);
  localStorage.setItem("totalAdv_fvrt", `${ totalAdv}`);

  alert("Added to favorites!");
  event.preventDefault()
}



function promoCodeCheck() {
  var promoCode = promoCodeText.value;
  if (promoCode == "Promo123") {
    total *= 0.95;
  }
  currentCostoutput.innerText = `${total} LKR` ;
}


function  bookNowFunction(){
  alert ("Hey, your booking has been confirmed  🎉!");
}



 //ADVENTURES


//DOM elements of Adventures
const adventuresInput = document.getElementById("adventuresInput");
const adultsLocal = document.getElementById("NumberOfAdults(local)");
const childrenLocal = document.getElementById("NumberOfChildren(localandabove)");
const adultsForeign = document.getElementById("NumberOfAdultsForeign");
const childrenForeignAndAbove = document.getElementById("NumberOfChildrenforeignandabove");
const bookAdventureBtn = document.getElementById("bookAdventure");
const overallBooking = document.getElementById("overallBooking");
const overallCost = document.getElementById("overallCost");
const adventureText = document.getElementById("output4");
const Resetbtn = document.getElementById("reset");
const bookForm = document.getElementById("bookingForm");



function resetform() {
  // Reset input fields
  durationInput.value = 1;
  roomType.value = "single"; // Set the default room type or your desired default value
  childrenAbove5Input.value = 0;
  noofRoomsInput.value = 1;
  extraBedInput.value = 0;
  promoCodeText.value = "";
  adultsLocal.value = 0;
  childrenLocal.value = 0;
  adultsForeign.value = 0;
  childrenForeignAndAbove.value = 0;

  // Reset variables
  roomCosts = 0;
  room = "";
  noofRooms = 1;
  kidsAbove5 = 0;
  promoCode = "";
  total = 0;
  extraBedCost = 0;
  numDay = 1;
  adultGuideText = "";
  kidGuideText = "";
  guideCost = 0;
  bedCost = 0;
  LoyaltyPoints = parseInt(localStorage.getItem("loyaltyPoints")) || 0;

  // Reset adventure variables
  adultLocal = 0;
  ChildrenLocalAndAbove = 0;
  adultForeign = 0;
  childrenForeign = 0;
  totalAdv = 0;

  // Clear the displayed text
  currentBooking.innerText = "";
  currentCostoutput.innerText = "";
  loyaltyText.innerText = "";
  adventureText.innerText = "";
  overallBooking.innerText = "";
  overallCost.innerText = "";

  // Prevent the form from submitting if it's in a form element
  event.preventDefault();
}


//variables of adventures

let adultLocal =0;
let ChildrenLocalAndAbove = 0;
let adultForeign = 0;
let childrenForeign = 0;
let totalAdv =0;

//event listeners of adventure

adultsLocal.addEventListener("input" , numAdultsLocalFunction);
childrenLocal.addEventListener("input" , numChildrenLocalnAndAboveFunction);
adultsForeign.addEventListener("input" , numAdultsForeignFunction);
childrenForeignAndAbove.addEventListener("input" , numChildrenForeignAndAbove);
bookAdventureBtn.addEventListener("click", bookAdventureButtonFunction);
Resetbtn.addEventListener("click" , resetform);




//FUNCTION OF ADVENTURE

function numAdultsLocalFunction() {
  adultLocal = parseInt(adultsLocal.value) * 5000;
  totalAdv =  guideCost +  adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign ;
  adventureText.innerText= `${totalAdv} LKR is your current adventure cost. `;
 
}


function numChildrenLocalnAndAboveFunction(){
 
  ChildrenLocalAndAbove  =parseInt(childrenLocal.value) *2000;
  totalAdv =  guideCost +  adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign ;
  adventureText.innerText= `${totalAdv} LKR is your current adventure cost. `;
}

function numAdultsForeignFunction(){
 
 adultForeign = parseInt(adultsForeign.value)*10000;
 totalAdv =  guideCost +  adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign ;
 adventureText.innerText= `${totalAdv} LKR is your current adventure cost. `;
}

function numChildrenForeignAndAbove() {

  childrenForeign = parseInt(childrenForeignAndAbove.value)*5000;
  totalAdv =  guideCost +  adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign ;
  adventureText.innerText= `${totalAdv} LKR is your current adventure cost. `;
}

function guideFunction(){
  let guideType = this.value.toLowerCase();

  if (guideType === "adult") {
    if (this.checked) {
      guideCost += 1000;
      adultGuideText = "Adult Guide Included"
    } else {
      guideCost -= 1000;
      adultGuideText="Null";
    }
  } else {
    if (this.checked) {
      guideCost += 500;
      kidGuideText = "Kids Guide Included"
    } else {
      guideCost -= 500;
      kidGuideText= "Null";
    }
  }
  totalAdv =  guideCost +  adultLocal + ChildrenLocalAndAbove +adultForeign +   childrenForeign ;
  currentCostoutput.innerText = `${total} LKR`;
  adventureText.innerText= `${totalAdv} LKR is your current adventure cost. `;

}


 function bookAdventureButtonFunction() {
  const userName = nameText.value;
  const branch = branchText.value;

   overallBooking.innerText = `Hey ${userName}! you have booked ${noofRoomsInput.value}  bedroom(s) , with ${adventuresInput.value} as your adventure for ${durationInput.value} day(s) at our ${branch} branch. Have a great day!!!  `;
   overallCost.innerText = `${total+ totalAdv} LKR is your total amount for booking and adventure! `;
 }



// Call the initialization function
initialize();

