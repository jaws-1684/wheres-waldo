module ApplicationHelper
	def page_name
		params[:controller].capitalize
	end
end
