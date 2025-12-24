class AddTimeFieldToGtime < ActiveRecord::Migration[8.1]
  def change
    add_column :g_times, :start_at, :time
    add_column :g_times, :end_at, :time
  end
end
