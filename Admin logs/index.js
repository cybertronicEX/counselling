function addAdminLog() {
    var table = document.getElementById("admin-logs-table");
    var row = table.insertRow(-1);
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      var cell = row.insertCell(i);
      cell.contentEditable = "true";
    }
  }
  
  function deleteAdminLog() {
    var table = document.getElementById("admin-logs-table");
    var rowCount = table.rows.length;
    if (rowCount > 1) {
      table.deleteRow(rowCount - 1);
    }
  }
  
  function saveData() {
    var adminLogs = getTableData("admin-logs-table");
  
    console.log("Admin Logs:");
    console.log(adminLogs);
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
  