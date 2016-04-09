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

    def show
        id = params[:id]
        @donor = Donor.find(id)
        @donor_attr = {
            'Title' => @donor.title,
            'First Name' => @donor.first_name,
            'Last Name' => @donor.last_name,
            'Middle Name' => @donor.middle_name,
            'Salution' => @donor.salution,
            'Email' => @donor.email,
	        'Organization' => @donor.organization,
	        'Company' => @donor.company,
	        'Street Address' => @donor.street_address,
	        'City' => @donor.city,
	        'State' => @donor.state,
	        'Countrt' => @donor.country,
	        'Zip Code' => @donor.zipcode,
            'Home Phone' => @donor.home_phone,
            'Business Phone' => @donor.business_phone,
            'Created By' => @donor.created_by,
            'Last Modified by' => @donor.last_modified_by,
            'Created at' => @donor.created_at,
            'Last Modified at' => @donor.last_modified_at
	        }
    end
end
