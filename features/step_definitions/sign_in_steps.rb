When /^(?:|I )login with "([^"]*)" and "([^"]*)"$/ do |name, psw|
  fill_in("Username", :with => name)
  fill_in("Password", :with => psw)
end

Then /^(?:|I )should be home$/ do
  current_path = URI.parse(current_url).path
  if current_path.respond_to? :should
    current_path.should == '/homepage'
  else
    assert_equal path_to('/homepage'), current_path
  end
end
