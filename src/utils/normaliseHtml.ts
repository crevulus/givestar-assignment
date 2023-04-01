import DOMPurify from "dompurify";

export const sanitizeHtml = (input: string): string => {
  return DOMPurify.sanitize(input);
};
