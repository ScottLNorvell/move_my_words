# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Game.delete_all 

Game.create [{name: "Fridge Magnets", 
							slug: "fridge_magnets", 
							# FIX THIS!
							instructions: "Oh no! The post got all mixed up! Try to put everything back in order, or better yet, make a new message! Drag and drop a word to move it. Double click a word to return it to it's original mixed-up place! Tap/click on the box to agitate the loose words."},
						 {name: "Web Words", 
						 	slug: "web_words", 
						 	# FIX THIS!
						 	instructions: "Oh no! The post got all mixed up! Try to put everything back in order, or better yet, make a new message! Moving the text makes an exciting web pattern. Drag and drop a word to move it. Double click a word to return it to it's original mixed-up place! Tap/click on the box to agitate the loose words."}]