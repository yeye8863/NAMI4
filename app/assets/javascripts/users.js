var userTable={
  setup: function(){
    var table = $('#user_table').DataTable();
    
    $('#user_table tfoot th.filter').each(function(){
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder=" '+title+'" />' );
    });
    
    // Apply the search
    table.columns().every(function(){
        var that = this;
        $('input', this.footer()).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    });
    
  }
};

$(userTable.setup);