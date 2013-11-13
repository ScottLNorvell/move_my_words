var mmw = mmw || {};

mmw.new_move_my_post = "";
mmw.placeholder = placeholder_text;
mmw.move_my_post = move_my_post;
mmw.nodes = mmw.nodes || [];

// Set basic params!
mmw.initialize = function(game) {
  this.game = game;
  this.WIDTH = $('#word-block').width();
  this.HEIGHT =  mmw.WIDTH * 5/12;
   
  this.svg = d3.select("#word-block").append("svg")
      .attr("width", mmw.WIDTH)
      .attr("height", mmw.HEIGHT);

  mmw[this.game]() 
}

mmw.template = function() {
  this.makeStandardForce(); 
  mmw.svg.on('mousedown', mmw.mouseDownAgitation);
  mmw.pushNode(mmw.placeholder, 'y');  
  // also add stuff relating to the model!
}

// 
mmw.fridge_magnets = function() {
  this.makeStandardForce(); 
  mmw.svg.on('mousedown', mmw.mouseDownAgitation);
  setTimeout(function() {
    mmw.animateMessage(mmw.move_my_post);
  }, 100);
  // also add stuff relating to the model!
}

mmw.web_words = function() {
  this.makeWebForce();
  mmw.svg.on('mousedown', mmw.mouseDownAgitation);
  this.makeLinks = makeLinks;
  setTimeout(function() {
    mmw.animateMessage(mmw.move_my_post);
  }, 100);
}

mmw.reStart = function(new_placeholder, game) {
  // remove all of the text elements!
  mmw.svg.selectAll('text').remove();
  // remove all of the links (if any)
  mmw.svg.selectAll('.link').remove();
  // remove the svg!
  mmw.svg.remove();
  // clear out the nodes!
  mmw.nodes = [];
  // reset placeholder if applicable
  if (new_placeholder) {
    mmw.placeholder = new_placeholder;
  }
  // reset game if applicable
  if (!game) {
    game = mmw.game
  }
  // draw the vis again!
  mmw.initialize(game);
}

// sets the force for MOST of the games
mmw.makeStandardForce = function() {
  this.links = 
  this.force = d3.layout.force()
    .charge(-30)
    .nodes(mmw.nodes)
    .links([])
    .size([mmw.WIDTH, mmw.HEIGHT]);

  mmw.force.on("tick", function(e) {
    mmw.svg.selectAll("text")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });

  this.dragstart = function(d) {
    d.fixed = true;
    d3.select(this).style("fill", "red");
  }

  this.drag = mmw.force.drag()
      .on("dragstart", mmw.dragstart);
} 

mmw.makeWebForce = function() {
  this.force = d3.layout.force()
    .charge(-30)
    .nodes([])
    .links([])
    .size([mmw.WIDTH, mmw.HEIGHT]);

  this.links = mmw.force.links();
  this.nodes = mmw.force.nodes();

  mmw.force.on("tick", function(e) {
    mmw.svg.selectAll("text")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    mmw.svg.selectAll('.link')
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    // this code seams to divide the group into 4 quadrants
    var k = 6 * e.alpha;
    mmw.nodes.forEach(function(o, i) {
      o.y += i & 1 ? k : -k;
      o.x += i & 2 ? k : -k;
    });
  });

  this.dragstart = function(d) {
    d.fixed = true;
    d3.select(this).style("fill", "red");
  }

  this.drag = mmw.force.drag()
      .on("dragstart", mmw.dragstart);

  
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

  if (mmw.makeLinks) {
    mmw.links = mmw.makeLinks();
    mmw.updateLinks();
  }

  // Update the text
  mmw.updateText();

   // Restart the layout.
  mmw.force.start();
 
}

// updates the text based after we have pushed a node!
mmw.updateText = function() {

  // Select all text elements and append them with the new data
  var text = mmw.svg.selectAll('text')
      .data(mmw.force.nodes(), function(d) { return d.index } );

  // updates the text programatically!
  text.enter().append("text")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .text(function(d) { return d.name; })
      // *** Could move most of this to stylesheet! *** 
      // .style("font-size", "30px")
      // .style("fill", "steelblue")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("cursor", "pointer")
      // Sets ID param
      .attr("id", function(d,i) { return "text-" + i; })
      // make sure text is anchored in the middle of node
      .attr("text-anchor", "middle")
      // Set events on text! *** Could move to indiv game functions ***
      .on('dblclick', function(d,i) { mmw.unFix(d,i); })
      .call(mmw.drag)
  
  text.exit().remove()
}

mmw.updateLinks = function() {
  var link = mmw.svg.selectAll('.link')
      .data(mmw.links, function(d) { return d.id })
    .enter().append("line")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; })
      .attr("class", "link");
}



// takes the node out of fixed position
mmw.unFix = function(d,i) {
  d.fixed = false;
  d3.select("#text-" + i).style("fill", d.color)
  mmw.force.start();
}

// gets the width of the text element!
mmw.getWidth = function(d,i) {
  return d3.select("#text-" + i).node().getBBox();
}

// Randomly agitates nodes in a random direction!
mmw.mouseDownAgitation = function() {
  mmw.nodes.forEach(function(o, i) {
    o.x += (Math.random() - .5) * 40;
    o.y += (Math.random() - .5) * 40;
  });
  mmw.force.resume();
}

// makes the links for web words!
makeLinks = function() {
  var links = [],
      length = mmw.nodes.length,
      width = Math.ceil(Math.sqrt(length)),
      max_size = width * width,
      last_row_idx = mmw.lastRow(length, width);
  var link_id = 0;

  mmw.nodes.forEach(function(node) {
    var i = node.index; 
    
    if ((i + 1) % width != 0 && i + 1 < length) {
      links.push({source: node, 
                  target: mmw.nodes[i + 1],
                  distance: 30, 
                  id: link_id})
      link_id++
    }

    if (i + width < length) {
      links.push({source: node, 
                  target: mmw.nodes[i + width], 
                  distance: 30,
                  id: link_id})
      link_id++
    } else if (i < last_row_idx) {
      links.push({source: node, 
                  target: mmw.nodes[length - 1],
                  distance: 30, 
                  id: link_id})
      link_id++
    }
  })

  return links
}


mmw.lastRow = function(length, width) {
  // var width = Math.ceil(Math.sqrt(length));
  var orphan_length = length % width; 
  if (orphan_length == 0) {
    return 0
  } else {
    return length - orphan_length;
  }
}

mmw.animateMessage = function(message) {
  var timer;
  var mess_nodes = message.trim().split(" ")
  var limit = mess_nodes.length;
  var i = 0;

  timer = setInterval(function() {
    mmw.pushNode(mess_nodes[i])
    i++
    if (i >= limit) {
      clearInterval(timer);
    }
  }, 200)


}