import * as React from "react";
import { useTranslation } from "react-i18next";

import CustomTooltip from "@/components/custom-tooltip/CustomTooltip";
import { CloseIcon } from "@/components/icons";
import { CLIENT_NOTE } from "@/utils/constants";
import { getSearchMatch } from "@/utils/base";

import "./index.scss";

interface IProps {
  client: any;
  metaItemName: string;
  term?: string;
  tableViewMode?: boolean;
  metaItemIcon?: React.FC;
}

const ClientMetaItem: React.FC<IProps> = ({
  metaItemName,
  client,
  metaItemIcon: Icon,
  tableViewMode,
  term,
}) => {
  const { t } = useTranslation();
  const [moreTooltipIsOpen, setMoreTooltipIsOpen] = React.useState(false);

  const handleCloseTooltip = (status: boolean) => {
    setMoreTooltipIsOpen(status);
  };

  const getNameValue = () => {
    let metaRow: string[] = [];
    const metaArr = client.meta[metaItemName] || [];

    switch (metaItemName) {
      case CLIENT_NOTE: {
        client.note && metaRow.push(client.note);
        break;
      }
      default: {
        metaArr.map((item: any) => {
          if (item.value)
            metaRow.push(getSearchMatch(String(item.value), term));
        });
        break;
      }
    }

    return metaRow.length ? metaRow : null;
  };

  const nameValue = getNameValue();

  return (
    <>
      {nameValue && (
        <div className="client__meta-item">
          <div className={`client__meta-line`}>
            {Icon && (
              <span className="meta-item__icon">
                <Icon />
              </span>
            )}

            <span
              className="meta-item__value"
              dangerouslySetInnerHTML={{ __html: nameValue[0] }}
            />
          </div>
          {nameValue.length > 1 && !tableViewMode && (
            <CustomTooltip
              tooltipClassName="meta-item__tooltip"
              isOpen={moreTooltipIsOpen}
              label={t(`clients.${metaItemName}.amount_of_${metaItemName}`, {
                count: nameValue.length - 1,
              })}
              handleChangeOpen={handleCloseTooltip}
            >
              <div className="meta-item__tooltip-head">
                <CloseIcon
                  className="meta-item__tooltip-close"
                  onClick={handleCloseTooltip.bind(null, false)}
                />
              </div>
              <div className="meta-item__tooltip-content">
                {[...nameValue.slice(1, nameValue.length)].map(
                  (item, index) => (
                    <span key={index}>{item}</span>
                  )
                )}
              </div>
            </CustomTooltip>
          )}
        </div>
      )}
    </>
  );
};

export default ClientMetaItem;
