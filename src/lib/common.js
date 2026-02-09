export const FormError = (props) => {
  return (
    <div
      style={{
        color: "red",
        paddingTop: "5px",
        paddingBottom: "15px",
      }}
    >
      {props.msg}
    </div>
  );
};

export const formErrorsCreateService = {
  title: {
    required: true,
    error: "Please provide a valid service title of at least 5 characters.",
  },
  image: {
    required: true,
    error: "Please provide a valid image path for the service of at least 5 characters.",
  },
  description: {
    required: true,
    error:
      "Please provide a message describing the service of at least 10 characters.",
  },
  type: {
    required: true,
    error: "Please provide a valid service pricing detail type  of at least 5 characters.",
  },
  price: {
    required: true,
    error: "Please provide a valid service pricing detail cost to display.",
  },
  description2: {
    required: true,
    error:
      "Please provide a service pricing detail description message to better understand the details of at least 5 characters.",
  },
};


// **TBD - REMOVE THESE AFTER FULL CLEANUP SWEEP OF OLD FORMS**

export const getFormErrorObjectCreateService = (
  name,
  value,
  formErrorObjectRef
) => {
  let formErrorObject = { ...formErrorObjectRef };
  const status = validateInputCreateService(name, value);
  return { ...formErrorObject, [name + "Error"]: status };
};

export const getPricingDetailErrorObject = (
  name,
  value,
  formErrorObjectRef
) => {
  let formErrorObject = { ...formErrorObjectRef };
  const status = validateInputCreateService(name, value);
  return { ...formErrorObject, [name + "Error"]: status };
};

export const validateInputCreateService = (name, value) => {
  switch (name) {
    case "title":
      return value.length < 2 ? true : false;
    case "image":
      return value.length < 10 ? true : false;
    case "description":
      return value.length < 25 ? true : false;
    case "type":
      return value.length < 5 ? true : false;
    case "price":
      return value.length < 2 ? true : false;
    case "description2":
      return value.length < 25 ? true : false;
    default:
      break;
  }
};
