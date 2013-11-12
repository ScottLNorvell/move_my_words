require 'spec_helper'

describe MoveMyPost do
  let(:user) { FactoryGirl.create :user } 
  before { @move_my_post = user.move_my_posts.create title: "My Title", content: "This is a sweet title!" }

  subject { @move_my_post } 

  it { should respond_to :content } 
  it { should respond_to :title }

  it { should be_valid }  

end
