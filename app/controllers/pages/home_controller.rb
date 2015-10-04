class Pages::HomeController < ApplicationController
	def index
		@cats = Category.all
		@student = Student.new
		@student.student_categories.build
	end

	def create
		@student = Student.new(student_params)
		@student.student_categories.build
		@student.save
		@student.save_photo(student_files_params[:photo]) if !student_files_params[:photo].blank? 
		@student.save_portfolio(student_files_params[:portfolio]) if !student_files_params[:portfolio].blank? 

		redirect_to root_url
	end

	private
	def student_params
		params.require(:student).permit(:first_name, :last_name, 
			:birth_day, :email, 
			:english_level, :university, 
			:faculty, :course, :field_of_study, 
			:about_me, :phone_number,
			student_categories_attributes: [:sub_category_id, :student_id])
	end

	def student_files_params
		params.require(:student).permit(:portfolio, :photo)
	end
end