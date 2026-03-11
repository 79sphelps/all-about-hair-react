import { FormContext } from "./FormContext";

export default function FormProvider({ form, children }) {
  return (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  );
}