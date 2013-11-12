module ApplicationHelper
	def full_title(page_title)
		# Returns the full title on a per-page basis
	  base_title = "Move My Words"
	  if page_title.empty?
	  	base_title
	  else
	  	"#{base_title} | #{page_title}"
	  end
	end	
end
