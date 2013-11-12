var w = 960,
    h = 400,
    nodes = [],
    node;
 
var svg = d3.select("#word-block").append("svg")
    .attr("width", w)
    .attr("height", h);
 
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
  pushNode('Enter Some Text!', 'y')

  $('#ti').keyup(function(e) {
    // console.log("keyCode = ", e.keyCode)
    if (e.keyCode == 32 || e.keyCode == 13) {
      var self = $(this);
      pushNode(self.val().trim());
      self.val('');
    }
  });

})


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
