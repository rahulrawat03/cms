interface Element<T> {
  [key: number]: T;
}

export class Queue<T> {
  private elements: Element<T>;
  private start: number;
  private end: number;

  private shiftThreshold = 1e9;

  constructor() {
    this.elements = {};
    this.start = 0;
    this.end = 0;
  }

  public add(element: T) {
    this.elements[this.end++] = element;

    if (this.end == this.shiftThreshold) {
      this.shift();
    }
  }

  public remove() {
    if (this.isEmpty) {
      return null;
    }

    const item = this.elements[this.start];
    delete this.elements[this.start++];

    return item;
  }

  public peek() {
    if (this.isEmpty) {
      return null;
    }

    return this.elements[this.start];
  }

  public get size() {
    return this.end - this.start;
  }

  public get isEmpty() {
    return this.size === 0;
  }

  // Shift back the queue elements to start from index 0
  // when threshold is reached
  private shift() {
    const shiftedElements: Element<T> = {};
    const shiftedStart = 0;
    let shiftedEnd = 0;

    for (let i = this.start; i <= this.end; i++) {
      shiftedElements[shiftedEnd++] = this.elements[i];
    }

    this.start = shiftedStart;
    this.end = shiftedEnd;
  }
}
