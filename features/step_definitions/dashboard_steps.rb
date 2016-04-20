Then /I should find (\d+) agenda records/ do |count|
  expect(page).to have_css('table#agenda-table tbody tr',:count => count.to_i)
end 

Then /I should find agenda table/ do |expected_table|
  html_table = table_at("#agenda-table").to_a
  html_table.map! { |r| r.map! { |c| c.gsub(/<.+?>/, '').gsub(/[\n\t\r]/, '') } }
  expected_table.diff!(html_table)
end

Then /I should find (\d+) recently report records/ do |count|
  expect(page).to have_css('table#recentlyreport-table tbody tr',:count => count.to_i)
end 

Then /I should find the recently report table/ do |expected_table|
  html_table = table_at("#recentlyreport-table").to_a
  html_table.map! { |r| r.map! { |c| c.gsub(/<.+?>/, '').gsub(/[\n\t\r]/, '') } }
  expected_table.diff!(html_table)
end