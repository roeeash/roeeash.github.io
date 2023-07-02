// Handler for adding a new task
$("#addTaskBtn").click(function() {
    var taskInput = $("#taskInput").val().trim();
    if (taskInput !== "") {
      var listItem = $("<li>").addClass("list-group-item").text(taskInput);
      var deleteButton = $("<button>").addClass("btn btn-danger float-right delete-task").html("&times;");
      var approveButton = $("<button>").addClass("btn btn-success float-right mr-2 approve-task").html("&#10004;");
  
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
    listItem.addClass("approved-task");
    setTimeout(function() {
      listItem.remove();
    }, 1000);
  });
  