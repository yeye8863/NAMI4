# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# user seed
users = [
       {:username => 'lemontea', :password => 'lemontea', :password_confirmation => 'lemontea', :current_password=>'lemontea',
       :email => 'loe.zou@gmail.com', :first_name => 'Lihao', :last_name => 'Zou', :function => 'donor management, dashboard, report management, user management',
       :phone_number => '9793243769', :street_address => '4003 Rehel Dr.', :zipcode => "77845", :city => "College Station"
       }
       ]
       
users.each do |user|
  User.create!(user)
end