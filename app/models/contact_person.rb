class ContactPerson < ActiveRecord::Base
  belongs_to :organization
  has_many :contacts
  
  attr_accessible :title, :first_name, :last_name, :middle_name, :salution, :email, :company,
  :street_address, :city, :state, :country, :zipcode, :home_phone, :business_phone, :mobile_phone,
  :created_by, :last_modified_by, :organization_id
end
