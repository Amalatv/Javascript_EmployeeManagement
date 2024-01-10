
//FETCH DATA//

async function getuservalues() {
  try {
    const data = await fetch("http://localhost:3000/employees")
    const objectData = await data.json()

    getData(objectData)
    alluserdata = objectData
  }
  catch (error) {
    console.log(error)
  }
}
getuservalues();

function getData(user) {
  let tableData = "";
  let slno = 1
  user.forEach((user, index) => {
    tableData += `
        
      <tr>
        <td>#${slnumber(index + 1)}${(index + 1)}</td>
        <td><img src="http://localhost:3000/employees/${user.id}/avatar" alt=profilpic class="rounded-circle mr-2" height=30 width=30> ${user.salutation} ${user.firstName} ${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.gender}</td>
        <td>${user.dob}</td>
        <td>${user.country}</td>
      
        <td class="actions" >
        <button class="delete-edit" onclick="btnsPop(this.nextElementSibling)" ><i class="fa-solid fa-ellipsis"></i></button>
        <div class="employee-data" id="employees-btn">
        <a href="editemployee.html?id=${user.id}"><button type="button" class="btn-controls gap"><i class="fa-regular fa-eye"></i> View Details</button></a>
        <button type="button" class="btn-controls gap" onclick="getuserid('${user.id}'); getuserdata()"><i class="fa-solid fa-pen"></i>Edit</button>
        <button type="button" class="btn-controls" id="del" onclick="deleteData('${user.id}')"><i class="fa-regular fa-trash-can"></i>Delete</button>
        </div>
        </td> 
      </tr> `
    slno++
  })
  document.getElementById("table-content").innerHTML = tableData;
}
//FETCH DATA END//

// SL NUMBER//

function slnumber(num) {
  if (num < 10) {
    return 0;
  } else {
    return "";
  }
}
//SL NUMBER END//

// DISPLAY EDIT-DELETE-VIEW BUTTONS//

const btnsPop = (btn) => {
  btn.style.display = btn.style.display === "block" ? "none" : "block";
}
// DISPLAY EDIT-DELETE-VIEW BUTTONS END//

// DISPLAY FORM //

const employeeformopen = document.getElementById('Employee-form')
const dele = document.getElementById('del')

function Formopen() {

  document.getElementById('displayimgbox').style.display = "none";
  document.getElementById('displayaddimg').style.display = "block";

  datahide();

  employeeformopen.classList.add('active');
  document.getElementById('overlay').classList.add('active');
}

document.getElementById('overlay').addEventListener("click", function () {
  Formclose();
})

function Formclose() {
  employeeformopen.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}
// DISPLAY FORM END //

// POST EMPLOYEE TO API //
let toastpost = document.getElementById('toast-create');

function userdetails() {

  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(adduser())
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response.id);
      uploadavatar(response.id, profileimg)
    }).catch((error) => {
      console.log(error);
    })

    toastpost.style.display = 'block'
    document.getElementById('overlay').classList.add('active');
    employeeformopen.style.display = "none"

    // overlay.style.display = "none"

  setTimeout(() => {
    // toastElement.style.display = 'none';
    location.reload();

  }, 3000)
    
}

// ADD USER//

function adduser() {
  let userdata = {};

  userdata['salutation'] = document.getElementById('salutation').value
  userdata['firstName'] = document.getElementById('firstName').value
  userdata['lastName'] = document.getElementById('lastName').value
  userdata['email'] = document.getElementById('email').value
  userdata['phone'] = document.getElementById('phone').value
  userdata['username'] = document.getElementById('username').value
  userdata['password'] = document.getElementById('password').value
  userdata['dob'] = dateofbirth(document.getElementById('dob').value)
  userdata['gender'] = genderSelect();
  userdata['qualifications'] = document.getElementById('qualifications').value
  userdata['address'] = document.getElementById('address').value
  userdata['country'] = document.getElementById('country').value
  userdata['state'] = document.getElementById('state').value
  userdata['city'] = document.getElementById('city').value
  userdata['pin'] = document.getElementById('pin').value

  return userdata;
}

