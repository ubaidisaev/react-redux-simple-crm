import * as React from "react";
import { Field, Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { WithTranslation, withTranslation } from "react-i18next";

import TextInput from "@/components/form-elements/text-input/TextInput";
import Avatar from "@/components/avatar-editor/Avatar";
import { required } from "@/utils/validateRules";
import DublicateField from "./DublicateField";

import "./index.scss";

export interface IFormProps {
  initialValues?: any;
  onSubmit: (val: any) => void;
}

class ClientForm extends React.Component<IFormProps & WithTranslation> {
  render() {
    return (
      <Form
        // @ts-ignore
        onSubmit={this.props.onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={this.props.initialValues}
      >
        {({
          handleSubmit,
          form: {
            mutators: { push, pop },
          },
        }) => (
          <form
            onSubmit={handleSubmit}
            className="form container_modal container_client-add"
          >
            <div className="grid">
              {/* <div className="col-3 client-form__avatar-col">
                <div className="client-modal__photo">
                  <Avatar />
                </div>
              </div> */}

              <div className="client-form__name-col fw">
                <Field
                  name="first_name"
                  component={TextInput}
                  placeholder={this.props.t("form.first_name")}
                  autofocus
                  validate={required}
                  errorMsgPosition="top"
                />

                <Field
                  name="last_name"
                  component={TextInput}
                  placeholder={this.props.t("form.last_name")}
                />

                <Field
                  name="middle_name"
                  component={TextInput}
                  placeholder={this.props.t("form.middle_name")}
                />
              </div>
            </div>

            <div className="grid">
              <div className="fw">
                <div className="client-form__row">
                  <i className="wd-ico-company"></i>
                  <Field
                    name="company_name"
                    component={TextInput}
                    placeholder={this.props.t("form.company")}
                    qaId="companyClientButton"
                  />
                </div>
                <div className="client-form__row client-form__row_dublicate">
                  <i className="wd-ico-phone"></i>
                  <div className="client-form__common-line">
                    <FieldArray
                      name={`meta.tel`}
                      //@ts-ignore
                      component={DublicateField}
                    />
                  </div>
                </div>

                <div className="client-form__row client-form__row_dublicate">
                  <i className="wd-ico-at"></i>
                  <div className="client-form__common-line">
                    <FieldArray
                      name={`meta.email`}
                      //@ts-ignore
                      component={DublicateField}
                    />
                  </div>
                </div>

                <div className="client-form__row">
                  <i className="wd-ico-client-note"></i>
                  <Field
                    name="note"
                    placeholder={this.props.t("form.note")}
                    type="textarea"
                    component={TextInput}
                    leva="this is ubaid"
                  />
                </div>
              </div>
            </div>

            <button
              // @ts-ignore
              ref={this.props.formRef}
              type="submit"
              style={{ display: "none" }}
            ></button>
          </form>
        )}
      </Form>
    );
  }
}

export default withTranslation()(ClientForm);
