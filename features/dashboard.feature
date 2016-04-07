Feature: Dashboard

Background: users has logged in and go to the dashboard page
  Given the following users exist:
    | username   | password 	     | email			    | first_name	| last_name	|
    | Tony       | testpassword23  | 111@gmail.com	| A				    | D			    |
     
  Given the contacts table:
	  | donor_id  | contact_person_id | contact_date  | followup_date |
	  | 1         |                   | 2016-3-20     | 2016-4-11     |
	  |           | 1                 | 2016-3-21     | 2016-4-10     |  

	Given the donors table:
	  | title   | first_name   | last_name   |
	  | Mr.     | John         | Smith       |
	  | Mr.     | Bill         | Gates       |
	 
	Given the contact people table:
	  | title   | first_name   | last_name   |  organization_id |
	  | Mrs.    | Jenny        | White       |  1               |
	 
	Given the organizations table:
	  | name  |
	  | AAA   |
	  | BBB   |
	  
  Given I have logged in as "Tony" with "testpassword23"
	And I follow "Dashboard"
	
	Scenario: check out agenda
	  Then I should find 2 agenda records
	  And I should see agenda table:
	  | Name              | Organization  | Contact Date  |  Follow-up Date   |
	  | Mrs. Jenny White  | AAA           | 2016-3-21     | 2016-4-10         |
	  | Mr. John Smith    |               | 2016-3-20     | 2016-4-11         |
	  
	  