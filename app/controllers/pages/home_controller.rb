class Pages::HomeController < ApplicationController
	def index
		@cats = Category.all
		@student = Student.new
		#@student.student_categories = StudentCategory.new
	end

	def create
		redirect_to root_url
	end

	private
	def student_params
		#params.require(:student).permit(:name, :age, pets_attributes: [ :name, :category ])
	end
end
