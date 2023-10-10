import * as FormData from "form-data";

export const getFormData = (file: Express.Multer.File): FormData => {
  const formData = new FormData();
  formData.append('file', file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
    filepath: file.path
  });

  return formData;
}