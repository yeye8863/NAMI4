var reportTable={
  setup: function(){
    $('#report-table').DataTable({
      aaSorting: [3,'desc']
    });
  }
};

$(reportTable.setup);