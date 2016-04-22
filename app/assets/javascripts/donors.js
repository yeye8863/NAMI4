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
        if ( !$('#table_donor').hasClass('locked') ){
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        }
    } );
    
     $('#edit_row').on( 'click', function (e) {
        if ($('#table_donor').hasClass('locked')){
            
            saveData();
            
        
        }
        else{
            $('#table_donor').addClass('locked');
            $('#table_donor tr.selected td').slice(2).each( function () {
                var title = $(this).text();
                $(this).html( "<input style='width:100%' value='" + $(this).html().trim() + "'>");
            } );
	        $("#edit_row").text("Save");
        }
 
    } );
    
    
    function saveData(){
        head = $('#table_donor thead');
        attr_name = head.data("attrname");
        selected_c = $('#table_donor tr.selected');
	    if(selected_c.length){
	    	var attr = [];
	    	var cells = $("td", selected_c).slice(2);
	    	cells.each(function(){
	    		attr.push($("input", $(this)).val().trim());
	    	});
	    	var id = selected_c.data("id");
    		if(selected_c.data("id"))
    			$.ajax({
    				type: "PUT",
	    			url: "/donors/" + selected_c.data("id"),
	    			data: {"donor" : {attr_name : attr}},
	    			timeout: 5000,
	    		    success: function(data, requestStatus, xhrObject){ saveRow(data, selected_c); },
	    		    error: function(xhrObj, textStatus, exception) {
			    	$("#add_row").notify("Failed to save data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			       }
		    	})
	    	else
		    	$.ajax({
		    		type: "POST",
		    		url: "/donor/",
		    		data: {"attr": attr, "id": $("#donorId").val()},
		    		timeout: 5000,
		    	    success: function(data, requestStatus, xhrObject){ saveRow(data); },
		    	    error: function(xhrObj, textStatus, exception) {
		    			$("#add").notify("Failed to add data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
		    	    }
		    	})
        	}
    };
    
    function saveRow(data, selected_c){
	    if(data.id) selected_c.data("id", data.id);
	    table_c.row(selected_c).data([
	    	data.all
	    ]).draw();
	    $("#edit_row").text("Edit");
        $('#table_donor').romoveClass('locked');
        $("#add").notify("Successfully saved!", {gap: 205, arrowShow: false, className: "success", position:"left middle"}); 
    }


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
