Feature: Donor Add
Background: users logged in and navigate to donor search page
  Given the following users exist:
    | username   | password          | email        | first_name  | last_name | function      |
    | Jojo       | testpassword123     | 222@gmail.com  | B       | E     | donor management  |
    | Ste        | testpassword123     | 333@gmail.com  | C       | F     | report management |
    | Bob        | testpassword123     | 444@gmail.com  | D       | G     | dashboard     |
  
  Given I have logged in as "Jojo" with "testpassword123"



@javascript
Scenario: Fill out donor basic information
  Given I am on the new donor page
  When I fill in the following:
    | first_name  | Albert  |
    | last_name | Einstein  |
    | middle_name | Jr. |
  And I press "Role&Title"
  And I fill in the following:
    | company | Apple |
    | role | manager |
    | title| boss
And I fill in the following:
    | business_phone  | 987654321 |
    | email | abc@tamu.edu  |
    | street_address  | St. Peter Street  |
    | city  | Houston |
    | state | Texas |
    |country| United States|
 And I press "Secondary Information"     
    And I fill in the following:           
    | secondary_cell_phone | 9799799797|
    | secondary_home_phone | 9799899898|
    | secondary_email | abc@tamu.edu  |
    | secondary_street_address  | St. Peter Street |
    | secondary_city  | Houston |
    | secondary_state | Texas |
    |secondary_country| United States|
    | secondary_zipcode | 77840|
 And I fill in the following:
    | note | nothing |
    | contact_date | 2016 |
    | followup_date | 2016 |
  And I press "Create Donors"
  #Then the "Create Donors" button should be disabled
  Then I should be on the new donor page
  And I first follow "Back"
  Then I should see "Albert"
  And I should see "Einstein" 
  And I should see "boss"
  And I should see "Apple"

Scenario: Navigate to donor page
  Given I am on new donor page
  When I follow "return to doner management" 
  Then I should be on the donor page 