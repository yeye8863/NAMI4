class Donor < ActiveRecord::Base
    has_many :finances
    has_many :contacts
    
    attr_accessible :first_name, :last_name, :title, :middle_name, :salution, 
    :email, :organization, :company, :street_address, :city, :state, :country,
    :zipcode, :home_phone, :business_phone, :created_by, :last_modified_by
end
