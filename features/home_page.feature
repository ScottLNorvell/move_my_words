Feature: Home Page
	In order to use the site
	As someone interested in new blog platforms
	I want to be able to sign in

	Scenario: Signing Up
		Given I visit the home page
		And I click the "Sign Up" link
		Then I should see the "#signup-modal" modal
		When I fill in the correct sign up information
		Then I should be logged in

	Scenario: Signing In
		Given I visit the home page
		And I click the "Log In" link
		Then I should see the "#signin-modal" modal
		Given I log in
		Then I should be logged in

	Scenario: Signing Out
		Given I visit the home page
		And I log in
		Given I click the "Log Out" link
		Then I should be logged out

	Scenario: Entering Text
		Given I visit the home page
		And I fill in "Test" for "enter-text"
		# And I press "space"
		Then "Test" should display in the svg

	


