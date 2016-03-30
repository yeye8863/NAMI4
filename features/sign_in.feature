Feature: Signin to the system
Background: users in database
    Given the following users exist:
    | username   | password_digest |
    | Tony       | testpassword23  |
    | Jojo       | notthistime     |
    | Ste        | welcomeback     |

Scenario: try to login with true identity (happy path)
	Given I am on the index page
	When I login with "Jojo" and "notthistime"
	And I press "Login"
	Then I should be on homepage 

Scenario: try to login with false identity (sad path)
	Given I am on the index page
	When I login with "Jojo" and "welcomeback"
	And I press “login”
	Then I should be on index page
	And I should see “Unable to verify identity” 
