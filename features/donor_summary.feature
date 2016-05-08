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