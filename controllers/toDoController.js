var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://dinesh19:c2zjkgKvCxxTaHZp@nodetuts.djld1.mongodb.net/test?retryWrites=true&w=majority"
);

var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model("Todo", todoSchema);

var urlEncodedParser = bodyParser.urlencoded({ extended: false });

// var data=[{item:'get milk'},{item:'walk dog'},{item:'kick some coding ass'}];

module.exports = function (app) {
  app.get("/todo", (req, res) => {
    //get data from mongodb and pass it to the view
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlEncodedParser, (req, res) => {
    //get data from the view and add it to mongodb

    var todo=new Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
    
  });

  app.delete("/todo/:item", (req, res) => {
    //delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
}