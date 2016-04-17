require 'date'

class DashboardsController < ApplicationController
    before_filter :authorize
    def index
      @agenda_records = AgendaView.all
      #debugger
      puts @agenda_records
      @agenda_records.each do |record|
        puts record
      end
    end
end