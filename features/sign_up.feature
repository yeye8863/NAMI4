Feature: Signup
Background: user in database and given access code
Given the following users exist:
| username  | password_digest | 
| Tony  	| testpassword23  |
| Jojo  	| notthistime     |
| Ste   	| welcomeback     |

And Given the access code and email:
|access_code   	|  email  	        |
|1234           |  frank@gmail.com  |

Scenario: signup with new identity(happy path)
	Given I am on the “Sign Up” page
	When I fill in “username” with “frank”
	And I fill in “password” with “abcdefgh”
	And I fill in “confirm password” with “abcdefgh”
	And I fill in “email” with “frank@gmail.com”
	And I fill in “access code” with “1234”
	And I click “Create”
	Then I should be on the index page
	And I should  see “Sign up successfully”


Scenario: try to signup with invalid information(sad path)
	Given I am on the “Sign Up” page
	When I fill in “username” with “frank”
	And I fill in “password” with “abcdefgh”
	And I fill in “confirm password” with “abcdfgp”
	And I fill in “email” with “frank@gmail.com”
	And I fill in “access code” with “2222”
	And I click “Create” button
	Then I should be on “Sign Up” page
	Then I should see “Signup unsuccessful”

