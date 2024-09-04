const tasks = require('./tasks');
  exports.handler = async function(event, context) {
    const taskId = parseInt(event.queryStringParameters.id, 10);
    const updatedTask = JSON.parse(event.body);
  
    tasks = tasks.map(task => (task.id === taskId ? updatedTask : task));
  
    return {
      statusCode: 200,
      body: JSON.stringify({ data: updatedTask }),
    };
  };
  