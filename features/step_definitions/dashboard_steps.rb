Then /I should find (\d+) agenda records$/ do |count|
  expect(page).to have_css('table#agenda tr',:count => count.to_i)
end 

Then(/^I should see agenda table$/) do |expected_table|
  html_table = table_at("#agenda").to_a
  html_table.map! { |r| r.map! { |c| c.gsub(/<.+?>/, '').gsub(/[\n\t\r]/, '') } }
  expected_table.diff!(html_table)
end