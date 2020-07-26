import { BadRequestException, Injectable } from '@nestjs/common';
import { Point } from './point';

@Injectable()
export class SquaresService {
  private squaresCount: number;

  getNumberOfSquares(listOfPoints: Point[]): number {
    if (!listOfPoints) {
      throw new BadRequestException('');
    }

    let data: Point[] = [];
    this.squaresCount = 0;
    this.combinationUtil(listOfPoints, data, 0, listOfPoints.length - 1, 0, 4);
    return this.squaresCount;
  }

  private combinationUtil(
    arr: any[],
    data: any[],
    start: number,
    end: number,
    index: number,
    k: number
  ) {
    if (index == k && this.isSquare(data[0], data[1], data[2], data[3])) {
      this.squaresCount++;
    }

    for (let i = start; i <= end && end - i + 1 >= k - index; i++) {
      data[index] = arr[i];
      this.combinationUtil(arr, data, i + 1, end, index + 1, k);
    }
  }

  private dist(a: Point, b: Point) {
    return (
      (parseFloat(a.x) - parseFloat(b.x)) *
        (parseFloat(a.x) - parseFloat(b.x)) +
      (parseFloat(a.y) - parseFloat(b.y)) * (parseFloat(a.y) - parseFloat(b.y))
    );
  }

  private isSquare(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
    const dist12 = this.dist(p1, p2);
    const dist13 = this.dist(p1, p3);
    const dist14 = this.dist(p1, p4);
    const dist23 = this.dist(p2, p3);
    const dist24 = this.dist(p2, p4);

    if (
      dist12 == dist13 &&
      2 * dist12 == dist14 &&
      dist24 == this.dist(p3, p4) &&
      dist24 == dist12
    ) {
      return true;
    }

    if (
      dist13 == dist14 &&
      2 * dist13 == dist12 &&
      dist23 == this.dist(p2, p4) &&
      dist23 == dist13
    ) {
      return true;
    }

    if (
      dist12 == dist14 &&
      2 * dist12 == dist13 &&
      dist23 == this.dist(p3, p4) &&
      dist23 == dist12
    ) {
      return true;
    }

    return false;
  }
}
