interface Element<T> {
  [key: number]: T;
}

export class Queue<T> {
  private elements: Element<T>;
  private start: number;
  private end: number;

  constructor() {
    this.elements = {};
    this.start = 0;
    this.end = 0;
  }

  public add(element: T) {
    this.elements[this.end++] = element;
  }

  public remove() {
    if (this.isEmpty) {
      return;
    }

    const item = this.elements[this.start];
    delete this.elements[this.start++];

    return item;
  }

  public get size() {
    return this.end - this.start;
  }

  public get isEmpty() {
    return this.size === 0;
  }
}
