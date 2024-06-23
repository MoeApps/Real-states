let flagg=0;
function validate() {
   let namein = document.forms.contactForm.cname.value;
   let phin = document.forms.contactForm.cphone.value;
   let emailin = document.forms.contactForm.cmail.value;
   let mesin = document.forms.contactForm.cmes.value;
 

   if (namein == "") {
    document.getElementById("label1").style.visibility = 'visible';
    flag+=1;
   }
   else{
    document.getElementById("label1").style.visibility = 'hidden';

   }
   if (phin == "") {
    document.getElementById("label2").style.visibility = 'visible';
    flag+=1;

   }
   else{
    document.getElementById("label2").style.visibility = 'hidden';
  }
  if (emailin == "") {
    document.getElementById("label3").style.visibility = 'visible';
    flag+=1;

   }
   else{
    document.getElementById("label3").style.visibility = 'hidden';
  }
  if (mesin == "") {

    document.getElementById("label5").style.visibility = 'visible';
    flag+=1;

   }
   else{
    document.getElementById("label5").style.visibility = 'hidden';
  }
  if (phin.length != 11 && phin.length != "") {
    document.getElementById("label6").style.visibility = 'visible';
    flag+=1;

   }
   else{
    document.getElementById("label6").style.visibility = 'hidden';
  }

  if (namein == "" || phin == "" || emailin == "" || mesin == "" || phin.length != 11) {
    return false;
  }

}
