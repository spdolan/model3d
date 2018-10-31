class AddUserToThings < ActiveRecord::Migration[5.2]
  def change
    add_column :things, :user_id, :integer
  end
end
