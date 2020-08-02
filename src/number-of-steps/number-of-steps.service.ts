import { Injectable } from '@nestjs/common';

@Injectable()
export class NumberOfStepsService {
  countWays(n: number, arr: number[]) {
    if (n == 0) return 1;

    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (n - arr[i] >= 0) {
        count += this.countWays(n - arr[i], arr);
      }
    }

    return count;
  }

  getNumberOfSteps(numberOfStair: number, stepSizeList: any[]) {
    stepSizeList = stepSizeList.map(s => parseInt(s));
    return this.countWays(numberOfStair, stepSizeList);
  }
}
