function addRow() {
    var table = document.getElementById("referral-table");
    var row = table.insertRow(-1);
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      var cell = row.insertCell(i);
      cell.contentEditable = "true";
    }
  }
  
  function deleteRow() {
    var table = document.getElementById("referral-table");
    var rowCount = table.rows.length;
    if (rowCount > 2) {
      table.deleteRow(rowCount - 1);
    }
  }
  
  function saveData() {
    var tableData = [];
    var table = document.getElementById("referral-table");
  
    for (var i = 1; i < table.rows.length; i++) {
      var rowData = [];
      for (var j = 0; j < table.rows[i].cells.length; j++) {
        rowData.push(table.rows[i].cells[j].innerText);
      }
      tableData.push(rowData);
    }
  
    console.log(tableData);
  
    // Update the count
    var totalReferrals = table.rows.length - 1;
    document.getElementById("total-referrals").innerText = totalReferrals;
  }
  