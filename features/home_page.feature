Feature: Home Page
	In order to use the site
	As someone interested in new blog platforms
	I want to be able to sign in

	Scenario: Signing Up
		Given I visit the home page
		And I click the 'Sign Up' link
		Then I should see the '#signup-modal'
		When I fill in the correct sign up information
		Then I should be signed in

	Scenario: Signing Out
		Given I visit the home page
		And I am signed in
		And I click the 'Log Out' link
		Then I should be logged out

	Scenario: Signing In
		Given I visit the home page
		And I click the 'Log In' link
		Then I should see the '#signin-modal'
		When I fill in the correct sign in information
		Then I should be signed in

	Scenario: Entering Text
		Given I visit the home page
		And I fill in 'Test' for '#enter-text'
		And I press 'space'
		Then 'Test' should display in the svg


