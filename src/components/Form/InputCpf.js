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

export default function InputCPF({ name, ...rest }) {
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
      <InputMask mask="999.999.999-99" ref={inpuRef} {...rest}>
        <TextField fullWidth />
      </InputMask>
      {error && <FormHelperText error> {error}</FormHelperText>}
    </>
  );
}
