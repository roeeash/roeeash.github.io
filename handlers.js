// Handler for adding a new task
$("#addTaskBtn").click(function() {
  var taskInput = $("#taskInput").val().trim();
  if (taskInput !== "") {
    var listItem = $("<li>").addClass("list-group-item").text(taskInput);
    var deleteButton = $("<button>").addClass("btn-cancel float-right delete-task").html("&times;");
    var approveButton = $("<button>").addClass("btn-approve float-right mr-2 approve-task").html("&#x2714;");

    listItem.append(deleteButton);
    listItem.append(approveButton);
    $("#taskList").append(listItem);
    $("#taskInput").val(""); // Clear the input field
  }
});

// Handler for deleting a task
$(document).on("click", ".delete-task", function() {
  $(this).parent().remove();
});

// Handler for approving a task
$(document).on("click", ".approve-task", function() {
  var listItem = $(this).parent();
  
  if (listItem.css('textDecoration') === 'line-through') {
    listItem.css('textDecoration', 'none');
  } else {
    listItem.css('textDecoration', 'line-through');
  }
});

