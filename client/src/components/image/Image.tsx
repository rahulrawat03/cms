import { Builder, BuilderConstructorProperties, Resource } from "@cms/types";
import { Image } from "@cms/components";
import { fileStore } from "@cms/stores";

export class ImageBuilder implements Builder<Resource> {
  public readonly key: string;
  private _value: Resource;
  private name: string;
  private showName: boolean;

  constructor({
    key,
    value,
    name,
    showName,
  }: BuilderConstructorProperties<Resource, void>) {
    this.key = `${key}-${crypto.randomUUID()}`;
    this._value = value;
    this.name = name;
    this.showName = showName;
  }

  private async handleChange(image: File) {
    const imageId = await fileStore.update(image, this._value.value);

    if (imageId !== this._value.value) {
      this._value.name = image.name;
      this._value.value = imageId;
    }
  }

  public build() {
    const id = this._value.value;
    const src = id.length > 0 ? fileStore.getAbsoluteUrl(id) : "";

    return (
      <Image
        key={this.key}
        id={this.key}
        src={src}
        label={this.name}
        onChange={this.handleChange.bind(this)}
        showName={this.showName}
      />
    );
  }

  public value() {
    return this._value;
  }
}
