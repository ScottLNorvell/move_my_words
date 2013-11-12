require 'spec_helper'

describe User do

	before do
  	@user = User.new(name: "Example User", email: "mrfunnyman@example.com",
  		password: "foobarial", password_confirmation: "foobarial", bio: "I am really great and wonderful!" ) 

  end

  subject { @user } 

  it { should respond_to :name }
  it { should respond_to :bio }
  it { should respond_to :email }
  it { should respond_to :password }
  it { should respond_to :password_confirmation }

  it { should be_valid } 

end
