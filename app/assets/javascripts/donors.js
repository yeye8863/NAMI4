var donorInfo = {
  setup: function(){
    $('#donorInfo').on('ajax:success',function(event,data,status,xhr){
      event.preventDefault();
      $('#summary-table tbody').html(data);
      $("#basic-submit").notify("Successfully saved", {className: "success", position:"left middle"});
    });
    $('#donorInfo').on('ajax:error',function(event,xhr,status,error){
      event.preventDefault();
      $("#basic-submit").notify("Error occurred, please try later...", {className: "error", position:"middle middle"});
    });
  }
};

$(donorInfo.setup);

var newDonorInfo = {
  setup: function(){
     $('#newDonorInfo').on('ajax:success',function(event,data,status,xhr){
      event.preventDefault();
      $('#donorId').val(data.id);
      $("#basic-submit").notify("Successfully saved", {className: "success", position:"left middle"});
    });
    $('#newDonorInfo').on('ajax:error',function(event,xhr,status,error){
      event.preventDefault();
      $("#basic-submit").notify("Error occurred, please try later...", {className: "error", position:"middle middle"});
    });
  }  
}

$(newDonorInfo.setup);

var viewResult = {
  setup : function() {
    $('#search_result th a, #search_result .pagination a').click(viewResult.render);
  },
  render : function(){
    $(document).on('ajax:success',function(event,data,status,xhrObj){
      $('#search_result').html(data);
    });
  }
};

var dataTable = {
  setup: function(){
    viewResult.setup();
    $('#table_donor').DataTable();
    // Setup - add a text input to each footer cell
    $('#table_donor tfoot th.filter').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder=" '+title+'" />' );
    } );
 
    // DataTable
    var table = $('#table_donor').DataTable();
 
    // Apply the search
    table.columns().every( function () {
        var that = this;
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
  
    var table = $('#table_donor').DataTable();
    $('#table_donor tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
 
    $('#button').click( function () {
        table.row('.selected').remove().draw( false );
    } );
    
     $('#table_donor').on( 'click', 'tbody td:not(:first-child)', function (e) {
        editor.inline( this );
    } );
  }
};

$(dataTable.setup);

var summaryInfo={
  setup: function(){
    $('#table_donor td #view').on('click',summaryInfo.showSummary);
  },
  showSummary: function(event){
    event.preventDefault();
    $.ajax({
      url: $(this).attr('href'),
      method: 'get',
      timeout: 5000,
      success: function(data,request,xhrObj){
        $('#donorSummary .modal-body').html(data);
        $('#donorSummary').modal();
      }
    });
  }
};

$(summaryInfo.setup)