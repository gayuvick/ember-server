const tasks = require('./tasks');
  
  exports.handler = async function(event, context) {
    const newTask = JSON.parse(event.body);
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
  
    return {
      statusCode: 201,
      body: JSON.stringify({ data: newTask }),
    };
  };
  