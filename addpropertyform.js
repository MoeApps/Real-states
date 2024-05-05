const form= document.getElementById('form');
const uname=document.getElementById('name');
const mo_number=document.getElementById('mo-number');
const email=document.getElementById('email');
const area=document.getElementById('area');
const u_number=document.getElementById('u_number');
const u_value=document.getElementById('u_value');
const pathrooms=document.getElementById('pathrooms');
const bedrooms=document.getElementById('bedrooms');
const garage=document.getElementById('garage');
const service=document.getElementById('service');
const u_type=document.getElementById('u_type');
const district=document.getElementById('district');
const pay=document.getElementById('pay');

form.addEventListener('submit',e =>{
    e.preventDefault();
    
    validateinputs();
});
const setsuccess = element =>{
const inputControl = element.parentElement;
const errorDisplay=inputControl.querySelector('.error');
errorDisplay.innerText='';
inputControl.classList.add('success');
inputControl.classList.remove('error');
};
const seterror=(element,message)=>{
const inputControl = element.parentElement;
const errorDisplay = inputControl.querySelector('.error');
errorDisplay.innerText = message;
inputControl.classList.add('error');
inputControl.classList.remove('success');
};
const validateinputs=()=>{
const namevalue = uname.value.trim();
const mo_numbervalue= mo_number.value.trim();
const emailvalue=email.value.trim();
const areavalue=area.value.trim();
const u_valuevalue=u_value.value.trim();
const u_numbervalue=u_number.value.trim();
const bedroomsvalue=bedrooms.value.trim();
const pathroomsvalue=pathrooms.value.trim();
const garagevalue=garage.value.trim();
//const servicevalue=service.value.trim();
if(namevalue===''){
    seterror(uname,'Name is required');
}else{
setsuccess(uname);
}
if(mo_numbervalue==='')
{
    seterror(mo_number,'Mobile number is required');
}
else{
    setsuccess(mo_number);
}
if(emailvalue === '')
{
    seterror(email,'email is required');
}else{
    setsuccess(email);
}
if(u_valuevalue=== '')
{
    seterror(u_value,'Unit Value is required');
}else{
    setsuccess(u_value);
}
if(u_numbervalue === '')
{
    seterror(u_number,'Unit Number is required');
}else{
    setsuccess(u_number);
}
if(areavalue === '')
{
    seterror(area,'Area is required');
}else{
    setsuccess(area);
}
if(bedroomsvalue === '')
{
    seterror(bedrooms,'Number fo Bedrooms is required');
}else{
    setsuccess(bedrooms);
}
if(pathroomsvalue === '')
{
    seterror(pathrooms,'Number of Pathrooms is required');
}else{
    setsuccess(pathrooms);
}
if(garagevalue === '')
{
    seterror(garage,'Number of Garages is required');
}else{
    setsuccess(garage);
}
};