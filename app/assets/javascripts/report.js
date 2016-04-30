/*global $*/

var ReportCreator = {
  
  options: {
    parentElement: '#four-box-step'
    },
    
  DonorFields: function(){
     return('<option value="title">Title</option>'
      +'<option value="first_name">First Name</option>'
      +'<option value="none_last_name">Last Name</option>'
      +'<option value="none_middle_name">Middle Name</option>'
      +'<option value="none_salution">Salution</option>'
      +'<option value="none_email">Email</option>'
      +'<option value="string_organization">Organization</option>'
      +'<option value="string_company">Company</option>'
      +'<option value="none_street_address">Street Address</option>'
      +'<option value="string_city">City</option>'
      +'<option value="string_state">State</option>'
      +'<option value="string_country">Country</option>'
      +'<option value="none_zipcode">Zip Code</option>'
      +'<option value="none_home_phone">Home Phone</option>'
      +'<option value="none_business_phone">Business Phone</option>'
      +'<option value="string_created_by">Create by (Person)</option>'
      +'<option value="string_last_modified_by">Last Modified by (Person)</option>'
      +'<option value="datetime_created_at">Created at (Date)</option>'
      +'<option value="datetime_last_modified_at">Last Modified at (Date)</option>');
  }, 
    
  
  ContactFields: function(){
    return('<option value="datetime_contact_date">Contact Date</option>'
           +'<option value="datetime_followup_date">Followup Date</option>'
           +'<option value="none_narrative">Narrative</option>'
           +'<option value="string_created_by">Create by (Person)</option>'
           +'<option value="string_last_modified_by">Last Modified by (Person)</option>'
           +'<option value="datetime_created_at">Created at (Date)</option>'
           +'<option value="datetime_last_modified_at">Last Modified at (Date)</option>');
      },
      
  FinanceFields: function(){
    return('<option value="string_type">Type</option>'
        +'<option value="datetime_date">Date</option>'
        +'<option value="decimal_amount">Amount</option>'
        +'<option value="none_description">Description</option>'
        +'<option value="string_designation">Designation</option>'
        +'<option value="string_created_by">Create by (Person)</option>'
        +'<option value="string_last_modified_by">Last Modified by (Person)</option>'
        +'<option value="datetime_created_at">Created at (Date)</option>'
        +'<option value="datetime_last_modified_at">Last Modified at (Date)</option>');
  },
  
  
  fields_extract: function() {
    switch ($('#selectpicker-tab option:selected').val()) {
      case 'donor':
        //this.style.color = 'red';
        $('#selectpicker-fld')
        	.html('<option value="datetime_contact_date">Contact Date</option>'
           +'<option value="datetime_followup_date">Followup Date</option>'
           +'<option value="none_narrative">Narrative</option>'
           +'<option value="string_created_by">Create by (Person)</option>'
           +'<option value="string_last_modified_by">Last Modified by (Person)</option>'
           +'<option value="datetime_created_at">Created at (Date)</option>'
           +'<option value="datetime_last_modified_at">Last Modified at (Date)</option>')
        	.selectpicker('refresh');
        break;
        
      case 'contact':
        //this.style.color = "#00ff00";
        document.getElementById("selectpicker-fld").innerHTML = ReportCreator.ContactFields();
        break;
        
      case 'finance':
        //this.style.color = '#660066';
        document.getElementById("selectpicker-fld").innerHTML = ReportCreator.FinanceFields();
        break;
      
      default:
        return false;
    }
    $('.atr').prop('disabled', false);
  },
  
  filter_part: function() {
  	switch(this.value.split('_')[0]){
  		case 'none':
  			//
  		break;
  		
  		case 'string':
  			//document.getElementById("filter").innerHTML = ReportCreator.filter_html.string;
  		break;
  		
  		case 'decimal':
  			
  		break;
  		
  		case 'datetime':
  			
  		break;
  		
  		default:
  		//
  	}
  },
  
  addListeners: function() {
    
      if ($('.unselected').find('option:selected').length != 0) {
            $('.str').prop('disabled', false);
        };
        
      var unselected = $('#selectpicker-fld');
      var selected = $('#selectedfields');
      
      $('#four-box-step').find('button').bind('click', function() {
          switch ($(this).data('type')) {
              case 'str': /* Selected to the right. */
                  unselected.find('option:selected').clone().appendTo(selected);
                  $(this).prop('disabled', true);
                  break;
              case 'atr': /* All to the right. */
                  unselected.find('option').each(function () {
                      if ($(this).isVisible()) {
                          $(this).appendTo(selected);
                      }
                  });
                  break;
              case 'stl': /* Selected to the left. */
                  selected.find('option:selected').appendTo(unselected);
                  $(this).prop('disabled', true);
                  break;
              case 'atl': /* All to the left. */
                  selected.find('option').each(function () {
                          if ($(this).isVisible()) {
                              $(this).remove().appendTo(unselected);
                          }
                      });
                  break;
              default: break;
          }

//            unselected.filterByText($(ReportCreator.options.parentElement + ' .filter-unselected'), ReportCreator.options.timeout, ReportCreator.options.parentElement).scrollTop(0).sortOptions();
//            selected.filterByText($(ReportCreator.options.parentElement + ' .filter-selected'), ReportCreator.options.timeout, ReportCreator.options.parentElement).scrollTop(0).sortOptions();

          ReportCreator.handleMovement(ReportCreator.options);
          ReportCreator.toggleButtons(ReportCreator.options.parentElement);
          
      });
        
        

//        $(ReportCreator.options.parentElement).closest('form').submit(function() {
//            selected.find('option').prop('selected', true);
//        });

//        $(ReportCreator.options.parentElement).find('input[type="text"]').keypress(function(e) {
//            if (e.which === 13) {
//                event.preventDefault();
//           }
//        });

//        selected.filterByText($(options.parentElement + ' .filter-selected'), options.timeout, options.parentElement).scrollTop(0).sortOptions();
//        unselected.filterByText($(options.parentElement + ' .filter-unselected'), options.timeout, options.parentElement).scrollTop(0).sortOptions();
   
    },
    
  handleMovement: function(options){
        $(options.parentElement + ' .unselected').find('option:selected').prop('selected', false);
        $(options.parentElement + ' .selected').find('option:selected').prop('selected', false);

//        $(options.parentElement + ' .filter').val('');
        $(options.parentElement + '.fields').find('option').each(function() { $(this).show(); });

//        countElements(options.parentElement);
    },
    
  toggleButtons: function(parentElement){
        $(parentElement + ' .unselected').change(function() {
            $(parentElement + ' .str').prop('disabled', false);
        });

        $(parentElement + ' .selected').change(function() {
            $(parentElement + ' .stl').prop('disabled', false);
        });

        if ($(parentElement + ' .unselected').find('option').length == 0) {
            $(parentElement + ' .atr').prop('disabled', true);
            $(parentElement + ' .str').prop('disabled', true);
        } else {
            $(parentElement + ' .atr').prop('disabled', false);
        }

        if ($(parentElement + ' .selected').find('option').length == 0) {
            $(parentElement + ' .atl').prop('disabled', true);
            $(parentElement + ' .stl').prop('disabled', true);
        } else {
            $(parentElement + ' .atl').prop('disabled', false);
        }
    },
 
  setup: function() {
   
      $('#tables').change(ReportCreator.fields_extract);
        
      $('.fields').change(ReportCreator.addListeners);
      $('#selectpicker-tab').change(ReportCreator.fields_extract);
       

      //$('#selectpicker-fld').change(ReportCreator.filter_part);
    
  }
};


$.fn.isVisible = function() {
        return !($(this).css('visibility') == 'hidden' || $(this).css('display') == 'none');
  };
$(ReportCreator.setup);
