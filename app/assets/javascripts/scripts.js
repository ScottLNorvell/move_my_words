var mmw = mmw || {};

mmw.move_my_post = "";
mmw.nodes = mmw.nodes || [];

// hard-coding w and height! We'll do this programmatically moving forward!
mmw.WIDTH = $('#word-block').width();
mmw.HEIGHT =  mmw.WIDTH * 5/12;
 
mmw.svg = d3.select("#word-block").append("svg")
    .attr("width", mmw.WIDTH)
    .attr("height", mmw.HEIGHT);
 
mmw.force = d3.layout.force()
    .charge(-30)
    .nodes(mmw.nodes)
    .links([])
    .size([mmw.WIDTH, mmw.HEIGHT]);

mmw.force.on("tick", function(e) {
  mmw.svg.selectAll("text")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});

mmw.drag = mmw.force.drag()
    .on("dragstart", mmw.dragstart);

$(function() {
  // initialize SVG with placeholder text (will probably have to wrap this)
  mmw.pushNode(placeholder_text, 'y')

  // push words into vis as they are typed
  // (either by pressing enter [13] or space [32])
  $('#enter-text').keyup(function(e) {
    // console.log("e.keyCode = ", e.keyCode)
    if (e.keyCode == 32 || e.keyCode == 13) {
      var self = $(this);
      var word = self.val();
      if (word.trim()) {
        // console.log('adding ' + word)
        mmw.move_my_post += word
        if (e.keyCode == 13) {
          mmw.move_my_post += " "
        }
        mmw.pushNode(word.trim());
        self.val('');
      }      
    }
  });

  $('#save-button').on('click', function() {
    if (!user_signed_in) {
      $('#signup-modal').foundation('reveal', 'open');
      localStorage.setItem('move_my_post', mmw.move_my_post);
    } else {
      // save the blog post!
      bringInForm();
    }
  });

  $('#old-school-button').on('click', function() {
    if (!user_signed_in) {
      $('#signup-modal').foundation('reveal', 'open');
      localStorage.setItem('move_my_post', mmw.move_my_post);
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
      console.log(data);
    });
    $('#old-school-modal').foundation('reveal', 'close');
  })

})

function bringInForm() {
  $('#move-my-post-content').val(move_my_post);
  $('#old-school-modal').foundation('reveal', 'open');
}

mmw.pushNode = function(name, placeholder) {

  // remove placeholder if it exists!
  if (mmw.nodes[0] && mmw.nodes[0].placeholder == 'y') {
    mmw.nodes.shift()
  }

  mmw.nodes.push({
    name: name,
    color: "steelblue",
    placeholder: placeholder || 'n'
  });
  
  // *** MAKE TEXT and object var! ***
  var text = mmw.svg.selectAll('text')
      .data(mmw.force.nodes(), function(d) { return d.index } );

  text.enter().append("text")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .text(function(d) { return d.name; })
      .style("font-size", "30px")
      .style("fill", "steelblue")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("cursor", "pointer")
      .attr("id", function(d,i) { return "text-" + i; })
      .attr("text-anchor", "middle")
      .on('dblclick', function(d,i) { mmw.unFix(d,i); })
      .call(mmw.drag)
  
  text.exit().remove()

   // Restart the layout.
  mmw.force.start();
 
}

mmw.dragstart = function(d) {
  d.fixed = true;
  d3.select(this).style("fill", "red");
}

mmw.unFix = function(d,i) {
  d.fixed = false;
  d3.select("#text-" + i).style("fill", d.color)
  force.start();
}

mmw.getWidth = function(d,i) {
  return d3.select("#text-" + i).node().getBBox();
}
