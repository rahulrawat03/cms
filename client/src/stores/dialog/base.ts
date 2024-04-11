import { createStore } from "@rahulrawat03/mustate";
import { Layer } from "./types";

class DialogStore {
  public static readonly instance = createStore(new DialogStore());

  private layers: Layer[] = [];
  public trigger: boolean = false;

  private constructor() {}

  public get current() {
    if (!this.isEmpty()) {
      return this.layers[this.layers.length - 1];
    }

    return null;
  }

  public add(layer: Layer) {
    this.updateCurrentData();
    this.layers = [...this.layers, layer];
  }

  public remove() {
    if (!this.isEmpty()) {
      this.updateCurrentData();
      this.layers = this.layers.slice(0, this.layers.length - 1);
    }
  }

  public clear() {
    while (this.layers.length > 0) {
      this.updateCurrentData();
      this.layers = this.layers.slice(0, this.layers.length - 1);
    }
  }

  public isEmpty() {
    return this.layers.length == 0;
  }

  private updateCurrentData() {
    if (!this.isEmpty() && this.current) {
      this.current.update();
    }
  }
}

export const dialogStore = DialogStore.instance;
