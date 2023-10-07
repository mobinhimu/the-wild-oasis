import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { getSettings = {}, isSettings } = useSettings();
  const { isUpdatingSetting, updateSetting } = useUpdateSettings();

  const { minBookingLen, maxBookingLen, maxGuestPerBooking, breakfastPrice } =
    getSettings;

  function handleUpdate(value, id) {
    return updateSetting({ [id]: value });
  }

  if (isSettings) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLen}
          disabled={isUpdatingSetting}
          onBlur={(eve) => handleUpdate(eve.target.value, "minBookingLen")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLen}
          disabled={isUpdatingSetting}
          onBlur={(eve) => handleUpdate(eve.target.value, "maxBookingLen")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={isUpdatingSetting}
          onBlur={(eve) => handleUpdate(eve.target.value, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdatingSetting}
          onBlur={(eve) => handleUpdate(eve.target.value, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
