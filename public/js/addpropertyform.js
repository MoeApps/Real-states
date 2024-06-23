const form= document.getElementById('form');
const uname=document.getElementById('name');
const mo_number=document.getElementById('mo_number');
const area=document.getElementById('area');
const u_number=document.getElementById('u_number');
const u_value=document.getElementById('u_value');
const bathrooms=document.getElementById('bathrooms');  //p->b
const bedrooms=document.getElementById('bedrooms');
const garage=document.getElementById('garage');
const service=document.getElementById('service');
const u_type=document.getElementById('u_type');
const district=document.getElementById('district');

form.addEventListener('submit', e => {
    //e.preventDefault();

    validateinputs();
});
const setsuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
const seterror = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};
const validateinputs = () => {
    const namevalue = uname.value.trim();
    const mo_numbervalue = mo_number.value.trim();
    const areavalue = area.value.trim();
    const u_valuevalue = u_value.value.trim();
    const u_numbervalue = u_number.value.trim();
    const bedroomsvalue = bedrooms.value.trim();
    const pathroomsvalue = pathrooms.value.trim();
    const garagevalue = garage.value.trim();
    //const servicevalue=service.value.trim();
    if (namevalue === '') {
        seterror(uname, 'Name is required');
    } else {
        setsuccess(uname);
    }
    if (mo_numbervalue === '') {
        seterror(mo_number, 'Mobile number is required');
    } else if (mo_numbervalue <= 0) {
        seterror(mo_number, 'invalid mobile number');
    }
    else {
        setsuccess(mo_number);
    }
    if (u_valuevalue === '' || u_valuevalue <= 0) {
        seterror(u_value, 'Unit Value is invalid');
    } else {
        setsuccess(u_value);
    }
    if (u_numbervalue === '' || u_numbervalue <= 0) {
        seterror(u_number, 'Unit Number is invalid');
    } else {
        setsuccess(u_number);
    }
    if (areavalue === '' || areavalue <= 0) {
        seterror(area, 'Area is invalid');
    } else {
        setsuccess(area);
    }
    if (bedroomsvalue === '' || bedroomsvalue <= 0) {
        seterror(bedrooms, 'Number fo Bedrooms is invalid');
    } else {
        setsuccess(bedrooms);
    }
    if (pathroomsvalue === '' || pathroomsvalue <= 0) {
        seterror(pathrooms, 'Number of Pathrooms is invalid');
    } else {
        setsuccess(pathrooms);
    }
    if (garagevalue <= 0) {
        seterror(garage, 'Number of Garages is invalid');
    } else {
        setsuccess(garage);
    }
};