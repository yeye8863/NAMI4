require 'date'

class DashboardsController < ApplicationController
    before_filter :authorize
    def index
      @agenda_records = AgendaView.all
      #debugger
      @agenda_records.each do |record|
        puts record
      end
      @donor_records = DonorView.all
      @report_records = Report.all
    end
end

