class StudentCategory < ActiveRecord::Base
	belongs_to :student
	belongs_to :sub_category
end
