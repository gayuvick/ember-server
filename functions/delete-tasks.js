const tasks = require('./tasks');
  
  exports.handler = async function(event, context) {
    const taskId = parseInt(event.queryStringParameters.id, 10);
    tasks = tasks.filter(task => task.id !== taskId);
  
    return {
      statusCode: 204,
      body: '',
    };
  };
  