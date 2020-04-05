import React, { useRef } from "react";
import { useField } from "@unform/core";
import {
  Paper,
  Button,
  Grid,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import InputMask from "react-input-mask";
export default function Input({ name, mask, label, ...rest }) {
  const inpuRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inpuRef.current,
      path: "value",
      setValue(ref, value) {
        ref.setInputValue("");
      },
      clearValue(ref) {
        ref.setInputValue("");
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input type="email" name="email" style={{ display: "none" }} />
      <input type="password" name="password" style={{ display: "none" }} />
      <InputMask mask={mask}>
        <TextField label={label} fullWidth inputRef={inpuRef} {...rest} />
      </InputMask>
      {error && <FormHelperText error> {error}</FormHelperText>}
    </>
  );
}
