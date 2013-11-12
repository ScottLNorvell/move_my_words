FactoryGirl.define do
	factory :user do
		sequence(:name) { |n| "Person #{n}" }
		sequence(:email) { |n| "person_#{n}@example.com"}
		bio Faker::Lorem.sentence(5)


		password "foobarial"
		password_confirmation "foobarial"

	end

	factory :move_my_post do
		title "Move This Post"
		content Faker::Lorem.sentence(5)
		user
	end
end