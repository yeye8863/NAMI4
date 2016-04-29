//--filter.js
//= require bootstrap-datepicker
//= require bootstrap-select
$(document).ready(function() {
    if ( $.fn.dataTable.isDataTable( '#filter_tab' ) ) {
    	table_c = $('#filter_tab').DataTable();
		}
		else {
    	table_c = $('#filter_tab').DataTable( {
        "ordering": false,
        "drawCallback": function( settings ) {
        topRow();
    		},
    		"dom": 'lrtip'
    	});
		}
	
		$("#add").click(insRow);
		$("#edit").on('click',editRow);
		$("#delete").click(delData);
		$("#filter_tab tbody").on("click", "tr", selRow);
} );



var selected_c;
var header_c;
var table_c;


/*"order": [[ 0, "desc" ], [ 1, 'desc' ]],
		  	"drawCallback": function( settings ) { topRow(); },
		  	"dom": 'rt<"bottom-left-info-bar"f>',
		    paging: false

var selected_c;
var header_c;
*/

function fixHeader(){
	if($("#contact-tab", $(this)).length){
		setTimeout(function() {
			if($(".fixedHeader").length == 0 && $("#contact").hasClass("active")){
				header_c = new fixHeader(table_c);
				$(window).resize(function(){ header_c._fnUpdateClones(true) })
			}
		}, 1000);
	} else $(".fixedHeader").remove();
}


function selDate(a, b){
	var now = new Date();
    var d1 = a.datepicker({
    	format: "yyyy-mm-dd",
    	onRender: function(date) {
    		return date.valueOf() > now.valueOf() ? "disabled" : "";
    	}
    }).on('changeDate', function(ev) {
    	if (ev.date.valueOf() > d2.date.valueOf()) {
	        var newDate = new Date(ev.date)
	        newDate.setDate(newDate.getDate() + 1);
	        d2.setValue(newDate);
      	}
    	d1.hide();
    	b[0].focus();
    }).data('datepicker');
    
    var d2 = b.datepicker({
    	format: "yyyy-mm-dd",
      	onRender: function(date) {
    		return date.valueOf() < d1.date.valueOf() ? "disabled" : "";
      	}
    }).on('changeDate', function(ev) {
      	d2.hide();
    }).data('datepicker');
}


function choDate(a,b){
	//var now = new Date();
	var d1 = a.datepicker({
		format: 'yyyy-mm-dd',
	}).on('changeDate', function(evnt) {
			if (evnt.date.valueOf() > d2.date.valueOf()) {
		        var newDate = new Date(evnt.date)
		        newDate.setDate(newDate.getDate() + 1);
		        d2.setValue(newDate);
	      	}
      d1.hide();
      b[0].focus();
    }).data('datepicker');	
	
	var d2 = b.datepicker({
		format: 'yyyy-mm-dd',
		/*
		onRender: function(date){
			return date.valueOf() < d1.date.valueOf() ? "disabled" : "";
		}*/
	}).on('changeDate', function(evnt) {
				if (evnt.date.valueOf() < d1.date.valueOf()){
					alert("Date Max should greater than Date Min")
					var d1Date = new Date(d1.date.valueOf())
		       d1Date.setDate(d1Date.getDate() + 1);
		        d2.setValue(d1Date);
				}
      	d2.hide();
    }).data('datepicker')
}

function topRow(){
	if($("#edit").hasClass("editing")){
			selected_c.detach();
			$("#filter_tab tbody").prepend(selected_c);
			selected_c.addClass("info").siblings().removeClass("info");
	}
}

function selRow(event) {
	if(!$("#edit").hasClass("editing") && $(".dataTables_empty", $(this)).length == 0){
		if($(this).hasClass("info"))
			if(event.ctrlKey || event.metaKey) $(this).removeClass("info");
			else $(this).removeClass("info").siblings().removeClass("info");
		else {
			$(this).addClass("info");
			if(!(event.ctrlKey || event.metaKey))
				$(this).siblings().removeClass("info");
		}
	}
}

