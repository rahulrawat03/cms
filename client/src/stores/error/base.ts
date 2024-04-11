import { Constant } from "@cms/constants";
import { Queue } from "@cms/utils";
import { createStore } from "@rahulrawat03/mustate";

class ErrorStore {
  private static LOG_TIME = 5 * 1000;
  private static MAX_ERROR_LOGS = 5;

  public static readonly instance = createStore(new ErrorStore());

  private _isActive: boolean = false;
  private _currentError: string = "";
  private errorQueue: Queue<string> = new Queue<string>();

  private constructor() {}

  public get isActive() {
    return this._isActive;
  }

  public get currentError() {
    return this._currentError;
  }

  public async registerServerError() {
    this.register(Constant.INTERNAL_SERVER_ERROR);
  }

  public async register(message: string) {
    if (this.errorQueue.size == ErrorStore.MAX_ERROR_LOGS) {
      return;
    }

    this.errorQueue.add(message);
    this.log();
  }

  private async log() {
    const initiator = setTimeout(() => {
      this._isActive = true;
      this._currentError = this.errorQueue.peek()!;

      clearTimeout(initiator);
    }, (this.errorQueue.size - 1) * ErrorStore.LOG_TIME);

    const terminator = setTimeout(() => {
      this._isActive = false;
      this._currentError = "";

      clearTimeout(terminator);
      this.errorQueue.remove();
    }, this.errorQueue.size * ErrorStore.LOG_TIME);
  }
}

export const errorStore = ErrorStore.instance;
