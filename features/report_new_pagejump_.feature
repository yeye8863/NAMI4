Feature: Jump to the report creator page to create a new template

As a owner / manager / board member
I want to jump to the report creator page
so that i can create a new template

Scenario: jump from home page to report template page
Given I am on the Home page
When I click "Reporting"
Then I should be on the Report Template page
And I should see "Existing Report Templates"

Scenario: jump from report template page to report creator page
Given I am on the Report Template page
When I click "Add new template"
Then I should be on the Report Creator page
And I should see "Table"
And I should see "Available Field"
And I should see "Selected Field"
And I should see "Filter"
And I should see "Criteria Field"
