# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = [
       {:username => 'jiajia', :password => 'jiajia'},
       {:username => 'nyp', :password => 'nyp'},
       {:username => 'zhengye', :password => 'zhengye'},
       {:username => 'yuanfei', :password => 'yuanfei'}]
users.each do |user|
  User.create!(user)
end

accesses = [{:email => 'tonywang@tamu.edu'},
          {:email => 'lihao@tamu.edu'}]

accesses.each do |access|
  Access.create!(access)
end

#users.each do |user|
#  User.create!(user)
#end

users = [{:email => '1234@qq.com'}] 

users.each do |user|
  Access.create!(user)
end
