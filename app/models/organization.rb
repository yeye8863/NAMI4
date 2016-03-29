class Organization < ActiveRecord::Base
    has_many :finances
    has_many :contact_people
    has_many :contacts, :through => :contact_people
end
