$(document).ready(function() {
  // Load tasks from local storage
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var crossedOutTasks = JSON.parse(localStorage.getItem('crossedOut')) || [];

  tasks.forEach(function(task, index) {
    addTaskToList(task, crossedOutTasks[index]);
  });
  
  // Add task button click event
  $("#addTaskBtn").click(function() {
    var taskInput = $("#taskInput").val().trim();
    if (taskInput !== "") {
      addTaskToList(taskInput, null);
      saveTasksToLocalStorage();
      $("#taskInput").val(""); // Clear the input field
    }
  });
  
  // Delete task button click event
  $(document).on("click", ".delete-task", function() {
    $(this).parent().remove();
    saveTasksToLocalStorage();
  });
  
  // Handler for approving a task
  $(document).on("click", ".approve-task", function() {
    var listItem = $(this).parent();
    var isCrossedOut = listItem.css('textDecoration').includes("line-through");
    
    if (isCrossedOut) {
      listItem.css('textDecoration', 'none');
    } else {
      listItem.css('textDecoration', 'line-through');
    }
    
    saveTasksToLocalStorage();
  });

  // Function to add a task to the list
  function addTaskToList(task, crossedOutTask) {
    var listItem = $("<li>").addClass("list-group-item").text(task);
    var deleteButton = $("<button>").addClass("btn-cancel float-right delete-task").html("&times;");
    var approveButton = $("<button>").addClass("btn-approve float-right mr-2 approve-task").html("&#10003;");

    if (crossedOutTask) {
      listItem.css('textDecoration', 'line-through');
    }
    
    listItem.append(deleteButton);
    listItem.append(approveButton);
    $("#taskList").append(listItem);
  }
  
  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    var tasks = [];
    var crossedOutTasks = [];
    
    $("#taskList li").each(function() {
      var text = $(this).text();
      tasks.push(text.slice(0, text.length - 2));
      
      if ($(this).css('textDecoration').includes("line-through")) {
        crossedOutTasks.push(text.slice(0, text.length - 2));
      } else {
        crossedOutTasks.push(null);
      }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('crossedOut', JSON.stringify(crossedOutTasks));
  }
});
