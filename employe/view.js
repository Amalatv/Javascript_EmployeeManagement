
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
    
    UserViewFullName.innerHTML = userdatas.salutation+" " +userdatas.firstName+" "+userdatas.lastName+" "
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

  //CALCULATE AGE//
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

  //CALCULATE AGE END//

//FETCH DATA END//

//VIEW EMPLOYEE EDIT FORM //

  const vieweditformopen = document.getElementById('View-Employee-form') //employee edit form open//

  function viewformopen(){
    vieweditformopen.classList.add('active');
    document.getElementById('overlay').classList.add('active');
  }

  document.getElementById('overlay').addEventListener("click",function(){  //employee edit form close//
    vieweditformclose();
  })

  function vieweditformclose(){
    vieweditformopen.classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    window.location.href = 'index.html';

  }

 

  //ADD DATA TO VIEW EDIT-FORM//
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
    }
      //DOB//
        function dateofbirth(dob){
        let Date = dob.split('-').reverse().join('-');
        return Date
      }

    //GET IMGAGE FOR VIEW EDIT FORM//
      let changedp = document.getElementById("change-photo");
      let getimg = document.getElementById("getimg");
      changedp.addEventListener("change", function (){
        const [file] = changedp.files
        if (file) {
          getimg.src = URL.createObjectURL(file);
        }
      })

    //GET IMGAGE FOR VIEW EDIT FORM END//

    //POST AVATAR IMAGES//

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
        }catch (error) {
          console.log(error);
        }
      }

    //POST AVATAR IMAGES END//
     
    //EDIT AVATAR IMAGE AND EMPLOYEE DATA //
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
     
        vieweditformopen.style.display = "none"
        editsuccessmessage();

        window.location.href = 'index.html';

      }
      //SUCCESS MESSAGE FOR EDIT//

        let editsuccess = document.getElementById("editformsuccess")

        function editsuccessmessage() {
          editsuccess.style.display = "block";
       
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
        //SELECT GENDER//
      function genderSelect(){     
        const male = document.getElementById('Male');
        const female = document.getElementById('Female');

        if (male.checked == true) {
          return male.value;
        } else {    
          return female.value;  
        }
      }
    //EDIT AVATAR IMAGE AND EMPLOYEE DATA //

  //ADD DATA TO VIEW EDIT-FORM//

//VIEW EMPLOYEE EDIT FORM END//

//DELETE VIEW-EMPLOYEE USER//

  // let toastelement = document.getElementById('toast-show')
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
      })

      deleteform.style.display="none"
      successmessage();
    })
  }
  //DELETE SUCCESS MESSAGE//
    const deletesuccess = document.getElementById('deleteformsuccess')

    function successmessage() {
      deletesuccess.style.display = "block"
    }
  //DELETE SUCCESS MESSAGE//


  //CLOSE ALERT BOX//
    function closealert() {
      deleteform.style.display = "none";
      deleteform.classList.remove('active');  //display background colour//
      document.getElementById('overlay').classList.remove('active');
    }
    document.getElementById('overlay').addEventListener("click",function(){ //display none deletebox //
      closealert();  
    })
  //CLOSE ALERT BOX END //

//DELETE FORM END//

