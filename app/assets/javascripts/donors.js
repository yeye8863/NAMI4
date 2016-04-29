var donorInfo = {
  setup: function(){
    $('#donorInfo').on('ajax:success',function(event,data,status,xhr){
      $('#summary-table tbody').html(data);
      $("#basic-submit").notify("Successfully saved", {className: "success", position:"left middle"});
    });
    $('#donorInfo').on('ajax:error',function(event,xhr,status,error){
      $("#basic-submit").notify("Error occurred, please try later...", {className: "error", position:"left middle"});
    });
  }
};

$(donorInfo.setup);

var newDonorInfo = {
  setup: function(){
     $('#newDonorInfo').on('ajax:success',function(event,data,status,xhr){
      $('#donorId').text(data.id);
      $("#basic-submit").notify("Successfully saved", {className: "success", position:"left middle"});
    });
    $('#newDonorInfo').on('ajax:error',function(event,xhr,status,error){
      $("#basic-submit").notify("Error occurred, please try later...", {className: "error", position:"left middle"});
    });
  }  
}

$(newDonorInfo.setup);

var donorDataTable = {
  setup: function(){
    // DataTable
    var table = $('#table_donor').DataTable({
        aoColumns :[
          { "sTitle": "Action","bSortable": false },
          { "sTitle": "Flag","bSortable": false, },
          { "sTitle": "Title", "bSortable": false,},
          { "sTitle": "First Name", "bSortable": true,},
          { "sTitle": "Last Name", "bSortable": true,},
          { "sTitle": "Organization ", "bSortable": true},
          { "sTitle": "Company ", "bSortable": true}
        ]
    }).order([3,'asc']).draw();
// 1. column search
    // Setup - add a text input to each footer cell
    $('#table_donor tfoot th.filter').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder=" '+title+'" />' );
    } );
 
    donorDataTable.bindSelect();
    
    // Apply the search
    table.columns().every( function () {
        var that = this;
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw(false);
            }
        } );
    } );
  

    
    var original_row;
// 2. quick edit row
     $('#donor-result #quick_edit').on( 'click', function (e) {
        if ($('#table_donor').hasClass('locked')){
            saveData();
        }
        else if ($('#table_donor tr').hasClass('selected')){
            original_row = save_raw_data();
            $('#table_donor').addClass('locked');
            $('#table_donor tr.selected td').slice(1).each( function () {
                var title = $(this).text();
                $(this).html( "<input style='width:100%' value='" + $(this).html().trim() + "'>");
            } );
	        $("#donor-result #quick_edit").text("Save");
	        $("#donor-result #cancel").show();
	        $("#donor-result #add").hide();
	        $("#donor-result #quick_add").hide();
        }
 
    } );
    
    function save_raw_data(){
        var selected_c = $('#table_donor tr.selected');
	      if(selected_c.length){
	        var attr = [];
	    	  var cells = $("td", selected_c).slice(1);
	    	  
	    	  $('#table_donor tr.selected td').each( function () {
            var title = $(this).text();
	    		  attr.push(title);
          });
        }
	    	return attr;
    };
    
    
// 3. quick add row
    $('#donor-result #quick_add').on( 'click', function (e) {
        if ($('#table_donor').hasClass('locked')){
            saveData();
        }
        else{
            var row = table.row.add(["","","","","","",""]).draw(false).node();
            $('#table_donor').addClass('locked');
            $(row).addClass("selected").addClass("newrow").siblings().removeClass("selected");
            $('#table_donor tr.selected td').slice(1).each( function () {
                var title = $(this).text();
                $(this).html( "<input style='width:100%' value='" + $(this).html().trim() + "'>");
            } );
  	        $("#donor-result #quick_add").text("Save");
  	        $("#donor-result #cancel").show();
  	        $("#donor-result #add").hide();
  	        $("#donor-result #quick_edit").hide();
        }
 
    } );
    
    
// 4. cancel 
    $('#donor-result #cancel').on( 'click', function (e) {
      var selected_c = $('#table_donor tr.selected');
      if ($('#table_donor').hasClass('locked')){
        // new row
        if (selected_c.hasClass("newrow")){
	        table.row(selected_c).remove().draw('page');
          reset_btn();
        }
        // edit row
        else{
          var butns = $("tr.selected #actions").html();
	        var row = table.row(selected_c)
	        original_row[0] = butns;
	        row.data(original_row).draw('page');
          reset_btn();
        }
      }
    });

