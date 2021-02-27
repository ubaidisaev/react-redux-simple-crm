import * as React from "react";
import { useTranslation } from "react-i18next";

import { RemoveIcon } from "@/components/icons";
import { TEXTAREA_TYPE } from "@/utils/constants";

import "./index.scss";

interface ITextInputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  autofocus?: boolean;
  errorMsgPosition?: "left" | "right" | "top" | "inner";
  remove?: boolean;
  onRemoveField?: (event: React.MouseEvent<HTMLElement>) => void;
  meta: any;
  input: any;
  maxLength?: number;
  leva?: any;
}

const TextInput: React.FC<ITextInputProps> = (props) => {
  const {t} = useTranslation();
  const {
    label = "",
    meta,
    input = {},
    placeholder,
    autofocus = false,
    errorMsgPosition = "right",
    remove = false,
    maxLength = 255,
    onRemoveField,
  } = props;

  const { type = "text" } = input;

  let labelClassName = "text-input-field__label";
  let inputClassName = "text-input-field__input";
  let helperTextClassName = "text-input-field__helper-text";
  const hasErrors = meta && meta.error && meta.touched;

  if (type === TEXTAREA_TYPE) {
    inputClassName += " text-input-field__input-textarea";
  }

  if (hasErrors) {
    labelClassName += " text-input-field__label_error";
    inputClassName += " text-input-field__input_error";
  }

  if (errorMsgPosition) {
    helperTextClassName += " text-input-field__helper-text_" + errorMsgPosition;
  }

  if (remove) {
    inputClassName += " text-input-field__input_remove";
  }

  function actionsRender() {
    return (
      <div className="text-input-field__add-info">
        {remove ? (
          <span
            className={"text-input-field_ico-del"}
            onMouseDown={onRemoveField}
          >
            <RemoveIcon width={20} />
          </span>
        ) : null}
      </div>
    );
  }

  function inputRender() {
    if (type === TEXTAREA_TYPE) {
      return (
        <textarea
          {...input}
          placeholder={placeholder}
          className={inputClassName}
          value={input.value}
          maxLength={maxLength}
        />
      );
    }
    return (
      <input
        {...input}
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        value={input.value}
      />
    );
  }

  return (
    <div className="text-input-field">
      {label && <div className={labelClassName}>{label}</div>}
      <div className="text-input-field__helper-wrap">
        {inputRender()}
        {actionsRender()}
      </div>
      {hasErrors && <div className={helperTextClassName}>{t(meta.error)}</div>}
    </div>
  );
};

export default TextInput;
