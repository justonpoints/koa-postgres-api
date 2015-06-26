//update this to work like public_api
module.exports = function(postgres){
  var api = {};
  var database = postgres;

  //generic template if api request contains a bad parameter
  function bad_parameter(app,message){
      app.type = 'json';
      app.response.status = 400;
      app.body = {"error":"bad parameter","message": message};
  }
   
  //generic template if an api is missing a paramter
  function missing_parameter(app,message){
      app.type = 'json';
      app.response.status = 400;
      app.body = {"error":"missing parameter","message":message};
  }  

  //genral neo4j query, makes a call to return actors with the birth date supplied in "data"
  //required: date(number)
  api.get_test = function *() {
      var app = this;//this comes from the koa app. 
      var id = app.params.id;

      if (isNaN(id) !== true){
        query = {tables:"test",select:"name,pid",match:"pid='"+id+"'"};
        var response = yield postgres.select(query);
        app.type = 'text/json';
        app.body = JSON.stringify(response[0]);
      }
      else if(id !== undefined && isNaN(is) === true){
        bad_parameter(app,'The parameter [id] must be a number');
      }
      else{
        missing_parameter(app,"The parameter [id] is required");
      }
  }

  api.put_test = function *() {
      var app = this;
      var id = app.params.id;
      var post = app.request.body;

      var query = {tables:"test",match:"pid='"+id+"'",update:"name='"+post.name+"'"};
      console.log(query);

      var response = yield postgres.update(query);
      app.body = response;
  }

  api.post_test = function *() {
      var app = this;
      var id = app.params.id;
      var post = app.request.body;

      var query = {tables:"test",columns:"name",values:"'"+post.name+"'"};
      console.log(query);

      var response = yield postgres.create(query);
      app.body = response;
  }

  api.list_test = function *() {
      var app = this;
      var id = app.params.id;
      var get = app.request.query;

      var query = {tables:"test",select:"name,pid",match:"name='"+get.name+"'"};
      console.log(query);

      var response = yield postgres.select(query);
      app.body = response;
  }


  //call to be used when the api does not exist
  api.dne = function *(){
      this.type = 'json';
      this.response.status = 404;
      this.body = {"error":'The following path is invalid'};
  }

  //general call to confirm logged in status. Need to add the username to this
  api.loggedin = function *(){
    this.response.status = 200;
    this.body = {"success":"You are logged in"}
  }

  return api;
}//end exports