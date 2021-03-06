
var w = 600;
var h = 600;
		
// select the svg container
var svg = d3.select('svg')
			.attr('width', w)
			.attr('height', h)

// create the projection system
// mercator
// orthographic
// stereographic 
// equirectangular
var proj = d3.geo.mercator()
			.scale( (w + 1) / 2 / Math.PI )
			.translate( [w / 2, h / 2] )
			
			

	
// points on space
var points = []
for(var lon=-170; lon<180; lon+=10){
	for(var lat=-80; lat<90; lat+=10){
		points.push([lon, lat])
	}
} 

// plot the points
svg.selectAll('circle')
	.data(points)
	.enter()
	.append('circle')
	.attr('r', 2)
	.attr('cx', function(d){
		return proj(d)[0]
	})
	.attr('cy', function(d){
		return proj(d)[1]
	})
	.style('fill', '#f00')
	.style('stroke', 'none')