// FORM VALIDATION FOR VIEW-EMPLOYEE FORM EDIT //

  let addEmployee = document.getElementById("addbtn")
  addEmployee.addEventListener('click', function (e) {

    e.preventDefault();
    formvalidation();

  })

  function formvalidation() {

    let Addforminput = true;

    if(document.getElementById("salutation").value == ""){
      Addforminput = false;
      document.getElementById("errormessageSalutation").style.display = "flex";
      
    }

    if(document.getElementById("firstName").value == ""){
      Addforminput = false;
      document.getElementById("errormessageFirstname").style.display = "flex";

    }

    if(document.getElementById("lastName").value == ""){
      Addforminput = false;
      document.getElementById("errormessageLastname").style.display = "flex";
    }

    if(document.getElementById("email").value == ""){
      Addforminput = false;
      document.getElementById("errormessageEmail").style.display = "flex";
    }

    if(document.getElementById("phone").value == ""){
      Addforminput = false;
      document.getElementById("errormessagePhone").style.display = "flex";
    }

    if(document.getElementById("username").value == ""){
      Addforminput = false;
      document.getElementById("errormessageUsername").style.display = "flex";
    }

    if(document.getElementById("password").value == ""){
      Addforminput = false;
      document.getElementById("errormessagePassword").style.display = "flex";
    }

    if(document.getElementById("dob").value == ""){
      Addforminput = false;
      document.getElementById("errormessageDob").style.display = "flex";
    }

    if(document.getElementById("gender").value == ""){
      Addforminput = false;
      document.getElementById("errormessageGender").style.display = "flex";
    }

    if(document.getElementById("qualifications").value == ""){
      Addforminput = false;
      document.getElementById("errormessageQualifications").style.display = "flex";
    }

    if(document.getElementById("address").value == ""){
      Addforminput = false;
      document.getElementById("errormessageAddress").style.display = "flex";
    }

    if(document.getElementById("country").value == ""){
      Addforminput = false;
      document.getElementById("errormessageCountry").style.display = "flex";
    }

    if(document.getElementById("state").value == ""){
      Addforminput = false;
      document.getElementById("errormessageState").style.display = "flex";
    }

    if(document.getElementById("city").value == ""){
      Addforminput = false;
      document.getElementById("errormessageCity").style.display = "flex";
    }

    if(document.getElementById("pin").value == ""){
      Addforminput = false;
      document.getElementById("errormessagePin").style.display = "flex";
    }

    if(Addforminput == true) {

    ViewEditEmployeeForm();
      
    
    }
  }

  //VALIDATION FOR EACH INPUT FIELD//

    const validNamePattern = /^[A-Za-z]+$/; //for name validation


    document.getElementById("salutation").addEventListener('change' , function () {
      if(!document.getElementById("salutation").value == ""){
        document.getElementById("errormessageSalutation").style.display = "none";
      }else{
        document.getElementById("errormessageSalutation").style.display = "flex";
      }
    })

    document.getElementById("firstName").addEventListener('input', function () {
      const firstNameInput = document.getElementById('firstName');
  
      if (firstNameInput.value.trim() !== "") {
        document.getElementById("errormessageFirstname").style.display = "none";
      } else {
        document.getElementById("errormessageFirstname").style.display = "flex";
        document.getElementById("errormessageFirstname").textContent = "Please enter the First Name";
      }
  
      if (!validNamePattern.test(firstNameInput.value.trim())) {
        document.getElementById("errormessageFirstname").style.display = "flex";
        document.getElementById("errormessageFirstname").textContent = "Invalid characters in First Name";
      }
    });
  

    document.getElementById("lastName").addEventListener('input', function () {
      const lastNameInput = document.getElementById('lastName');
  
      if (lastNameInput.value.trim() !== "") {
        document.getElementById("errormessageLastname").style.display = "none";
      } else {
        document.getElementById("errormessageLastname").style.display = "flex";
        document.getElementById("lastNameInput").textContent = "Please enter the Last Name";
      }
  
      if (!validNamePattern.test(lastNameInput.value.trim())) {
        document.getElementById("errormessageLastname").style.display = "flex";
        document.getElementById("errormessageLastname").textContent = "Invalid characters in Last Name";
      }
    });

    document.getElementById("email").addEventListener('input', function () {
      const emailInput = document.getElementById('email');
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (email === "") {
        document.getElementById("errormessageEmail").style.display = "none";
        emailInput.setCustomValidity(''); // 
      } else if (!emailRegex.test(email)) {
        const emailError = document.getElementById("errormessageEmail");
        emailError.style.display = "flex";
        emailError.textContent = "Invalid email";
        emailInput.setCustomValidity('Invalid Email');
      } else {
        document.getElementById("errormessageEmail").style.display = "none";
        emailInput.setCustomValidity('');
      }
    });

   
    document.getElementById("phone").addEventListener('input', function () {
      var phoneNumber = document.getElementById("phone").value;
      var number = phoneNumber.trim();
      var phoneRegex = /^[0-9]{10}$/; // Change this regex based on your phone number format

      if (number === "") {
          document.getElementById("errormessagePhone").style.display = "none";
          document.getElementById("phone").setCustomValidity('');
      } else if (!phoneRegex.test(number)) {
          document.getElementById("errormessagePhone").style.display = "flex";
          document.getElementById("errormessagePhone").textContent = "Invalid Phone Number";
          document.getElementById("phone").setCustomValidity('Invalid Phone Number');
      } else {
          document.getElementById("errormessagePhone").style.display = "none";
          document.getElementById("phone").setCustomValidity('');
      }
    });
   

    document.getElementById("username").addEventListener('change' , function () {
      if(!document.getElementById("username").value == " "){
        document.getElementById("errormessageUsername").style.display = "none";
      }else{
        document.getElementById("errormessageUsername").style.display = "flex";
      }
    })

    document.getElementById("password").addEventListener('change' , function () {
      if(!document.getElementById("password").value == " "){
        document.getElementById("errormessagePassword").style.display = "none";
      }else{
        document.getElementById("errormessagePassword").style.display = "flex";
      }
    })

    document.getElementById("dob").addEventListener('change' , function () {
      if(!document.getElementById("dob").value == " "){
        document.getElementById("errormessageDob").style.display = "none";
      }else{
        document.getElementById("errormessageDob").style.display = "flex";
      }
    })

    document.getElementById("gender").addEventListener('keyup' , function () {
      if(!document.getElementById("gender").value == " "){
        document.getElementById("errormessageGender").style.display = "none";
      }else{
        document.getElementById("errormessageGender").style.display = "flex";
      }
    })

    document.getElementById("submitBtn").addEventListener('click', function () {
      const maleRadio = document.getElementById('Male');
      const femaleRadio = document.getElementById('Female');
      const errorMessageGender = document.getElementById('errormessageGender');
  
      if (!maleRadio.checked && !femaleRadio.checked) {
          errorMessageGender.textContent = "Please select the gender";
          errorMessageGender.style.display = "block";
      } else {
          errorMessageGender.style.display = "none";
      }
  });
  

    document.getElementById("qualifications").addEventListener('change' , function () {
      if(!document.getElementById("qualifications").value == " "){
        document.getElementById("errormessageQualifications").style.display = "none";
      }else{
        document.getElementById("errormessageQualifications").style.display = "flex";
      }
    })

    document.getElementById("address").addEventListener('change' , function () {
      if(!document.getElementById("address").value == " "){
        document.getElementById("errormessageAddress").style.display = "none";
      }else{
        document.getElementById("errormessageAddress").style.display = "flex";
      }
    })

    document.getElementById("country").addEventListener('change' , function () {
      if(!document.getElementById("country").value == " "){
        document.getElementById("errormessageCountry").style.display = "none";
      }else{
        document.getElementById("errormessageCountry").style.display = "flex";
      }
    })

    document.getElementById("state").addEventListener('change' , function () {
      if(!document.getElementById("state").value == " "){
        document.getElementById("errormessageState").style.display = "none";
      }else{
        document.getElementById("errormessageState").style.display = "flex";
      }
    })

    document.getElementById("city").addEventListener('change' , function () {
      if(!document.getElementById("city").value == " "){
        document.getElementById("errormessageCity").style.display = "none";
      }else{
        document.getElementById("errormessageCity").style.display = "flex";
      }
    })

    document.getElementById("pin").addEventListener('change' , function () {
      if(!document.getElementById("pin").value == " "){
        document.getElementById("errormessagePin").style.display = "none";

      }else{
        document.getElementById("errormessagePin").style.display = "flex";

      }
    })

