class Organization < ActiveRecord::Base
    has_many :finances
    has_many :contact_people
    has_many :contacts, :through => :contact_people
    
    attr_accessible :name, :street_address, :city, :state, :country, :zipcode, :fax, :created_by, :last_modified_by
end
