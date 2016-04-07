Feature: Signup
Background: user in database and given access code
Given the following users exist:
| username   | password 	     | email			    | first_name	| last_name	|
| Tony       | testpassword23  | 111@gmail.com	| A				    | D			    |
| Jojo       | notthistime     | 222@gmail.com	| B			    	| E			    |
| Ste        | welcomeback     | 333@gmail.com	| C			    	| F			    |

And Given the email:
|  email  	        |
|  frank@gmail.com  |

Given I am on the index page 
When I follow "Sign Up"
Then I am on the signup page

Scenario: signup with new identity(happy path)

	When I fill in "Username" with "frank"
	And I fill in "Password" with "abcdefgh"
	And I fill in "First Name" with "Frank"
	And I fill in "Last Name" with "Zhang"
	And I fill in "Confirm Password" with "abcdefgh"
	And I fill in "Email" with "frank@gmail.com"
	And I press "Create"
	Then I should be on the index page
	And I should see "You have signed up successfully"


Scenario: try to signup with invalid email(sad path)

	When I fill in "Username" with "frank"
	And I fill in "Password" with "abcdefgh"
	And I fill in "First Name" with "Frank"
	And I fill in "Last Name" with "Zhang"
	And I fill in "Confirm Password" with "abcdefgh"
	And I fill in "Email" with "johnny@gmail.com"
	And I press "Create"
	Then I should be on the signup page
	Then I should see "Unauthrized email address."

