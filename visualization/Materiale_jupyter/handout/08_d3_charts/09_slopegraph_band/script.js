
var svg = d3.select('svg');

var data = [
  {a:40, b:190, da:2, db:10}
]



function addExtra(d){
    d.pts = (d.pts) ? d.pts : [];
  d.pts[0] = {x:0, y:d.a, delta:d.da};
    d.pts[1] = {x:50, y:d.a, delta:d.da};
    d.pts[2] = {x:150, y:d.b, delta:d.db};
    d.pts[3] = {x:200, y:d.b, delta:d.db};
}

data.forEach(function(d){
  addExtra(d);
});




var mapy = d3.scale.linear()
    .domain([0, 220])
    .range([20, 300])

var leftGr = svg.append('g')
  .attr('transform', 'translate(20,0)')





var rightGr = svg.append('g')
  .attr('transform', 'translate(220,0)')


var lineGr = svg.append('g')
    .attr('transform', 'translate(20,0)')


var path = d3.svg.area()
        .x(function(d){
          return d.x;
        })
        .y0(function(d){
          return mapy(d.y)-d.delta;
        })
        .y1(function(d){
          return mapy(d.y)+d.delta;
        })
        //.interpolate('basis');




function update(){
  console.log('update');

  var left = leftGr.selectAll('rect')
  .data(data)

  left.enter()
    .append('rect')
    .attr('width', 2)
    
    .style('opacity', 0)
  
  left.transition().duration(1500)
    .delay(function(d, i){
      return 100*i;
    })
    .attr('y', function(d, i){
      return mapy(d.a) - d.da
    })
    .attr('height', function(d){
      return d.da*2;
    })
    .style('opacity', 1)



var right = rightGr.selectAll('rect')
  .data(data)

right.enter()
  .append('rect')
  .attr('width', 2)
  .style('opacity', 0)

right.transition().duration(1500)
  .delay(function(d, i){
      return 100*i;
    })
  .attr('y', function(d, i){
      return mapy(d.b) - d.db
    })
   .attr('height', function(d){
      return d.db*2;
    })
  .style('opacity', 1)




var lines = lineGr.selectAll('path')
  .data(data)

var lineEnter = lines.enter()
  .append('path')
  .style('opacity', 0)

lineEnter.on('mouseenter', function(){
    d3.select(this)
      .style('opacity', 1)
  })
.on('mouseleave', function(){
    d3.select(this)
      .style('opacity', .1)
  })


lines
  .transition().duration(1500)
  .delay(function(d, i){
      return 100*i;
    })
  .attr('d', function(d){
    return path(d.pts)
  })
  .style('stroke', 'none')
  .style('fill', 'orange')
  .style('opacity', .1)



}





update();


svg.on('click', function(){
  
  data.forEach(function(d){
    d.a = Math.random()*200;
    d.b = Math.random()*200;
    d.da = Math.random()*20;
    d.db = Math.random()*20;
    addExtra(d);
  })
  
  var d = {a:Math.random()*200, b:Math.random()*200, da:Math.random()*20, db:Math.random()*20};
  data.push(d);
  addExtra(d);
  
    
  update();
})