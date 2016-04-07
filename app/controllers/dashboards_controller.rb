require 'date'

class DashboardsController < ApplicationController
    before_filter :authorize
    def index
      @agenda_records = AgendaView.all
    end
end