Feature: Homepage
Background: users in homepage

Scenario: go to donor management page
	Given I am on the home page
	And I press "Donor Management"
	Then I should be on donor_management page

Scenario: go to dash board page 
	Given I am on the home page
	And I press "Dash Board"
	Then I should be on dash_board page
	
Scenario: go to report page 
	Given I am on the home page
	And I press "Reporting"
	Then I should be on report page
	