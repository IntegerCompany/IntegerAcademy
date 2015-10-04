ActiveAdmin.register Student do

config.clear_action_items!
actions :all, :except => [:new]
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if resource.something?
#   permitted
# end

  index do
    selectable_column
    id_column
    column :first_name
    column :last_name
    column :email
    column :phone_number
    #column :skype
    column :created_at
    actions
  end

  show :title => proc{|student| student.first_name + ' ' + student.last_name } do
    # renders app/views/admin/posts/_some_partial.html.erb
    render 'details'
  end


end
