Feature: View donnor summary
Background: users logged in and nevigate to search donor page
   Given the following donnor exist:
    |   first_name	| last_name	|
    |   Hank        | Walker    |
   
  Given I am on the search donnor page
	When follow "Walker"
	Then I should be on donor summary page
    Then I should see "Query"
    And I should see "Summary"
    And I should see "Back"
	
Scenario: Back to search donnor
  When I follow "Back"
  Then I should be on search donnor page
  
Scenario: View or edit Basic info
  When I follow "Basic"
  Then I should be on donnor basic page
  
Scenario: View or edit contact info
  When I follow "Contact"
  Then I should be on donnor contact page
  
Scenario: View or edit finance info
  When I follow "Finance"
  Then I should be on donnor finance page
  
Feature: View and edit donnor basic
  Background: users logged in 
   Given the following donnor exist:
    |   first_name	| last_name	|
    |   Hank        | Walker    |
   
Scenario: View or edit existing donnor
  Given I am on donor summary page of "Walker"
	When I follow "Basic"
	Then I should be on donnor basic page
	And "Last Name" field shoud be "Walker"
	And "First Name" field shoud be "Hank"

Scenario: New donnor
  Given I am on search donor page
	When I follow "Add New Donor"
	Then I should be on donnor basic page
	And "Last Name" field shoud be empty
	And "First Name" field shoud be empty
	
Scenario: Edit donnor and save
  Given I am on donnor basic page
  When I fill in "First Name" with "Someone"
  And I fill in "Last Name" with "Else"
  And I press "Save"
  Then I should see "Save successful"
	