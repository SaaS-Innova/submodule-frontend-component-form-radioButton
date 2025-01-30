import { Controller, useFormContext } from "react-hook-form";
import { inputValidator } from "../../../../library/utilities/helperFunction";
import { RadioButton } from "primereact/radiobutton";
import { IFormFieldType } from "../../../../library/utilities/constant";
import { IFormProps } from "../formInterface/forms.model";
import { FormFieldError } from "../formFieldError/FormFieldError";

export const RadioButtonSelect = (props: IFormProps) => {
  const { attribute, form, fieldType } = props;
  const { label, options } = form[attribute];
  const { required, disabled, itemPerRow = 2 } = form[attribute].rules;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const getClassNames = () => {
    let labelClassName = "";
    let fieldClassName = "";
    let divClassName = "";

    switch (fieldType) {
      case IFormFieldType.NO_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "grid";
        break;
      case IFormFieldType.TOP_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "grid";
        break;
      default:
        labelClassName = "col-12 mt-2 mb-3 md:col-3 md:mb-0";
        fieldClassName = "field grid";
        divClassName = "col-12 mt-2 md:col-9 grid relative";
        break;
    }

    return { labelClassName, fieldClassName, divClassName };
  };
  const { labelClassName, fieldClassName, divClassName } = getClassNames();

  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      <span className="capitalize-first">
        {label} {required && "*"}
      </span>
    </label>
  );
  const widthStyle = { width: `${100 / itemPerRow}%` };

  return (
    <div className={fieldClassName}>
      {fieldType !== IFormFieldType.NO_LABEL && labelElement}
      <div className={divClassName}>
        {options &&
          options.map((option) => {
            return (
              <div className="flex p-2" key={option.value} style={widthStyle}>
                <Controller
                  name={attribute}
                  control={control}
                  rules={inputValidator(form[attribute].rules, label)}
                  render={({ field }) => {
                    return (
                        <RadioButton
                          onChange={(e) => field.onChange(e.value)}
                          value={option.value}
                          inputId={`${field.name}_${option.value}`}
                          checked={option.value === field.value ? true : false}
                          disabled={disabled}
                          className={errors[attribute] ? "p-invalid" : ""}
                        />
                        <label
                          htmlFor={`${field.name}_${option.value}`}
                          className="ml-2"
                        >
                          {option.label}
                        </label>
                    );
                  }}
                />
              </div>
            );
          })}
        <FormFieldError data={{ errors, name: attribute }} />
      </div>
    </div>
  );
};