//   let Addforminput = true;
//   if (!document.getElementById('salutation').value) {
//     Addforminput = false;
//     document.getElementById('salutation').previousElementSibling.classList.add('required');
//     document.getElementById('salutation').style.border = "1px solid red";
//     document.getElementById('salutation').focus();
//     document.getElementById('salutation').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('salutation').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('firstName').value) {
//     Addforminput = false;

//     document.getElementById('firstName').previousElementSibling.classList.add('required');
//     document.getElementById('firstName').style.border = "1px solid red";
//     document.getElementById('firstName').focus();
//     document.getElementById('firstName').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('firstName').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('lastName').value) {
//     Addforminput = false;

//     document.getElementById('lastName').previousElementSibling.classList.add('required');
//     document.getElementById('lastName').style.border = "1px solid red";
//     document.getElementById('lastName').focus();
//     document.getElementById('lastName').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('lastName').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('email').value) {
//     Addforminput = false;

//     document.getElementById('email').previousElementSibling.classList.add('required');
//     document.getElementById('email').style.border = "1px solid red";
//     document.getElementById('email').focus();
//     document.getElementById('email').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('email').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('phone').value) {
//     Addforminput = false;

//     document.getElementById('phone').previousElementSibling.classList.add('required');
//     document.getElementById('phone').style.border = "1px solid red";
//     document.getElementById('phone').focus();
//     document.getElementById('phone').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('phone').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('username').value) {
//     Addforminput = false;

