var DonrInfo = {
  setup: function(){
    $('#addedcontact-table td a').click(DonorInfo.getDonorInfo);
    return false
  },
  getDonorInfo: function(event){
    event.preventDefault();
    $.ajax({type:'GET',
            url: $(this).attr('href'),
            timeout: 5000,
            success: DonorInfo.showDonorInfo,
            error: function(xhrobj,textStatus,exception){
              alert('Error!');
            }
    });
    return false;
  },
  showDonorInfo: function(data,request,xhrobj){
    $('#addedcontact .modal-body').html(data);
    $('#addedcontactInfo').modal();
    return false;
  },
  hideDonorInfo: function(){
    return false;
  }
};

$(donorInfo.setup);