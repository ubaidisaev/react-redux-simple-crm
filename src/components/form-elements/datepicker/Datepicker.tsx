import * as React from "react";
import { useTranslation, WithTranslation } from "react-i18next";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

import { getDayAndMonthByTimeStamp } from "@/utils/base";
import { CloseIcon } from "@/components/icons";
import { CalendarIcon } from "@/components/icons/CalendarIcon";

import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

registerLocale("ru", ru);

class CustomInput extends React.Component<any> {
  clearDateTs = (event: React.MouseEvent) => {
    event.stopPropagation();
    this.props.onDeadlineRemove();
  };

  renderValue(date: Date, t: WithTranslation["t"]): string | React.ReactNode {
    const { inputPlaceholder } = this.props;
    if (!date) {
      return (
        <>
          <span>
            {inputPlaceholder
              ? t(inputPlaceholder)
              : t("datepicker.placeholder")}
          </span>
          <CalendarIcon className="react-datepicker__custom-input-calendar-icon" />
        </>
      );
    }
    return (
      <div className="react-datepicker__custom-input-wrapper">
        <CalendarIcon className="react-datepicker__custom-input-calendar-icon" />
        <span>
          {getDayAndMonthByTimeStamp({
            stamp: date.getTime(),
            weekDay: true,
          })}
        </span>
        <CloseIcon
          className="react-datepicker__custom-input-clear-icon"
          onClick={this.clearDateTs}
        />
      </div>
    );
  }
  render() {
    const { date, t, onDeadlineRemove, inputPlaceholder, ...rest } = this.props;
    return (
      <div {...rest} className="react-datepicker__custom-input">
        {this.renderValue(date, t)}
      </div>
    );
  }
}



interface IProps {
  onChange: (date: Date | [Date, Date] | null) => void;
  onDeadlineRemove: () => void;
  deadline_ts: Date | null | undefined;
  placeholder?: string;
}

const Datepicker: React.FC<IProps> = ({
  onChange,
  deadline_ts,
  onDeadlineRemove,
  placeholder,
}) => {
  const { i18n, t } = useTranslation();
  const datePickRef = React.useRef<any>();
  return (
    <DatePicker
      selected={deadline_ts}
      ref={datePickRef}
      onChange={onChange}
      locale={i18n.language}
      popperPlacement="bottom-start"
      customInput={
        <CustomInput
          inputPlaceholder={placeholder}
          onDeadlineRemove={onDeadlineRemove}
          date={deadline_ts}
          t={t}
        />
      }
    />
  );
};

export default Datepicker;
