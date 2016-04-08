class DonorsController < ApplicationController
    #before_filter :authorize

    def index
        @donors = Donor.where(params[:donor])
    end
    
    def new 
    end
    
    def summary
        id = params[:id]
        @donor = Donor.find(id)
    end
end