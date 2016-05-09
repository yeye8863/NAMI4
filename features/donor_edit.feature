Feature: Donor Edit
  Background: users logged in 
    Given the donors table:
      | first_name	| last_name	| organization	| company	| title	| flag	|
      | Albert		| Einstein	| AAA		| Apple		| Prof.	| I		|
      | John			| Smiths	  | BBB			| Facebook	| Mr.	| O		|
      | Daniel		| Freud		  | CCC			| Linkedin	| Mr.	| I		|
   
Scenario: Navigate to donor edit page
  Given I am on donor page
	When I follow "Edit" of row 1
	Then I should be on donnor edit page 1
	
Scenario: Update donor basic
  Given I am on donor edit page 1
  When I follow "Basic"
  And I fill in the following:
  	| title	| Mr.	|
  	| salution	| Mr.	|
  	| first_name	| Albert	|
  	| last_name	| Einstein	|
  	| middle_name	| Jr.	|
  	| email	| abc@tamu.edu	|
  	| home_phone	| 123456789	|
  	| business_phone	| 987654321	|
  	| zipcode	| 11111	|
  	| company	| Apple	|
  	| organization	| ABC	|
  	| street_address	| St. Peter Street	|
  	| city	| Houston	|
  And I follow "Update Donor"
  Then I should see "Save successful"
