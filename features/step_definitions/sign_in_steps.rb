# Add a declarative step here for populating the DB with users.
Given /the following users exist/ do |users_table|
  users_table.hashes.each do |user|
    User.create user
  end
end

Given /the access code and email/ do |access|
end