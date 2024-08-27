import { useField } from "formik";
import { Check } from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";

export const InputTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>
      <textarea
        className={meta.touched && meta.error ? "error-show" : null}
        {...field}
        {...props}
        autoComplete="off"
      ></textarea>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputText = ({
  label,
  className = "",
  onChange = null,
  refVal = null,
  ...props
}) => {
  const [field, meta] = useField(props);

  if (props.number === "number") {
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <NumericFormat
          {...field}
          {...props}
          allowLeadingZeros
          autoComplete="off"
          className={`${
            meta.touched && meta.error ? "error-show" : null
          }  ${className}`}
          onChange={(e) => {
            onChange !== null && onChange(e);
            field.onChange(e);
          }}
        />

        {meta.touched && meta.error ? (
          <span className={`error-show ${top}`}>{meta.error}</span>
        ) : null}
      </>
    );
  }

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? `error-show ${className}`
            : `${className}`
        }
        ref={refVal}
        autoComplete="off"
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
      />
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputComboBox = ({ label, onChange, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>

      <Select {...props} onChange={onChange} />
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputFileUpload = React.forwardRef(({ label, ...props }, ref) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="error--msg">{meta.error}</span>
      ) : null}
    </>
  );
});

export const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input {...field} {...props} />
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "error-show" : ""}
      >
        {label}
      </label>

      {/* {meta.touched && meta.error ? (
        <p className="error-msg">{meta.error}</p>
      ) : null} */}
    </>
  );
};

export const InputCheckbox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="flex items-center gap-2">
        <span
          className="relative flex items-center justify-center rounded-full cursor-pointer self-center h-[18px]"
          htmlFor="select_all"
        >
          <input
            {...field}
            {...props}
            className={
              meta.touched && meta.error
                ? " error-show"
                : "peer relative cursor-pointer border-accent appearance-none rounded-sm  checked:bg-accent size-4 min-h-0"
            }
            type="checkbox"
          />
          <span className="absolute text-white  opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 ">
            <Check />
          </span>
        </span>

        <label
          htmlFor={props.id || props.name}
          className="cursor-pointer text-dark m-0 relative top-[unset] translate-x-0 translate-y-0 left-0"
        >
          {label}
        </label>
      </div>
    </>
  );
};

export const InputSelect = ({
  label,
  className = "",
  onChange = null,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show " : "custom"}
      >
        {label}
      </label>

      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show " : className}
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};
