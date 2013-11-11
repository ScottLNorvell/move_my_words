Feature: User Pages
	In order to use the site
	As someone interested in new blog platforms
	I want to be able to sign in

	Scenario: Signing Up
		Given I visit the main page
		And I click 'sign up'
		When I fill in the correct sign up information
		Then I should be signed in

	Scenario: Signing Out
		Given I visit the main page
		And I click 'log out'
		Then I should be logged out

	Scenario: Signing In
		Given I visit the main page
		And I click 'sign in'
		When I fill in the correct sign in information