//     document.getElementById('username').previousElementSibling.classList.add('required');
//     document.getElementById('username').style.border = "1px solid red";
//     document.getElementById('username').focus();
//     document.getElementById('username').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('username').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('password').value) {
//     Addforminput = false;

//     document.getElementById('password').previousElementSibling.classList.add('required');
//     document.getElementById('password').style.border = "1px solid red";
//     document.getElementById('password').focus();
//     document.getElementById('password').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('password').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('dob').value) {
//     Addforminput = false;

//     document.getElementById('dob').previousElementSibling.classList.add('required');
//     document.getElementById('dob').style.border = "1px solid red";
//     document.getElementById('dob').focus();
//     document.getElementById('dob').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('dob').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('qualifications').value) {
//     Addforminput = false;

//     document.getElementById('qualifications').previousElementSibling.classList.add('required');
//     document.getElementById('qualifications').style.border = "1px solid red";
//     document.getElementById('qualifications').focus();
//     document.getElementById('qualifications').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('qualifications').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('address').value) {
//     Addforminput = false;

//     document.getElementById('address').previousElementSibling.classList.add('required');
//     document.getElementById('address').style.border = "1px solid red";
//     document.getElementById('address').focus();
//     document.getElementById('address').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('address').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('country').value) {
//     Addforminput = false;

//     document.getElementById('country').previousElementSibling.classList.add('required');
//     document.getElementById('country').style.border = "1px solid red";
//     document.getElementById('country').focus();
//     document.getElementById('country').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('country').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('state').value) {
//     Addforminput = false;

//     document.getElementById('state').previousElementSibling.classList.add('required');
//     document.getElementById('state').style.border = "1px solid red";
//     document.getElementById('state').focus();
//     document.getElementById('state').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('state').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('city').value) {
//     Addforminput = false;

//     document.getElementById('city').previousElementSibling.classList.add('required');
//     document.getElementById('city').style.border = "1px solid red";
//     document.getElementById('city').focus();
//     document.getElementById('city').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('city').previousElementSibling.style.color = "red";
//   }

//   if (!document.getElementById('pin').value) {
//     Addforminput = false;

//     document.getElementById('pin').previousElementSibling.classList.add('required');
//     document.getElementById('pin').style.border = "1px solid red";
//     document.getElementById('pin').focus();
//     document.getElementById('pin').previousElementSibling.innerHTML = "This field-required";
//     document.getElementById('pin').previousElementSibling.style.color = "red";
//   }
//   if (Addforminput === true) {

//     ViewEditEmployeeForm();
//   }
// }



// //VALIDATION FOR EACH INPUT FIELD//

//   //PHONE NUMBER VALIDATION//

//     document.getElementById("phone").addEventListener('click', () => {
//       const phonenumber = document.getElementById('phone').value;

//       if (phonenumber.length !== 10) {
//         document.getElementById('phone').previousElementSibling.textContent = "Invalid Number";
//         document.getElementById('phone').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('phone').previousElementSibling.classList.remove('required');
//         document.getElementById('phone').previousElementSibling.textContent = "Mobile Number";
//         document.getElementById('phone').style.border = "1px solid #E6E8EB";
//         document.getElementById('phone').previousElementSibling.style.color = "#2B3674";
//       }
//     });
//   //PHONE NUMBER VALIDATION END//

//   //EMAIL VALIDATION//
//     document.getElementById("email").addEventListener('click', () => {
//       const email = document.getElementById('email').value;
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//         document.getElementById('email').previousElementSibling.textContent = "Invalid Email";
//         document.getElementById('email').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('email').previousElementSibling.classList.remove('required');
//         document.getElementById('email').previousElementSibling.textContent = "Email";
//         document.getElementById('email').style.border = "1px solid #E6E8EB";
//         document.getElementById('email').previousElementSibling.style.color = "#2B3674";
//       }
//     })
//   //EMAIL VALIDATION END//

//   //SALUTATION//
//     document.getElementById("salutation").addEventListener('click', () => {
//       if (!document.getElementById('salutation').value) {
//         document.getElementById('salutation').previousElementSibling.classList.add('required');
//         document.getElementById('salutation').style.border = "1px solid red";
//         document.getElementById('salutation').focus();
//         document.getElementById('salutation').previousElementSibling.innerHTML = "First Name required"
//         document.getElementById('salutation').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('salutation').previousElementSibling.classList.remove('required');
//         document.getElementById('salutation').style.border = "1px solid #E6E8EB";
//         document.getElementById('salutation').previousElementSibling.innerHTML = "First Name";
//         document.getElementById('salutation').previousElementSibling.style.color = "#2B3674";
//       }
//     })

