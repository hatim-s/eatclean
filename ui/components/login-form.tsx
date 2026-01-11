import { cn } from "@/ui/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/components/base/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/ui/components/base/field";

type LoginFormProps = {
  formHeader: string;
  formDescription?: string;
} & React.ComponentProps<"div">;

export function LoginForm(props: LoginFormProps) {
  const { formHeader, formDescription, className, children, ...restProps } =
    props;
  return (
    <div className={cn("flex flex-col gap-6", className)} {...restProps}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{formHeader}</CardTitle>
          {formDescription ? (
            <CardDescription>{formDescription}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>{children}</Field>

              {/* separator */}
              {/* <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator> */}

              {/* email */}
              {/* <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field> */}

              {/* password */}
              {/* <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field> */}
              {/* <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field> */}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
