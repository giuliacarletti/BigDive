var width = 850
var height = 500

var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)


d3.csv('dataset/athletes_sochi.csv', function(data){

        function maleSum(arr){
                var somma = d3.sum(arr, function(d){ return(d.gender=='Male') ? 1 : 0})
                return somma;
            }
            
        function femaleSum(arr){
            var somma = d3.sum(arr, function(d){                        return(d.gender=='Female') ? 1 : 0})
            return somma;

        }

    
    byAge = d3.nest()
                .key(function(d,i){
                    var fascia;
                    if(d.age < 22)
                        fascia = "<22"
                    if(d.age >= 22 && d.age < 25 )
                        fascia = "22-24"
                    if(d.age >= 25 && d.age < 28 )
                        fascia = "25-27"
                    if(d.age >= 28 && d.age < 32 )
                        fascia = "28-31"
                    if(d.age >= 32  )
                        fascia = ">31"
                    return fascia                    
                })
                .key(function(d,i){                
                    return d.gender;                    
                })
                .rollup(function(d){
                    return { 
                             tot: d3.sum(d, function(d,i){ return 1 }), 
                             gold: d3.sum(d, function(d,i){ return d.gold_medals}), 
                             silver: d3.sum(d, function(d,i){ return d.silver_medals}), 
                             bronze: d3.sum(d, function(d,i){ return d.bronze_medals}) 
                    };
                })    
                .entries(data)
  
    console.log(byAge)
    
    //il tuo codice qui
    
    
}) // chiusura del CVS