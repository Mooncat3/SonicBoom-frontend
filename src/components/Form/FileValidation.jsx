const FileValidation = async (event) => {
  const file = event.target.files[0];
  // Проверка, является ли файл MP3
  if (file && file.type === event.target.accept) {
    const formData = new FormData();
    formData.append("file", file); // Добавляем файл в FormData

    try {
      const response = await fetch(savePath, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log(`Файл ${file.name} успешно сохранен по пути: ${savePath}`);
      } else {
        console.error("Ошибка при сохранении файла:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при отправке файла:", error);
    }
  } else {
    alert("Пожалуйста, выберите MP3 файл.");
  }
};
