var mmw = mmw || {};

mmw.move_my_post = ""

// hard-coding w and height! We'll do this programmatically moving forward!
mmw.WIDTH = $('#word-block').width();
mmw.HEIGHT =  mmw.WIDTH * 5/12;
mmw.nodes = [];
 
mmw.svg = d3.select("#word-block").append("svg")
    .attr("width", mmw.WIDTH)
    .attr("height", mmw.HEIGHT);
 
// var text = svg.selectAll("text");

var force = d3.layout.force()
    .charge(-30)
    .nodes(nodes)
    .links([])
    .size([w, h]);
 
force.on("tick", function(e) {
  svg.selectAll("text")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});

var drag = force.drag()
    .on("dragstart", dragstart);

$(function() {
  // initialize SVG with placeholder text (will probably have to wrap this)
  pushNode(placeholder_text, 'y')

  // push words into vis as they are typed(either)
  $('#enter-text').keyup(function(e) {
    console.log("e.keyCode = ", e.keyCode)
    if (e.keyCode == 32 || e.keyCode == 13) {
      var self = $(this);
      var word = self.val();
      if (word.trim()) {
        console.log('adding ' + word)
        move_my_post += word
        if (e.keyCode == 13) {
          move_my_post += " "
        }
        pushNode(word.trim());
        self.val('');
      }      
    }
  });

  $('#save-button').on('click', function() {
    if (!user_signed_in) {
      $('#signup-modal').foundation('reveal', 'open');
      localStorage.setItem('move_my_post', move_my_post);
    } else {
      // save the blog post!
      bringInForm();
    }
  });

  $('#old-school-button').on('click', function() {
    if (!user_signed_in) {
      $('#signup-modal').foundation('reveal', 'open');
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
      console.log(data);
    });
    $('#old-school-modal').foundation('reveal', 'close');
  })

})

function bringInForm() {
  $('#move-my-post-content').val(move_my_post);
  $('#old-school-modal').foundation('reveal', 'open');
}

function pushNode(name, placeholder) {

  // remove placeholder if it exists!
  if (nodes[0] && nodes[0].placeholder == 'y') {
    // console.log('shifting!')
    nodes.shift()
  }

  nodes.push({
    name: name,
    color: "steelblue",
    placeholder: placeholder || 'n'
  });
   
  var text = svg.selectAll('text')
      .data(force.nodes(), function(d) { return d.index } );

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
      .on('click', function(d,i) { console.log("width = ", getWidth(d,i)); })
      .on('dblclick', function(d,i) { unFix(d,i); })
      .call(drag)
  
  text.exit().remove()

   // Restart the layout.
  force.start();
 
}//, 1000);

function dragstart(d) {
  d.fixed = true;
  d3.select(this).style("fill", "red");
}

function unFix(d,i) {
  console.log(d);
  d.fixed = false;
  d3.select("#text-" + i).style("fill", d.color)
  force.start();
}

function getWidth(d,i) {
  return d3.select("#text-" + i).node().getBBox();
}
