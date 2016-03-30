# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#users = [{:username => 'tony', :password_digest => 'tony'},
#        {:username => 'lihao', :password_digest => 'lihao'},
#        {:username => 'jiajia', :password_digest => 'jiajia'},
#        {:username => 'nyp', :password_digest => 'nyp'},
#        {:username => 'zhengye', :password_digest => 'zhengye'},
#        {:username => 'yuanfei', :password_digest => 'yuanfei'}
#  	 ]

#users.each do |user|
#  User.create!(user)
#end

users = [{:email => '1234@qq.com'}] 

users.each do |user|
  Access.create!(user)
end
