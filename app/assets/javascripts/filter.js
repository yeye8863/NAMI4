//--filter.js
//= require bootstrap-datepicker
$(document).ready(function() {
    if ( $.fn.dataTable.isDataTable( '#filter_tab' ) ) {
    	table_c = $('#filter_tab').DataTable();
		}
		else {
    	table_c = $('#filter_tab').DataTable( {
        "ordering": false,
        "drawCallback": function( settings ) {
        //topRow();
    		},
    		"dom": 'lrtip'
    	});
		}
	
		$("#add").click(Filworker.insRow);
	//	$("#edit").on('click',Filworker.editRow);
	//	$("#delete").click(Filworker.delData);
	//	$("#save").click(Filworker.saveData);
	//	$("#filter_tab tbody").on("click", "tr", Filworker.selRow);
} );


var selected_c;
//var header_c;
var table_c;


var Filworker = {
	
	//insert new row at first row and config it
	insRow : function(){
		if(!$("#add").hasClass("adding")){
			var row = table_c.row.add(["","","","","","",""]).draw().node();
			$(row).addClass("info").siblings().removeClass("info");
			
			//reset buttons
			$("#save",$("button")).show();
			$("#edit",$("button")).hide();
			
			Filworker.addRow($(row));
	  }
	},
	
	//config the new added row for operating
	addRow: function(J_row) {
		if(J_row) selected_c = J_row;
		else      
			$("#add")
		     .notify("Failed to add a new line!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});//selected_c = $("#filter_tab tbody .info").first();
		
		if(selected_c.length){
				$("#add").addClass("adding");
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
						$(this).html("<select id='selectpicker-fld' class='selectpicker'>"
												+"<option class='bs-title-option' value='placeholder'>Choose a Table name first!</option>"
                        + "</select>"	
						);
				});
				
				cells_inp.each(function(){
					if($("input", $(this)).length == 0)
						$(this).html("<input style='width:100%;' value='"+$(this).html().trim()+"'>").selectpicker();
				});
				
				//config the datepicking
				Filworker.choDate($("input", cells_inp[3]), $("input", cells_inp[4]));
				
				$('.selectpicker').selectpicker();
				
			}
		
			Filworker.topRow();
	
			//dynamic field select
			$('.selectpicker#selectpicker-tab').change(function(){
							
		    var selected = $(this).find("option:selected").val();
		    $('.selectpicker#selectpicker-fld').find('[value=placeholder]').remove();
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
	},
	
	editRow: function(){
		
	},
	
	saveData: function(){
		
	},
	
	topRow : function(){
		if($("#add").hasClass("adding")){
			selected_c.detach();
			$("#filter_tab tbody").prepend(selected_c);
		//selected_c.addClass("info").siblings().removeClass("info");
		}
	},
	
	selRow: function(){
		
	},
	
	delRow: function(){
		
	},
	
	delData :function(){
		
	},
	
	choDate : function(a,b){
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
	},
	
	
	
	
	
	
};
 
 /*
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
*/




