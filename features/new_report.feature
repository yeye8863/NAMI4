Feature: Jump to the report creator page to create a new template

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
	
Scenario: navigate from home page to reports page
    Given I am on the home page
    When I follow the link "Report"
    Then I should be on the report page
    And I should see "Existing Report Templates"

Scenario: navigate from reports page to new report page
    Given I am on the report page
    When I follow "Add new template"
    Then I should be on the report creator page