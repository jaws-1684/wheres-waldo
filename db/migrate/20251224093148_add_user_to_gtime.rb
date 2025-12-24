class AddUserToGtime < ActiveRecord::Migration[8.1]
  def change
    add_reference :g_times, :user, null: false, foreign_key: true
  end
end
