class CreateMoveMyPosts < ActiveRecord::Migration
  def change
    create_table :move_my_posts do |t|
      t.string :title
      t.text :content
      t.integer :user_id

      t.timestamps
    end
  end
end
