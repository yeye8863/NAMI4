Feature: Jump to the report creator page to create a new template

As a owner / manager / board member
I want to jump to the report creator page
so that i can create a new template

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
	
Scenario: jump from home page to report template page
    Given I am on the home page
    When I follow the link "Report"
    Then I should be on the report page
    And I should see "Existing Report Templates"

Scenario: jump from report template page to report creator page
    Given I am on the report page
    When I follow "Add new template"
    Then I should be on the report creator page
    And I should see "Table"
    And I should see "Available Field"
    And I should see "Selected Field"
    And I should see "Filter"
    And I should see "Criteria Field"
