class DonorsController < ApplicationController
    before_filter :authorize

    def index
    end
    
    def summary
        id = params[:id]
        @donor = Donor.find(id)
    end
end