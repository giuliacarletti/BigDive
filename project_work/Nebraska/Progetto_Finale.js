var dsv = d3.dsv(";")

    // NORD

    dsv('Progetto_finale_Nord.csv', function (data) {
        console.log(data)


        var Myscale = d3.scale.linear()
            .domain([0, 100])
            .range([0, 300])

        var Myscale2 = d3.scale.linear()
            .domain([100, 0])
            .range([0, 300])
        
        var colors = d3.scale.category10()
        
        
       
                         

        
        d3.select('#nord')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', 100)
            .attr('fill', function(d, i){
                return colors(i)
            })

        .attr('height', function (d, i) {
                return Myscale(d.TD)

            })
            .attr('y', function (d, i) {
                return 350 - (Myscale(d.TD))

            })

        .attr('x', function (d, i) {
            return 200 + i * 101

        })

        
                  
        
        
        


        var ayg = d3.select('#nord')
            .append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(40,50)')





        //metto l'asse y
        var ay = d3.svg.axis()
            .orient('right')
            .scale(Myscale2)

        ayg.transition()
            .call(ay)






        d3.select('#nord')
            .append('g')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function (d, i) {
                return d.Etichette
            })
            .style('font-size', 10)

        .attr('y', function (d, i) {
            return 380

        })
         .attr('x', function (d, i) {
            return 200 + i * 101
        })

        
        d3.select('#nord')
            .append('g')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function (d, i) {
                return d.TD
            })
            .style('text-anchor', 'middle')
            .style('font-size', 15)

        .attr('y', function (d, i) {
            return 280

        })
         .attr('x', function (d, i) {
            return 200 + 50 + i * 101
        })

    })
    

    
    
    
    
    
    
    

    var dsv = d3.dsv(";")

    // CENTRO

    dsv('Progetto_finale_Centro.csv', function (data) {
        console.log(data)


        var Myscale = d3.scale.linear()
            .domain([0, 100])
            .range([0, 300])

        var Myscale2 = d3.scale.linear()
            .domain([100, 0])
            .range([0, 300])

        
         var colors = d3.scale.category10()
         
         
        d3.select('#centro')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', 100)
            .attr('fill', function(d, i){
                return colors(i)
        })

        .attr('height', function (d, i) {
                return Myscale(d.TD)

            })
            .attr('y', function (d, i) {
                return 350 - (Myscale(d.TD))

            })

        .attr('x', function (d, i) {
            return 200 + i * 101

        })




        var ayg = d3.select('#centro')
            .append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(40,50)')





        //metto l'asse y
        var ay = d3.svg.axis()
            .orient('right')
            .scale(Myscale2)

        ayg.transition()
            .call(ay)






        d3.select('#centro')
            .append('g')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function (d, i) {
                return d.Etichette
            })
            .style('font-size', 10)

        .attr('y', function (d, i) {
            return 380



        })




        .attr('x', function (d, i) {
            return 200 + i * 101
        })


 d3.select('#centro')
            .append('g')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function (d, i) {
                return d.TD
            })
            .style('text-anchor', 'middle')
            .style('font-size', 15)

        .attr('y', function (d, i) {
            return 280

        })
         .attr('x', function (d, i) {
            return 200 + 50 + i * 101
        })





    })

       
        
        
        
        
        
       
        
     // SUD

    dsv('Progetto_finale_Sud.csv', function (data) {
        console.log(data)


        var Myscale = d3.scale.linear()
            .domain([0, 100])
            .range([0, 300])

        var Myscale2 = d3.scale.linear()
            .domain([100, 0])
            .range([0, 300])

        
            var colors = d3.scale.category10()
        
    
        d3.select('#sud')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', 100)
            .attr('fill', function(d, i){
                return colors(i)
        })            

        
        

        .attr('height', function (d, i) {
                return Myscale(d.TD)

            })
            .attr('y', function (d, i) {
                return 350 - (Myscale(d.TD))

            })

        .attr('x', function (d, i) {
            return 200 + i * 101

        })




        var ayg = d3.select('#sud')
            .append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(40,50)')





        //metto l'asse y
        var ay = d3.svg.axis()
            .orient('right')
            .scale(Myscale2)

        ayg.transition()
            .call(ay)






        d3.select('#sud')
            .append('g')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function (d, i) {
                return d.Etichette
            })
            .style('font-size', 10)

        .attr('y', function (d, i) {
            return 380



        })




        .attr('x', function (d, i) {
            return 200 + i * 101
        })


 d3.select('#sud')
            .append('g')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function (d, i) {
                return d.TD
            })
            .style('text-anchor', 'middle')
            .style('font-size', 15)

        .attr('y', function (d, i) {
            return 280

        })
         .attr('x', function (d, i) {
            return 200 + 50 + i * 101
        })





    })
        
        