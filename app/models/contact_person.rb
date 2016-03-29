class ContactPerson < ActiveRecord::Base
  belongs_to :organization
  has_many :contacts
end
