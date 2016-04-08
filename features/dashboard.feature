Feature: Dashboard

Background: users has logged in and go to the dashboard page
   
    Given the following users exist:
    | username   | password 	     | email			    | first_name	| last_name	|
    | Tony       | testpassword23    | 111@gmail.com	    | A				| D			|
     
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
	
	Given the report table:
     |         Title           |  Create Time | Last Modified Time | Last Run Time |
	 | 2014first season report |  2014-3-21   | 2014-4-10          | 2014-4-15     |
     | 2013second season report|  2013-3-21   | 2013-4-10          | 2013-4-15     |
	 | 2012third season report |  2012-3-21   | 2012-4-10          | 2012-4-15     |
	
    Given the donors table:
	  | title   | first_name   | last_name   | Last Run Time | Contact Date   | Create Time | Last Modified Time |
	  | Mr.     | John         | Smith       | 2014-5-15     | 2014-3-12      | 2014-3-22   | 2014-4-12          |
	  | Mr.     | Bill         | Gates       | 2013-2-15     | 2014-1-10      | 2014-1-21   | 2014-2-10          | 

   	Given the contact people table:
	  | title   | first_name   | last_name   |  organization_id | Contact Date   | Create Time | Last Modified Time | Last Run Time |
	  | Mrs.    | Jenny        | White       |        1         |   2014-3-10    | 2014-3-21   | 2014-4-10          | 2014-4-15     | 
	  | Mr.     | James        | Jones       |        1         |   2013-3-10    | 2013-3-21   | 2013-4-10          | 2013-4-15     | 
	  | Miss.   | Stephen      | Rose        |        2         |   2012-3-10    | 2012-3-21   | 2012-4-10          | 2012-4-15     | 
	  
    Given the organizations table:
	  | name  | Last Run Time | Contact Date   | Create Time | Last Modified Time |
	  | AAA   | 2014-4-15     |  2014-3-10     | 2014-3-21   | 2014-4-10          |
	  | BBB   | 2013-5-15     | 2013-3-12      | 2013-3-22   | 2013-4-12          |

	Given I have logged in as "Tony" with "testpassword23"
	And I follow "Dashboard"
	
	Scenario: check out agenda
	  Then I should find 2 agenda records
	  And I should see agenda table:
	  | Name              | Organization  | Contact Date  |  Follow-up Date   |
	  | Mrs. Jenny White  | AAA           | 2016-3-21     | 2016-4-10         |
	  | Mr. John Smith    |               | 2016-3-20     | 2016-4-11         |


	Scenario: check out recently report
	  Then I should find 2 recently report records
	  And I should see the recently report table:
	  |         Title           | Create Time  | Last Modified Time |
	  | 2014first season report |  2014-3-21   | 2014-4-10          |
	  | 2013second season report|  2013-3-21   | 2013-4-10          |
	
	Scenario: check out recently edited contact
	  Then I should find 2 recently edited contact records
	  And I should see the recently edited contact table:
	  |        Name       | Organization  | Contact Date |  Create Time  |Last Modified Time| Last Run Time |
	  | Mr.  John Smith   |               | 2014-3-12    |  2014-3-22    | 2014-4-12        | 2014-5-15     |
	  | Mrs. Jenny White  |     AAA       | 2014-3-10    |  2014-3-21    | 2014-4-10        | 2014-4-15     |
	                     