//   //SALUTATION END//

//   //FIRST NAME//
//     document.getElementById("firstName").addEventListener('click', () => {
//       if (!document.getElementById('firstName').value) {
//         document.getElementById('firstName').previousElementSibling.classList.add('required');
//         document.getElementById('firstName').style.border = "1px solid red";
//         document.getElementById('firstName').focus();
//         document.getElementById('firstName').previousElementSibling.innerHTML = "First Name required"
//         document.getElementById('firstName').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('firstName').previousElementSibling.classList.remove('required');
//         document.getElementById('firstName').style.border = "1px solid #E6E8EB";
//         document.getElementById('firstName').previousElementSibling.innerHTML = "First Name";
//         document.getElementById('firstName').previousElementSibling.style.color = "#2B3674";
//       }
//     })

//   //FIRST NAME END//

//   //LAST NAME//
//     document.getElementById("lastName").addEventListener('click', () => {
//       if (!document.getElementById('lastName').value) {
//         document.getElementById('lastName').previousElementSibling.classList.add('required');
//         document.getElementById('lastName').style.border = "1px solid red";
//         document.getElementById('lastName').focus();
//         document.getElementById('lastName').previousElementSibling.innerHTML = "Last Name required"
//         document.getElementById('lastName').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('lastName').previousElementSibling.classList.remove('required');
//         document.getElementById('lastName').style.border = "1px solid #E6E8EB";
//         document.getElementById('lastName').previousElementSibling.innerHTML = "Last Name";
//         document.getElementById('lastName').previousElementSibling.style.color = "#2B3674";
//       }
//     })
//   //LAST NAME END//

//   //USER NAME//
//     document.getElementById("username").addEventListener('click', () => {
//       if (!document.getElementById('username').value) {
//         document.getElementById('username').previousElementSibling.classList.add('required');
//         document.getElementById('username').style.border = "1px solid red";
//         document.getElementById('username').focus();
//         document.getElementById('username').previousElementSibling.innerHTML = "Username required"
//         document.getElementById('username').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('username').previousElementSibling.classList.remove('required');
//         document.getElementById('username').style.border = "1px solid #E6E8EB";
//         document.getElementById('username').previousElementSibling.innerHTML = "User Name";
//         document.getElementById('username').previousElementSibling.style.color = "#2B3674";
//       }
//    })

//   //USER NAME END// 

//   //PASSWORD//
//     document.getElementById("password").addEventListener('click', () => {
//       if (!document.getElementById('password').value) {
//         document.getElementById('password').previousElementSibling.classList.add('required');
//         document.getElementById('password').style.border = "1px solid red";
//         document.getElementById('password').focus();
//         document.getElementById('password').previousElementSibling.innerHTML = "Password required"
//         document.getElementById('password').previousElementSibling.style.color = "red";
//       }else {
//         document.getElementById('password').previousElementSibling.classList.remove('required');
//         document.getElementById('password').style.border = "1px solid #E6E8EB";
//         document.getElementById('password').previousElementSibling.innerHTML = "Password";
//         document.getElementById('password').previousElementSibling.style.color = "#2B3674";
//       }
//     })

//   //PASSWORD END//

//   //DOB//
//     document.getElementById("dob").addEventListener('click', () => {
//       if (!document.getElementById('dob').value) {
//          document.getElementById('dob').previousElementSibling.classList.add('required');
//          document.getElementById('dob').style.border = "1px solid red";
//         document.getElementById('dob').focus();
//         document.getElementById('dob').previousElementSibling.innerHTML = "Date of Birth required"
//         document.getElementById('dob').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('dob').previousElementSibling.classList.remove('required');
//         document.getElementById('dob').style.border = "1px solid #E6E8EB";
//         document.getElementById('dob').previousElementSibling.innerHTML = "Date of Birth";
//         document.getElementById('dob').previousElementSibling.style.color = "#2B3674";
//       }
//     })

//   //DOB END//
  
//   //QUALIFICATIONS//
//     document.getElementById("qualifications").addEventListener('click', () => {
//       if (!document.getElementById('qualifications').value) {
//         document.getElementById('qualifications').previousElementSibling.classList.add('required');
//         document.getElementById('qualifications').style.border = "1px solid red";
//         document.getElementById('qualifications').focus();
//         document.getElementById('qualifications').previousElementSibling.innerHTML = "Qualification required"
//         document.getElementById('qualifications').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('qualifications').previousElementSibling.classList.remove('required');
//         document.getElementById('qualifications').style.border = "1px solid #E6E8EB";
//         document.getElementById('qualifications').previousElementSibling.innerHTML = "Qualifications";
//         document.getElementById('qualifications').previousElementSibling.style.color = "#2B3674";
//       }
//     })

