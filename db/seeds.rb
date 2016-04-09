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

donors = [
          {
            :title => 'Mr.',
            :first_name => 'Johnny',
            :last_name => 'Walker'
          },
          {
            :title => 'Mrs.',
            :first_name => 'Michelle',
            :last_name => 'Glanger'
          }
          ]

contact_people = [
          {
            :title => 'Mr.',
            :first_name => 'Peterson',
            :last_name => 'Crab',
            :organization_id => '1'
          }
          ]

organizations = [
          {
            :name => 'Golden Lion'
          }
          ]
  
contacts = [
          {
            :contact_date => '2016-04-01',
            :followup_date => '2016-04-12',
            :donor_id => '1',
            :narrative => 'Case 1'
          },
          {
            :contact_date => '2016-04-02',
            :followup_date => '2016-04-13',
            :donor_id => '2',
            :narrative => 'Case 2'
          },
          {
            :contact_date => '2016-03-31',
            :followup_date => '2016-04-11',
            :contact_person_id => '1',
            :narrative => 'Case 3'
          }
          ]
          
          
reports = [  
            {
             :title => '2014 donation by amount',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-01-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2016-02-18'
            },
            {
             :title => '2014 donation by city',
             :description => 'city: Houston, the whole 2014',
             :last_run => '2016-03-01',
             :created_by => 'ste',
             :created_at => '2015-01-19',
             :last_modified_by => 'jojo',
             :last_modified_at => '2015-02-18'
            },
            {
             :title => '2013 donation by city',
             :description => 'city: College Station, the whole 2013',
             :last_run => '2015-03-01',
             :created_by => 'ste',
             :created_at => '2014-01-19',
             :last_modified_by => 'jojo',
             :last_modified_at => '2015-02-18'
            }
          ]
          
reports.each do |report|
  Report.create!(report)
end
          
donors.each do |donor|
  Donor.create!(donor)
end

contact_people.each do |contact_person|
  ContactPerson.create!(contact_person)
end

organizations.each do |organization|
  Organization.create!(organization)
end

contacts.each do |contact|
  Contact.create!(contact)
end