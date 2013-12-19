Given(/^I visit the home page$/) do
  visit '/'
end

Given(/^I click the "(.*?)" link$/) do |link|
  click_link link
end

Then(/^I should see the "(.*?)" modal$/) do |modal_id|
  page.should have_selector(modal_id, visible: true)
end

When(/^I fill in the correct sign up information$/) do
  fill_in 'Email', with: 'person@example.com'
  fill_in 'Password', with: 'password'
  fill_in 'Password confirmation', with: 'password'
  click_button 'Sign up'
end

Then(/^I should be logged in$/) do
  page.should have_link 'Log Out'
end

Given(/^I log in$/) do
  # unless page have_link 'Log Out'
    click_link 'Log In'
    fill_in 'Email', with: 'person@example.com'
    fill_in 'Password', with: 'password'
    # fill_in 'Password confirmation', with: 'password'
    click_button 'Log in'
  # end
end

Then(/^I should be logged out$/) do
  page.should have_link 'Sign Up'
end

Given(/^I fill in "(.*?)" for "(.*?)"$/) do |word, text_box|
  fill_in text_box, with: "#{word} "
end

Given(/^I press "(.*?)"$/) do |arg1|
  fill_in 'enter-text', with: ' '
end

Then(/^"(.*?)" should display in the svg$/) do |word|
  page.should have_selector 'text', text: word
end
