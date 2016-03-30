# Add a declarative step here for populating the DB with users.
Given /the following users exist/ do |users_table|
  users_table.hashes.each do |user|
    User.create user
  end
end

Given /the access code and email/ do |accesses|
    accesses.hashes.each do |access|
        User.create access
    end
end

When /^(?:|I )login with "([^"]*)" and "([^"]*)"$/ do |name, psw|
  fill_in("username", :with => name)
  fill_in("password", :with => psw)
end

    
