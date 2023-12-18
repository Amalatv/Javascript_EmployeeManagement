
//fetch data

async function getuservalues(){
   try{
      const data = await fetch("http://localhost:3000/employees")
      const objectData = await data.json()
      
      getData(objectData)
      alluserdata = objectData
   }catch(error){
    console.log(error)
   }
}
getuservalues()

 function getData(user){
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
  // getData()

// slnumber//

function slnumber(num) {
  if (num < 10) {
    return 0;
  } else {
    return "";
  }
}
//slnumber end//

//searching employee//

// function searchdata(){
//   const searchs = document.getElementById("searchbar").value.toUpperCase();
//   let datafetch =[];
//   for(let j=0;j<alluserdata.length;j++){
//      let firstName = alluserdata.firstName.toUpperCase();
//      let email = alluserdata.email.toUpperCase();
//      let phone = alluserdata.phone.toString().toUpperCase();
  
//   if(firstName.includes(searchs)||email.includes(searchs)||phone.includes(searchs)){
//     datafetch.push(alluserdata[j])
//     console.log(datafetch)
//   }
// }
//   getData(datafetch)

// }


function searchdata() {
  const searchs = document.getElementById("searchbar").value.toUpperCase();
  let datafetch = [];

  for (let j = 0; j < alluserdata.length; j++) {
    let firstName = alluserdata[j].firstName.toUpperCase();
    let lastName = alluserdata[j].lastName.toUpperCase();
    let email = alluserdata[j].email.toUpperCase();
    let phone = alluserdata[j].phone.toString().toUpperCase();

    if (firstName.includes(searchs) || lastName.includes(searchs) ||  email.includes(searchs) || phone.includes(searchs)) {
      datafetch.push(alluserdata[j]);
    }
  }

  getData(datafetch);
}

//searching employee end//

//display form//

const employeeformopen = document.getElementById('Employee-form')
const dele = document.getElementById('del')


function Formopen (){

  document.getElementById('displayimgbox').style.display ="none";
  document.getElementById('displayaddimg').style.display ="block";

        datahide();

        employeeformopen.classList.add('active');
        document.getElementById('overlay').classList.add('active');
}

document.getElementById('overlay').addEventListener("click",function(){
      Formclose();
})

function Formclose (){
  employeeformopen.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}

//display form end//



//select gender//

const genderSelect = () => {
      const male = document.getElementById('Male');
      const female = document.getElementById('Female');
  
      if (male.checked == true) {

          return male.value;
      } else {
    
          return female.value;
       }
   }

//---gender end---//

// add user//

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

          // userdata['getimg'] =  document.getElementById("getimg").src = "http://localhost:3000/employees/";
      // Set the checked status of gender radio buttons
     
  
  
             return userdata;

             function dateofbirth(dob){
              let Date = dob.split('-').reverse().join('-');
              return Date
            }
}

function userdetails(){
  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(adduser())
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
    
    })

}

// display edit-delete btn//

const btnsPop = (btn) => {
  btn.style.display === "none" ? btn.style.display = "block" : btn.style.display = "none";

  console.log(btn);
}
    
/***end***/

// delete form//

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
      // body: JSON.stringify(userdata)
    })
      .then((res) => res.json())
      .then((response) => {
        // getData();
      }
      )
  }
  )
}

//close alert box
// const deleteboxnone = document.getElementById('deleteclose')
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


//edit form//
let users;

function getuserid(id){
     users = id;
}

async function getuserdata(){
     

 
        try{

          Formopen();

            //display file upload and change image//

             document.getElementById('displayimgbox').style.display ="block";
             document.getElementById('displayaddimg').style.display ="none";

             //edit form btns//
                 
             document.getElementById('addbtn').style.display ="none";
             document.getElementById('change-btn').style.display ="block";
             document.getElementById('edit-head').textContent ="Edit Employee";

            

             //fetch data for edit//

             const res = await fetch("http://localhost:3000/employees/" + users)
             const data = await res.json()

              //logging fetched data to the console//
             console.log(data);
                 //populating form feild with fetched data//
             document.getElementById("salutation").value = data.salutation;
             document.getElementById("firstName").value =data.firstName;
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
             document.getElementById("getimg").src = "http://localhost:3000/employees/"+users+"/avatar";
        }
        catch(error){
              console.log(error)
        }

        function dateofbirth(dob){
          let Date = dob.split('-').reverse().join('-');
          return Date
        }

}

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
    const res = await fetch("http://localhost:3000/employees/"+users+"/avatar", {
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

async function editEmployeeForm() {

  if(profileimg){
    addImage(profileimg)

  }

  

  try{
  await fetch("http://localhost:3000/employees/" + users, {
         method: "PUT",
         headers: {
          "Content-Type": "application/json"
        },
         body: JSON.stringify(adduser()),
  });   
} catch (error){
        console.error(error)
}
}


const datahide = () => {
//add imgbox//
 document.getElementById('displayimgbox').style.display ="none";
//add button//
  document.getElementById('addbtn').style.display ="block";
  document.getElementById('change-btn').style.display ="none";
  document.getElementById('edit-head').textContent ="Add Employee";



  document.getElementById("salutation").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dob").value = "";
  // genderSelect(data.gender);

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
changedp.addEventListener("change", function (){
  const [file] = changedp.files
  if (file) {
    getimg.src = URL.createObjectURL(file);
  }

  
})
//image preview end//


//view employee//