//SELECT GENDER//

const genderSelect = () => {
  const male = document.getElementById('Male');
  const female = document.getElementById('Female');

  if (male.checked == true) {
    return male.value;

  } else {
    return female.value;
  }
}
//SELECT GENDER END//

//DATE OF BIRTH//

function dateofbirth(dob) {
  let Date = dob.split('-').reverse().join('-');
  return Date
}
//DATE OF BIRTH END //

//POST EMPLOYEE AVATAR -ADD EMPLOYEE FORM // 

let uploadimg = document.getElementById("formFile")
let imageFile = document.getElementById("change-photo");

let profileimg;

imageFile.addEventListener('change', () => {
  profileimg = imageFile.files[0]
  console.log(profileimg);
})
uploadimg.addEventListener('change', () => {
  profileimg = uploadimg.files[0]
  console.log(profileimg);
})

//another upload img folder changed 6/1/2024//
//upload image in add-employee form//

let formimage = document.getElementById('formFile')
let getimage = document.getElementById("getimg");
formimage.addEventListener('change', function () {

  document.getElementById('displayaddimg').style.display = "none";
  document.getElementById('displayimgbox').style.display = "block";

  const [file] = formimage.files
  if (file) {
    getimage.src = URL.createObjectURL(file);
  }
})

//upload image in add-employee form- END//



async function uploadavatar(id, imagefile) {
  let uploadavatarData = new FormData()
  uploadavatarData.append("avatar", imagefile)
  try {
    const res = await fetch("http://localhost:3000/employees/" + id + "/avatar", {
      method: "POST",
      body: uploadavatarData
    })
  }

  catch (error) {
    console.log(error);
  }
}



//POST EMPLOYEE AVATAR END//

// ADD USER END //

// POST EMPLOYEE TO API END //

//PAGINATION//

var tablesize = 10;
var indexvalue = 0;
var datas;
var alluserdata;
var totalPages;
var itemshow;

var pageul = document.querySelector(".pagination");

var itemshow = document.getElementById("itemperpage");

itemshow.addEventListener('change', selectpage);

function selectpage() {
  indexvalue = 0;
  pagination(alluserdata);
}

function pagination(employeelist) {
  var itemperpage = parseInt(itemshow.value);
  var totalItems = employeelist.length;
  totalPages = Math.ceil(totalItems / itemperpage);

  // Display only the items for the current page
  var currentPageData = employeelist.slice(indexvalue, indexvalue + itemperpage);
  getData(currentPageData);

  // Create pagination links dynamically
  renderPagination();
}

function renderPagination() {
  // Clear existing pagination links
  pageul.innerHTML = "";

  var prevButton = document.createElement("li");
  prevButton.className = "prev";
  // var prevLink = document.createElement("a");
  // prevLink.href = "#";
  prevButton.innerHTML = '<i class="fa fa-angle-left"></i>';
  prevButton.addEventListener("click", function () {
    if (indexvalue > 0) {

      indexvalue -= parseInt(itemshow.value);
      pagination(alluserdata);
    }
  });
  // prevButton.appendChild(prevLink);
  pageul.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    var li = document.createElement("li");
    // var a = document.createElement("a");
    // a.href = "#";
    li.textContent = i;
    li.addEventListener("click", function () {

      indexvalue = (i - 1) * parseInt(itemshow.value);
      pagination(alluserdata);
    });
    // li.appendChild(a);
    pageul.appendChild(li);
  }

  var nextButton = document.createElement("li");
  nextButton.className = "next";
  // var nextLink = document.createElement("a");
  // nextLink.href = "#";
  nextButton.innerHTML = '<i class="fa fa-angle-right"></i>';
  nextButton.addEventListener("click", function () {
    if (indexvalue + parseInt(itemshow.value) < alluserdata.length) {
      indexvalue += parseInt(itemshow.value);
      pagination(alluserdata);
    }
  });
  // nextButton.appendChild(nextLink);
  pageul.appendChild(nextButton);
}

