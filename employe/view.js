
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

function dateofbirth(dob){
    let Date = dob.split('-').reverse().join('-');
    return Date
  }
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
async function ViewEditEmployeeForm(){
    if(profileimg){
        addImage(profileimg)
    }

    try{
      await  fetch("http://localhost:3000/employees/" +employeeid,{
        method:"PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(UpdateViewEdit()),

      })
    }catch(error){
        console.error(error)
    }
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

    function genderSelect(){
      const male = document.getElementById('Male');
      const female = document.getElementById('Female');
  
      if (male.checked == true) {
          return male.value;
      } else {    
          return female.value;
       }
    }
 
    function dateofbirth(dob){
      let Date = dob.split('-').reverse().join('-');
      return Date
    }
}

//delete view-employee user//
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
      // body: JSON.stringify(userdata)
    })
      .then((res) => res.json())
      .then((response) => {
        // getData();
      }
      )
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