class Finance < ActiveRecord::Base
  belongs_to :donor
  belongs_to :contact
end
