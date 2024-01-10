
//fetch data from server//
let url = new URLSearchParams(document.location.search);
let employeeid  = url.get("id")
console.log(employeeid)


let UserViewImg = document.getElementById('view-img')
let UserViewFullName = document.getElementById('view-fullname')
let UserViewEmail = document.getElementById('view-email')
let UserViewGender = document.getElementById('view-gender')
let UserViewAge = document.getElementById('view-age')
let UserViewDob = document.getElementById('view-dob')
let UserViewPhone = document.getElementById('view-phone')
let UserViewQualification = document.getElementById('view-qualification')
let UserViewAddress = document.getElementById('view-address')
let UserViewUserName = document.getElementById('view-username')



fetch("http://localhost:3000/employees/" +employeeid)
.then((employeedata) => {
    return employeedata.json()


}).then((userdatas) =>{
    
    // UserViewImg.src = userdatas.view-img//
    // UserViewSalutation.innerHTML = userdatas.salutation
    UserViewFullName.innerHTML = userdatas.salutation+" " +userdatas.firstName+" "+userdatas.lastName+" "
    // UserViewLastName.innerHTML = userdatas.lastname
    UserViewEmail.innerHTML = userdatas.email
    UserViewGender.innerHTML = userdatas.gender
    UserViewAge.innerHTML = calculateAge( userdatas.dob)
    UserViewDob.innerHTML  =  userdatas.dob
    UserViewPhone.innerHTML = userdatas.phone
    UserViewQualification.innerHTML = userdatas.qualifications
    UserViewAddress.innerHTML = userdatas.address
    UserViewUserName.innerHTML = userdatas.username
    UserViewImg.src = "http://localhost:3000/employees/"+employeeid+"/avatar";
})

//calculate age//
function calculateAge(birthDate) {
  
  let dob = birthDate.split('-')
  
  let dateofbirth = []
  for(let j=0;j<3;j++){
    dateofbirth.push(parseInt(dob[j]))
  }

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years
  let age = currentDate.getFullYear() - dateofbirth[2];

  // Check if the birthday has occurred this year
  const hasBirthdayOccurred = (
    currentDate.getMonth() < dateofbirth[1]||
    (currentDate.getMonth() === dateofbirth[1] &&
      currentDate.getDate() < dateofbirth[0])
  );

  // Adjust age based on whether the birthday has occurred this year or not
  if (!hasBirthdayOccurred) {
    age--;
  }

  return age;
}

//calculate age end//


//employee edit form open//
const vieweditformopen = document.getElementById('View-Employee-form')

function viewformopen(){
    vieweditformopen.classList.add('active');
    document.getElementById('overlay').classList.add('active');
}
 //employee edit form close//

 document.getElementById('overlay').addEventListener("click",function(){
  vieweditformclose();
})

