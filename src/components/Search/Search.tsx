import { FC, useRef } from 'react';
import { useSearch } from '../../context/SearchContext';
import * as z from 'zod';
import { useFormik } from 'formik';
import './style.scss';

export const Search: FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setSearchTerm } = useSearch();

  const searchSchema = z.object({
    value: z.string().min(1, 'Минимальная длина строки - 2 символа').max(12, 'Максимальная длина строки - 12 символов'),
  });

  const validate = (values: { value: string }) => {
    const validation = searchSchema.safeParse(values);
    if (!validation.success) {
      return validation.error.flatten().fieldErrors;
    }
    return {};
    asa;
  };

  const formik = useFormik({
    initialValues: {
      value: '',
    },
    validateOnChange: true,
    validateOnMount: true,
    validateOnBlur: true,
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
        {formik.touched.value && formik.errors.value && <p className="error-message">{formik.errors.value}</p>}
      </form>
    </div>
  );
};