// 5. save data and draw new row
    function toObject(names, values) {
      var result = {};
      for (var i = 0; i < names.length; i++)
           result[names[i]] = values[i];
      return result;
    };
    
// 6. show all button
    function reset_btn(){
	    $("#donor-result #add").show();
      $("#donor-result #quick_add").text("Quick Add").show();
	    $("#donor-result #quick_edit").text("Quick Edit").show();
	    $("#donor-result #cancel").hide();
	    $("#donor-result #table_donor").removeClass("locked");
    }
    
    function saveData(){
        var head = $('#table_donor thead');
        var attr_name = head.data("attrname");
        var selected_c = $('#table_donor tr.selected');
  	    if(selected_c.length){
  	    	var attr = [];
  	    	var cells = $("td", selected_c).slice(1);
  	    	cells.each(function(){
  	    		attr.push($("input", $(this)).val().trim());
  	    });
	    	var update = toObject(attr_name, attr);
	    	var id = selected_c.data("id");
    		if(selected_c.data("id"))
    			$.ajax({
    				type: "PUT",
	    			url: "/donors/" + selected_c.data("id"),
	    			data: {"donor" : update, "where" : "inplace"},
	    			timeout: 5000,
	    		    success: function(data, requestStatus, xhrObject){ saveRow(data, selected_c); },
	    		    error: function(xhrObj, textStatus, exception) {
			    	    $("#donor-result #add_row").notify("Failed to save data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			       }
		    	})
	    	else
		    	$.ajax({
		    		type: "POST",
		    		url: "/donors",
		    		data: {"donor": update, "where" : "inplace"},
		    		timeout: 5000,
		    	    success: function(data, requestStatus, xhrObject){ saveRow(data, selected_c); },
		    	    error: function(xhrObj, textStatus, exception) {
		    			  $("#donor-result #add").notify("Failed to add data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
		    	    }
		    	})
        	}
    };

    function saveRow(data, selected_c){
	    if(data.id) selected_c.data("id", data.id);
	    var butns;
	    if($('tr.selected #actions').length>0){
	      butns = $("tr.selected #actions").html();
	    }
	    else{
	      $("tr.selected td:first-child").attr({'id':"actions","class":"","style":'width:15%'})
	      $("tr.selected").removeClass('newrow')
	      butns = "<a id='view'; class='btn btn-success btn-xs' href='/donorSummary/"+data.id+"', data-remote='true'>View</a>\
                <a class='btn btn-success btn-xs' href='/donors/"+data.id+"'>Edit</a>\
                <a id='delete' class='btn btn-danger btn-xs' href='/donors/"+data.id+"' data-method='delete' rel='nofollow' data-confirm='Are you sure?'>Delete</a>";
	    }
	   
	    var row = table.row(selected_c);
  	  row.data([
  	      butns,
  	      data.flag,
  	      data.title,
  	      data.first_name,
  	      data.last_name,
  	      data.organization,
  	      data.company
  	      ]);
  	      
	    table.draw(false);
	    reset_btn();
	    donorDataTable.bindSelect();
	    summaryInfo.setup();
      $("#donor-result #add").notify("Successfully saved!", {gap: 205, arrowShow: false, className: "success", position:"left middle"}); 
    }


  },
  bindSelect:function(){
    // 2. selection by click
    var table = $('#table_donor').DataTable();
    $('#table_donor tbody tr td:not(:first-child)').on('click', function () {
        if ( !$('#table_donor').hasClass('locked') ){
            if ( $(this).parent().hasClass('selected') ) {
                $(this).parent().removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).parent().addClass('selected');
            }
        }
    } );
  }
};

$(donorDataTable.setup);

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

$(summaryInfo.setup);

$(function(){
  var active = $('#activeLabel').text();
  switch (active){
    case '1':
      {
        $('.active').removeClass('active');
        $('#basic-tab').parent().addClass('active');
        $('#basic').addClass('active');
        break;
      }
    case '2':
      {
        $('.active').removeClass('active');
        $('#contact-tab').parent().addClass('active');
        $('#contact').addClass('active');
        break;
      }
    case '3':
      {
        $('.active').removeClass('active');
        $('#finance-tab').parent().addClass('active');
        $('#finance').addClass('active');
        break;
      }
  }
})