function insRow() {
	if(!$("#edit").hasClass("editing")){
		var row = table_c.row.add(["","","","","","",""]).draw().node();
		$(row).addClass("info").siblings().removeClass("info");
		editRow(0, $(row));
	}
}

function editRow(event, r) {
		//event.preventDefault();
	if(r) selected_c = r;
	else selected_c = $("#filter_tab tbody .info").first();
	if(selected_c.length)
		if($("#edit").hasClass("editing")) saveData();
		else{
			$("#edit").text("Save");
			$("#edit").addClass("editing");
			var cells_sel_tab = $("td", selected_c).slice(0, 1);
			var cells_sel_fld = $("td", selected_c).slice(1, 2);
			var cells_inp = $("td", selected_c).slice(2, 7);
			cells_sel_tab.each(function(){
				if($("select", $(this)).length == 0)
					$(this).html("<select id='selectpicker-tab' class='selectpicker'>"+
												"<option data-hidden='true' value=''>Choose the table name...</option>" +
  											"<option value='donor'>Donor</option>"+
												"<option value='contact'>Contact</option>"+
												"<option value='finance'>Finance</option>"+
												"</select>"
											);
			});
			
			cells_sel_fld.each(function(){
				if($("select", $(this)).length == 0)
					$(this).html("<select id='selectpicker-fld' class='selectpicker' title='Choose the field name:'>");
			});
			
			cells_inp.each(function(){
				if($("input", $(this)).length == 0)
					$(this).html("<input style='width:100%;' value='"+$(this).html().trim()+"'>").selectpicker();
			});
			choDate($("input", cells_inp[3]), $("input", cells_inp[4]));
			
			$('.selectpicker').selectpicker();
			
		}
		
	topRow();
	$('.selectpicker#selectpicker-tab').change(function(){
					
    var selected = $(this).find("option:selected").val();
    //alert(selected);
    switch (selected) {
      case 'contact':
        $('.selectpicker#selectpicker-fld').selectpicker('toggle');
        $('.selectpicker#selectpicker-fld')
					.html("<option data-hidden='true' value=''>Choose the field name...</option>" 
						+'<option value="datetime-contact_date">Contact Date</option>'
						+'<option value="datetime-followup_date">Followup Date</option>'
						+'<option value="none-narrative">Narrative</option>'
						+'<option value="string-created_by">Create by (Person)</option>'
						+'<option value="string-last_modified_by">Last Modified by (Person)</option>'
						+'<option value="datetime-created_at">Created at (Date)</option>'
						+'<option value="datetime-last_modified_at">Last Modified at (Date)</option>')
					.selectpicker('refresh');
        break;
        
      case 'donor':
        $('.selectpicker#selectpicker-fld').selectpicker('toggle');
        $('.selectpicker#selectpicker-fld')
					.html("<option data-hidden='true' value=''>Choose the field name...</option>" 
								+'<option value="none-title">Title</option>'
					      +'<option value="none-first_name">First Name</option>'
					      +'<option value="none-last_name">Last Name</option>'
					      +'<option value="none-middle_name">Middle Name</option>'
					      +'<option value="none-salution">Salution</option>'
					      +'<option value="none-email">Email</option>'
					      +'<option value="string-organization">Organization</option>'
					      +'<option value="string-company">Company</option>'
					      +'<option value="none-street_address">Street Address</option>'
					      +'<option value="string-city">City</option>'
					      +'<option value="string-state">State</option>'
					      +'<option value="string-country">Country</option>'
					      +'<option value="none-zipcode">Zip Code</option>'
					      +'<option value="none-home_phone">Home Phone</option>'
					      +'<option value="none-business_phone">Business Phone</option>'
					      +'<option value="string-created_by">Create by (Person)</option>'
					      +'<option value="string-last_modified_by">Last Modified by (Person)</option>'
					      +'<option value="datetime-created_at">Created at (Date)</option>'
					      +'<option value="datetime-last_modified_at">Last Modified at (Date)</option>')
					.selectpicker('refresh');
        break;
        
      case 'finance':
        $('.selectpicker#selectpicker-fld').selectpicker('toggle');
        $('.selectpicker#selectpicker-fld')
					.html("<option data-hidden='true' value=''>Choose the field name...</option>" 
								+'<option value="string-type">Type</option>'
				        +'<option value="datetime-date">Date</option>'
				        +'<option value="decimal-amount">Amount</option>'
				        +'<option value="none-description">Description</option>'
				        +'<option value="string-designation">Designation</option>'
				        +'<option value="string-created_by">Create by (Person)</option>'
				        +'<option value="string-last_modified_by">Last Modified by (Person)</option>'
				        +'<option value="datetime-created_at">Created at (Date)</option>'
				        +'<option value="datetime-last_modified_at">Last Modified at (Date)</option>')
					.selectpicker('refresh');
        break;
      
      default:
        return false;
    }
	});
}