//   //QUALIFICATIONS END//

//   //ADDRESS//
//     document.getElementById("address").addEventListener('click', () => {
//       if (!document.getElementById('address').value) {
//         document.getElementById('address').previousElementSibling.classList.add('required');
//         document.getElementById('address').style.border = "1px solid red";
//         document.getElementById('address').focus();
//         document.getElementById('address').previousElementSibling.innerHTML = "Address required"
//         document.getElementById('address').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('address').previousElementSibling.classList.remove('required');
//         document.getElementById('address').style.border = "1px solid #E6E8EB";
//         document.getElementById('address').previousElementSibling.innerHTML = "Address";
//         document.getElementById('address').previousElementSibling.style.color = "#2B3674";
//       }
//     })

//   //ADDRESS END//

//   //COUNTRY//
//     document.getElementById("country").addEventListener('click', () => {
//       if (!document.getElementById('country').value) {
//         document.getElementById('country').previousElementSibling.classList.add('required');
//         document.getElementById('country').style.border = "1px solid red";
//         document.getElementById('country').focus();
//         document.getElementById('country').previousElementSibling.innerHTML = "Country required"
//         document.getElementById('country').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('country').previousElementSibling.classList.remove('required');
//         document.getElementById('country').style.border = "1px solid #E6E8EB";
//         document.getElementById('country').previousElementSibling.innerHTML = "Country";
//         document.getElementById('country').previousElementSibling.style.color = "#2B3674";
//       }
//     })
//   //COUNTRY END//

//   //STATE//
//     document.getElementById("state").addEventListener('click', () => {
//       if (!document.getElementById('state').value) {
//         document.getElementById('state').previousElementSibling.classList.add('required');
//         document.getElementById('state').style.border = "1px solid red";
//         document.getElementById('state').focus();
//         document.getElementById('state').previousElementSibling.innerHTML = "State required"
//         document.getElementById('state').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('state').previousElementSibling.classList.remove('required');
//         document.getElementById('state').style.border = "1px solid #E6E8EB";
//         document.getElementById('state').previousElementSibling.innerHTML = "State";
//         document.getElementById('state').previousElementSibling.style.color = "#2B3674";
//       }
//     })
//   //STATE END//

//   //CITY//
//     document.getElementById("city").addEventListener('click', () => {
//       if (!document.getElementById('city').value) {
//         document.getElementById('city').previousElementSibling.classList.add('required');
//         document.getElementById('city').style.border = "1px solid red";
//         document.getElementById('city').focus();
//         document.getElementById('city').previousElementSibling.innerHTML = "City required"
//         document.getElementById('city').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('city').previousElementSibling.classList.remove('required');
//         document.getElementById('city').style.border = "1px solid #E6E8EB";
//         document.getElementById('city').previousElementSibling.innerHTML = "City";
//         document.getElementById('city').previousElementSibling.style.color = "#2B3674";
//       }
//     })
//   //CITY END//

//   //PIN//
//     document.getElementById("pin").addEventListener('click', () => {
//       if (!document.getElementById('pin').value) {
//         document.getElementById('pin').previousElementSibling.classList.add('required');
//         document.getElementById('pin').style.border = "1px solid red";
//         document.getElementById('pin').focus();
//         document.getElementById('pin').previousElementSibling.innerHTML = "Pin/Zip required"
//         document.getElementById('pin').previousElementSibling.style.color = "red";
//       } else {
//         document.getElementById('pin').previousElementSibling.classList.remove('required');
//         document.getElementById('pin').style.border = "1px solid #E6E8EB";
//         document.getElementById('pin').previousElementSibling.innerHTML = "Pin/Zip";
//         document.getElementById('pin').previousElementSibling.style.color = "#2B3674";
//       }
//     })

  //PIN END//

//VALIDATION FOR EACH INPUT FIELD END//

//FORM VALIDATION FOR ADD-EMPLOYEE FORM END//

function redirect(){
const addhtml = document.getElementById('addbtn');
addhtml.addEventListener('click', function(event) {
     event.preventDefault();
     window.location.href = 'index.html';
  })

}



