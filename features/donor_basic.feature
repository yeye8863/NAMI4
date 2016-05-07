Feature: Donor Basic
  Background: users logged in 
    Given the following donnor exist:
      | first_name	| last_name	|
      | Hank        | Walker    |
   
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
  When I follow "Back"