function saveRow(data){
	if(data.id) selected_c.data("id", data.id);
	table_c.row(selected_c).data([
		data.table_name,
		data.field_name,
		data.value,
		data.min_value,
		data.max_value,
		data.min_date,
		data.max_date
	]).draw();
	$("#edit").text("Edit");
	$("#edit").removeClass("editing");
	$("#add").notify("Successfully saved!", {gap: 205, arrowShow: false, className: "success", position:"left middle"});
}

function delRow(){
	if($("#edit").hasClass("editing")){
		$("#edit").removeClass("editing");
		$("#edit").text("Edit");
	}
	table_c.row('.info').remove().draw(false);
	$("#add").notify("Successfully deleted!", {gap: 205, arrowShow: false, className: "success", position:"left middle"});
}

function delData(event){
	selected_c = $("#filter_tab tbody .info");
	if(selected_c.length){
		var sure;
		if(event.ctrlKey || event.metaKey) sure = true
		else sure = confirm("Are you sure?");
		if(sure)
			selected_c.each( function(){
				if($(this).data("id"))
				 	$.ajax({
						type: "DELETE",
				      	url: "/filter/" + $(this).data("id"),
				       	timeout: 5000,
				       	success: function(data, requestStatus, xhrObject){ delRow(); },
				       	error: function(xhrObj, textStatus, exception) {
				       		$("#add").notify("Failed to delete data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
				       	}
					})   
				else delRow();
			});
	}
}

function saveData(){
	if(selected_c.length){
		var attr = [];
		var cells_sel_tab = $("td", selected_c).slice(0, 1);
		cells_sel_tab.each(function(){
			attr.push($("select", $(this)).val());
		});
		
		var cells_sel_fld = $("td", selected_c).slice(1, 2);
		cells_sel_fld.each(function(){
			var fld=$("select", $(this)).val().split('-');
			attr.push(fld[1]);
		});
		
		var cells_inp = $("td", selected_c).slice(2, 7);
		cells_inp.each(function(){
			attr.push($("input", $(this)).val());
		});
		if(attr[0] == ""){ 
			$("#add").notify("Please select the Table.", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			return false;
		}
		if(attr[1] == ""){ 
			$("#add").notify("Please select the Field.", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			return false;
		}
		if(selected_c.data("id"))
			$.ajax({
				type: "PUT",
				url: "/filters/" + selected_c.data("id"),
				data: {"attr": attr},
				timeout: 5000,
			    success: function(data, requestStatus, xhrObject){ saveRow(data); },
			    error: function(xhrObj, textStatus, exception) {
					$("#add").notify("Failed to save data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			    }
			})
		else
			$.ajax({
				type: "POST",
				url: "/filters/",
				data: {"attr": attr, "id": $("#ReportId").text()},
				timeout: 5000,
			    success: function(data, requestStatus, xhrObject){ saveRow(data); },
			    error: function(xhrObj, textStatus, exception) {
					$("#add").notify("Failed to add data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			    }
			})
	}
}



/*
$(document).ready(function(){
	resizeDiv();
});
window.onresize = function(event) { resizeDiv(); }

function resizeDiv() {
	var vph = $(window).height();
	$("#filter_tab").css({overflow: "auto", height: vph*0.5 + "px"});
}
*/