function vieweditformclose(){
    vieweditformopen.classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function dateofbirth(dob){
  let Date = dob.split('-').reverse().join('-');
  return Date
}

//add data to view edit-form//
function viewedit(){
fetch("http://localhost:3000/employees/" +employeeid)
.then((employeedata) => {
    return employeedata.json()

}).then((usereditdata) =>{
    document.getElementById("salutation").value = usereditdata.salutation;
    document.getElementById("firstName").value =usereditdata.firstName;
    document.getElementById("lastName").value = usereditdata.lastName;
    document.getElementById("email").value = usereditdata.email;
    document.getElementById("phone").value = usereditdata.phone;
    document.getElementById("username").value = usereditdata.username;
    document.getElementById("password").value = usereditdata.password;
    document.getElementById("dob").value = dateofbirth(usereditdata.dob);
    usereditdata.gender === 'male' ? Male.checked = true : Female.checked = true;
    
    document.getElementById("qualifications").value = usereditdata.qualifications;
    document.getElementById("address").value = usereditdata.address;
    document.getElementById("country").value = usereditdata.country;
    document.getElementById("state").value = usereditdata.state;
    document.getElementById("city").value = usereditdata.city;
    document.getElementById("pin").value = usereditdata.pin;
    document.getElementById("getimg").src = "http://localhost:3000/employees/"+employeeid+"/avatar";
})

// function dateofbirth(dob){
//     let Date = dob.split('-').reverse().join('-');
//     return Date
//   }
}
//get img for view edit form//
let changedp = document.getElementById("change-photo");
let getimg = document.getElementById("getimg");
changedp.addEventListener("change", function (){
  const [file] = changedp.files
  if (file) {
    getimg.src = URL.createObjectURL(file);
  }

  
})
//avatar images//

let imageFile = document.getElementById("change-photo");

let profileimg;

imageFile.addEventListener('change', () => {
profileimg = imageFile.files[0]
  console.log(imageFile.files[0]);
})

async function addImage(image) {
  let avatarData = new FormData()
  avatarData.append("avatar",image)
  try {
    const res = await fetch("http://localhost:3000/employees/"+employeeid+"/avatar", {
      method: "POST",
      body: avatarData
    })
  }

  catch (error) {
    console.log(error);
  }
}
//update view-edit form//
// async function ViewEditEmployeeForm(){
//     if(profileimg){
//         addImage(profileimg)
//     }

//     try{
//       await  fetch("http://localhost:3000/employees/" +employeeid,{
//         method:"PUT",
//         headers: {
//         "Content-Type": "application/json"
//         },
//         body: JSON.stringify(UpdateViewEdit()),

//       })
//     }catch(error){
//         console.error(error)
//     }
// }

let toastedit = document.getElementById('toast-update')
async function ViewEditEmployeeForm(){
  if(profileimg){
      addImage(profileimg)
  }


    await  fetch("http://localhost:3000/employees/" +employeeid,{
      method:"PUT",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(UpdateViewEdit()),

    })
    
  toastedit.style.display = "block"
  document.getElementById('overlay').classList.add('active');
  vieweditformopen.style.display = "none"

  setTimeout(() => {
    location.reload();
  }, 10000)
  
}

function UpdateViewEdit(){
  let updateuser = {
    salutation : document.getElementById('salutation').value,
    firstName : document.getElementById('firstName').value,
    lastName :document.getElementById('lastName').value,
    email : document.getElementById('email').value,
    phone : document.getElementById('phone').value,
    username : document.getElementById('username').value,
    password : document.getElementById('password').value,
    dob : dateofbirth(document.getElementById('dob').value),
    gender : genderSelect(),
    qualifications : document.getElementById('qualifications').value,
    address : document.getElementById('address').value,
    country : document.getElementById('country').value,
    state : document.getElementById('state').value,
    city : document.getElementById('city').value,
    pin : document.getElementById('pin').value

  }
  return updateuser

}
function genderSelect(){
  const male = document.getElementById('Male');
  const female = document.getElementById('Female');

  if (male.checked == true) {
      return male.value;
  } else {    
      return female.value;
     }
}
//delete view-employee user//

let toastelement = document.getElementById('toast-show')
const deleteform = document.getElementById('deleteformbox')
const deleteformdata = document.getElementById('formdelete')

function deleteData(employeeid) {
 
  
  deleteform.style.display = "block";
  
  deleteform.classList.add('active');
  document.getElementById('overlay').classList.add('active');
  

  deleteformdata.addEventListener("click", function () {
    fetch("http://localhost:3000/employees/" + employeeid, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
      }
      )
      toastelement.style.display="block"
      document.getElementById('overlay').classList.add('active');

      deleteform.style.display="none"
      setTimeout(() => {
        location.reload();
      }, 3000);
  })
}



//close alert box
function closealert() {
  deleteform.style.display = "none";
  //display background colour//
  deleteform.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}
//display none deletebox//
document.getElementById('overlay').addEventListener("click",function(){
  closealert();
})
//delete form end//

//validation//
const validationinput = () => {
  if (!document.getElementById('salutation').value) {
    document.getElementById('salutation').previousElementSibling.classList.add('required');
    document.getElementById('salutation').style.border = "1px solid red";
    document.getElementById('salutation').focus();
    document.getElementById('salutation').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('salutation').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('firstName').value) {
    document.getElementById('firstName').previousElementSibling.classList.add('required');
    document.getElementById('firstName').style.border = "1px solid red";
    document.getElementById('firstName').focus();
    document.getElementById('firstName').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('firstName').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('lastName').value) {
    document.getElementById('lastName').previousElementSibling.classList.add('required');
    document.getElementById('lastName').style.border = "1px solid red";
    document.getElementById('lastName').focus();
    document.getElementById('lastName').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('lastName').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('email').value) {
    document.getElementById('email').previousElementSibling.classList.add('required');
    document.getElementById('email').style.border = "1px solid red";
    document.getElementById('email').focus();
    document.getElementById('email').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('email').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('phone').value) {
    document.getElementById('phone').previousElementSibling.classList.add('required');
    document.getElementById('phone').style.border = "1px solid red";
    document.getElementById('phone').focus();
    document.getElementById('phone').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('phone').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('username').value) {
    document.getElementById('username').previousElementSibling.classList.add('required');
    document.getElementById('username').style.border = "1px solid red";
    document.getElementById('username').focus();
    document.getElementById('username').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('username').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('password').value) {
    document.getElementById('password').previousElementSibling.classList.add('required');
    document.getElementById('password').style.border = "1px solid red";
    document.getElementById('password').focus();
    document.getElementById('password').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('password').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('dob').value) {
    document.getElementById('dob').previousElementSibling.classList.add('required');
    document.getElementById('dob').style.border = "1px solid red";
    document.getElementById('dob').focus();
    document.getElementById('dob').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('dob').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('qualifications').value) {
    document.getElementById('qualifications').previousElementSibling.classList.add('required');
    document.getElementById('qualifications').style.border = "1px solid red";
    document.getElementById('qualifications').focus();
    document.getElementById('qualifications').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('qualifications').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('address').value) {
    document.getElementById('address').previousElementSibling.classList.add('required');
    document.getElementById('address').style.border = "1px solid red";
    document.getElementById('address').focus();
    document.getElementById('address').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('address').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('country').value) {
    document.getElementById('country').previousElementSibling.classList.add('required');
    document.getElementById('country').style.border = "1px solid red";
    document.getElementById('country').focus();
    document.getElementById('country').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('country').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('state').value) {
    document.getElementById('state').previousElementSibling.classList.add('required');
    document.getElementById('state').style.border = "1px solid red";
    document.getElementById('state').focus();
    document.getElementById('state').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('state').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('city').value) {
    document.getElementById('city').previousElementSibling.classList.add('required');
    document.getElementById('city').style.border = "1px solid red";
    document.getElementById('city').focus();
    document.getElementById('city').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('city').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('pin').value) {
    document.getElementById('pin').previousElementSibling.classList.add('required');
    document.getElementById('pin').style.border = "1px solid red";
    document.getElementById('pin').focus();
    document.getElementById('pin').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('pin').previousElementSibling.style.color = "red";
  }
}


