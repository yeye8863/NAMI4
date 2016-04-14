var donorInfo = {
  setup: function(){
    $(document).ajaxSuccess(function(event,status,xhrObj,data){
      $('#summary-table tbody').html(data);
      $("#basic-submit").notify("Successfully saved", {className: "success", position:"left middle"});
    });
    $(document).ajaxError(function(){
      $("#basic-submit").notify("Error occurred, please try later...", {className: "error", position:"middle middle"});
    });
  }
};

$(donorInfo.setup);

var SearchScope = {
  select_scope : function() {
   $('#individual').toggle();
   $('#organization').toggle();
  },
  setup: function() {
    SearchResult.setup();
    $('#scope_link').change(SearchScope.select_scope);
  }
}

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
$(document).ready(SearchScope.setup);
