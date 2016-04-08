var AgendaInfo = {
  setup: function(){
    $('.agenda_link').click(AgendaInfo.showAgendaInfo);
  },
  showAgendaInfo: function(){
    console.log('Link is clicked')
  },
  hideAgendaInfo: function(){
    
  }
};

$(AgendaInfo.setup);
