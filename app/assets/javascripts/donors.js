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