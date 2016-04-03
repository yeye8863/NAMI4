Feature: Homepage
Background: users in homepage

Scenario: go to donor management page
	Given I am on the home page
	And I follow "Donor Management"
	Then I should be on donor page

Scenario: go to dash board page 
	Given I am on the home page
	And I follow "Dashboard"
	Then I should be on dashboard page
	
Scenario: go to report page 
	Given I am on the home page
	And I follow "Report"
	Then I should be on report page

Scenario: logout
	Given I am on the home page
	And I follow "Sign Out"
	Then I should be on index page
	