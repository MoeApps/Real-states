var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://mostafa2104516:98782363@cluster0.fn8yy9v.mongodb.net/sasa?retryWrites=true&w=majority";

// const searchButton = document.querySelector('.search-box button');
// const searchInput = document.querySelector('.search-box input');

// searchButton.addEventListener('click', function () {
//     const searchTerm = searchInput.value;
//     console.log(searchTerm);
//     // Do something with the search term here, such as sending it to a server or filtering results on the page.
// });
/////////////////////////////////////////
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });

function openFormfind() {
  console.log("hi here")
  if (document.getElementById("myFormfind").style.display == "none")
    document.getElementById("myFormfind").style.display = "block";
  else
    document.getElementById("myFormfind").style.display = "none";

}