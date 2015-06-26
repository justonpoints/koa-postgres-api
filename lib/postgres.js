module.exports = function(postgres){
  //db connection
  var db = 'postgres://postgres:postgres@localhost:5432/node'
  var methods = {};

  methods.make_query = function *(query){
    var client = new postgres.Client(db);
    yield client.connectPromise();

    var result = yield client.queryPromise(query);

    client.end();
    return result;
  };

  methods.create = function *(data){
    var query = "INSERT INTO "+data.tables+" ("+data.columns+") VALUES ("+data.values+");";
    var result = yield methods.make_query(query);
    return result.rows;
  };
  
  methods.update = function *(data){
    var query = "UPDATE "+data.tables+" SET "+data.update+" WHERE "+data.match+";"
    var result = yield methods.make_query(query);
    return result.rows
  };

  methods.select = function *(data){
    var query = "SELECT "+data.select+" FROM "+data.tables+" WHERE "+data.match+";";
    var result = yield methods.make_query(query);
    return result.rows;
  };

  methods.delete = function *(data){
    var query ="DELETE FROM "+data.table+" WHERE "+data.match+";";
    var result = yield methods.make_query(query);
    return result.rows;
  };

  return methods;
}//end exports