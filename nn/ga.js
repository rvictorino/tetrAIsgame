class GA {

  constructor(populationSize, numberOfGenerations, individualCreationFunc, fitnessFunc, mutationFunc, isFinalStateFunc, runFunc) {
    this.size = populationSize
    this.generations = numberOfGenerations
    this.currentGen = 0
    this.fitnessFunc = fitnessFunc
    this.individualCreationFunc = individualCreationFunc
    this.mutationFunc = mutationFunc
    this.isFinalStateFunc = isFinalStateFunc
    this.runFunc = runFunc
    this.population = []

    this.fitnessPopulation = []

    // init population
    for(var i = 0; i < this.size; i++) {
      this.population.push(this.individualCreationFunc())
    }

    // use first by default before first fitness eval
    this.best = this.population[0]
  }

  nextGen() {

    this.currentGen++
  }

  calculateFitness() {
    this.fitnessPopulation = this.population.map( i => ({individual: i, fitness: this.fitnessFunc(i)}) )
    this.best = this.fitnessPopulation.reduce( (a, b) => a.fitness >= b.fitness ? a : b ).individual
  }

  needToEvolve() {
    for(var indiv of this.population) {
      if(!this.isFinalStateFunc(indiv)) {
        return false
      }
    }
    return true
  }

  run() {
    this.population.forEach(g => {
      if(!this.isFinalStateFunc(g)) {
        this.runFunc(g)
      }
    })
  }

  show() {
    this.population.forEach( (p, i) => {
      image(p.gameOver ? brainKO : brainOK,
        WIDTH + 2 * IMG_PADDING + (i % VIZ_NB_PER_LINE) * VIZ_SIZE,
        2 * IMG_PADDING + Math.floor(i / VIZ_NB_PER_LINE) * VIZ_SIZE,
        VIZ_SIZE - 2 * IMG_PADDING,
        VIZ_SIZE - 2 * IMG_PADDING)
    })
  }
}
