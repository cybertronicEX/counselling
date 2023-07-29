function addSession() {
    var table = document.getElementById("ongoing-sessions-table");
    var row = table.insertRow(-1);
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      var cell = row.insertCell(i);
      cell.contentEditable = "true";
    }
  }
  
  function deleteSession() {
    var table = document.getElementById("ongoing-sessions-table");
    var rowCount = table.rows.length;
    if (rowCount > 1) {
      table.deleteRow(rowCount - 1);
    }
  }
  
  function saveData() {
    var ongoingSessions = getTableData("ongoing-sessions-table");
    var upcomingSessions = getTableData("upcoming-sessions-table");
    var completedSessions = getTableData("completed-sessions-table");
    var cancelledSessions = getTableData("cancelled-sessions-table");
  
    console.log("Ongoing Sessions:");
    console.log(ongoingSessions);
    console.log("Upcoming Sessions:");
    console.log(upcomingSessions);
    console.log("Completed Sessions:");
    console.log(completedSessions);
    console.log("Cancelled Sessions:");
    console.log(cancelledSessions);
  }
  
  function getTableData(tableId) {
    var tableData = [];
    var table = document.getElementById(tableId);
  
    for (var i = 1; i < table.rows.length; i++) {
      var rowData = [];
      for (var j = 0; j < table.rows[i].cells.length; j++) {
        rowData.push(table.rows[i].cells[j].innerText);
      }
      tableData.push(rowData);
    }
  
    return tableData;
  }
  