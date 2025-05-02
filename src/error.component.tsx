import { useErrorBoundary } from "react-error-boundary";

const ErrorComponent = ({ error }: any) => {
  // debugger;
  // console.log(error,'error')
  return (
    <>
      <h1 style={{ color: "red" }}>something went wrong!</h1>
      <pre style={{ color: "blue" }}>{error.message}</pre>
    </>
  );
};

export default ErrorComponent;
