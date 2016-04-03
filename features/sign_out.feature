Feature: Signout 
Scenario: try to log out from homepage
	Given I am on the home page
	And I follow "Sign Out"
	Then I should be on index page
	And I should see "You have successfully logged out!"