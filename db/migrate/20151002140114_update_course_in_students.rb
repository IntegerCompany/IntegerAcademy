class UpdateCourseInStudents < ActiveRecord::Migration
  def self.up
    change_table :students do |t|
      t.change :course, :string
    end
  end
  def self.down
    change_table :students do |t|
      t.change :course, :integer
    end
  end
end
