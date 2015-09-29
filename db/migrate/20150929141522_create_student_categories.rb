class CreateStudentCategories < ActiveRecord::Migration
  def change
    create_table :student_categories do |t|
      t.integer :student_id
      t.integer :sub_category_id

      t.timestamps null: false
    end
  end
end
