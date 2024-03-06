import { makeAutoObservable, runInAction } from "mobx";
import { Layer } from "./types";

class DialogStore {
  private layers: Layer[] = [];
  public trigger: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public get current() {
    if (!this.isEmpty()) {
      return this.layers[this.layers.length - 1];
    }

    return null;
  }

  public add = (layer: Layer) => {
    runInAction(() => {
      this.updateCurrentData();

      this.layers.push(layer);
    });
  };

  public remove = () => {
    if (!this.isEmpty()) {
      runInAction(() => {
        this.updateCurrentData();

        this.layers.pop();
      });
    }
  };

  public clear = () => {
    runInAction(() => {
      while (this.layers.length > 0) {
        this.updateCurrentData();

        this.layers.pop();
      }
    });
  };

  public isEmpty = () => {
    return this.layers.length == 0;
  };

  private updateCurrentData = () => {
    if (!this.isEmpty() && this.current) {
      this.current.update();
    }
  };
}

export const dialogStore = new DialogStore();
