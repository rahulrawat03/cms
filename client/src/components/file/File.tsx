import {
  Builder,
  BuilderConstructorProperties,
  File as CmsFile,
} from "@cms/types";
import { File } from "@cms/components";
import { fileStore } from "@cms/stores/file";

export class FileBuilder implements Builder<CmsFile> {
  public readonly key: string;
  private _value: CmsFile;
  private name: string;
  private showName: boolean;

  constructor({
    key,
    value,
    name,
    showName,
  }: BuilderConstructorProperties<CmsFile>) {
    this.key = `${key}-${crypto.randomUUID()}`;
    this._value = value;
    this.name = name;
    this.showName = showName;
  }

  private handleChange = async (file: File) => {
    const fileId = await fileStore.update(file, this._value.value);

    if (fileId !== this._value.value) {
      this._value.name = file.name;
      this._value.value = fileId;
    }
  };

  public build = () => {
    const { name, value } = this._value;

    return (
      <File
        key={this.key}
        id={this.key}
        src={value}
        name={name.length > 0 ? name : "{{ FILE }}"}
        label={this.name}
        onChange={this.handleChange}
        showName={this.showName}
      />
    );
  };

  public value = () => {
    console.log(this._value);
    return this._value;
  };
}
