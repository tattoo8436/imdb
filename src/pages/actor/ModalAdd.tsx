import { Button, Col, DatePicker, Input, Modal, Row, Upload } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { actorApi } from "../../apis/actorApi";
import { fileApi } from "../../apis/fileApi";
import { IActor } from "../../utils/type";

interface IProps {
  hookForm: UseFormReturn<IActor, any, undefined>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
}

const ModalAdd = (props: IProps) => {
  const { hookForm, openModal, setOpenModal, setIsRefetch, account } = props;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: IActor) => {
    setLoading(true);
    let dataImage = null;
    try {
      // if (values.image && values.image.length > 0) {
      //   const formData = new FormData();
      //   formData.append("image", values.image.at(0).originFileObj);
      //   dataImage = await fileApi.uploadImage(formData);
      //   console.log({ dataImage });
      // }
      const payload: any = {
        name: values.name,
        description: values.description,
        dob: values.dob ? dayjs(values.dob).format("YYYY-MM-DD") : null,
        image: "",
      };
      const reader = new FileReader();
      reader.readAsDataURL(values.image.at(0).originFileObj);
      reader.onload = async () => {
        payload["image"] = reader.result;
        const { data } = await actorApi.addActor(payload);
        console.log({ data });
        setIsRefetch((pre) => !pre);
        setLoading(false);
        onCancel();
        toast.success("Thêm thành công!", { autoClose: 3000 });
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
      console.log(payload);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onCancel = () => {
    setOpenModal(false);
    setTimeout(() => {
      hookForm.reset();
      hookForm.clearErrors();
    }, 100);
  };

  return (
    <Modal
      className="modal modal-add"
      open={openModal}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
    >
      <form onSubmit={hookForm.handleSubmit(onSubmit)} className="form">
        <div className="modal__header">Thêm diễn viên</div>
        <div className="modal__content">
          <Row>
            <Col span={24} className="form__item">
              <div className="form__item__label">
                Họ tên <span>*</span>
              </div>
              <Controller
                name="name"
                control={hookForm.control}
                rules={{
                  validate: {
                    required: (v) =>
                      (v && v.trim().length > 0) || "Họ tên là bắt buộc",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="Nhập họ tên"
                    className="form__item__input"
                    status={fieldState.error !== undefined ? "error" : ""}
                  />
                )}
              />
              {hookForm.formState.errors.name && (
                <p className="error-msg">
                  {hookForm.formState.errors.name.message}
                </p>
              )}
            </Col>

            <Col span={24} className="form__item item-image">
              <div className="form__item__label">Ảnh</div>
              <Controller
                name="image"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Upload
                    {...field}
                    fileList={field.value}
                    onChange={(e) => {
                      field.onChange(e.fileList);
                    }}
                    beforeUpload={() => false}
                    multiple={false}
                    accept=".jpg,.png,.jpeg"
                  >
                    <Button
                      className={classNames({
                        "d-none": hookForm.watch("image")?.length > 0,
                      })}
                    >
                      Chọn ảnh
                    </Button>
                  </Upload>
                )}
              />
            </Col>

            <Col span={24} className="form__item form__item--text-area">
              <div className="form__item__label">Giới thiệu</div>
              <Controller
                name="description"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Nhập giới thiệu"
                    className="form__item__input"
                  />
                )}
              />
            </Col>

            <Col span={24} className="form__item">
              <div className="form__item__label">Ngày sinh</div>
              <Controller
                name="dob"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    placeholder="Chọn ngày sinh"
                    className="form__item__input"
                    format="DD/MM/YYYY"
                  />
                )}
              />
            </Col>
          </Row>
        </div>

        <div className="modal__footer">
          <Button className="modal__footer__item" onClick={() => onCancel()}>
            Huỷ
          </Button>

          <Button
            loading={loading}
            className="modal__footer__item"
            type="primary"
            htmlType="submit"
          >
            Lưu
          </Button>
          <Button
            className="d-none"
            onClick={() => console.log(hookForm.getValues())}
          >
            Log
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAdd;
