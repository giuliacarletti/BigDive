

var w = 600;
var h = 600;
		
// select the svg container
var svg = d3.select('svg')
			.attr('width', w)
			.attr('height', h)




var crd = d3.svg.chord()	
		.radius(150)



var data = []

for(var i=0; i<10; ++i){

    var a = (Math.PI*2)/10 * i //Math.random() * (Math.PI*2);
    var b = .01;

    var c = Math.random() * (Math.PI*2);
    var d = Math.random() * .5;

    data.push( {
        key: 'aa'+i,
        source:{
            startAngle:a-b, endAngle:a+b
        }, 
        target:{
            startAngle:c-d, endAngle:c+d
        }
    } );
}





var cols = d3.scale.category20()

var g = svg.append('g')
	.attr('transform', 'translate(300,300)')
	.selectAll('path')
	.data(data, function(d){
		return d.key
	})
	.enter()
	.append('path')
	.attr('d', crd)
	.style('fill', function(d, i){
		return cols(i)
	})
	.style('stroke', 'none')	


