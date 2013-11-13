class MoveMyPost < ActiveRecord::Base
  attr_accessible :content, :title
  before_save :check_title

  validates :content, presence: true, length: { maximum: 140 }
  validates :user_id, presence: true

  belongs_to :user

  private 
  	def check_title
  		if self.title.strip.length < 1
  			self.title = "Untitled"
  		else
  			self.title = self.title.chomp
  		end
  	rescue
  		self.title = "Untitled"
  	end
end
