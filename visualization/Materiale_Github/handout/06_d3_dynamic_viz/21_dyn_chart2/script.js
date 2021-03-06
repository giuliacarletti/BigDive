var data = d3.range(100).map(function(d){
    return {value:Math.random()}  
})


var lineGen = d3.svg.line()
        .x(function(d, i){
            return i * 20;  
        })
        .y(function(d, i){
            return d.value * 150;
        })
        .interpolate('basis')

d3.select('svg')
    .append('path')

function updateViz(){

    var l = Math.random()*50;

    var data = d3.range(l).map(function(d){
        return {value:Math.random()}  
    })

    d3.select('path')
        .transition()
        .duration(1000)
        .ease('bounce')
        .attr('d', lineGen(data))
        .style('fill', 'none')
        .style('stroke', 'blue')
        .style('stroke-width', 3)
}

updateViz()

d3.select('svg')
    .on('click', function(){
        updateViz()
})