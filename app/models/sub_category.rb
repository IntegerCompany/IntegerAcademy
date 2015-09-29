class SubCategory < ActiveRecord::Base
  belongs_to :category
  has_many :students, through: :student_categories
end
