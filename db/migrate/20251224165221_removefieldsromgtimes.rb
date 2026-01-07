class Removefieldsromgtimes < ActiveRecord::Migration[8.1]
  def change
    remove_column :g_times, :start_at, :time
    remove_column :g_times, :end_at, :time
  end
end
