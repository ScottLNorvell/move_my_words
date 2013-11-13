class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name, :bio
  # attr_accessible :title, :body

  has_many :move_my_posts, dependent: :destroy
  before_save :name_from_email

  private 
  	def name_from_email
  		self.name ||= email.split("@").first
  	end
end
