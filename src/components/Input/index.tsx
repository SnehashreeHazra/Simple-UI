import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React, { forwardRef, useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineClose,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const inputStyles = cva(
  [
    "w-full",
    "border",
    "rounded-lg",
    "transition-all",
    "duration-150",
    "outline-none",
    "placeholder-gray-400",
    "dark:placeholder-gray-500",
    "focus:ring-1",
  ],
  {
    variants: {
      variant: {
        outlined: "border-gray-300 dark:border-gray-600 focus:ring-primary-500",
        filled:
          "bg-gray-100 dark:bg-gray-800 border-transparent focus:ring-primary-500",
        ghost: "border-transparent bg-transparent focus:ring-primary-500",
      },
      size: {
        sm: "text-sm p-2",
        md: "text-base p-3",
        lg: "text-lg p-4",
      },
      state: {
        default: "",
        disabled: "bg-gray-200 dark:bg-gray-700 cursor-not-allowed",
        invalid: "border-red-500 focus:ring-red-500",
        loading: "opacity-70 cursor-wait",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "md",
      state: "default",
    },
  }
);

export type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputStyles> & {
    label?: string;
    helperText?: string;
    errorText?: string;
    showClear?: boolean;
    showPasswordToggle?: boolean;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      variant,
      size,
      state,
      showClear = false,
      showPasswordToggle = false,
      className,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password" && showPasswordToggle;
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const [internalValue, setInternalValue] = useState(props.value || "");

// Keep internalValue in sync if props.value changes
React.useEffect(() => {
  setInternalValue(props.value || "");
}, [props.value]);

    return (
      <div className="flex flex-col w-full">
    {label && <label className="mb-1 font-medium dark:text-gray-200">{label}</label>}
    <div className="relative w-full">
      <input
        ref={ref}
        type={inputType}
        disabled={state === "disabled"}
        className={clsx(
          inputStyles({ variant, size, state }),
          className,
          showClear || showPasswordToggle ? "pr-10" : ""
        )}
        value={internalValue}
        onChange={(e) => {
          setInternalValue(e.target.value);
          props.onChange?.(e);
        }}
        {...props}
      />

      {/* Clear button */}
      {showClear && internalValue && (
        <button
          type="button"
          onClick={() => {
            setInternalValue("");
            // Trigger onChange with a real synthetic event
            const event = {
              target: { value: "" },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            props.onChange?.(event);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <AiOutlineClose size={16} />
        </button>
      )}

      {/* Password toggle */}
      {showPasswordToggle && type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showPassword ? <AiFillEyeInvisible size={16} /> : <AiFillEye size={16} />}
        </button>
      )}

      {/* Loading spinner */}
      {state === "loading" && (
        <AiOutlineLoading3Quarters className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />
      )}
    </div>

    {helperText && !errorText && (
      <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</span>
    )}
    {errorText && <span className="mt-1 text-sm text-red-500">{errorText}</span>}
  </div>
    );
  }
);

Input.displayName = "Input";
