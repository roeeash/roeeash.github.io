$(document).ready(function() {
  // Load tasks from local storage
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(function(task) {
    addTaskToList(task);
  });
  
  // Add task button click event
  $("#addTaskBtn").click(function() {
    var taskInput = $("#taskInput").val().trim();
    if (taskInput !== "") {
      addTaskToList(taskInput);
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
    if (listItem.css('textDecoration').includes("line-through")) {
      listItem.css('textDecoration', 'none');
    } else {
      listItem.css('textDecoration', 'line-through');
    }
    saveTasksToLocalStorage();
  });

  // Function to add a task to the list
  function addTaskToList(task) {
    var listItem = $("<li>").addClass("list-group-item").text(task);
    var deleteButton = $("<button>").addClass("btn-cancel float-right delete-task").html("&times;");
    var approveButton = $("<button>").addClass("btn-approve float-right mr-2 approve-task").html("&#10003;");

    listItem.append(deleteButton);
    listItem.append(approveButton);
    $("#taskList").append(listItem);
  }
  
  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    var tasks = [];
    $("#taskList li").each(function() {
      var text = $(this).text();
      tasks.push(text.slice(0,text.length-2));
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});