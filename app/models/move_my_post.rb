class MoveMyPost < ActiveRecord::Base
  attr_accessible :content, :title

  validates :content, presence: true, length: { maximum: 140 }
  validates :user_id, presence: true

  belongs_to :user
end
