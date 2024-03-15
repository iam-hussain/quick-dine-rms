import * as z from "zod";
import messages from "./messages";

export const number = () => {
  let numberSchema = z.preprocess(
    (val) => {
      if (typeof val === "string") return parseInt(val, 10);
      return val;
    },
    z.number({
      required_error: messages.required,
    })
  );

  return numberSchema;
};

export const string = (options?: {
  type?: "email" | "username" | "";
  length?: "2-20" | "4-20" | "6-20";
  optional?: boolean;
}) => {
  let stringSchema = z.string({
    required_error: messages.required,
  });

  if (!options || !Object.keys(options).length) {
    return stringSchema;
  }

  if (options.type === "email") {
    stringSchema = stringSchema.email({ message: messages.valid_email });
  }

  if (options.optional) {
    stringSchema = stringSchema.optional() as any;
  }

  if (options.length === "4-20") {
    stringSchema = stringSchema
      .min(4, {
        message: messages.length4to20,
      })
      .max(20, {
        message: messages.length4to20,
      });
  }

  if (options.length === "2-20") {
    stringSchema = stringSchema
      .min(2, {
        message: messages.length2to20,
      })
      .max(20, {
        message: messages.length2to20,
      });
  }

  if (options.length === "6-20") {
    stringSchema = stringSchema
      .min(6, {
        message: messages.length6to20,
      })
      .max(20, {
        message: messages.length6to20,
      });
  }

  if (options.type === "username") {
    stringSchema = stringSchema.regex(
      new RegExp(/^(?!-*\-\-)(?!-*\-$)[^\W][\w-]{0,20}$/),
      messages.username_regex
    );
  }

  return stringSchema;
};
