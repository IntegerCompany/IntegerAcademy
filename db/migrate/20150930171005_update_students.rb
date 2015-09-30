class UpdateStudents < ActiveRecord::Migration
  def up
    remove_column :students, :phone_number
  end
 
  def down
    add_column :students, :phone_number, :string
  end

  def change
    add_column :students, :portfolio, :string
    add_column :students, :photo, :string
  end
end
