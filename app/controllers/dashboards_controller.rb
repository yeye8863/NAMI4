require 'date'

class DashboardsController < ApplicationController
    before_filter :authorize

    def index
      @agenda_records = Contact.find_agenda
    end
end