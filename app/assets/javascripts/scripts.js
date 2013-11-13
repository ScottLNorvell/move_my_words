var mmw = mmw || {};

$(function() {
  // initialize SVG with placeholder text (will probably have to wrap this)
  mmw.initialize(game);
  // mmw[game]();

  $(window).resize(function() {
    if (mmw.WIDTH != $('#word-block').width()) {
      console.log('resized!')
    }
  });

  // push words into vis as they are typed
  // (either by pressing enter [13] or space [32])
  $('#enter-text').keyup(function(e) {
    // console.log("e.keyCode = ", e.keyCode)
    if (e.keyCode == 32 || e.keyCode == 13) {
      var self = $(this);
      var word = self.val();
      if (word.trim()) {
        // console.log('adding ' + word)
        mmw.new_move_my_post += word
        if (e.keyCode == 13) {
          mmw.new_move_my_post += " "
        }
        mmw.pushNode(word.trim());
        self.val('');
      }      
    }
  });

  $('#save-button').on('click', function() {
    if (!user_signed_in) {
      $('#signup-modal').foundation('reveal', 'open');
      localStorage.setItem('new_move_my_post', mmw.new_move_my_post);
    } else {
      // save the blog post!
      bringInForm();
    }
  });

  $('#old-school-button').on('click', function() {
    if (!user_signed_in) {
      $('#signup-modal').foundation('reveal', 'open');
      localStorage.setItem('new_move_my_post', mmw.new_move_my_post);
    } else {
      // drop down form for post with
      bringInForm(); 
    }
  });

  $('#new_move_my_post').on('submit', function(e) {
    e.preventDefault();
    var self = $(this);
    $.ajax("/move_my_posts",{
      data: self.serialize(),
      type: "POST"
    }).done(function(data) {
      // this should update DOM!
      mmw.reStart('YOU DID IT!!!')
    });
    $('#old-school-modal').foundation('reveal', 'close');
  })

})

// brings in old school modal form!
function bringInForm() {
  $('#move-my-post-content').val(mmw.new_move_my_post);
  $('#old-school-modal').foundation('reveal', 'open');
}