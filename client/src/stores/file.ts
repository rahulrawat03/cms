import { api } from "@cms/utils";

class FileStore {
  private endpoint = `/file`;

  public update = async (file: File, oldFileId: string) => {
    if (oldFileId) {
      await this.deleteFile(oldFileId);
    }

    let id = "";
    if (file) {
      id = (await this.uploadFile(file)) ?? "";
    }

    return id;
  };

  private uploadFile = async (file: File) => {
    try {
      const data = new FormData();
      data.append("file", file);

      const { id } = await api<{ id: string }>(this.endpoint, "POST", data);

      return id;
    } catch (ex: unknown) {
      // pass
    }
  };

  private deleteFile = async (fileId: string) => {
    try {
      await api<void>(`${this.endpoint}/${fileId}`, "DELETE");
    } catch (ex: unknown) {
      // pass
    }
  };

  public getAbsoluteUrl = (id: string) =>
    `${import.meta.env.VITE_API_ENDPOINT}/file/${id}`;
}

export const fileStore = new FileStore();
