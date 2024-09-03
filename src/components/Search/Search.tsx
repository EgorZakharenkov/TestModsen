import React, { useRef } from "react";
import { useSearch } from "../../context/SearchContext.tsx";
import * as z from "zod";
import { useFormik } from "formik";
import "./style.scss";

export const Search: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setSearchTerm } = useSearch();

  const searchSchema = z.object({
    value: z.string().max(12, "Максимальная длина строки - 12 символов"),
  });

  const validate = (values: { value: string }) => {
    const validation = searchSchema.safeParse(values);
    if (!validation.success) {
      return validation.error.flatten().fieldErrors;
    }
    return {};
  };

  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validate,
    onSubmit: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setSearchTerm(formik.values.value);
      }, 400);
    },
  });

  return (
    <div className="search">
      <form onSubmit={formik.handleSubmit}>
        <input
          value={formik.values.value}
          name="value"
          onChange={(e) => {
            formik.handleChange(e);
            formik.handleSubmit();
          }}
          type="text"
          placeholder="Поиск..."
        />
        {formik.touched.value && formik.errors.value && (
          <p className="error-message">{formik.errors.value}</p>
        )}
      </form>
    </div>
  );
};
