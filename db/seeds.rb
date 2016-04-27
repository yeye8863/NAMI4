# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# user seed
users = [
       {:username => 'jiajia', :password => 'jiajia', :password_confirmation => 'jiajia', :current_password=>'jiajia',
       :email => '111@gmail.com', :first_name => 'jiajia', :last_name => 'hou', :function => '1,2,3,4',
       :phone_number => '12345678', :street_address => 'sesame street', :zipcode => 77840      
       },
       {:username => 'user2', :password => 'user2', :password_confirmation => 'user2', :current_password=>'user2',
       :email => '222@gmail.com', :first_name => 'James', :last_name => 'Bond', :function => '1,2,3',
       :phone_number => '12345679', :street_address => 'sesame street', :zipcode => 77841      
       },
       {:username => 'user3', :password => 'user3', :password_confirmation => 'user3', :current_password=>'user3',
       :email => '333@gmail.com', :first_name => 'Emily', :last_name => 'Jones', :function => '1',
       :phone_number => '12345680', :street_address => 'sesame street', :zipcode => 77842      
       }
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
            {:flag => 'I', :title => 'mr.', :first_name => 'albert', :last_name => 'linkoln', :company => 'apple', :organization => 'ptsd', :active => 1},
            {:flag => 'O', :title => 'mrs.', :first_name => 'sophia', :last_name => 'elizabeth', :company => 'google', :organization => 'dso', :active => 1},
            {:flag => 'I', :title => 'mr', :first_name => 'albert', :last_name => 'zhang', :company => 'linkendin', :organization => 'ptsd', :active => 0},
            {:flag => 'O', :title => 'mr.', :first_name => 'sam', :last_name => 'smith', :company => 'apple', :organization => 'ptsd', :active => 1},
            {:flag => 'I', :title => 'mr.', :first_name => 'johnny', :last_name => 'walker',:company => '', :organization => '', :active => 1},
            {:flag => 'I', :title => 'mrs.', :first_name => 'michelle',:last_name => 'glanger',:company => '', :organization => '', :active => 0}
          ]
  
contacts = [
          {:contact_date => '2016-04-01', :followup_date => '2016-04-22', :donor_id => '1', :narrative => 'Discussion about event in May'},
          {:contact_date => '2016-04-02', :followup_date => '2016-04-23', :donor_id => '2', :narrative => 'Funding raising for April'},
          {:contact_date => '2016-03-31', :followup_date => '2016-04-21', :donor_id => '1', :narrative => 'Discussion about next donation from Golden Lion'},
          {:contact_date => '2016-03-31', :followup_date => '2016-04-26', :donor_id => '2', :narrative => 'Financial Report to Silver Fox'},
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
             :title => 'haha',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-01-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2016-02-18'
            },
            {
             :title => 'donation by amount',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-11-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2016-02-18'
            },
            {
             :title => '2014 by amount',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-01-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2016-02-18'
            },
            {
             :title => '2014 donation amount',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-01-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2016-02-18'
            },
            {
             :title => '201 donation by amount',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-01-24',
             :last_modified_by => 'por',
             :last_modified_at => '2016-02-18'
            },
            {
             :title => '2014 tion by amount',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-01-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2016-02-18'
            },
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
             :title => '2014 donation by amount',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-01-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2016-02-18'
            },
            {
             :title => '2014 donation by amount',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-01-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2016-02-18'
            },{
             :title => '2014 donation by amount',
             :description => 'amount between 0 to 500, the whole 2014',
             :last_run => '2016-04-01',
             :created_by => 'jojo',
             :created_at => '2015-01-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2016-02-18'
            },
            {
             :title => '2004 donation by amount',
             :description => 'amount between 0 to 700, the whole 2004',
             :last_run => '2015-04-01',
             :created_by => 'papa',
             :created_at => '2015-01-24',
             :last_modified_by => 'ste',
             :last_modified_at => '2015-02-18'
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

contacts.each do |contact|
  Contact.create!(contact)
end
