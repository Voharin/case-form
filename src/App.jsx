import instance from "./AxiosInstance";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./App.css";
import ListUser from "./ListUser";

function App() {
  const [formdata, setFormData] = useState({});
  const [showUsers, setShowUsers] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    console.log("data=>", data);

    async function postData() {
      const response = await instance.post("/query.php", data);
      console.log("response=>", response);
    }
    postData();
  };

  return (
    <>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Registration Form</h1>
          <label>First Name</label>
          <input
            type="text"
            {...register("firstName", {
              required: true,
              validate: {
                isName: (value) => value.length > 2,
              },
            })}
          />
          {errors.firstName && <span>This field is required</span>}
          <br />
          {errors.firstName?.type === "isName" && (
            <span>Please input two character at least</span>
          )}
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            {...register("lastName", {
              required: true,
              maxLength: 20,
              validate: {
                isName: (value) => value.length > 2,
              },
            })}
          />

          {errors.lastName && <span>This field is required</span>}
          <br />
          {errors.lastName?.type === "isName" && (
            <span>Please input two character at least</span>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
              validate: {
                isEmail: (value) => value.includes("@"),
              },
            })}
          />
          {errors.email && <span>This field is required</span>}
          <br />
          {errors.email?.type === "isEmail" && <span>Invalid email</span>}

          <label>Phone</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                international
                defaultCountry="TR"
                {...field}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                {...register("phone", {
                  required: true,
                  minLength: 10,
                  validate: {
                    isPhone: (value) =>
                      value.includes("+") &&
                      isValidPhoneNumber(value) &&
                      value.includes(" "),
                  },
                })}
              />
            )}
          />
          {(errors.phone && <span>This field is required</span>) ||
            (errors.phone?.type === "minLength" && (
              <span>Phone number is too short</span>
            ))}
          <label htmlFor="address">Address</label>
          <input type="text" {...register("address", { required: true })} />
          {errors.address && <span>This field is required</span>}
          <input type="submit" />
        </form>

        {Object.keys(formdata).length > 0 && (
          <div className="formdata">
            <h1>Form Data</h1>
            <p>First Name: {formdata.firstName}</p>
            <p>Last Name: {formdata.lastName}</p>
            <p>Email: {formdata.email}</p>
            <p>Phone: {formdata.phone}</p>
            <p>Address: {formdata.address}</p>
          </div>
        )}

        <div className="actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowUsers(!showUsers);
            }}
          >
            Show Recorded Users
          </button>
        </div>

        {showUsers && <ListUser />}
      </div>
    </>
  );
}

export default App;