//display Default pagination employyee data//

fetch("http://localhost:3000/employees")
  .then((objectData) => objectData.json())
  .then((data) => {
    datas = data;
    pagination(datas);
  });

//PAGINATION END//

//SEARCHING EMPLOYEE//

function searchdata() {
  const searchs = document.getElementById("searchbar").value.toUpperCase();
  let datafetch = [];

  for (let j = 0; j < alluserdata.length; j++) {
    let firstName = alluserdata[j].firstName.toUpperCase();
    let lastName = alluserdata[j].lastName.toUpperCase();
    let email = alluserdata[j].email.toUpperCase();
    let phone = alluserdata[j].phone.toString().toUpperCase();

    if (firstName.includes(searchs) || lastName.includes(searchs) || email.includes(searchs) || phone.includes(searchs)) {
      datafetch.push(alluserdata[j]);
    }
  }
  getData(datafetch);
}
//searching employee end//












// delete form//

let toastelement = document.getElementById('toast-show')
const deleteform = document.getElementById('deleteformbox')
const deleteformdata = document.getElementById('formdelete')

function deleteData(id) {


  deleteform.style.display = "block";

  deleteform.classList.add('active');
  document.getElementById('overlay').classList.add('active');


  deleteformdata.addEventListener("click", function () {
    fetch("http://localhost:3000/employees/" + id, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      }
      )
    toastelement.style.display = "block"
    document.getElementById('overlay').classList.add('active');

    deleteform.style.display = "none"
    
    setTimeout(() => {
      location.reload();
     
    }, 2000)

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
document.getElementById('overlay').addEventListener("click", function () {
  closealert();
})
//delete form end//


//edit form//
let users;

function getuserid(id) {
  users = id;
}
async function getuserdata() {
  try {

    Formopen();

    //display file upload and change image//

    document.getElementById('displayimgbox').style.display = "block";
    document.getElementById('displayaddimg').style.display = "none";

    //edit form btns//

    document.getElementById('addbtn').style.display = "none";
    document.getElementById('change-btn').style.display = "block";
    document.getElementById('edit-head').textContent = "Edit Employee";

    //fetch data for edit//

    const res = await fetch("http://localhost:3000/employees/" + users)
    const data = await res.json()

    //logging fetched data to the console//
    console.log(data);
    // form feild with fetched data//
    document.getElementById("salutation").value = data.salutation;
    document.getElementById("firstName").value = data.firstName;
    document.getElementById("lastName").value = data.lastName;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("username").value = data.username;
    document.getElementById("password").value = data.password;
    document.getElementById("dob").value = dateofbirth(data.dob);
    data.gender === 'male' ? Male.checked = true : Female.checked = true;
    document.getElementById("qualifications").value = data.qualifications;
    document.getElementById("address").value = data.address;
    document.getElementById("country").value = data.country;
    document.getElementById("state").value = data.state;
    document.getElementById("city").value = data.city;
    document.getElementById("pin").value = data.pin;
    document.getElementById("getimg").src = "http://localhost:3000/employees/" + users + "/avatar";
  }
  catch (error) {
    console.log(error)
  }

}

//avatar images post//



async function addImage(image) {
  let avatarData = new FormData()
  avatarData.append("avatar", image)
  try {
    const res = await fetch("http://localhost:3000/employees/" + users + "/avatar", {
      method: "POST",
      body: avatarData
    })
  }

  catch (error) {
    console.log(error);
  }
}

//avatar images end//

//update employee//
// async function editEmployeeForm() {

//   if (profileimg) {
//     addImage(profileimg)

//   }

//   try {
//     toastedit.style.display = "block"
//     document.getElementById('overlay').classList.add('active');
//     employeeformopen.style.display = "none"
  
//     setTimeout(() => {
//       location.reload();
     
//     }, 3000)
//     await fetch("http://localhost:3000/employees/" + users, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(adduser())
//     })

   
//     setTimeout(() => {
//       location.reload();
     
//     }, 3000)
   
//   } catch (error) {
//     console.error(error)
//   }

  
// }

/////////
function editEmployeeForm() {
  if (profileimg) {
    addImage(profileimg)
  }
  let toastedit = document.getElementById('toast-update')

  fetch("http://localhost:3000/employees/" + users, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(adduser())
  })


  toastedit.style.display = "block"
  document.getElementById('overlay').classList.add('active');
  employeeformopen.style.display = "none"

  setTimeout(() => {
    location.reload();
   
  }, 10000)
}


const datahide = () => {
  //add imgbox//
  document.getElementById('displayimgbox').style.display = "none";
  //add button//
  document.getElementById('addbtn').style.display = "block";
  document.getElementById('change-btn').style.display = "none";
  document.getElementById('edit-head').textContent = "Add Employee";



  document.getElementById("salutation").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dob").value = "";
  gender === 'male' ? Male.checked = false : Female.checked = false;
  genderSelect(document.getElementById(gender)).value = "";
  document.getElementById("qualifications").value = "";
  document.getElementById("address").value = "";
  document.getElementById("country").value = "";
  document.getElementById("state").value = "";
  document.getElementById("city").value = "";
  document.getElementById("pin").value = "";
}

//update employee end//

//image preview//
let changedp = document.getElementById("change-photo");
let getimg = document.getElementById("getimg");
changedp.addEventListener("change", function () {
  const [file] = changedp.files
  if (file) {
    getimg.src = URL.createObjectURL(file);
  }
})
//image preview end//



//form validation for add-employee button//
let addEmployee = document.getElementById("addbtn")
addEmployee.addEventListener('click', function (e) {

  e.preventDefault();
  formvalidation();

})
function formvalidation() {

  let Addforminput = true;
  if (!document.getElementById('salutation').value) {
    Addforminput = false;
    document.getElementById('salutation').previousElementSibling.classList.add('required');
    document.getElementById('salutation').style.border = "1px solid red";
    document.getElementById('salutation').focus();
    document.getElementById('salutation').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('salutation').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('firstName').value) {
    Addforminput = false;

    document.getElementById('firstName').previousElementSibling.classList.add('required');
    document.getElementById('firstName').style.border = "1px solid red";
    document.getElementById('firstName').focus();
    document.getElementById('firstName').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('firstName').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('lastName').value) {
    Addforminput = false;

    document.getElementById('lastName').previousElementSibling.classList.add('required');
    document.getElementById('lastName').style.border = "1px solid red";
    document.getElementById('lastName').focus();
    document.getElementById('lastName').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('lastName').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('email').value) {
    Addforminput = false;

    document.getElementById('email').previousElementSibling.classList.add('required');
    document.getElementById('email').style.border = "1px solid red";
    document.getElementById('email').focus();
    document.getElementById('email').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('email').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('phone').value) {
    Addforminput = false;

    document.getElementById('phone').previousElementSibling.classList.add('required');
    document.getElementById('phone').style.border = "1px solid red";
    document.getElementById('phone').focus();
    document.getElementById('phone').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('phone').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('username').value) {
    Addforminput = false;

    document.getElementById('username').previousElementSibling.classList.add('required');
    document.getElementById('username').style.border = "1px solid red";
    document.getElementById('username').focus();
    document.getElementById('username').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('username').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('password').value) {
    Addforminput = false;

    document.getElementById('password').previousElementSibling.classList.add('required');
    document.getElementById('password').style.border = "1px solid red";
    document.getElementById('password').focus();
    document.getElementById('password').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('password').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('dob').value) {
    Addforminput = false;

    document.getElementById('dob').previousElementSibling.classList.add('required');
    document.getElementById('dob').style.border = "1px solid red";
    document.getElementById('dob').focus();
    document.getElementById('dob').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('dob').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('qualifications').value) {
    Addforminput = false;

    document.getElementById('qualifications').previousElementSibling.classList.add('required');
    document.getElementById('qualifications').style.border = "1px solid red";
    document.getElementById('qualifications').focus();
    document.getElementById('qualifications').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('qualifications').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('address').value) {
    Addforminput = false;

    document.getElementById('address').previousElementSibling.classList.add('required');
    document.getElementById('address').style.border = "1px solid red";
    document.getElementById('address').focus();
    document.getElementById('address').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('address').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('country').value) {
    Addforminput = false;

    document.getElementById('country').previousElementSibling.classList.add('required');
    document.getElementById('country').style.border = "1px solid red";
    document.getElementById('country').focus();
    document.getElementById('country').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('country').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('state').value) {
    Addforminput = false;

    document.getElementById('state').previousElementSibling.classList.add('required');
    document.getElementById('state').style.border = "1px solid red";
    document.getElementById('state').focus();
    document.getElementById('state').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('state').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('city').value) {
    Addforminput = false;

    document.getElementById('city').previousElementSibling.classList.add('required');
    document.getElementById('city').style.border = "1px solid red";
    document.getElementById('city').focus();
    document.getElementById('city').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('city').previousElementSibling.style.color = "red";
  }

  if (!document.getElementById('pin').value) {
    Addforminput = false;

    document.getElementById('pin').previousElementSibling.classList.add('required');
    document.getElementById('pin').style.border = "1px solid red";
    document.getElementById('pin').focus();
    document.getElementById('pin').previousElementSibling.innerHTML = "This field-required";
    document.getElementById('pin').previousElementSibling.style.color = "red";
  }
  if (Addforminput === true) {

    userdetails();
  }
}

//VALIDATION FOR EACH INPUT FIELD//

  //PHONE NUMBER VALIDATION//
    document.getElementById("phone").addEventListener('click', () => {
    const phonenumber = document.getElementById('phone').value;

    if (phonenumber.length !== 10) {
      document.getElementById('phone').previousElementSibling.textContent = "Invalid Number";
      document.getElementById('phone').previousElementSibling.style.color = "red";
    } else {
    document.getElementById('phone').previousElementSibling.classList.remove('required');
    document.getElementById('phone').previousElementSibling.textContent = "Mobile Number";
    document.getElementById('phone').style.border = "1px solid #E6E8EB";
    document.getElementById('phone').previousElementSibling.style.color = "#2B3674";
   }
});
//EMAIL VALIDATION//
document.getElementById("email").addEventListener('click', () => {
  const email = document.getElementById('email').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('email').previousElementSibling.textContent = "Invalid Email";
    document.getElementById('email').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('email').previousElementSibling.classList.remove('required');
    document.getElementById('email').previousElementSibling.textContent = "Email";
    document.getElementById('email').style.border = "1px solid #E6E8EB";
    document.getElementById('email').previousElementSibling.style.color = "#2B3674";
  }
})
//SALUTATION//
document.getElementById("salutation").addEventListener('click', () => {
  if (!document.getElementById('salutation').value) {
    document.getElementById('salutation').previousElementSibling.classList.add('required');
    document.getElementById('salutation').style.border = "1px solid red";
    document.getElementById('salutation').focus();
    document.getElementById('salutation').previousElementSibling.innerHTML = "First Name required"
    document.getElementById('salutation').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('salutation').previousElementSibling.classList.remove('required');
    document.getElementById('salutation').style.border = "1px solid #E6E8EB";
    document.getElementById('salutation').previousElementSibling.innerHTML = "First Name";
    document.getElementById('salutation').previousElementSibling.style.color = "#2B3674";
  }
})

//FIRST NAME//
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
//LAST NAME//
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
//USER NAME//
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

