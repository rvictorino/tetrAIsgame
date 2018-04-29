class GA {

  constructor(populationSize, numberOfGenerations, individualCreationFunc, fitnessFunc, crossoverFunc, mutationFunc, isFinalStateFunc, runFunc) {
    this.size = populationSize
    this.generations = numberOfGenerations
    // when creating new gen, 30% will be used as parents
    this.offSpringThreshold = Math.floor(this.size * 0.4)

    this.fitnessFunc = fitnessFunc
    this.individualCreationFunc = individualCreationFunc
    this.crossoverFunc = crossoverFunc
    this.mutationFunc = mutationFunc
    this.isFinalStateFunc = isFinalStateFunc
    this.runFunc = runFunc

    this.currentGen = 0
    this.population = []

    // init population
    for (var i = 0; i < this.size; i++) {
      this.population.push(new Individual(this.individualCreationFunc()))
    }

    // use first by default before first fitness eval
    this.best = this.population[0]
  }

  getBest() {
    return this.best.obj
  }


  nextGen() {
    // selection
    var nextPopulation = this.selectParents()
    // crossover
    nextPopulation = this.crossover(nextPopulation)
    // mutation
    nextPopulation = this.mutate(nextPopulation)

    // fill with random new individuals
    for (var i = nextPopulation.length; i < this.size; i++) {
      nextPopulation.push(new Individual(this.individualCreationFunc()))
    }
    // apply changes
    this.population = nextPopulation

    // new gen complete !
    this.currentGen++
  }


  selectParents() {
    this.calculateFitness()
    // init next population
    var selectedPopulation = []
    // select 2 parents
    for (var i = 0; i < this.offSpringThreshold; i += 2) {
      // may select same parent twice, but checking might be too expensive
      var parents = this.selectTwo()
      selectedPopulation.push(parents[0])
      selectedPopulation.push(parents[1])
    }
    console.log(selectedPopulation)

    return selectedPopulation
  }

  selectTwo() {
    // fitness proportionate selection, aka roulette wheel
    // Stochastic universal sampling: 2 selections evenly spaced on the wheel
    // the best the fitness, the higher the probabity to be chosen
    var rand1 = Math.random()
    var rand2 = rand1 >= 0.5 ? rand1 - 0.5 : rand1 + 0.5
    var probSum = 0
    var selected = []
    var selectedIndexes = []
    // first selection
    for (var i = 0; i < this.population.length; i++) {
      probSum += this.population[i].fitness
      if (probSum > rand1) {
        selected.push(this.population[i])
        selectedIndexes.push(i)
        break
      }
    }
    probSum = 0
    // second selection
    for (var i = 0; i < this.population.length; i++) {
      probSum += this.population[i].fitness
      if (probSum > rand2) {
        selected.push(this.population[i])
        selectedIndexes.push(i)
        break
      }
    }
    // remove selected from population
    // sort first by index so we slice biggest first, thus not changing
    // second index position in array after splicing
    selectedIndexes.sort((a, b) => b - a)
    selectedIndexes.forEach(i => this.population.splice(i, 1))

    // return selected individuals
    return selected
  }

  crossover(population) {

    var nextPopulation = []

    for (var i = 0; i < population; i += 2) {
      var parent1 = population[i]
      var parent2 = population[i + 1]

      children = this.crossoverFunc(parent1.obj, parent2.obj)

      nextPopulation.push(parent1, parent2, new Individual(children[0]), new Individual(children[1]))
    }

    // clear fitness values
    nextPopulation.forEach(i => i.fitness = 0)

    return nextPopulation
  }

  mutate(population) {
    //TODO
    return population
  }

  calculateFitness() {
    // initialize fitness
    var fitnessSum = 0
    this.best = this.population[0]

    // calculate all fitnesses and store best element
    for (var indiv of this.population) {
      indiv.fitness = this.fitnessFunc(indiv.obj)
      if (indiv.fitness > this.best.fitness) {
        this.best = indiv
      }
      fitnessSum += indiv.fitness
    }

    // nomalize fitness
    this.population.forEach(i => i.fitness /= fitnessSum)
    // sort by fitness
    this.population.sort((a, b) => b.fitness - a.fitness)
  }


  needToEvolve() {
    for (var indiv of this.population) {
      if (!this.isFinalStateFunc(indiv.obj)) {
        return false
      }
    }
    return true
  }

  run() {
    this.population.forEach(g => {
      if (!this.isFinalStateFunc(g.obj)) {
        this.runFunc(g.obj)
      }
    })
  }

  show() {
    this.population.forEach((p, i) => {
      image(p.obj.gameOver ? brainKO : brainOK,
        WIDTH + 2 * IMG_PADDING + (i % VIZ_NB_PER_LINE) * VIZ_SIZE,
        2 * IMG_PADDING + Math.floor(i / VIZ_NB_PER_LINE) * VIZ_SIZE,
        VIZ_SIZE - 2 * IMG_PADDING,
        VIZ_SIZE - 2 * IMG_PADDING)
    })
  }
}


class Individual {

  constructor(obj) {
    this.obj = obj
    this.fitness = 0
  }

}