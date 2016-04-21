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

var SearchScope = {
  select_scope : function() {
   $('#individual-box').toggle();
   $('#organization-box').toggle();
   SearchScope.reset_field();
  },
  reset_field : function() {
   $('#donor_first_name').val('');
   $('#donor_last_name').val('');
   $('#org_name').val('');
   $('#donor_company').val('');
  },
  setup: function() {
    $('#scope_link').change(SearchScope.select_scope);
    $('#reset_btn').click(SearchScope.reset_field);
  }
}
$(document).ready(SearchScope.setup);

var SearchResult = {
  setup : function() {
    $('#search_box').submit(SearchResult.getResult);
  },
  getResult : function() {
    $(document).on('ajax:success',function(event,data,status,xhrObj){
      $('#search_result').html(data);
    });
  }
};
$(document).ready(SearchResult.setup);

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
$(document).ready(viewResult.setup);

$(document).ready(function() {
    $('#table_ind, #table_org').DataTable();
});

$(document).ready(function() {
    // Setup - add a text input to each footer cell
    $('#table_ind tfoot th, #table_org tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder=" '+title+'" />' );
    } );
 
    // DataTable
    var table = $('#table_ind, #table_org').DataTable();
 
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
});

$(document).ready(function() {
 
    var table = $('#table_ind, #table_org').DataTable();
    $('#table_ind tbody, #table_org tbody').on( 'click', 'tr', function () {
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
    
     $('#table_ind').on( 'click', 'tbody td:not(:first-child)', function (e) {
        editor.inline( this );
    } );
} );
