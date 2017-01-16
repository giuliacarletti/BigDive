
var rectBarraComandiLarghezza= 150
var xBarraComandi = 50 
var yBarrraComandi = 400

var txtPrimoCom="default observed"
var txtSecondoCom="default predicted"
var txtTerzoCom="default delta"

var width = 900
var height = 450

d3.select("svg")
    .attr("width", width)
    .attr("height", height)

// primo bottone
var groupPrimoCom = d3.select('svg').append('g')
        .attr('transform','translate ('+rectBarraComandiLarghezza+', 0)')

var rectPrimoCom = groupPrimoCom
    .append('rect')
    .attr('fill','gray')
    .attr('width', rectBarraComandiLarghezza)
    .attr('height', 30)
    .attr('x', rectBarraComandiLarghezza/2*-1)
    .attr('y', yBarrraComandi)

var textPrimoCom = groupPrimoCom
    .append('text')
    .text(txtPrimoCom)
    .attr('text-anchor', 'middle')
    .style('color', 'white')
    .attr('height', 20)
    //.attr('x', xBarraComandi+ 5)
    .attr('y', yBarrraComandi+20)
    
// secondo bottone
var groupSecondoCom = d3.select('svg').append('g')
    .attr('transform','translate ('+rectBarraComandiLarghezza*2 +', 0)')

var rectSecondoCom = groupSecondoCom
    .append('rect')
    .attr('fill','gray')
    .attr('width', rectBarraComandiLarghezza )
    .attr('height', 30)
    .attr('x', rectBarraComandiLarghezza/2*-1+10)
    .attr('y', yBarrraComandi)

var textSecondoCom = groupSecondoCom
    .append('text')
    .text(txtSecondoCom)
    .attr('text-anchor', 'middle')
    .style('color', 'white')
    .attr('height', '20')
    //.attr('x', xBarraComandi+ 5)
    .attr('y', yBarrraComandi+20)
    
// terzo bottone
var groupTerzoCom = d3.select('svg').append('g')
    .attr('transform','translate ('+rectBarraComandiLarghezza*3 +', 0)')

var rectTerzoCom = groupTerzoCom
    .append('rect')
    .attr('fill','gray')
    .attr('width', rectBarraComandiLarghezza )
    .attr('height', 30)
    .attr('x', rectBarraComandiLarghezza/2*-1+20)
    .attr('y', yBarrraComandi)

var textTerzoCom = groupTerzoCom
    .append('text')
    .text(txtTerzoCom)
    .attr('text-anchor', 'middle')
    .style('color', 'white')
    .attr('height', '20')
    //.attr('x', xBarraComandi+ 5)
    .attr('y', yBarrraComandi+20)


// LABEL
var txtLabel="label by prov"
var groupLabel = d3.select('svg').append('g')
        .attr('transform','translate ('+rectBarraComandiLarghezza*4+', 0)')
        

var rectLabel = groupLabel
    .append('rect')
    .attr('fill','yellow')
    .attr('width', rectBarraComandiLarghezza*2)
    .attr('height', 30)
    .attr('x', rectBarraComandiLarghezza/2*-1+50)
    .attr('y', yBarrraComandi)

var textLabel = groupLabel
    .append('text')
    .text(txtLabel)
    .attr('id', 'labelProvRate')
    //.attr('text-anchor', 'middle')
    .style('color', 'white')
    .attr('height', 20)
    //.attr('x', xBarraComandi+ 5)
    .attr('y', yBarrraComandi+20)



function draw(defaultRateFile, color, pos) {
    
    var svg = d3.select("svg");

    var path = d3.geo.path()
        .projection(null);

    var default_rate_map = d3.map();

    d3.queue()
        .defer(d3.json, "itx.json")
        //.defer(d3.csv, "default_rate_by_prov.csv", function(d) { default_rate_map.set(d.id, +d.rate); })
        .defer(d3.csv, defaultRateFile, function(d) { default_rate_map.set(d.id, +d.rate); })
        .await(ready);

    
    function ready(error, it) {

        if (error) throw error;

        var projection = d3.geo.albers()
            .center([0, 41])
            .rotate([347, 0])
            .parallels([35, 45])
            .scale(1800)
            .translate([170, 220]);
            //.translate([width / 2, height / 2]);


        var path = d3.geo.path()
            .projection(projection);


        var prov = topojson.feature(it, it.objects.sub).features;

        console.log(prov)
        console.log(default_rate_map);

        var provMap = svg.append("g")
            .attr("transform", 'translate('+pos+',0)')
            .attr("class", "sub")
            .selectAll("path")
            .data(prov)
            .enter().append("path")
            .style("fill", function(d) { return color(d.rate = default_rate_map.get(d.id)); })
            .attr("d", path);
        
        provMap.on('mouseenter', function(d,i){d3.select("svg").select("#labelProvRate")
                                            .text(d.id + " [ " + d.rate + " ] ")
                                      });

    
    };

}; 

//var color = d3.scale.log()
//    //.range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
//    .range(["hsl(100 ,100%,90%)", "hsl(150 ,40%,50%)"])
//    //.interpolate(d3.interpolateHcl);
//    .interpolate(d3.interpolateHsl);

//var color_delta = d3.scale.log()
//    //.range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
//    .range(["hsl(300 ,100%,90%)", "hsl(350 ,40%,50%)"])
//    //.interpolate(d3.interpolateHcl);
//    .interpolate(d3.interpolateHsl);

var color = d3.scale.linear()
    .domain([0,50])
    .range(["lightblue", "blue"])
var color_delta = d3.scale.linear()
    .domain([-20,50])
    .range(["green", "red"])

rectPrimoCom.on('click',function(){draw("default_rate_by_prov-observed.csv", color,-10);})
rectSecondoCom.on('click',function(){draw("default_rate_by_prov-predicted.csv", color, 290);})
rectTerzoCom.on('click',function(){draw("default_rate_by_prov-delta.csv", color_delta, 590);})    
