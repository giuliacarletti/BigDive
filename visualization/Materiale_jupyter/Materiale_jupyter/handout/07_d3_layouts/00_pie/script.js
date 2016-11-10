var svg = d3.select('svg');

var data = d3.range(6).map(function(d){
	return Math.random()*20
});

console.log(data)

var mypie = d3.layout.pie()
				.value(function(d){
					return d;
				})
                .sort(null)






















// check the new data source
console.log(mypie(data));

var mypiearc = d3.svg.arc()
				.innerRadius(30)
				.outerRadius(100);


var colors = d3.scale.category20();

svg.append('g')
	.attr('transform', 'translate(300,300)')
	.selectAll('path')
	.data( mypie(data) )
	.enter()
    .append('path')
    .attr('d', mypiearc)
    .style('fill', function(d, i){
        return colors(i)
    });