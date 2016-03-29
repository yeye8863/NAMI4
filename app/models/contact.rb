class Contact < ActiveRecord::Base
  has_many :finances
  belongs_to :donor
  belongs_to :contact_person
end
