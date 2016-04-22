class DonorsController < ApplicationController

    #before_filter :authorize

    def index
        @donor_attr = Donor.attribute_names
        @donor_attr_show = ["title", "first_name", "last_name",  "email", "organization", "company", "street_address", 
        "city", "state", "country", "zipcode", "home_phone", "business_phone"]
        @donors = Donor.search_by(params[:donor])
    end
    
    def new 
        @donor = Donor.new
        @donor_contact = {
	        'Contact Date' => '15%',
	        'Followup Date' => '15',
	        'Narrative' => '40%',
	        'Created By' => '15%',
	        'Last Modified By' =>'15%'
	      }
        #render(:partial => 'donor_info', :object => @donor) if request.xhr?
    end
    
    def destroy
        id = params[:id]
        @donor = Donor.find(id)
        flash[:notice] = "#{@donor.first_name} #{@donor.last_name} is deleted."
        @donor.destroy
        redirect_to donors_path
    end
    
    def create
        @donor = Donor.create!(params[:donor])
        flash[:notice] = "#{@donor.first_name} #{@donor.last_name} was successfully created."
        render :json => {:id => @donor.id}
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
	    @donor_contact = {
	        'Contact Date' => '15%',
	        'Followup Date' => '15',
	        'Narrative' => '40%',
	        'Created By' => '15%',
	        'Last Modified By' =>'15%'
	    }
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
    
    
    private
end
