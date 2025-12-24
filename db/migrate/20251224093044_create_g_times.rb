class CreateGTimes < ActiveRecord::Migration[8.1]
  def change
    create_table :g_times do |t|
      t.timestamps
    end
  end
end
