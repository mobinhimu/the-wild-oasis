import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { isLoading, signup } = useSignup();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit({ email, password, fullName }) {
    signup(
      { email, password, fullName },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This Field Is Required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          disabled={isLoading}
          id="email"
          {...register("email", {
            required: "This Field Is Required",
            pattern: /\S+@\S+\.\S+/,
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          disabled={isLoading}
          id="password"
          {...register("password", {
            required: "This Field Is Required",
            minLength: 8 || "Password should be min 8 characters",
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          disabled={isLoading}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This Field Is Required",
            validate: (val) =>
              val === getValues().password || "Password Did Not Match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button size="signup" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
