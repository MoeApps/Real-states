

function openForm() {
  console.log("hi here")
  if (document.getElementById("myForm").style.display == "none")
    document.getElementById("myForm").style.display = "block";
  else
  document.getElementById("myForm").style.display = "none";
 
}



function sendMsg(type){
    
    let msg=document.getElementById("chatInput").value;
   // console.log(msg)
    var b=document.getElementById("chatBody");
    var a = document.createElement("p");
    a.innerHTML = msg; 
    if(type=="user")
    a.className = "messagez user_message";
    if(type=="admin")
    a.className = "messagez";
    b.appendChild(a);




    return false;
    
}


  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";

  }
 
