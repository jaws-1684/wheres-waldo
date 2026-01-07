class AddUserTimeFieldToGTime < ActiveRecord::Migration[8.1]
  def change
    add_column :g_times, :user_time, :string
  end
end
