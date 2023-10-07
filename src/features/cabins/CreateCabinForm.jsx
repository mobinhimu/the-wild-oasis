import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useCabinEdit } from "./useCabinEdit";
import { useCreateCabin } from "./useCreateCabin";
import toast from "react-hot-toast";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { editCabin, isEditing } = useCabinEdit();
  const { createCabin, isCreating } = useCreateCabin();

  const { id: editID, ...editValue } = cabinToEdit;

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: editID ? editValue : null,
  });

  function onSubmit(userData) {
    // This Code Is Simply Trim All Users Input .
    const data = Object.fromEntries(
      Object.entries(userData).map((val) =>
        typeof val[1] === "string" ? [val[0], val[1].trim()] : [val[0], val[1]]
      )
    );

    const image =
      typeof data?.image === "string" ? data?.image : data?.image[0];

    // creating and updating data
    if (editID) {
      editCabin(
        { newCabin: { ...data, image }, id: editID },
        {
          onSuccess: () => {
            reset();
            toast.success("Cabin Successfully Edited");
            onCloseModal?.();
          },
          onError: (err) => {
            toast.error(err.message);
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            toast.success("Cabin Created Successfully");
            onCloseModal?.();
          },
          onError: (err) => {
            toast.error(err.message);
            onCloseModal?.();
          },
        }
      );
    }
  }

  const isWorking = isEditing || isCreating;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal && "modal"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field Is Required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field Is Required",
            min: {
              value: 1,
              message: "Value Should Be At Least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field Is Required",
            min: {
              value: 1,
              message: "Value Should Be At Least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field Is Required",
            validate: (value) =>
              parseInt(value) < getValues().regularPrice ||
              "Discount Should Be Small More Than To Regular Price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This Field Is Required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: editID ? false : "This Field Is Required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {!editID ? "Create A New Cabin" : "Edit Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
