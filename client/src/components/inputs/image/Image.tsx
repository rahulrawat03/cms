export function ImageInput() {
  const handleImageChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleImageChange}>
      <input type="file" accept="image/*" />
    </form>
  );
}
