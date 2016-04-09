# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# user seed
users = [
       {:username => 'jiajia', :password => 'jiajia', :password_confirmation => 'jiajia',
       :email => '111@gmail.com', :first_name => 'jiajia', :last_name => 'hou'}
       ]
       
users.each do |user|
  User.create!(user)
end

# access email seed
accesses = [{:email => 'tonywang@tamu.edu'},
          {:email => 'lihao@tamu.edu'}]

accesses.each do |access|
  Access.create!(access)
end

#donor seed
donors = [
    {:first_name => 'Albert', :last_name => 'Linken', :company => 'Apple', :organization => 'PTSD'},
    {:first_name => 'Sopia', :last_name => 'Linken', :company => 'Google', :organization => 'DSO'},
    {:first_name => 'Albert', :last_name => 'Zhang', :company => 'Linkendin', :organization => 'PTSD'},
    {:first_name => 'Sam', :last_name => 'Smith', :company => 'Apple', :organization => 'PTSD'}
    ]
donors.each do |donor|
    Donor.create!(donor)
end
