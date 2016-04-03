Feature: Homepage
Background: users logged in and nevigate to donor management page
   Given the following users exist:
    | username   | password 	   | email			| first_name	| last_name	|
    | Tony       | testpassword23  | 111@gmail.com	| A				| D			|
    | Jojo       | notthistime     | 222@gmail.com	| B				| E			|
    | Ste        | welcomeback     | 333@gmail.com	| C				| F			|
   
  Given I am on the index page
	When I login with "Jojo" and "notthistime"
	And I press "Login"
	Then I should be on home page
	And I follow "Donor Management"
	Then I should be on donor page
	
Scenario: 