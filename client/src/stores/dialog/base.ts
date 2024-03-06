import { makeAutoObservable, runInAction } from "mobx";
import { Layer, LayerType } from "./types";
import { ArrayValue, Builder, ObjectValue, Value } from "../../types";

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
      this.updateCurrentData();

      this.layers = [];
    });
  };

  public isEmpty = () => {
    return this.layers.length == 0;
  };

  private updateCurrentData = () => {
    if (!this.isEmpty() && this.current) {
      if (this.current.type === LayerType.ARRAY) {
        this.updateArrayData();
      } else {
        this.updateObjectData();
      }
    }
  };

  private updateArrayData = () => {
    this.current!.value.length = 0;
    const updatedValues = this.current!.getValue() as ArrayValue;

    (this.current!.value as ArrayValue).push(...updatedValues);
  };

  private updateObjectData = () => {
    const values = this.current!.value as ObjectValue;
    const updatedValues = this.current!.getValue() as ObjectValue;

    for (const key in values) {
      values[key] = updatedValues[key];
    }
  };

  public addBuilder = (key: string, builder: Builder<Value>) => {
    runInAction(() => {
      this.current?.builder.addBuilder(key, builder);
      this.trigger = !this.trigger;
    });
  };
}

export const dialogStore = new DialogStore();