//validation for each input field//

document.getElementById("phone").addEventListener('click', () => {
  const phonenumber = document.getElementById('phone').value;

  if (phonenumber.length !== 10) {
    document.getElementById('phone').previousElementSibling.textContent = "Invalid Number";
    document.getElementById('phone').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('phone').previousElementSibling.textContent = "Mobile Number";
    document.getElementById('phone').style.border = "1px solid #E6E8EB";
    document.getElementById('phone').previousElementSibling.style.color = "#2B3674";
  }
});

document.getElementById("email").addEventListener('click', () => {
  const email = document.getElementById('email').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('email').previousElementSibling.textContent = "Invalid Email";
    document.getElementById('email').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('email').previousElementSibling.textContent = "Email";
    document.getElementById('email').style.border = "1px solid #E6E8EB";
    document.getElementById('email').previousElementSibling.style.color = "#2B3674";
  }
})


document.getElementById("firstName").addEventListener('click', () => {
  if (!document.getElementById('firstName').value) {
    document.getElementById('firstName').previousElementSibling.classList.add('required');
    document.getElementById('firstName').style.border = "1px solid red";
    document.getElementById('firstName').focus();
    document.getElementById('firstName').previousElementSibling.innerHTML = "First Name required"
    document.getElementById('firstName').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('firstName').previousElementSibling.classList.remove('required');
    document.getElementById('firstName').style.border = "1px solid #E6E8EB";
    document.getElementById('firstName').previousElementSibling.innerHTML = "First Name";
    document.getElementById('firstName').previousElementSibling.style.color = "#2B3674";
  }
})

document.getElementById("lastName").addEventListener('click', () => {
  if (!document.getElementById('lastName').value) {
    document.getElementById('lastName').previousElementSibling.classList.add('required');
    document.getElementById('lastName').style.border = "1px solid red";
    document.getElementById('lastName').focus();
    document.getElementById('lastName').previousElementSibling.innerHTML = "Last Name required"
    document.getElementById('lastName').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('lastName').previousElementSibling.classList.remove('required');
    document.getElementById('lastName').style.border = "1px solid #E6E8EB";
    document.getElementById('lastName').previousElementSibling.innerHTML = "Last Name";
    document.getElementById('lastName').previousElementSibling.style.color = "#2B3674";
  }
})

document.getElementById("username").addEventListener('click', () => {
  if (!document.getElementById('username').value) {
    document.getElementById('username').previousElementSibling.classList.add('required');
    document.getElementById('username').style.border = "1px solid red";
    document.getElementById('username').focus();
    document.getElementById('username').previousElementSibling.innerHTML = "Username required"
    document.getElementById('username').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('username').previousElementSibling.classList.remove('required');
    document.getElementById('username').style.border = "1px solid #E6E8EB";
    document.getElementById('username').previousElementSibling.innerHTML = "User Name";
    document.getElementById('username').previousElementSibling.style.color = "#2B3674";
  }
})


document.getElementById("password").addEventListener('click', () => {
  if (!document.getElementById('password').value) {
    document.getElementById('password').previousElementSibling.classList.add('required');
    document.getElementById('password').style.border = "1px solid red";
    document.getElementById('password').focus();
    document.getElementById('password').previousElementSibling.innerHTML = "Password required"
    document.getElementById('password').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('password').previousElementSibling.classList.remove('required');
    document.getElementById('password').style.border = "1px solid #E6E8EB";
    document.getElementById('password').previousElementSibling.innerHTML = "Password";
    document.getElementById('password').previousElementSibling.style.color = "#2B3674";
  }
})

