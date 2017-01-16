var width = 800
var height = 600

var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)

var width = 500,
    height = 500;

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

var ateco;

d3.csv('d3_provincia.csv', function(error, data){

    var colors = [ '#00FF00', '#7FFF00', '#FEFF00', '#FF7F00', '#FF0000'];

    var colorRange = d3.range(0, 1, 1.0 / (colors.length - 1));
    colorRange.push(1);

    //Create color gradient
    var colorScale = d3.scale.linear()
        .domain(colorRange)
        .range(colors)
        .interpolate(d3.interpolateHcl);    
        
    //Needed to map the values of the dataset to the color scale
    
    var colorInterpolate = d3.scale.linear()
        .domain([0,0.35])
        .range([0,1]);
    
    var grad = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'grad')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    grad.selectAll('stop')
      .data(colors)
      .enter()
      .append('stop')
      .style('stop-color', function(d){ return d; })
      .attr('offset', function(d,i){
        return 100 * (i / (colors.length - 1)) + '%';
      })
    

    d3.csv('d3_ateco.csv', function(error, data_ateco){
        ateco = data_ateco
        draw(data, colorScale, colorInterpolate);        
    });
        

    
});

function draw(data, scale, interpolate){
    
    d3.json("itx.json", function(error, it) {

        var projection = d3.geo.albers()
            .center([0, 41])
            .rotate([347, 0])
            .parallels([35, 45])
            .scale(2000)
            .translate([width / 2, height / 2]);

        var subunits = topojson.feature(it, it.objects.sub);

        var path = d3.geo.path()
            .projection(projection);


        // draw border with sea
        svg.append("path")
        .datum(topojson.mesh(it, it.objects.sub, function(a, b) { return a === b ; }))
        .attr("class", "border_map")
        .attr("d", path);

        // draw all the features together (no different styles)
     /*   svg.append("path")
        .datum(subunits)
        .attr("class", "map")
        .attr("d", path);
    */
        // draw and style any feature at time
        areeProvince = svg.selectAll("path")
        .data(subunits.features)
        .enter()
        .append("path")
        .attr("class",function(d) { return d.id; })
        .attr("d",path)
        .style('fill', function (d,i) { 
                            obj_find = data.find(function(obj){ return obj.provincia==d.id; })
                            return (obj_find==undefined ? scale(interpolate(0)) : scale(interpolate(obj_find.prc)))  
                        });
                
        areeProvince.on('click', function(){
            var provincia=d3.select(this)[0][0].classList.value.replace("selected","").trim()
            d3.select("svg").select("text#provincia").text(provincia)
            d3.selectAll("path").classed("selected", false);
            d3.select(this).classed("selected", true);
            

            d3.select("svg").selectAll("text.txt_ateco").text(
                function (d,i) { 
                            objs = ateco.filter(function(obj){ return obj.provincia==provincia; })
                            objs.sort(function compareNumbers(a, b) {  return b.sum - a.sum; })
                            return (objs[this.id]==undefined ? "" : objs[this.id].sum + ": " + objs[this.id].ateco)  
                        }
            );
            
        });


    });
}
