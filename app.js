 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/dataDB", { useNewUrlParser: true });

const con = mongoose.connection
con.on("open",function(err){
  if(err){
    console.log(err);
  }else{
    console.log("connected");
  }
  
});

const AddSchema = {
    Name : String,
    Gender: String
};

const Add = mongoose.model("Add", AddSchema);


app.route("/Adds")

    .get(function (req, res) {
        Add.find(function (err, foundAdds) {
            if (!err) {
                res.send(foundAdds);
            } else {
                res.send(err);
            }
        });
    })

    .post(function (req, res) {

        const newAdd = new Add({
            Name: req.body.Name,
            Gender: req.body.Gender
        });

        newAdd.save(function(err){
            if (!err){
              res.send("Successfully added a new data.");
            } else {
              res.send(err);
            }
          });
        })



app.route("/Adds/:Addname")

.get(function(req,res){
    Add.findOne({Name:req.params.Addname}, function(err, foundAdds){
    if (!err) {
      res.send(foundAdds);
    } else {
      res.send("No matching that name was found.");
    }
  });
})





        app.listen(3000, function () {
            console.log("Server started on port 3000");
        });

