// src/ai/models/reinforcementLearning.model.ts
import { QLearning } from 'reinforce-js';

export class ReinforcementLearningModel {
  private qLearning: QLearning;

  constructor() {
    this.qLearning = new QLearning({
      state: 4, // Number of states
      action: 2, // Number of actions
      alpha: 0.1, // Learning rate
      gamma: 0.9, // Discount factor
      epsilon: 0.1, // Exploration rate
    });
  }

  async train(state: number[], action: number, reward: number, nextState: number[]): Promise<void> {
    this.qLearning.learn(state, action, reward, nextState);
  }

  async getAction(state: number[]): Promise<number> {
    return this.qLearning.getAction(state);
  }
}
