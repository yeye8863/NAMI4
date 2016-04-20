require 'date'

class DashboardsController < ApplicationController
    before_filter :authorize
    def index
      @agenda_records = AgendaView.all
      #debugger
      @agenda_records.each do |record|
        puts record
      end
      @donors = DonorView.all
      @contact_people = ContactPersonView.all
      @report_records = Report.all
    end
    
    def viewDonor
      @donor = Donor.find(params[:id])
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
      render(:partial => 'new_added_donor',:object=>@donor_basic) if request.xhr?
    end
    
    def viewContactPerson
      @contact_person = ContactPerson.find(params[:id])
      @contact_person_basic = {
            'Title' => (@contact_person.title.capitalize! if @contact_person.title),
            'First Name' => (@contact_person.first_name.capitalize! if @contact_person.first_name),
            'Last Name' => (@contact_person.last_name.capitalize! if @contact_person.last_name),
            'Middle Name' => (@contact_person.middle_name.capitalize! if @contact_person.middle_name),
            'Salution' => (@contact_person.salution.capitalize! if @contact_person.salution),
            'Email' => @contact_person.email,
  	        'Organization' => @contact_person.organization.name.split.map(&:capitalize).join(' '),
  	        'Company' => (@contact_person.company.capitalize! if @contact_person.company),
  	        'Street Address' => @contact_person.street_address,
  	        'City' => (@contact_person.city.capitalize! if @contact_person.city),
  	        'State' => (@contact_person.state.capitalize! if @contact_person.state),
  	        'Countrt' => (@contact_person.country.capitalize! if @contact_person.country),
  	        'Zip Code' => @contact_person.zipcode,
            'Home Phone' => @contact_person.home_phone,
            'Business Phone' => @contact_person.business_phone
	        }
      render(:partial => 'new_added_contact_person',:object=>@contact_person_basic) if request.xhr?
    end
end

