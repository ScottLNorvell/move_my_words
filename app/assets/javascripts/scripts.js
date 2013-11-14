var mmw = mmw || {};

$(function() {
  // initialize SVG with placeholder text (will probably have to wrap this)
  mmw.initialize(game);

  // *** For making mmw.svg responsive ***
  // $(window).resize(function() {
  //   if (mmw.WIDTH != $('#word-block').width()) {
  //     console.log('resized!')
  //   }
  // });

  // push words into vis as they are typed
  // (either by pressing enter [13] or space [32])
  $('#enter-text').keyup(function(e) {
    if (e.keyCode == 32 || e.keyCode == 13) {
      var self = $(this);
      var word = self.val();
      if (word.trim()) {
        mmw.new_move_my_post += word
        if (e.keyCode == 13) {
          // if it's enter, we'll add a space to the word just so...
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
      type: "POST",
      dataType: "json"
    }).done(function(data) {

      if ($('.user-name').length > 0) {

        $('#move-my-post-list').prepend(data.html);

        // restart the vis with new method!
        mmw.reStart('Post Created!');

        // get rid of the modal
        $('#old-school-modal').foundation('reveal', 'close');
        $('#move-my-post-content').val('');
        $('#move_my_post_title').val('');
        mmw.new_move_my_post = "";
      } else {
        window.location.href = '/move_my_posts/' + data.post.id + '/' + mmw.game;
      }
    });
  });

  $('form.edit_user').on('submit', function(e) {
    e.preventDefault();
    var self = $(this);
    var url = self.attr('action')
    $.ajax(url,{
      data: self.serialize(),
      type: "PUT"
    }).done(function(data) {
      // this should update DOM!
      $('.user-name').html(data.name);
      $('.user-email').html(data.email);
      $('.user-bio').html(data.bio);
      $('#edit-user-modal').foundation('reveal', 'close');
      mmw.reStart('Updated!!!')
    });
  });

});

// brings in old school modal form!
function bringInForm() {
  $('#move-my-post-content').val(mmw.new_move_my_post);
  $('#old-school-modal').foundation('reveal', 'open');
}