Feature: Homepage
Background: users logged in to homepage
   Given the following users exist:
    | username   | password 	   | email			| first_name	| last_name	|
    | Tony       | testpassword23  | 111@gmail.com	| A				| D			|
    | Jojo       | notthistime     | 222@gmail.com	| B				| E			|
    | Ste        | welcomeback     | 333@gmail.com	| C				| F			|
   
  Given I am on the index page
	When I login with "Jojo" and "notthistime"
	And I press "Login"
	Then I should be on home page

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