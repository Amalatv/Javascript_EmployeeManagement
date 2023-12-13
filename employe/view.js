
//fetch data from server//
let url = new URLSearchParams(document.location.search);
let employeeid  = url.get("id")
console.log(employeeid)


let UserViewImg = document.getElementById('view-img')
let UserViewSalutation = document.getElementById('view-salutation')
let UserViewFirstName = document.getElementById('view-firstname')
let UserViewLastName = document.getElementById('view-lastname')
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
    
    UserViewImg.src = userdatas.view-img
    UserViewSalutation.innerHTML = userdatas.view-salutation
    UserViewFirstName.innerHTML = userdatas.view-firstname
    UserViewLastName.innerHTML = userdatas.view-lastname
    UserViewEmail.innerHTML = userdatas.view-email
    UserViewGender.innerHTML = userdatas.view-gender
    UserViewAge.innerHTML = userdatas.view-age
    UserViewDob.innerHTML  = userdatas.view-dob
    UserViewPhone.innerHTML = userdatas.view-phone
    UserViewQualification.innerHTML = userdatas.view-qualification
    UserViewAddress.innerHTML = userdatas.view-address
    UserViewUserName.innerHTML = userdatas.view-username
})

//calculate age//

