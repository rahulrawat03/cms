import {
  Builder,
  BuilderConstructorProperties,
  File as CmsFile,
} from "@cms/types";
import { Image } from "@cms/components";
import { fileStore } from "@cms/stores";

export class ImageBuilder implements Builder<CmsFile> {
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

  private handleChange = async (image: File) => {
    const imageId = await fileStore.update(image, this._value.value);

    this._value.value = imageId;
  };

  public build = () => {
    const id = this._value.value;
    const src = id.length > 0 ? fileStore.getAbsoluteUrl(id) : "";

    return (
      <Image
        key={this.key}
        id={this.key}
        src={src}
        label={this.name}
        onChange={this.handleChange}
        showName={this.showName}
      />
    );
  };

  public value = () => {
    return this._value;
  };
}
