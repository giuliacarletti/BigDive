from mrjob.job import MRJob
from mrjob.step import MRStep

# Exercise 7
# Calcolare per ogni nazione il numero di medaglie, rispettivamente per oro, argento e bronzo.

# age,birthdate,gender,height,name,weight,gold_medals,silver_medals,
# bronze_medals,total_medals,sport,country

class MREx_07(MRJob):
    def steps(self):
        return [MRStep(mapper=self.lineMapper,
                       reducer=self.medalCounter),
		MRStep(mapper=self.totmedMapper,
                       reducer=self.totmedCounter)]



    def lineMapper(self, _, line):
        yield line.split[-1], (int(line.split[6]), int(line.split[7]), int(line.split[8]))




    def medalCounter(self, country, medals):
        gold=0
	silver=0
	bronze=0
	for medal in medals:	
	    gold = gold + medal[0]
	    silver = silver + medal[1]
	    bronze = bronze + medal[2]	    
	yield country, (gold, silver, bronze)	



    def totmedMapper(self, country, medals):



    def totmedCounter(self, country, medals):




if __name__ == '__main__':
    MREx_07.run()
