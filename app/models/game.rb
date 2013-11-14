class Game < ActiveRecord::Base
  attr_accessible :instructions, :name, :slug
end
