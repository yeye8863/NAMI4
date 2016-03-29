class Donor < ActiveRecord::Base
    has_many :finances
    has_many :contacts
end
