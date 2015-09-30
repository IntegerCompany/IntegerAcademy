class UpdatePhoneStudents < ActiveRecord::Migration
  	
  	def up
    remove_column :students, :phone_number
  end
 
  def down
    add_column :students, :phone_number, :integer
  end
end
