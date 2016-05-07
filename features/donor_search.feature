Feature: Donor Search
Background: users logged in and nevigate to donor search page
  Given the following users exist:
    | username   | password 	     | email			    | first_name	| last_name	|
    | Jojo       | notthistime     | 222@gmail.com	| B				    | E			    |

  Given I am on the index page
	When I login with "Jojo" and "notthistime"
	And I press "Login"
	Then I should be on home page
	And I follow "Donor Management"
	Then I should be on search donor page
	
Scenario: add a new donor
  Given I am on search donor page 
  And I follow "Add A New Donor"
  Then I should be on donor basic page
  
Scenario: quick add a new donor 
  Given I am on search donor page 
  When I fill in "First Name" with "Andy"
  And I fill in "Last Name" with "Lin"
  And I press "Quick Add"
  Then I should be on search donor page
  
Scenario: reset the search field 
  Given I am on search donor page 
  When I fill in "First Name" with "Andy"
  And I fill in "Last Name" with "Lin"
  And I press "Reset"
  Then I should be on search donor page
  And the "First Name" field should be empty
  And the "Last Name" field should be empty