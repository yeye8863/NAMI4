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
        @donor_basic = {
            'Title' => (@donor.title.capitalize! if @donor.title),
            'First Name' => (@donor.first_name.capitalize! if @donor.first_name),
            'Last Name' => (@donor.last_name.capitalize! if @donor.last_name),
            'Middle Name' => (@donor.middle_name.capitalize! if @donor.middle_name),
            'Salution' => (@donor.salution.capitalize! if @donor.salution),
            'Email' => @donor.email,
  	        'Organization' => @donor.organization,
  	        'Company' => (@donor.company.capitalize! if @donor.company),
  	        'Street Address' => @donor.street_address,
  	        'City' => (@donor.city.capitalize! if @donor.city),
  	        'State' => (@donor.state.capitalize! if @donor.state),
  	        'Countrt' => (@donor.country.capitalize! if @donor.country),
  	        'Zip Code' => @donor.zipcode,
            'Home Phone' => @donor.home_phone,
            'Business Phone' => @donor.business_phone
	        }
	    @donor_contact = ['Contact Date', 'Followup Date', 'Narrative', 'Created By', 'Last Modified By']
	    @contacts = Contact.where(:donor_id => @donor.id)
    end
    
    def update
      @donor = Donor.find(params[:id])
      params[:donor].each do |attr|
        attr[1].downcase!
      end
      @donor.update_attributes(params[:donor])
      @donor_basic = {
            'Title' => (@donor.title.capitalize! if @donor.title),
            'First Name' => (@donor.first_name.capitalize! if @donor.first_name),
            'Last Name' => (@donor.last_name.capitalize! if @donor.last_name),
            'Middle Name' => (@donor.middle_name.capitalize! if @donor.middle_name),
            'Salution' => (@donor.salution.capitalize! if @donor.salution),
            'Email' => @donor.email,
  	        'Organization' => @donor.organization,
  	        'Company' => (@donor.company.capitalize! if @donor.company),
  	        'Street Address' => @donor.street_address,
  	        'City' => (@donor.city.capitalize! if @donor.city),
  	        'State' => (@donor.state.capitalize! if @donor.state),
  	        'Countrt' => (@donor.country.capitalize! if @donor.country),
  	        'Zip Code' => @donor.zipcode,
            'Home Phone' => @donor.home_phone,
            'Business Phone' => @donor.business_phone
	        }
      render(:partial => 'donor_info', :object => @donor_basic) if request.xhr?
    end
end
