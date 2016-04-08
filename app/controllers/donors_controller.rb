class DonorsController < ApplicationController
    #before_filter :authorize

    def index
        @donors = Donor.where(params[:donor])
    end
    
    def new 
    end
end