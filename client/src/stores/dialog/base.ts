import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { Layer } from "./types";

export * from "./types";

class DialogStore {
  public static readonly instance = new DialogStore();

  private layers: Layer[] = [];
  public trigger: boolean = false;

  private constructor() {
    makeObservable<DialogStore, "layers" | "updateCurrentData">(this, {
      layers: observable,
      trigger: observable,
      add: action,
      remove: action,
      clear: action,
      updateCurrentData: action,
      current: computed,
    });
  }

  public get current() {
    if (!this.isEmpty()) {
      return this.layers[this.layers.length - 1];
    }

    return null;
  }

  public add(layer: Layer) {
    runInAction(() => {
      this.updateCurrentData();

      this.layers.push(layer);
    });
  }

  public remove() {
    if (!this.isEmpty()) {
      runInAction(() => {
        this.updateCurrentData();

        this.layers.pop();
      });
    }
  }

  public clear() {
    runInAction(() => {
      while (this.layers.length > 0) {
        this.updateCurrentData();

        this.layers.pop();
      }
    });
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
