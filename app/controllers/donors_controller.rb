class DonorsController < ApplicationController
    #before_filter :authorize

    def index
        @donors = Donor.search_by(params[:donor])
    end
    
    def new 
    end
    
    def create
        @donor = Donor.create!(params[:donor])
        flash[:notice] = "#{@donor.first_name} #{@donor.last_name}  was successfully created."
        redirect_to donors_path
    end
end

