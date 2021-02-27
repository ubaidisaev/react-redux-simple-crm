import * as React from "react";
import { Field } from "react-final-form";
import { useTranslation } from "react-i18next";
import {
  FieldArrayRenderProps,
} from "react-final-form-arrays";

import Button from "@/components/form-elements/button/Button";
import TextInput from "@/components/form-elements/text-input/TextInput";

interface IDublicateProps {
  //   fields: FieldArrayProps<{ value: string }, HTMLInputElement>;
  fields: FieldArrayRenderProps<{ value: string }, any>;
}

interface IFieldObject {
  type: string;
  placeholder: string;
  btnTitle: string;
  validate?: (value: string) => string | undefined;
}

const DublicateField: React.FC<IDublicateProps> = ({ fields }) => {
  const { t } = useTranslation();

  const dublicateFieldConstructor = (fields: any) => {
    const fieldObject: IFieldObject = {
      type: "",
      placeholder: "",
      btnTitle: "",
    };

    if (fields.name === "meta.tel") {
      fieldObject.type = "phone";
      fieldObject.placeholder = t("form.phone");
      fieldObject.btnTitle = t("form.phone_add");
    } else if (fields.name === "meta.email") {
      fieldObject.type = "text";
      // fieldObject.validate = email;
      fieldObject.placeholder = t("form.email");
      fieldObject.btnTitle = t("form.email_add");
    } else if (fields.name === "meta.url") {
      fieldObject.type = "text";
    //   fieldObject.validate = url;
      fieldObject.placeholder = t("form.site");
      fieldObject.btnTitle = t("form.site_add");
    }

    return fieldObject;
  };

  const renderField = dublicateFieldConstructor(fields);
  /* @ts-ignore*/
  const showRemoveIcon = fields.length > 1;

  return (
    <React.Fragment>
      {/* @ts-ignore*/}
      {fields.map((field: any, index: number) => {
        return (
          <Field
            name={`${field}.value`}
            key={index}
            component={TextInput}
            remove={showRemoveIcon}
            placeholder={renderField.placeholder}
            // @ts-ignore
            onRemoveField={fields.pop}
          />
        );
      })}
      <div className="client-form__dublicate-btn">
        {/* @ts-ignore*/}
        <Button color='inline-blue' size="small" onClick={() => fields.push()}>{renderField.btnTitle}</Button>
      </div>
    </React.Fragment>
  );
};

export default DublicateField;
