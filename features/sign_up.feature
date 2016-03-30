Feature: Signup
Background: user in database and given access code
Given the following users exist:
| username  | password_digest | 
| Tony  	| testpassword23  |
| Jojo  	| notthistime     |
| Ste   	| welcomeback     |

And Given the email:
|  email  	        |
|  frank@gmail.com  |

Given I am on the index page 
When I follow "Sign Up"
Then I am on the signup page

Scenario: signup with new identity(happy path)

	When I fill in "Username" with "frank"
	And I fill in "Password" with "abcdefgh"
	And I fill in "Confirm Password" with "abcdefgh"
	And I fill in "Email" with "frank@gmail.com"
	And I press "Create"
	Then I should be on the index page
	And I should see "You have signed up successfully"


Scenario: try to signup with invalid information(sad path)

	When I fill in "Username" with "frank"
	And I fill in "Password" with "abcdefgh"
	And I fill in "Confirm Password" with "abcdefgh"
	And I fill in "Email" with "frank1@gmail.com"
	And I press "Create"
	Then I should be on signup page
	Then I should see "Incorrect access code"

