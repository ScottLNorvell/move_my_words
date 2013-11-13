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

	def name_or_email(user)
		user.name || user.email.split("@").first
	end

	def title_or_not(move_my_post)
		move_my_post.title || "Untitled"
		
	end

end