document.getElementById("dob").addEventListener('click', () => {
  if (!document.getElementById('dob').value) {
    document.getElementById('dob').previousElementSibling.classList.add('required');
    document.getElementById('dob').style.border = "1px solid red";
    document.getElementById('dob').focus();
    document.getElementById('dob').previousElementSibling.innerHTML = "Date of Birth required"
    document.getElementById('dob').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('dob').previousElementSibling.classList.remove('required');
    document.getElementById('dob').style.border = "1px solid #E6E8EB";
    document.getElementById('dob').previousElementSibling.innerHTML = "Date of Birth";
    document.getElementById('dob').previousElementSibling.style.color = "#2B3674";
  }
})

document.getElementById("qualifications").addEventListener('click', () => {
  if (!document.getElementById('qualifications').value) {
    document.getElementById('qualifications').previousElementSibling.classList.add('required');
    document.getElementById('qualifications').style.border = "1px solid red";
    document.getElementById('qualifications').focus();
    document.getElementById('qualifications').previousElementSibling.innerHTML = "Qualification required"
    document.getElementById('qualifications').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('qualifications').previousElementSibling.classList.remove('required');
    document.getElementById('qualifications').style.border = "1px solid #E6E8EB";
    document.getElementById('qualifications').previousElementSibling.innerHTML = "Qualifications";
    document.getElementById('qualifications').previousElementSibling.style.color = "#2B3674";
  }
})

document.getElementById("address").addEventListener('click', () => {
  if (!document.getElementById('address').value) {
    document.getElementById('address').previousElementSibling.classList.add('required');
    document.getElementById('address').style.border = "1px solid red";
    document.getElementById('address').focus();
    document.getElementById('address').previousElementSibling.innerHTML = "Address required"
    document.getElementById('address').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('address').previousElementSibling.classList.remove('required');
    document.getElementById('address').style.border = "1px solid #E6E8EB";
    document.getElementById('address').previousElementSibling.innerHTML = "Address";
    document.getElementById('address').previousElementSibling.style.color = "#2B3674";
  }
})

document.getElementById("country").addEventListener('click', () => {
  if (!document.getElementById('country').value) {
    document.getElementById('country').previousElementSibling.classList.add('required');
    document.getElementById('country').style.border = "1px solid red";
    document.getElementById('country').focus();
    document.getElementById('country').previousElementSibling.innerHTML = "Country required"
    document.getElementById('country').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('country').previousElementSibling.classList.remove('required');
    document.getElementById('country').style.border = "1px solid #E6E8EB";
    document.getElementById('country').previousElementSibling.innerHTML = "Country";
    document.getElementById('country').previousElementSibling.style.color = "#2B3674";
  }
})

document.getElementById("state").addEventListener('click', () => {
  if (!document.getElementById('state').value) {
    document.getElementById('state').previousElementSibling.classList.add('required');
    document.getElementById('state').style.border = "1px solid red";
    document.getElementById('state').focus();
    document.getElementById('state').previousElementSibling.innerHTML = "State required"
    document.getElementById('state').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('state').previousElementSibling.classList.remove('required');
    document.getElementById('state').style.border = "1px solid #E6E8EB";
    document.getElementById('state').previousElementSibling.innerHTML = "State";
    document.getElementById('state').previousElementSibling.style.color = "#2B3674";
  }
})

document.getElementById("city").addEventListener('click', () => {
  if (!document.getElementById('city').value) {
    document.getElementById('city').previousElementSibling.classList.add('required');
    document.getElementById('city').style.border = "1px solid red";
    document.getElementById('city').focus();
    document.getElementById('city').previousElementSibling.innerHTML = "City required"
    document.getElementById('city').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('city').previousElementSibling.classList.remove('required');
    document.getElementById('city').style.border = "1px solid #E6E8EB";
    document.getElementById('city').previousElementSibling.innerHTML = "City";
    document.getElementById('city').previousElementSibling.style.color = "#2B3674";
  }
})

document.getElementById("pin").addEventListener('click', () => {
  if (!document.getElementById('pin').value) {
    document.getElementById('pin').previousElementSibling.classList.add('required');
    document.getElementById('pin').style.border = "1px solid red";
    document.getElementById('pin').focus();
    document.getElementById('pin').previousElementSibling.innerHTML = "Pin/Zip required"
    document.getElementById('pin').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('pin').previousElementSibling.classList.remove('required');
    document.getElementById('pin').style.border = "1px solid #E6E8EB";
    document.getElementById('pin').previousElementSibling.innerHTML = "Pin/Zip";
    document.getElementById('pin').previousElementSibling.style.color = "#2B3674";
  }
})